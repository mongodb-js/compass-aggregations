const debug = require('debug')('mongodb-aggregations:modules:index');

import { combineReducers } from 'redux';
import { ObjectId } from 'bson';

import dataService, { INITIAL_STATE as DS_INITIAL_STATE } from './data-service';
import fields, { INITIAL_STATE as FIELDS_INITIAL_STATE } from './fields';
import inputDocuments, {
  INITIAL_STATE as INPUT_INITIAL_STATE
} from './input-documents';
import namespace, {
  INITIAL_STATE as NS_INITIAL_STATE,
  NAMESPACE_CHANGED
} from './namespace';
import serverVersion, {
  INITIAL_STATE as SV_INITIAL_STATE
} from './server-version';
import isModified, {
  INITIAL_STATE as IS_MODIFIED_INITIAL_STATE
} from './is-modified';
import pipeline, {
  runStage,
  INITIAL_STATE as PIPELINE_INITIAL_STATE
} from './pipeline';
import name, { INITIAL_STATE as NAME_INITIAL_STATE } from './name';
import limit, { INITIAL_STATE as LIMIT_INITIAL_STATE } from './limit';
import largeLimit, {
  INITIAL_STATE as LARGE_LIMIT_INITIAL_STATE
} from './large-limit';

import maxTimeMS, {
  INITIAL_STATE as MAX_TIME_MS_INITIAL_STATE
} from './max-time-ms';

import collation, {
  INITIAL_STATE as COLLATION_INITIAL_STATE
} from './collation';
import collationString, {
  INITIAL_STATE as COLLATION_STRING_INITIAL_STATE
} from './collation-string';
import isCollationExpanded, {
  INITIAL_STATE as COLLATION_COLLAPSER_INITIAL_STATE
} from './collation-collapser';
import comments, { INITIAL_STATE as COMMENTS_INITIAL_STATE } from './comments';
import sample, { INITIAL_STATE as SAMPLE_INITIAL_STATE } from './sample';
import autoPreview, {
  INITIAL_STATE as AUTO_PREVIEW_INITIAL_STATE
} from './auto-preview';
import id, { INITIAL_STATE as ID_INITIAL_STATE } from './id';
import savedPipeline, {
  updatePipelineList,
  INITIAL_STATE as SP_INITIAL_STATE
} from './saved-pipeline';
import restorePipeline, {
  INITIAL_STATE as RESTORE_PIPELINE_STATE
} from './restore-pipeline';
import importPipeline, {
  INITIAL_STATE as IMPORT_PIPELINE_INITIAL_STATE,
  CONFIRM_NEW,
  createPipeline
} from './import-pipeline';
import { getObjectStore } from 'utils/indexed-db';
import appRegistry, {
  appRegistryEmit,
  INITIAL_STATE as APP_REGISTRY_STATE
} from 'modules/app-registry';
import isOverviewOn, {
  TOGGLE_OVERVIEW,
  INITIAL_STATE as OVERVIEW_INITIAL_STATE
} from 'modules/is-overview-on';
import settings, {
  APPLY_SETTINGS,
  INITIAL_STATE as SETTINGS_INITIAL_STATE
} from './settings';
import isFullscreenOn, {
  INITIAL_STATE as FULLSCREEN_INITIAL_STATE
} from 'modules/is-fullscreen-on';
import savingPipeline, {
  INITIAL_STATE as SAVING_PIPELINE_INITIAL_STATE,
  SAVING_PIPELINE_APPLY
} from 'modules/saving-pipeline';

import projections, {
  INITIAL_STATE as PROJECTIONS_INITIAL_STATE,
  PROJECTIONS_CHANGED
} from 'modules/projections';

/**
 * The intial state of the root reducer.
 */
export const INITIAL_STATE = {
  appRegistry: APP_REGISTRY_STATE,
  dataService: DS_INITIAL_STATE,
  fields: FIELDS_INITIAL_STATE,
  inputDocuments: INPUT_INITIAL_STATE,
  namespace: NS_INITIAL_STATE,
  serverVersion: SV_INITIAL_STATE,
  pipeline: PIPELINE_INITIAL_STATE,
  savedPipeline: SP_INITIAL_STATE,
  restorePipeline: RESTORE_PIPELINE_STATE,
  name: NAME_INITIAL_STATE,
  collation: COLLATION_INITIAL_STATE,
  collationString: COLLATION_STRING_INITIAL_STATE,
  isCollationExpanded: COLLATION_COLLAPSER_INITIAL_STATE,
  isOverviewOn: OVERVIEW_INITIAL_STATE,
  comments: COMMENTS_INITIAL_STATE,
  sample: SAMPLE_INITIAL_STATE,
  autoPreview: AUTO_PREVIEW_INITIAL_STATE,
  id: ID_INITIAL_STATE,
  isModified: IS_MODIFIED_INITIAL_STATE,
  importPipeline: IMPORT_PIPELINE_INITIAL_STATE,
  settings: SETTINGS_INITIAL_STATE,
  limit: LIMIT_INITIAL_STATE,
  largeLimit: LARGE_LIMIT_INITIAL_STATE,
  maxTimeMS: MAX_TIME_MS_INITIAL_STATE,
  isFullscreenOn: FULLSCREEN_INITIAL_STATE,
  savingPipeline: SAVING_PIPELINE_INITIAL_STATE,
  projections: PROJECTIONS_INITIAL_STATE
};

/**
 * Reset action constant.
 */
export const RESET = 'aggregations/reset';

/**
 * Clear the pipeline name.
 */
export const CLEAR_PIPELINE = 'aggregations/CLEAR_PIPELINE';

/**
 * Restore action constant.
 */
export const RESTORE_PIPELINE = 'aggregations/RESTORE_PIPELINE';

/**
 * New pipeline action name.
 */
export const NEW_PIPELINE = 'aggregations/NEW_PIPELINE';

/**
 * Clone pipeline action name.
 */
export const CLONE_PIPELINE = 'aggregations/CLONE_PIPELINE';

export const NEW_FROM_PASTE = 'aggregations/NEW_FROM_PASTE';

/**
 * The main application reducer.
 *
 * this does not include save state and restore state reducers as those need to
 * be handled differently in the default reducer
 *
 * @returns {Function} The reducer function.
 */
const appReducer = combineReducers({
  appRegistry,
  comments,
  sample,
  autoPreview,
  dataService,
  fields,
  inputDocuments,
  namespace,
  serverVersion,
  savedPipeline,
  restorePipeline,
  pipeline,
  name,
  collation,
  collationString,
  isCollationExpanded,
  id,
  isModified,
  importPipeline,
  isOverviewOn,
  settings,
  limit,
  largeLimit,
  maxTimeMS,
  isFullscreenOn,
  savingPipeline,
  projections
});

/**
 * Handle the namespace change.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const doNamespaceChanged = (state, action) => {
  const newState = {
    ...INITIAL_STATE,
    dataService: state.dataService,
    appRegistry: state.appRegistry
  };
  return appReducer(newState, action);
};

/**
 * Handle the reset.
 *
 * @returns {Object} The new state.
 */
const doReset = () => ({
  ...INITIAL_STATE
});

/**
 * Handle the pipeline restore.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const doRestorePipeline = (state, action) => {
  const savedState = action.restoreState;
  const commenting =
    savedState.comments === null || savedState.comments === undefined
      ? true
      : savedState.comments;
  const sampling =
    savedState.sample === null || savedState.sample === undefined
      ? true
      : savedState.sample;
  const autoPreviewing =
    savedState.autoPreview === null || savedState.autoPreview === undefined
      ? true
      : savedState.autoPreview;

  return {
    ...INITIAL_STATE,
    appRegistry: state.appRegistry,
    namespace: savedState.namespace,
    pipeline: savedState.pipeline,
    name: savedState.name,
    collation: savedState.collation,
    collationString: savedState.collationString,
    isCollationExpanded: savedState.collationString ? true : false,
    id: savedState.id,
    comments: commenting,
    limit: savedState.limit,
    largeLimit: savedState.largeLimit,
    maxTimeMS: savedState.maxTimeMS,
    projections: savedState.projections,
    sample: sampling,
    autoPreview: autoPreviewing,
    fields: state.fields,
    serverVersion: state.serverVersion,
    dataService: state.dataService,
    inputDocuments: state.inputDocuments,
    savedPipeline: {
      ...state.savedPipeline,
      isListVisible: false
    },
    restorePipeline: {
      isModalVisible: false,
      pipelineObjectID: ''
    }
  };
};

/**
 * Handle the pipeline clear.
 *
 * @param {Object} state - The state.
 *
 * @returns {Object} The new state.
 */
const doClearPipeline = (state) => ({
  ...state,
  pipeline: [],
  limit: LIMIT_INITIAL_STATE,
  largeLimit: LARGE_LIMIT_INITIAL_STATE,
  maxTimeMS: MAX_TIME_MS_INITIAL_STATE,
  savedPipeline: {
    ...state.savedPipeline,
    isListVisible: true
  }
});

/**
 * Create a new pipeline.
 *
 * @param {Object} state - The state.
 *
 * @returns {Object} The new state.
 */
const createNewPipeline = (state) => ({
  ...INITIAL_STATE,
  appRegistry: state.appRegistry,
  namespace: state.namespace,
  fields: state.fields,
  serverVersion: state.serverVersion,
  dataService: state.dataService,
  inputDocuments: state.inputDocuments
});

/**
 * Create a cloned pipeline.
 *
 * @param {Object} state - The state.
 *
 * @returns {Object} The new state.
 */
const createClonedPipeline = (state) => ({
  ...state,
  id: new ObjectId().toHexString(),
  name: `${state.name} (copy)`,
  isModified: true
});

/**
 * Confirm importing the new pipeline.
 *
 * @param {Object} state - The state.
 *
 * @returns {Object} The new state.
 */
const doConfirmNewFromText = (state) => {
  const pipe = createPipeline(state.importPipeline.text);
  const error = pipe.length > 0 ? pipe[0].syntaxError : null;
  return {
    ...state,
    name: '',
    collation: {},
    collationString: '',
    isCollationExpanded: false,
    id: new ObjectId().toHexString(),
    pipeline: error ? [] : pipe,
    importPipeline: {
      isOpen: error ? true : false,
      isConfirmationNeeded: false,
      text: error ? state.importPipeline.text : '',
      syntaxError: error
    }
  };
};

/**
 * When <StageEditor /> is empty and you paste
 * what could be an aggregation pipeline.
 *
 * @see `newPipelineFromPaste()`
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const doNewFromPastedText = (state, action) => {
  const pipe = createPipeline(action.text);
  const error = pipe.length > 0 ? pipe[0].syntaxError : null;
  /**
   * Do nothing if the text is not a valid pipeline.
   */
  if (error) {
    return state;
  }

  /**
   * Do nothing if you have more than default first stage.
   */
  if (state.pipeline.length > 1) {
    return state;
  }

  return {
    ...state,
    name: '',
    collation: {},
    collationString: '',
    isCollationExpanded: false,
    id: new ObjectId().toHexString(),
    pipeline: pipe,
    importPipeline: {
      isOpen: false,
      isConfirmationNeeded: false,
      text: action.text,
      syntaxError: error
    }
  };
};

/**
 * Toggles whether agg pipeline builder is in overview mode.
 * @param {Object} state
 * @returns {Object} The new state.
 */
const doToggleOverview = (state) => {
  const newState = {
    ...state,
    isOverviewOn: !state.isOverviewOn
  };

  if (newState.pipeline) {
    newState.pipeline.forEach((pipe) => {
      pipe.isExpanded = !newState.isOverviewOn;
    });
  }

  if (newState.inputDocuments) {
    newState.inputDocuments.isExpanded = !newState.isOverviewOn;
  }
  return newState;
};

const doApplySettings = (state) => {
  const newState = {
    ...state,
    limit: state.settings.sampleSize,
    largeLimit: state.settings.limit,
    comments: state.settings.isCommentMode,
    maxTimeMS: state.settings.maxTimeMS
  };

  newState.settings.isDirty = false;
  return newState;
};

const doApplySavingPipeline = (state) => {
  const newState = {
    ...state,
    name: state.savingPipeline.name
  };

  newState.savingPipeline.isOpen = false;
  return newState;
};

import { gatherProjections } from 'modules/stage';

const doProjectionsChanged = (state) => {
  const newState = {
    ...state,
    projections: []
  };

  newState.pipeline.map((_stage, index) => {
    _stage.projections = gatherProjections(_stage);
    _stage.projections.map((projection) => {
      projection.index = index;
      newState.projections.push(projection);
    });
  });
  return newState;
};
/**
 * The action to state modifier mappings.
 */
const MAPPINGS = {
  [NAMESPACE_CHANGED]: doNamespaceChanged,
  [RESET]: doReset,
  [RESTORE_PIPELINE]: doRestorePipeline,
  [CLEAR_PIPELINE]: doClearPipeline,
  [NEW_PIPELINE]: createNewPipeline,
  [CLONE_PIPELINE]: createClonedPipeline,
  [CONFIRM_NEW]: doConfirmNewFromText,
  [TOGGLE_OVERVIEW]: doToggleOverview,
  [APPLY_SETTINGS]: doApplySettings,
  [SAVING_PIPELINE_APPLY]: doApplySavingPipeline,
  [PROJECTIONS_CHANGED]: doProjectionsChanged,
  [NEW_FROM_PASTE]: doNewFromPastedText
};

/**
 * The root reducer.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const rootReducer = (state, action) => {
  const fn = MAPPINGS[action.type];
  return fn ? fn(state, action) : appReducer(state, action);
};

export default rootReducer;

/**
 * Reset the entire state.
 *
 * @returns {Object} The action.
 */
export const reset = () => ({
  type: RESET
});

/**
 * The clear pipeline action.
 *
 * @returns {Object} The action.
 */
export const clearPipeline = () => ({
  type: CLEAR_PIPELINE
});

/**
 * Get the restore action.
 *
 * @param {Object} restoreState - The state.
 *
 * @returns {Object} The action.
 */
export const restoreSavedPipeline = (restoreState) => ({
  type: RESTORE_PIPELINE,
  restoreState: restoreState
});

/**
 * The new pipeline action.
 *
 * @returns {Object} The action.
 */
export const newPipeline = () => ({
  type: NEW_PIPELINE
});

/**
 * The clone pipeline action.
 *
 * @returns {Object} The action.
 */
export const clonePipeline = () => ({
  type: CLONE_PIPELINE
});

/**
 * Action creator <StageEditor /> calls if empty and you paste
 * what could be an aggregation pipeline.
 * @param {String} text
 * @returns {Object}
 */
export const newPipelineFromPaste = (text) => ({
  type: NEW_FROM_PASTE,
  text: text
});

/**
 * Get the delete action.
 *
 * @param {String} pipelineId - The pipeline id.
 *
 * @returns {Function} The thunk function.
 */
export const deletePipeline = (pipelineId) => {
  return (dispatch, getState) => {
    getObjectStore('readwrite', (store) => {
      store.delete(pipelineId).onsuccess = () => {
        dispatch(updatePipelineList());
        dispatch(clearPipeline());
        dispatch(
          appRegistryEmit('agg-pipeline-deleted', {
            name: getState().name
          })
        );
      };
    });
  };
};

/**
 * Get a pipeline from the db.
 *
 * @param {String} pipelineId - The id.
 *
 * @returns {Function} The thunk function.
 */
export const getPipelineFromIndexedDB = (pipelineId) => {
  return (dispatch) => {
    getObjectStore('readwrite', (store) => {
      store.get(pipelineId).onsuccess = (e) => {
        const pipe = e.target.result;
        dispatch(clearPipeline());
        dispatch(restoreSavedPipeline(pipe));
        dispatch(runStage(0));
      };
    });
  };
};

/**
 * Open create view.
 *
 * @emits open-create-view {meta: {source, pipeline}}
 * @see create-view src/stores/create-view.js
 * @returns {Function} The thunk function.
 */
export const openCreateView = () => {
  return (dispatch, getState) => {
    const state = getState();
    const sourceNs = state.namespace;
    const sourcePipeline = state.pipeline.map((p) => p.executor);

    const meta = {
      source: sourceNs,
      pipeline: sourcePipeline
    };

    debug('emitting', 'open-create-view', meta);
    dispatch(appRegistryEmit('open-create-view', meta));
  };
};
