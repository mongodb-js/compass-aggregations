const BSON = require('bson');

const PREFIX = 'aggregations/saved-pipeline';

// constants for save state modal
export const SAVED_PIPELINES_LIST_TOGGLED = `${PREFIX}/LIST_TOGGLED`;
export const SAVE_PIPELINE_MODAL_TOGGLED = `${PREFIX}/MODAL_TOGGLED`;
export const SAVE_MODAL_ERROR_TOGGLED = `${PREFIX}/ERROR_TOGGLED`;

export const SAVED_PIPELINE_ADD = `${PREFIX}/ADD`;

// constants for indexeddb
export const INDEXED_DB = 'compass-aggregations';
export const PIPELINES = 'pipelines';

export const INITIAL_STATE = {
  pipelines: [],
  isLoaded: false,
  isListVisible: false,
  isModalVisible: false,
  isModalError: false
};

const copyState = (state) => Object.assign({}, state);

const toggleSavedPipelinesList = (state, action) => {
  const newState = copyState(state);
  newState.isListVisible = !!action.index;
  return newState;
};

const toggleSavePipelineModal = (state, action) => {
  const newState = copyState(state);
  newState.isModalVisible = !!action.index;
  return newState;
};

const toggleSaveModalError = (state, action) => {
  const newState = copyState(state);
  newState.isModalError = !!action.index;
  return newState;
};

const addSavedPipeline = (state, action) => {
  return { ...state, pipelines: action.pipelines, isLoaded: true };
};

const MAPPINGS = {};

MAPPINGS[SAVED_PIPELINES_LIST_TOGGLED] = toggleSavedPipelinesList;
MAPPINGS[SAVE_PIPELINE_MODAL_TOGGLED] = toggleSavePipelineModal;
MAPPINGS[SAVE_MODAL_ERROR_TOGGLED] = toggleSaveModalError;
MAPPINGS[SAVED_PIPELINE_ADD] = addSavedPipeline;

export default function reducer(state = INITIAL_STATE, action) {
  const fn = MAPPINGS[action.type];
  return fn ? fn(state, action) : state;
}

/**
 * Action creators for toggling actions in the save m0dal
 *
 * @returns {Object} The action.
 */
export const savedPipelinesListToggle = (index) => ({
  type: SAVED_PIPELINES_LIST_TOGGLED,
  index: index
});

export const savePipelineModalToggle = (index) => ({
  type: SAVE_PIPELINE_MODAL_TOGGLED,
  index: index
});

export const saveModalErrorToggle = (index, err) => ({
  type: SAVE_MODAL_ERROR_TOGGLED,
  index: index,
  error: err
});

export const savedPipelineAdd = (pipelines) => ({
  type: SAVED_PIPELINE_ADD,
  pipelines: pipelines
});

export const upgradeDb = (db) => {
  const store = db.createObjectStore(PIPELINES);
  store.createIndex('namespace', 'namespace', { unique: false });
};

export const getSavedPipelines = () => {
  return (dispatch, getState) => {
    if (!getState().savedPipeline.isLoaded) {
      dispatch(updatePipelineList());
    }
  };
};

export const updatePipelineList = () => {
  return (dispatch, getState) => {
    const state = getState();

    const request = window.indexedDB.open(INDEXED_DB, 1);
    request.onsuccess = (evt) => {
      const db = evt.target.result;
      const transaction = db.transaction(PIPELINES, 'readonly');
      const objectStore = transaction.objectStore(PIPELINES);
      const index = objectStore.index('namespace');
      index.getAll(state.namespace).onsuccess = (e) => {
        const pipelines = e.target.result;
        dispatch(savedPipelineAdd(pipelines));
      };
    };

    request.onupgradeneeded = (evt) => {
      upgradeDb(evt.target.result);
    };
  };
};

/**
 * Save the current state of your pipeline
 *
 * @returns {Object} The action.
 */
export const saveCurrentPipeline = (pipelineName) => {
  return (dispatch, getState) => {
    const state = getState();
    // don't want the modal that triggers this save to show up when the user
    // restores the pipeline o/
    state.savedPipeline.isModalVisible = false;
    const request = window.indexedDB.open(INDEXED_DB, 1);
    const id = state.id || BSON.ObjectID(100).toHexString();

    const stateRecord = Object.assign({}
      , { namespace: state.namespace }
      , { pipeline: state.pipeline }
      , { view: state.view }
      , { pipelineName: pipelineName }
      , { id: id }
    );

    request.onsuccess = (evt) => {
      const db = evt.target.result;
      const transaction = db.transaction(PIPELINES, 'readwrite');
      const objectStore = transaction.objectStore(PIPELINES);
      const putRequest = objectStore.put(stateRecord, id);

      putRequest.onsuccess = () => {
        dispatch(savedPipelinesListToggle(1));
        dispatch(savePipelineModalToggle(0));
        dispatch(updatePipelineList());
      };

      putRequest.onerror = (error) => {
        dispatch(saveModalErrorToggle(1, error));
      };
    };

    request.onupgradeneeded = (evt) => {
      upgradeDb(evt.target.result);
    };
  };
};