const PREFIX = 'aggregations/settings';

export const TOGGLE_IS_EXPANDED = `${PREFIX}/TOGGLE_IS_EXPANDED`;

export const TOGGLE_COMMENT_MODE = `${PREFIX}/TOGGLE_COMMENT_MODE`;

export const SET_SAMPLE_SIZE = `${PREFIX}/SET_SAMPLE_SIZE`;

export const SET_MAX_TIMEOUT_MS = `${PREFIX}/SET_MAX_TIMEOUT_MS`;

export const INITIAL_STATE = {
  isExpanded: false,
  isCommentMode: true,
  sampleSize: 20,
  maxTimeoutMS: 5000
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
      sampleSize: action.value
    };
  }
  if (action.type === SET_MAX_TIMEOUT_MS) {
    return {
      ...state,
      maxTimeoutMS: action.value
    };
  }
  return state;
}

export const toggleSettingsIsExpanded = () => ({
  type: TOGGLE_IS_EXPANDED
});

export const toggleSettingsIsCommentMode = () => ({
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
