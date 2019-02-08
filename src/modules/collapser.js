/**
 * Collapsed changed action.
 */
export const COLLAPSE_TOGGLED = 'aggregations/collapser/COLLAPSE_TOGGLED';

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
  if (action.type === COLLAPSE_TOGGLED) {
    return !state;
  }
  return state;
}

/**
 * Action creator for collapse toggled events.
 *
 * @returns {Object} The name changed action.
 */
export const collapseToggled = () => {
  return {type: COLLAPSE_TOGGLED};
};
