import { action } from '@storybook/addon-actions';


const LOGGERS = {
  getPipelineFromIndexedDB: action('getPipelineFromIndexedDB'),
  savedPipelinesListToggle: action('savedPipelinesListToggle'),
  getSavedPipelines: action('getSavedPipelines'),
  toggleComments: action('toggleComments'),
  toggleSample: action('toggleSample'),
  toggleAutoPreview: action('toggleAutoPreview'),
  restorePipelineModalToggle: action('restorePipelineModalToggle'),
  restorePipelineFrom: action('restorePipelineFrom'),
  deletePipeline: action('deletePipeline'),
  stageAdded: action('stageAdded'),
  stageAddedAfter: action('stageAddedAfter'),
  stageChanged: action('stageChanged'),
  stageCollapseToggled: action('stageCollapseToggled'),
  stageDeleted: action('stageDeleted'),
  stageMoved: action('stageMoved'),
  stageOperatorSelected: action('stageOperatorSelected'),
  stageToggled: action('stageToggled'),
  saveCurrentPipeline: action('saveCurrentPipeline'),
  newPipeline: action('newPipeline'),
  newPipelineFromText: action('newPipelineFromText'),
  closeImport: action('closeImport'),
  clonePipeline: action('clonePipeline'),
  changeText: action('changeText'),
  createNew: action('createNew'),
  confirmNew: action('confirmNew'),
  runStage: action('runStage'),
  exportToLanguage: action('exportToLanguage'),
  nameChanged: action('nameChanged'),
  setIsModified: action('setIsModified'),
  collationChanged: action('collationChanged'),
  collationStringChanged: action('collationStringChanged'),
  openLink: action('openLink'),
  collationCollapseToggled: action('collationCollapseToggled'),
  toggleOverview: action('toggleOverview'),
  toggleSettingsIsExpanded: action('toggleSettingsIsExpanded'),
  toggleSettingsIsCommentMode: action('toggleSettingsIsCommentMode'),
  setSettingsSampleSize: action('setSettingsSampleSize'),
  setSettingsMaxTimeMS: action('setSettingsMaxTimeMS'),
  setSettingsLimit: action('setSettingsLimit'),
  applySettings: action('applySettings'),
  toggleFullscreen: action('toggleFullscreen'),
};

export default LOGGERS;