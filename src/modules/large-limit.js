export const LARGE_LIMIT_CHANGED =
  'aggregations/large-limit/LARGE_LIMIT_CHANGED';

export const INITIAL_STATE = 1000;

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === LARGE_LIMIT_CHANGED) {
    return action.largeLimit;
  }
  return state;
}

export const largeLimitChanged = value => ({
  type: LARGE_LIMIT_CHANGED,
  largeLimit: value
});
