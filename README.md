# compass-aggregations [![][travis_img]][travis_url]

> Compass Aggregation Pipeline Builder

## Usage

This plugin uses an instance of a Redux store and not the traditional singleton,
so the store instance must be passed to the plugin. The plugin exports a function
to initialise the store instance, which decorates it with various methods to
conveniently set any values it uses.

### Browser

```js
import Plugin, {
  configureStore,
  refreshInput,
  setDataProvider,
  setNamespace,
  setServerVersion,
  setFields
} from '@mongodb-js/compass-aggregations';

const store = configureStore();

refreshInput(store); // Refreshes input documents.
setDataProvider(store, error, provider); // Sets the (optional) connect error and data provider.
setNamespace(store, ns); // Set the namespace in "db.collection" format.
setServerVersion(store, version); // Set the lowest MongoDB server version in the cluster.
setFields(store, fields); // Set the field names in the schema for autocompletion. See note below.

<Plugin store={store} />
```

### Hadron/Electron

```js
const Component = appRegistry.getRole('Collection.Tab')[0].component;
const configureStore = appRegistry.getStore('Aggregations.Store');

<Component store={configureStore} />
```

### Fields

The fields array must be an array of objects that the ACE editor autocompleter understands. See
[This example](https://github.com/mongodb-js/ace-autocompleter/blob/master/lib/constants/accumulators.js)
for what that array looks like.

### Data Provider

The data provider is an object that must adhere to the following interface:

```js
/**
 * Get a count of documents.
 *
 * @param {String} namespace - The namespace in "db.collection" format.
 * @param {Object} filter - The MQL query filter.
 * @param {Object} options - The query options.
 * @param {Function} callback - Gets error and integer count as params.
 */
provider.count(namespace, filter, options, callback);

/**
 * Execute an aggregation pipeline.
 *
 * @param {String} namespace - The namespace in "db.collection" format.
 * @param {Array} pipeline - The pipeline.
 * @param {Object} options - The agg options.
 * @param {Function} callback - Gets error and cursor as params. Cursor must
 *   implement #toArray (which takes a callback with error and an array of result docs)
 *   and #close
 */
provider.aggregate(namespace, pipeline, options, callback);
```

## License

Apache 2.0

[travis_img]: https://travis-ci.org/mongodb-js/compass-aggregations.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/compass-aggregations
