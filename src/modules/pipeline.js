import STAGE_OPERATORS from 'constants/stage-operators';
import generateStage from 'modules/stage';

/**
 * Action name prefix.
 */
const PREFIX = 'aggregations/pipeline';

/**
 * Stage added action name.
 */
export const STAGE_ADDED = `${PREFIX}/STAGE_ADDED`;

/**
 * Stage changed action name.
 */
export const STAGE_CHANGED = `${PREFIX}/STAGE_CHANGED`;

/**
 * Stage collapse toggled action name.
 */
export const STAGE_COLLAPSE_TOGGLED = `${PREFIX}/STAGE_COLLAPSE_TOGGLED`;

/**
 * Stage deleted action name.
 */
export const STAGE_DELETED = `${PREFIX}/STAGE_DELETED`;

/**
 * Stage moved action name.
 */
export const STAGE_MOVED = `${PREFIX}/STAGE_MOVED`;

/**
 * Stage operator selected action name.
 */
export const STAGE_OPERATOR_SELECTED = `${PREFIX}/STAGE_OPERATOR_SELECTED`;

/**
 * Stage toggled action name.
 */
export const STAGE_TOGGLED = `${PREFIX}/STAGE_TOGGLED`;

/**
 * An initial stage.
 */
const EMPTY_STAGE = {
  id: new Date().getTime(),
  stageOperator: null,
  stage: '',
  isValid: true,
  isEnabled: true,
  isExpanded: true
};

/**
 * The initial state.
 */
export const INITIAL_STATE = [ EMPTY_STAGE ];

/**
 * The default snippet.
 */
const DEFAULT_SNIPPET = '{\n  \n}';

/**
 * Copy the state.
 *
 * @param {Array} state - The current state.
 *
 * @returns {Array} The copied state.
 */
const copyState = (state) => (state.map(s => Object.assign({}, s)));

/**
 * Get a stage operator details from the provided operator name.
 *
 * @param {String} name - The stage operator name.
 *
 * @returns {Object} The stage operator details.
 */
const getStageOperator = (name) => {
  return STAGE_OPERATORS.find(op => op.name === name);
};

/**
 * Change stage value.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const changeStage = (state, action) => {
  const newState = copyState(state);
  newState[action.index].stage = action.stage;
  generateStage(newState[action.index]);
  return newState;
};

/**
 * Add a stage.
 *
 * @param {Object} state - The state.
 *
 * @returns {Object} The new state.
 */
const addStage = (state) => {
  const newState = copyState(state);
  const newStage = { ...EMPTY_STAGE };
  newStage.id = new Date().getTime();
  newState.push(newStage);
  return newState;
};

/**
 * Delete a stage.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const deleteStage = (state, action) => {
  const newState = copyState(state);
  newState.splice(action.index, 1);
  return newState;
};

/**
 * Move a stage in the pipeline.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const moveStage = (state, action) => {
  if (action.fromIndex === action.toIndex) return state;
  const newState = copyState(state);
  newState.splice(action.toIndex, 0, newState.splice(action.fromIndex, 1)[0]);
  return newState;
};

/**
 * Select a stage operator.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const selectStageOperator = (state, action) => {
  const operatorName = action.stageOperator;
  if (operatorName !== state[action.index].stageOperator) {
    const newState = copyState(state);
    const operatorDetails = getStageOperator(operatorName);
    const snippet = (operatorDetails || {}).snippet || DEFAULT_SNIPPET;
    newState[action.index].stageOperator = operatorName;
    newState[action.index].stage = snippet;
    newState[action.index].snippet = snippet;
    newState[action.index].isExpanded = true;
    return newState;
  }
  return state;
};

/**
 * Toggle if a stage is enabled.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const toggleStage = (state, action) => {
  const newState = copyState(state);
  newState[action.index].isEnabled = !newState[action.index].isEnabled;
  return newState;
};

/**
 * Toggle if a stage is collapsed.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const toggleStageCollapse = (state, action) => {
  const newState = copyState(state);
  newState[action.index].isExpanded = !newState[action.index].isExpanded;
  return newState;
};

/**
 * To not have a huge switch statement in the reducer.
 */
const MAPPINGS = {};

MAPPINGS[STAGE_CHANGED] = changeStage;
MAPPINGS[STAGE_ADDED] = addStage;
MAPPINGS[STAGE_DELETED] = deleteStage;
MAPPINGS[STAGE_MOVED] = moveStage;
MAPPINGS[STAGE_OPERATOR_SELECTED] = selectStageOperator;
MAPPINGS[STAGE_TOGGLED] = toggleStage;
MAPPINGS[STAGE_COLLAPSE_TOGGLED] = toggleStageCollapse;

Object.freeze(MAPPINGS);

/**
 * Reducer function for handle state changes to pipeline.
 *
 * @param {Array} state - The pipeline state.
 * @param {Object} action - The action.
 *
 * @returns {Array} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  const fn = MAPPINGS[action.type];
  return fn ? fn(state, action) : state;
}

/**
 * Action creator for adding a stage.
 *
 * @returns {Object} the stage added action.
 */
export const stageAdded = () => ({
  type: STAGE_ADDED
});

/**
 * Action creator for stage changed events.
 *
 * @param {String} value - The stage text value.
 * @param {Number} index - The index of the stage.
 *
 * @returns {Object} The stage changed action.
 */
export const stageChanged = (value, index) => ({
  type: STAGE_CHANGED,
  index: index,
  stage: value
});

/**
 * Action creator for toggling whether the stage is collapsed.
 *
 * @param {Number} index - The index of the stage.
 *
 * @returns {Object} The stage collapse toggled action.
 */
export const stageCollapseToggled = (index) => ({
  type: STAGE_COLLAPSE_TOGGLED,
  index: index
});

/**
 * Action creator for stage deleted events.
 *
 * @param {Number} index - The index of the stage.
 *
 * @returns {Object} The stage deleted action.
 */
export const stageDeleted = (index) => ({
  type: STAGE_DELETED,
  index: index
});

/**
 * Action creator for stage moved events.
 *
 * @param {Number} fromIndex - The original index.
 * @param {Number} toIndex - The index to move to.
 *
 * @returns {Object} The stage moved action.
 */
export const stageMoved = (fromIndex, toIndex) => ({
  type: STAGE_MOVED,
  fromIndex: fromIndex,
  toIndex: toIndex
});

/**
 * Action creator for stage operator selected events.
 *
 * @param {Number} index - The index of the stage.
 * @param {String} operator - The stage operator.
 *
 * @returns {Object} The stage operator selected action.
 */
export const stageOperatorSelected = (index, operator) => ({
  type: STAGE_OPERATOR_SELECTED,
  index: index,
  stageOperator: operator
});

/**
 * Handles toggling a stage on/off.
 *
 * @param {Number} index - The stage index.
 *
 * @returns {Object} The stage toggled action.
 */
export const stageToggled = (index) => ({
  type: STAGE_TOGGLED,
  index: index
});
