import parser from 'mongodb-query-parser';
import decomment from 'decomment';
import { parse } from 'mongodb-stage-validator';

/**
 * Generates an Object representing the stage to be passed to the DataService.
 *
 * @param {Object} state - The state of the stage.
 *
 * @returns {Object} The stage as an object.
 */
export function generateStage(state) {
  if (!state.isEnabled || !state.stageOperator || state.stage === '') {
    return {};
  }
  const stage = {};
  try {
    const decommented = decomment(state.stage);
    parse(`{${state.stageOperator}: ${decommented}}`);
    stage[state.stageOperator] = parser(decommented);
  } catch (e) {
    state.syntaxError = e.message;
    state.isValid = false;
    state.previewDocuments = [];
    return {};
  }

  /**
   * Now that its been validated, detect any projections
   * and bubble them up to `state`.
   */
  const projections = [];
  if (state.stageOperator === '$project') {
    const stageContents = stage[state.stageOperator];
    Object.keys(stageContents).map((k) => {
      const projection = stageContents[k];
      projections.push({
        name: k,
        value: JSON.stringify(projection)
      });
    });
  }

  state.projections = projections;
  state.isValid = true;
  state.syntaxError = null;
  return stage;
}

export function generateStageAsString(state) {
  if (!state.isEnabled || !state.stageOperator ||
    state.stage === '') {
    return '{}';
  }
  let stage;
  try {
    const decommented = decomment(state.stage);
    stage = `{${state.stageOperator}: ${decommented}}`;
    parse(stage); // Run the parser so we can error check
  } catch (e) {
    state.syntaxError = e.message;
    state.isValid = false;
    state.previewDocuments = [];
    return '{}';
  }
  
  state.isValid = true;
  state.syntaxError = null;
  return stage;
}
