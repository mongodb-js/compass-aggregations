import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ComponentPreview } from '../../../.storybook/decorators';

import Stage from '.';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('Stage', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('default', () => {
    const icecream = `{
    $project: {
        _id: 0,
        average_cpi: {$avg: "$trends.icecream_cpi" },
        max_cpi: {$max: "$trends.icecream_cpi" },
        min_cpi: {$min: "$trends.icecream_cpi" },
        cpi_deviation: {$stdDevPop: "$trends.icecream_cpi" }
    }
}`;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Stage
                stage={icecream}
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
          previewDocuments={[]}
          fields={[]}
          isLoading={false}
        />
      </DragDropContextProvider>
    );
  });
