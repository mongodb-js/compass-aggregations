export const OVERVIEW_TOGGLED = 'aggregations/overview/OVERVIEW_TOGGLED';
export const OVERVIEW_STAGE_MODIFIED = 'aggregations/overview/STAGE_MODIFIED';
export const OVERVIEW_STAGE_ADDED = 'aggregations/overview/STAGE_ADDED';
export const OVERVIEW_STAGE_REMOVED = 'aggregations/overview/STAGE_REMOVED';

const getStageIndexByID = (stages, id) => {
  let index = -1;

  while ((++index < stages.length)) {
    if (stages[index].id === id) {
      return index;
    }
  }
  return index;
};

export const INITIAL_STATE = {
  isOn: false,
  hasAnyStagesExpanded: true,
  stages: []
};

const doStageOp = (state, action) => {
  if (!action.stage) {
    throw new TypeError('OVERVIEW_STAGE_MODIFIED requires an action with a stage prop.');
  }

  const stage = action.stage;

  if (!stage.id) {
    throw new TypeError('OVERVIEW_STAGE_MODIFIED requires action.stage with an id prop.');
  }

  if (!stage.isExpanded === undefined) {
    throw new TypeError('OVERVIEW_STAGE_MODIFIED requires action.stage with an isExpanded prop.');
  }

  const newState = Object.assign(state, {});
  const stageIndex = getStageIndexByID(newState.stages, stage.id);

  if (action.type !== OVERVIEW_STAGE_REMOVED) {
    const miniStage = {
      id: stage.id,
      isExpanded: stage.isExpanded
    };

    if (stageIndex === -1) {
      newState.stages.push(miniStage);
    } else {
      newState.stages[stageIndex] = miniStage;
    }
  } else {
    newState.stages.splice(stageIndex, 1);
  }

  newState.hasAnyStagesExpanded = newState.stages.any((s) => s.isExpanded);
  return newState;
};

/**
 * Reducer function for handle state changes to overview.
 *
 * @param {String} state - The name state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === OVERVIEW_TOGGLED) {
    return {
      ...state,
      isOn: !state.isOn
    };
  }

  if (action.type === OVERVIEW_STAGE_MODIFIED || action.type === OVERVIEW_STAGE_ADDED || action.type === OVERVIEW_STAGE_REMOVED ) {
    return doStageOp(state, action);
  }
  return state;
}

/**
 * Action creator for overview toggled events.
 *
 * @returns {Object} The name changed action.
 */
export const overviewToggled = () => {
  return { type: OVERVIEW_TOGGLED};
};

/**
 * Action creator for overview toggled events.
 *
 * @returns {Object} The name changed action.
 */
export const overviewStageModified = ( stage ) => {
  return { type: OVERVIEW_STAGE_MODIFIED, stage: stage };
};

/**
 * Action creator for overview toggled events.
 *
 * @returns {Object} The name changed action.
 */
export const overviewStageRemoved = (stage) => {
  return { type: OVERVIEW_STAGE_REMOVED, stage: stage };
};

/**
 * Action creator for overview toggled events.
 *
 * @returns {Object} The name changed action.
 */
export const overviewStageAdded = (stage) => {
  return { type: OVERVIEW_STAGE_ADDED, stage: stage };
};


