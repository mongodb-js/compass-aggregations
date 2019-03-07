export const SAVING_PIPELINE_NAME_CHANGED = 'aggregations/saving-pipeline/NAME_CHANGED';

export const SAVING_PIPELINE_APPLY_NAME = 'aggregations/saving-pipeline/APPLY_NAME';

export const SAVING_PIPELINE_CANCEL = 'aggregations/saving-pipeline/CANCEL';

export const SAVING_PIPELINE_OPEN = 'aggregations/saving-pipeline/OPEN';

/**
 * The initial state.
 */
export const INITIAL_STATE = {
  isOpen: true,
  name: '',
  isSaving: false
};

/**
 * Reducer function for handle state changes to name in the save pipeline modal.
 *
 * @param {String} state - The name state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === SAVING_PIPELINE_NAME_CHANGED) {
    return {
      ...state,
      name: action.name
    };
  }

    if (action.type === SAVING_PIPELINE_OPEN) {
      return {
        ...state,
        isOpen: true
      };
    }

  if (action.type === SAVING_PIPELINE_CANCEL) {
    return {
      ...state,
      name: '',
      isOpen: false
    };
  }
  return state;
}

/**
 * Action creator for name changed events.
 *
 * @param {String} name - The name value.
 *
 * @returns {Object} The name changed action.
 */
export const savingPipelineNameChanged = (name) => ({
  type: SAVING_PIPELINE_NAME_CHANGED,
  name: name
});


/**
 * Action creator for apply name events handled in root reducer.
 *
 * @param {String} name - The name value.
 * @returns {Object} The apply name action.
 */
export const savingPipelineApplyName = () => ({
  type: SAVING_PIPELINE_APPLY_NAME
});

/**
 * Action creator for cancel events.
 * @returns {Object} The name changed action.
 */
export const savingPipelineCancel = () => ({
  type: SAVING_PIPELINE_CANCEL
});

/**
 * Action creator for cancel events.
 * @returns {Object} The name changed action.
 */
export const savingPipelineOpen = () => ({
  type: SAVING_PIPELINE_OPEN
});
