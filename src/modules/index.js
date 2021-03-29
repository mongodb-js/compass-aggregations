const debug = require('debug')('mongodb-aggregations:modules:index');

import { combineReducers } from 'redux';
// import { ObjectId } from 'mongodb';
import appRegistry, {
  // localAppRegistryEmit,
  // globalAppRegistryEmit,
  INITIAL_STATE as APP_REGISTRY_STATE
} from 'mongodb-redux-common/app-registry';

import dataService, { INITIAL_STATE as DS_INITIAL_STATE } from './data-service';

import namespace, {
  INITIAL_STATE as NS_INITIAL_STATE,
  NAMESPACE_CHANGED
} from './namespace';
import env, {
  INITIAL_STATE as ENV_INITIAL_STATE
} from './env';
import serverVersion, {
  INITIAL_STATE as SV_INITIAL_STATE
} from './server-version';
import isAtlasDeployed, {
  INITIAL_STATE as IS_ATLAS_DEPLOYED_INITIAL_STATE
} from './is-atlas-deployed';
import isReadonly, {
  INITIAL_STATE as IS_READONLY_INITIAL_STATE
} from './is-readonly';
import allowWrites, {
  INITIAL_STATE as ALLOW_WRITES_INITIAL_STATE
} from './allow-writes';


/**
 * The intial state of the root reducer.
 */
export const INITIAL_STATE = {
  appRegistry: APP_REGISTRY_STATE,
  allowWrites: ALLOW_WRITES_INITIAL_STATE,
  dataService: DS_INITIAL_STATE,
  namespace: NS_INITIAL_STATE,
  env: ENV_INITIAL_STATE,
  serverVersion: SV_INITIAL_STATE,
  isAtlasDeployed: IS_ATLAS_DEPLOYED_INITIAL_STATE,
  isReadonly: IS_READONLY_INITIAL_STATE
};

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
  allowWrites,
  dataService,
  namespace,
  env,
  serverVersion,
  name,
  isAtlasDeployed,
  isReadonly
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
    env: state.env,
    sourceName: state.sourceName,
    isAtlasDeployed: state.isAtlasDeployed,
    allowWrites: state.allowWrites,
    serverVersion: state.serverVersion,
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


export const NEW_PIPELINE = 'aggregations/NEW_PIPELINE';
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
  env: state.env,
  serverVersion: state.serverVersion,
  dataService: state.dataService,
  isAtlasDeployed: state.isAtlasDeployed,
  allowWrites: state.allowWrites
});


/**
 * The action to state modifier mappings.
 */
const MAPPINGS = {
  [NAMESPACE_CHANGED]: doNamespaceChanged,
  [NEW_PIPELINE]: createNewPipeline
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
 * The new pipeline action.
 *
 * @returns {Object} The action.
 */
export const newPipeline = () => ({
  type: NEW_PIPELINE
});
