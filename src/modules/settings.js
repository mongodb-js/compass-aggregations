const PREFIX = 'agreggations/settings';

export const TOGGLE_IS_EXPANDED = `${PREFIX}/TOGGLE_IS_EXPANDED`;

export const TOGGLE_COMMENT_MODE = `${PREFIX}/TOGGLE_COMMENT_MODE`;

export const SET_SAMPLE_SIZE = `${PREFIX}/SET_SAMPLE_SIZE`;

export const SET_MAX_TIMEOUT_MS = `${PREFIX}/SET_MAX_TIMEOUT_MS`;

export const INITIAL_STATE = {
  isExpanded: false,
  isCommentMode: true,
  sampleSize: 20,
  sampleSizeIsDefault: true,
  maxTimeoutMS: 5000,
  maxTimeoutMSIsDefault: true
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === TOGGLE_IS_EXPANDED) {
    return {
      ...state, 
      isExpanded: !state.isExpanded
    };
  }

  if (action.type === TOGGLE_COMMENT_MODE) {
    return {
      ...state,
      isCommentMode: !state.isCommentMode
    };
  }

  if (action.type === SET_SAMPLE_SIZE) {
    return {
      ...state,
      sampleSize: action.value,
      sampleSizeIsDefault: action.value === INITIAL_STATE.sampleSize
    };
  }
  if (action.type === SET_MAX_TIMEOUT_MS) {
    return {
      ...state,
      maxTimeoutMS: action.value,
      maxTimeoutMSIsDefault: action.value === INITIAL_STATE.maxTimeoutMSIsDefault
    };
  }
  return state;
}

export const toggleSettingsIsExpanded = () => ({
  type: TOGGLE_IS_EXPANDED
});

export const toggleSettingsCommentMode = () => ({
  type: TOGGLE_COMMENT_MODE
});

export const setSettingsSampleSize = (value) => ({
  type: SET_SAMPLE_SIZE,
  value: value
});

export const setSettingsMaxTimeoutMS = (value) => ({
  type: SET_MAX_TIMEOUT_MS,
  value: value
});
