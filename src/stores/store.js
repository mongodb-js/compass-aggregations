import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'modules';
import toNS from 'mongodb-ns';
import { namespaceChanged } from 'modules/namespace';
import { dataServiceConnected } from 'modules/data-service';
import { fieldsChanged } from 'modules/fields';
import { refreshInputDocuments } from 'modules/input-documents';
import { serverVersionChanged } from 'modules/server-version';
import { appRegistryActivated } from 'modules/app-registry';

/**
 * Refresh the input documents.
 *
 * @param {Store} s - The store.
 */
export const refreshInput = (s) => {
  s.dispatch(refreshInputDocuments());
};

/**
 * Set the data provider.
 *
 * @param {Store} s - The store.
 * @param {Error} error - The error (if any) while connecting.
 * @param {Object} provider - The data provider.
 */
export const setDataProvider = (s, error, provider) => {
  s.dispatch(dataServiceConnected(error, provider));
};

/**
 * Set the namespace in the store.
 *
 * @param {Store} s - The store.
 * @param {String} ns - The namespace in "db.collection" format.
 */
export const setNamespace = (s, ns) => {
  const namespace = toNS(ns);
  if (namespace.collection) {
    s.dispatch(namespaceChanged(ns));
    refreshInput(s);
  }
};

/**
 * Set the server version.
 *
 * @param {Store} s - The store.
 * @param {String} version - The version.
 */
export const setServerVersion = (s, version) => {
  s.dispatch(serverVersionChanged(version));
};

/**
 * Set the fields for the autocompleter.
 *
 * @param {Store} s - The store.
 * @param {Array} fields - The fields array in the ACE autocompleter format.
 */
export const setFields = (s, fields) => {
  s.dispatch(fieldsChanged(fields));
};

/**
 * Function to configure a store for use in this plugin.
 */
const configureStore = () => {
  /**
   * The store has a combined pipeline reducer plus the thunk middleware.
   */
  const store = createStore(reducer, applyMiddleware(thunk));

  /**
   * This hook is Compass specific to listen to app registry events.
   *
   * @param {AppRegistry} appRegistry - The app registry.
   */
  store.onActivated = (appRegistry) => {
    /**
     * When the collection is changed, update the store.
     *
     * @param {String} ns - The full namespace.
     */
    appRegistry.on('collection-changed', (ns) => {
      setNamespace(store, ns);
    });

    /**
     * When the collection is changed, update the store.
     */
    appRegistry.on('import-finished', () => {
      refreshInput(store);
    });

    /**
     * Refresh documents on data refresh.
     */
    appRegistry.on('refresh-data', () => {
      const ns = appRegistry.getStore('App.NamespaceStore').ns;
      // TODO: only refresh when we are in the index tab; for now just check if
      // we are in the documents set of tabs.
      if (ns.indexOf('.' === 0)) refreshInput(store);
    });

    /**
     * Set the data service in the store when connected.
     *
     * @param {Error} error - The error.
     * @param {DataService} dataService - The data service.
     */
    appRegistry.on('data-service-connected', (error, dataService) => {
      setDataProvider(store, error, dataService);
    });

    /**
     * When the schema fields change, update the state with the new
     * fields.
     *
     * @param {Object} fields - The fields.
     */
    appRegistry.getStore('Field.Store').listen((fields) => {
      setFields(store, fields.aceFields);
    });

    /**
     * When the instance is loaded, set our server version.
     *
     * @param {String} version - The version.
     */
    appRegistry.on('server-version-changed', (version) => {
      setServerVersion(store, version);
    });

    /**
     * Set the app registry to use later.
     */
    store.dispatch(appRegistryActivated(appRegistry));
  };

  return store;
};

export default configureStore;
