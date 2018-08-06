import { generateStringStage } from 'modules/stage';

/**
 * Generate the pipeline for export to language.
 *
 * @param {Object} state - The state.
 *
 * @returns {Array} The raw pipeline.
 */
export const generatePipeline = (state) => {
  let pipeline = '[';
  state.pipeline.forEach((stage) => {
    if (stage.isEnabled && stage.stageOperator) {
      const executor = generateStringStage(stage);
      pipeline = pipeline + executor + ',';
    }
  });
  return pipeline + ']';
};

/**
 * Action creator for export to language events.
 *
 * @returns {Function} The export to language function.
 */
export const exportToLanguage = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.appRegistry) {
      state.appRegistry.emit('open-aggregation-export-to-language', generatePipeline(state));
    }
  };
};
