import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ComponentPreview } from '../../../.storybook/decorators';

import StageToolbar from '.';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('StageToolbar', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('default', () => {
    return (
      <StageToolbar
        stage="huh"
        isExpanded={boolean('Expanded', true)}
        isEnabled={boolean('Enabled', true)}
        isValid={boolean('Valid', true)}
        index={1}
        serverVersion={text('Server Version', '4.0.0')}
        stageOperatorSelected={action('stageOperatorSelected')}
        stageAddedAfter={action('onStageAddedAfter')}
        stageToggled={action('onStageToggled')}
        runStage={action('runStage')}
        stageAddedAfter={action('stageAddedAfter')}
        stageDeleted={action('stageDeleted')}
        setIsModified={action('setIsModified')}
        isCommenting={boolean('isCommenting', true)}
        openLink={action('openLink')}
        stageCollapseToggled={action('stageCollapseToggled')}
        previewCount={number('Preview Count', 100)}
        error={text('Error Message', '')}
      />
    );
  });
