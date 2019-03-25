# compass-aggregations [![][travis_img]][travis_url]

> Compass Aggregation Pipeline Builder

- [`<Aggregation />`](https://github.com/mongodb-js/compass-aggregations) Plugin for primary UI
- [`<ExportToLanguage />`](https://github.com/mongodb-js/compass-export-to-language) Modal plugin that connects `<Aggregation />` to `bson-transpilers` [for actual compiling to another language](https://github.com/mongodb-js/bson-transpilers)

## Usage

This plugin uses an instance of a Redux store and not the traditional singleton,
so the store instance must be passed to the plugin. The plugin exports a function
to initialise the store instance, which decorates it with various methods to
conveniently set any values it uses.

### Browser

Setting values from directly exported functions:

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

Setting values via configure:

```js
import Plugin, { configureStore, } from '@mongodb-js/compass-aggregations';

const store = configureStore({
  dataProvider: dataProvider,
  namespace: 'db.coll',
  serverVersion: '4.2.0',
  fields: []
});

<Plugin store={store} />
```

### Hadron/Electron

```js
const role = appRegistry.getRole('Collection.Tab')[0];
const Plugin = role.component;
const configureStore = role.configureStore;
const store = configureStore({
  appRegistry: appRegistry,
  dataProvider: dataProvider,
  namespace: 'db.coll',
  serverVersion: '4.2.0',
  fields: []
});

<Plugin store={store} />
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

## Compass Plugin Patterns

- `src/modules/` is where action happens
    - action creators components call
    - reducers that call dataService, window.open, emit to other plugins, etc.
    - follows the `ducks` pattern
- `src/stores/store` is where plugin listens+responds to events of interest from other plugins
- store is global state instantiated via `configureStore()`

## Cross-plugin Communication

> How does clicking on export to language button in aggregation builder show the modal that has code in it?

- `./src/modules/export-to-language.js` `appRegistry.emit('open-aggregation-export-to-language', generatePipelineAsString())`
- [`compass-export-to-language/src/stores/store.js`](https://github.com/mongodb-js/compass-export-to-language/blob/master/src/stores/store.js#L16) Listener for 'export to lang' event via appRegistry and renders its modal.
- [`compass-export-to-language/src/modules/export-query.js`](https://github.com/mongodb-js/compass-export-to-language/blob/master/src/modules/export-query.js#L56) has reducer for calling `bson-transpilers.compile()` which populates the code in the modal dialog.

## Usage with a `mongodb-data-service` Provider

See `./examples-data-service-provider.js` for details on what `data-service` functions are used and the applicable options for each.

## Related

- [`mongodb-js/stage-validator`](https://github.com/mongodb-js/stage-validator) Aggregation Pipeline Stage grammar.
- [`bson-transpilers`](https://github.com/mongodb-js/bson-transpilers) Read the amazing: [Compiler in JavaScript using ANTLR](https://medium.com/dailyjs/compiler-in-javascript-using-antlr-9ec53fd2780f)
- [`mongodb-js/ace-mode`](https://github.com/mongodb-js/ace-mode) MongoDB highlighting rules for ACE.
- [`mongodb-js/ace-theme`](https://github.com/mongodb-js/ace-theme) MongoDB syntax highlighting rules for ACE.
- [`mongodb-js/ace-autocompleter`](https://github.com/mongodb-js/ace-autocompleter) Makes ACE autocompletion aware of MongoDB Aggregation Pipeline [operators, expressions, and fields](https://github.com/mongodb-js/ace-autocompleter/tree/master/lib/constants).

## Development

### Tests

```
npm run test
```

### Electron

```
npm start
```

### Storybook

```
npm run storybook
```

### Analyze Build

```
npm run analyze
```

## License

Apache 2.0

[travis_img]: https://travis-ci.org/mongodb-js/compass-aggregations.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/compass-aggregations

## TODO

- [x] Verify Storybook not included in `production` bundle for Cloud
- [x] Switch Storybook deploy from `3.0.0` to `master`
- [x] Webpack 4 Upgrade #79 
- [x] Webpack 4 upgrade part 2 mongodb-js/compass-plugin#23
- [ ] COMPASS-2888: Autocompletion includes projections #76
- [ ] COMPASS-2960: Autocomplete `$$variables` defined from `let`
- [ ] COMPASS-3086: Quickly create new pipelines by pasting into stage editor when in `INITIAL_STATE`

#### Misc

- [ ] input-docs uses sample size setting
- [ ] Remove sample mode toggle
- [ ] clarify settings name language

#### Future

- [ ] Write some more tests for saving
- [ ] Save pipeline validation
