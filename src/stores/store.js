/* eslint complexity: 0 */
import { createStore, applyMiddleware } from 'redux';
import {
  localAppRegistryActivated,
  globalAppRegistryActivated
} from 'mongodb-redux-common/app-registry';
import thunk from 'redux-thunk';
import toNS from 'mongodb-ns';

import reducer from '../modules';
import { namespaceChanged } from '../modules/namespace';
import { dataServiceConnected } from '../modules/data-service';
import { serverVersionChanged } from '../modules/server-version';
import { setIsAtlasDeployed } from '../modules/is-atlas-deployed';
import { allowWrites } from '../modules/allow-writes';
import { envChanged } from '../modules/env';

/**
 * Set if the plugin is deployed in Atlas.
 *
 * @param {Store} store - The store.
 * @param {Boolean} isAtlas - If the plugin is running in Atlas.
 */
export const setIsAtlas = (store, isAtlas) => {
  store.dispatch(setIsAtlasDeployed(isAtlas));
};

/**
 * Set if the plugin allows writes.
 *
 * @param {Store} store - The store.
 * @param {Boolean} allow - If the plugin allows writes.
 */
export const setAllowWrites = (store, allow) => {
  store.dispatch(allowWrites(allow));
};

/**
 * Set the data provider.
 *
 * @param {Store} store - The store.
 * @param {Error} error - The error (if any) while connecting.
 * @param {Object} provider - The data provider.
 */
export const setDataProvider = (store, error, provider) => {
  store.dispatch(dataServiceConnected(error, provider));
};

/**
 * Set the namespace in the store.
 *
 * @param {Store} store - The store.
 * @param {String} ns - The namespace in "db.collection" format.
 */
export const setNamespace = (store, ns) => {
  const namespace = toNS(ns);
  if (namespace.collection) {
    store.dispatch(namespaceChanged(ns));
    // refreshInput(store);
  }
};


/**
 * Set the server version.
 *
 * @param {Store} store - The store.
 * @param {String} version - The version.
 */
export const setServerVersion = (store, version) => {
  store.dispatch(serverVersionChanged(version));
};

/**
 * Set the local app registry.
 *
 * @param {Store} store - The store.
 * @param {AppRegistry} appRegistry - The app registry.
 */
export const setLocalAppRegistry = (store, appRegistry) => {
  store.dispatch(localAppRegistryActivated(appRegistry));
};

/**
 * Set the global app registry.
 *
 * @param {Store} store - The store.
 * @param {AppRegistry} appRegistry - The app registry.
 */
export const setGlobalAppRegistry = (store, appRegistry) => {
  store.dispatch(globalAppRegistryActivated(appRegistry));
};

/**
 * Set the environment.
 *
 * @param {Store} store - The store.
 * @param {String} env - The env. (atlas, adl, on-prem).
 */
export const setEnv = (store, env) => {
  store.dispatch(envChanged(env));
};

/**
 * One method configure store call.
 *
 * @param {Options} options - The options.
 *
 * @returns {Store} The store.
 */
const configureStore = (options = {}) => {
  const store = createStore(reducer, applyMiddleware(thunk));

  // Set the app registry if preset. This must happen first.
  if (options.localAppRegistry) {
    const localAppRegistry = options.localAppRegistry;
    setLocalAppRegistry(store, localAppRegistry);
  }

  if (options.globalAppRegistry) {
    const globalAppRegistry = options.globalAppRegistry;
    setGlobalAppRegistry(store, globalAppRegistry);

    /**
     * Refresh documents on global data refresh.
     */
    // globalAppRegistry.on('refresh-data', () => {
    //   refreshInput(store);
    // });

    /**
     * Set the environment.
     */
    globalAppRegistry.on('compass:deployment-awareness:topology-changed', (data) => {
      setEnv(store, data.env);
    });
  }

  // Set the data provider - this must happen second.
  if (options.dataProvider) {
    setDataProvider(
      store,
      options.dataProvider.error,
      options.dataProvider.dataProvider
    );
  }

  if (options.isAtlasDeployed !== null && options.isAtlasDeployed !== undefined) {
    setIsAtlas(store, options.isAtlasDeployed);
  }

  if (options.allowWrites !== null && options.allowWrites !== undefined) {
    setAllowWrites(store, options.allowWrites);
  }

  // Set the namespace - must happen third.
  if (options.namespace) {
    setNamespace(store, options.namespace);
  }

  // Setting server version in fields can change in order but must be after
  // the previous options.
  if (options.serverVersion) {
    setServerVersion(store, options.serverVersion);
  }

  if (options.env) {
    setEnv(store, options.env);
  } else if (global && global.hadronApp && global.hadronApp.appRegistry) {
    const deploymentAwarenessStore = global.hadronApp.appRegistry.getStore('DeploymentAwareness.Store');
    if (deploymentAwarenessStore) {
      setEnv(store, deploymentAwarenessStore.state.env);
    }
  }

  return store;
};

export default configureStore;
