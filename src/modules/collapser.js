/**
 * Collapsed changed action.
 */
export const COLLAPSE_CHANGED = 'aggregations/collapser/COLLAPSE_CHANGED';

/**
 * The initial state.
 */
export const INITIAL_STATE = false;

/**
 * Reducer function for handle state changes to collapser.
 *
 * @param {String} state - The name state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === COLLAPSE_CHANGED) {
    return action.name;
  }
  return state;
}

/**
 * Action creator for collapse changed events.
 *
 * @param {String} isCollapsed - The isCollapsed value.
 *
 * @returns {Object} The name changed action.
 */
export const collapseChanged = isCollapsed => ({
  type: COLLAPSE_CHANGED, isCollapsed
});
