const Nanoidb = require('nanoidb');
const BSON = require('bson');

const PREFIX = 'aggregations/saved-pipeline';

// constants for save state modal
export const SAVED_PIPELINES_LIST_TOGGLED = `${PREFIX}/LIST_TOGGLED`;
export const SAVE_PIPELINE_MODAL_TOGGLED = `${PREFIX}/MODAL_TOGGLED`;
export const SAVE_MODAL_ERROR_TOGGLED = `${PREFIX}/ERROR_TOGGLED`;

export const SAVED_PIPELINE_ADD = `${PREFIX}/ADD`;

// constants for indexeddb
export const INDEXED_DB = 'aggregation-pipeline-plugin';

export const INITIAL_STATE = {
  pipelines: [],
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
  return { ...state, pipelines: action.pipelines };
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

export const getSavedPipelines = () => {
  return (dispatch, getState) => {
    const db = Nanoidb(INDEXED_DB, 1);
    const state = getState();
    const objectStore = state.namespace;

    db.on('upgrade', (diffData) => {
      diffData.db.createObjectStore(objectStore);
    });

    db.on('open', (stores) => {
      // check if the object store for this namespace exists
      if (!stores[objectStore]) return;
      getAllOp(stores[objectStore]);

      function getAllOp(store) {
        store.getAll((err, results) => {
          if (err) console.log(err);

          const pipelines = [];
          if (!Array.isArray(results)) return dispatch(savedPipelineAdd(pipelines));

          results.forEach((result) => {
            const pipeline = {
              recordKey: result.recordKey,
              pipelineName: result.pipelineName
            };
            pipelines.push(pipeline);
          });

          dispatch(savedPipelineAdd(pipelines));
        });
      }
    });
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
    const ver = 1;

    const db = Nanoidb(INDEXED_DB, ver);

    const ObjectID = BSON.ObjectID;
    const key = ObjectID(100).toHexString();
    const objectStore = state.namespace;

    const stateRecord = Object.assign({}
      , { inputDocuments: state.inputDocuments }
      , { savedPipeline: state.savedPipeline }
      , { namespace: state.namespace }
      , { stages: state.stages }
      , { view: state.view }
      , { pipelineName: pipelineName }
      , { recordKey: key }
    );

    db.on('upgrade', (diffData) => {
      diffData.db.createObjectStore(objectStore);
    });

    db.on('open', (stores) => {
      // if the current object store doesnt exist, create a new one to create a
      // new object store indexeddb needs to trigger an update event
      // the below, however, goes into an infinite loop since the the upgrade event never gets resolved
      // if (!stores[objectStore]) db.upgrade(ver + 1);

      putOp(stores[objectStore]);

      function putOp(store) {
        store.put(key, stateRecord, (err) => {
          if (err) return dispatch(saveModalErrorToggle(1, err));
          dispatch(savedPipelinesListToggle(1));
          dispatch(savePipelineModalToggle(0));
          dispatch(getSavedPipelines());
        });
      }
    });
  };
};
