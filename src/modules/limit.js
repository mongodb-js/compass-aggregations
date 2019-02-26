export const LIMIT_CHANGED = 'aggregations/limit/LIMIT_CHANGED';

export const INITIAL_STATE = 20;

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === LIMIT_CHANGED) {
    return action.limit;
  }
  return state;
}

export const limitChanged = limit => ({
  type: LIMIT_CHANGED,
  limit: limit
});
