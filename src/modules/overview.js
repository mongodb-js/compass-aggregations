export const TOGGLE_OVERVIEW = 'aggregations/TOGGLE_OVERVIEW';

export const INITIAL_STATE = false;

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === TOGGLE_OVERVIEW) {
    return !state;
  }
  return state;
}

/**
 * Action creator for comment toggling.
 *
 * @returns {Object} The toggle comments action.
 */
export const toggleOverview = () => ({
  type: TOGGLE_OVERVIEW
});
