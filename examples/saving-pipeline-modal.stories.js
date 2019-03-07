import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

// import { Provider } from 'react-redux';
// import { INITIAL_STATE } from 'modules';
// import { configureStore } from 'utils/configureStore';

import { action } from '@storybook/addon-actions';

const PROPS = {
  isOpen: true,
  isSaving: false,
  name: 'Joys Pipeline',
  savingPipelineCancel: action('savingPipelineCancel'),
  savingPipelineApply: action('savingPipelineApply'),
  savingPipelineNameChanged: action('savingPipelineNameChanged')
};

import SavingPipelineModal from 'components/saving-pipeline-modal';

storiesOf('<SavingPipelineModal>', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('Open+Name', () => {
    return (
      <SavingPipelineModal {...PROPS} />
    );
  });
