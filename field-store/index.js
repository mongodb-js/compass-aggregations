const mergeWith = require('lodash.mergewith');
const isNumber = require('lodash.isnumber');
const isString = require('lodash.isstring');
const uniq = require('lodash.uniq');
const isArray = require('lodash.isarray');
const includes = require('lodash.includes');
const pick = require('lodash.pick');
const cloneDeep = require('lodash.clonedeep');
const union = require('lodash.union');
const parseSchema = require('mongodb-schema');

const FIELDS = [
  'name',
  'path',
  'count',
  'type'
];

const ONE = 1;
const FIELD = 'field';
const VERSION_ZERO = '0.0.0';

const state = {
  fields: {},
  topLevelFields: [],
  aceFields: []
};

const getState = () => {
  return state;
};

const setState = (s) => {
  state.fields = s.fields;
  state.topLevelFields = s.topLevelFields;
  state.aceFields = s.aceFields;

  return state;
};

const _mergeFields = (existingField, newField) => {
  return mergeWith(
    existingField,
    newField,
    function (objectValue, sourceValue, key) {
      if (key === 'count') {
        // counts add up
        return isNumber(objectValue) ? objectValue + sourceValue : sourceValue;
      }
      if (key === 'type') {
        // Avoid the merge of 'Array' with 'Array' case becoming
        // an array with a single value, i.e. ['Array']
        if (objectValue === sourceValue) {
          return objectValue;
        }
        // arrays concatenate and de-duplicate
        if (isString(objectValue)) {
          return uniq([objectValue, sourceValue]);
        }
        return isArray(objectValue) ? uniq(objectValue.concat(sourceValue)) : sourceValue;
      }
      // all other keys are handled as per default
      return undefined;
    }
  );
};

const _flattenedFields = (fields, nestedFields, rootField, arrayDepth = 1) => {
  if (!nestedFields) {
    return;
  }

  if (rootField) {
    if (!fields[rootField.path].hasOwnProperty('nestedFields')) {
      fields[rootField.path].nestedFields = [];
    }
    nestedFields.map((f) => {
      if (!includes(fields[rootField.path].nestedFields, f.path)) {
        fields[rootField.path].nestedFields.push(f.path);
      }
    });
  }

  for (const field of nestedFields) {
    const existingField = fields[field.path] || {};
    const newField = pick(field, FIELDS);
    fields[field.path] = _mergeFields(existingField, newField);

    // recursively search arrays and subdocuments
    for (const type of field.types) {
      if (type.name === 'Document') {
        // add nested sub-fields
        _flattenedFields(fields, type.fields, field);
      }
      if (type.name === 'Array') {
        // add arrays of arrays or subdocuments
        _flattenedArray(fields, type.types, field, arrayDepth);
      }
    }
  }
};

/**
 * Helper to recurse into the "types" of the mongodb-schema superstructure.
 *
 * @param {Object} fields      flattened list of fields to mutate
 * @param {Array} nestedTypes  the "types" array currently being inspected
 * @param {Object} field       current top level field on which to
 *                             mutate dimensionality
 * @param {Number} arrayDepth  track depth of the dimensionality recursion
 */
const _flattenedArray = (fields, nestedTypes, field, arrayDepth) => {
  fields[field.path].dimensionality = arrayDepth;

  // Arrays have no name, so can only recurse into arrays or subdocuments
  for (const type of nestedTypes) {
    if (type.name === 'Document') {
      // recurse into nested sub-fields
      _flattenedFields(fields, type.fields, field);
    }
    if (type.name === 'Array') {
      // recurse into nested arrays (again)
      _flattenedArray(fields, type.types, field, arrayDepth + 1);
    }
  }
};

/**
 * Processes the fields in a format compatible with the ACE editor
 * autocompleter.
 *
 * @param {Object} fields - The fields.
 *
 * @returns {Array} The array of autocomplete metadata.
 */
const _processAceFields = (fields) => {
  return Object.keys(fields).map((key) => {
    const field = (key.indexOf('.') > -1 || key.indexOf(' ') > -1) ? `"${key}"` : key;
    return {
      name: key,
      value: field,
      score: ONE,
      meta: FIELD,
      version: VERSION_ZERO
    };
  });
};

/**
 * merges a schema with the existing FieldStore content.
 *
 * @param  {Object} schema  schema to process and merge
 */
const _mergeSchema = (schema) => {
  const fields = cloneDeep(getState().fields);
  const topLevelFields = [];

  for (const field of schema.fields) {
    const name = field.name;
    topLevelFields.push(name);
  }
  _flattenedFields(fields, schema.fields);

  const tlResult = union(getState().topLevelFields, topLevelFields);
  const aResult = _processAceFields(fields);
  return setState({
    fields: fields,
    topLevelFields: tlResult,
    aceFields: aResult
  });
};

/**
 * processes documents returned from the ResetDocumentListStore and
 * LoadMoreDocumentsStore.
 *
 * @param  {Array} documents  documents to process.
 */
async function processDocuments(documents) {
  return new Promise((resolve, reject) => {
    parseSchema(documents, {
      storeValues: false
    }, (err, schema) => {
      if (err) {
        return reject(err);
      }
      resolve(_mergeSchema(schema));
    });
  });
}

/**
 * processes a single document returned from the InsertDocumentStore.
 *
 * @param  {Object} document     document to process.
 */
async function processSingleDocument(document) {
  return new Promise((resolve) => {
    resolve(processDocuments([document]));
  });
}

/**
 * processes a schema from the SchemaStore.
 *
 * @param  {Array} schema     the schema to merge with the existing state.
 */
async function processSchema(schema) {
  return new Promise((resolve) => {
    resolve(_mergeSchema(schema));
  });
}
module.exports = processDocuments;
module.exports.processDocuments = processDocuments;
module.exports.processSchema = processSchema;
module.exports.processSingleDocument = processSingleDocument;
