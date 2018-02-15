const Nanoidb = require('nanoidb');
const BSON = require('bson');

// constants for save state modal
export const SAVED_PIPELINES_CLOSE = 'aggregations/saved-pipelines/CLOSE';
export const SAVED_PIPELINES_OPEN = 'aggregations/saved-pipelines/OPEN';

export const SAVE_STATE = 'aggregations/save-state';
export const SAVE_STATE_MODAL_OPEN = 'aggregations/save-state-modal-open';
export const SAVE_STATE_MODAL_CLOSE = 'aggregations/save-state-modal-close';
export const SAVE_ERROR_OPEN = 'aggregations/save-state-error-open';
export const SAVE_ERROR_CLOSE = 'aggregations/save-state-error-close';

// constants for indexeddb
export const SAVED_STATE_OBJECT_STORE = 'aggregation-pipeline-plugin-saved-state';
export const INDEXED_DB = 'aggregation-pipeline-plugin';

export const INITIAL_STATE = {
  pipelines: [],
  isVisible: false,
  isModalVisible: false,
  saveError: false
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === SAVED_PIPELINES_CLOSE) {
    return { ...state, isVisible: false };
  } else if (action.type === SAVED_PIPELINES_OPEN) {
    return { ...state, isVisible: true };
  } else if (action.type === SAVE_STATE_MODAL_OPEN) {
    return { ...state, isModalVisible: true };
  } else if (action.type === SAVE_STATE_MODAL_CLOSE) {
    return { ...state, isModalVisible: false };
  } else if (action.type === SAVE_ERROR_OPEN) {
    return { ...state, modalError: true };
  } else if (action.type === SAVE_ERROR_CLOSE) {
    return { ...state, modalError: false };
  }

  return state;
}

/**
 * Action creators for toggling actions in the save m0dal
 *
 * @returns {Object} The action.
 */
export const openSavedPipelines = () => ({
  type: SAVED_PIPELINES_OPEN
});

export const closeSavedPipelines = () => ({
  type: SAVED_PIPELINES_CLOSE
});

export const saveStateModalOpen = () => ({
  type: SAVE_STATE_MODAL_OPEN
});

export const saveStateModalClose = () => ({
  type: SAVE_STATE_MODAL_CLOSE
});

export const saveErrorClose = () => ({
  type: SAVE_ERROR_CLOSE
});

export const saveErrorOpen = () => ({
  type: SAVE_ERROR_OPEN
});

/**
 * Save the current state of your pipeline
 *
 * @returns {Object} The action.
 */
export const saveState = (pipelineName) => {
  return (dispatch, getState) => {
    const state = getState();

    const stateRecord = Object.assign({}
      , { inputDocuments: state.inputDocuments }
      , { savedPipelines: state.savedPipelines }
      , { namespace: state.namespace }
      , { stages: state.stages }
      , { view: state.view }
      , { pipelineName: pipelineName }
    );

    const db = Nanoidb(INDEXED_DB, 1);

    const ObjectID = BSON.ObjectID;
    const key = ObjectID(100).toHexString();

    db.on('upgrade', (diffData) => {
      diffData.db.createObjectStore(SAVED_STATE_OBJECT_STORE);
    });

    db.on('open', (stores) => {
      putOp(stores[SAVED_STATE_OBJECT_STORE]);

      function putOp(store) {
        store.put(key, stateRecord, (err) => {
          // how do we store/handle errors?
          if (err) return dispatch(saveErrorOpen(err));
          // how do we handle success messages
          // no error should do two things: call close modal action-creator and saved pipelines in open action creator
          dispatch(openSavedPipelines());
          dispatch(saveStateModalClose());
          // do a get request to indexeddb to get all the info
          // do a dispatch to write info to initial state's pipeline array
        });
      }
    });
  };
};
