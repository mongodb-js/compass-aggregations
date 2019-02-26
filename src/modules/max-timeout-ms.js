export const MAX_TIMEOUT_MS_CHANGED =
  'aggregations/max-timeout-ms/MAX_TIMEOUT_MS_CHANGED';

export const INITIAL_STATE = 5000;

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === MAX_TIMEOUT_MS_CHANGED) {
    return action.maxTimeMS;
  }
  return state;
}

export const maxTimeMSChanged = value => ({
  type: MAX_TIMEOUT_MS_CHANGED,
  maxTimeMS: value
});
