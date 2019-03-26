export const PROJECTIONS_CHANGED =
  'aggregations/projections/PROJECTIONS_CHANGED';

export const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === PROJECTIONS_CHANGED) {
    return action.projections;
  }
  return state;
}

export const projectionsChanged = (value) => ({
  type: PROJECTIONS_CHANGED,
  projections: value
});
