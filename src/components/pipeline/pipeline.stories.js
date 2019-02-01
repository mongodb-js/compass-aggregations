import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ComponentPreview } from '../../../.storybook/decorators';

import Pipeline from '.';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

/**
 * From Nathan's aggregation examples
 * @see https://gist.github.com/imlucas/5c92b6cfd46cba2a8bbb4a428c37c31b#file-aggregations-js-L31-L42
 */
const STATS_EXPR = `{
    _id: 0,
    average_cpi: {$avg: "$trends.icecream_cpi" },
    max_cpi: {$max: "$trends.icecream_cpi" },
    min_cpi: {$min: "$trends.icecream_cpi" },
    cpi_deviation: {$stdDevPop: "$trends.icecream_cpi" }
}`;
const STATS_PIPELINE = [
  {
    id: new Date().getTime(),
    stageOperator: '$project',
    stage: STATS_EXPR,
    isValid: true,
    isEnabled: true,
    isExpanded: true,
    isLoading: false,
    isComplete: true,
    previewDocuments: {
      documents: [],
      isLoading: false,
      isExpanded: true,
      count: 0
    },
    snippet: 'TODO',
    error: '',
    syntaxError: '',
    fromStageOperators: false
  }
];

const STATS_DOCUMENTS = {
  documents: [],
  isLoading: false,
  isExpanded: true,
  count: 0
};

const FIELDS = [];

const RESTORE_PIPELINE = {
  isModalVisible: false
};
const SAVED_PIPELINE = {
  isNameValid: true,
  pipelines: [],
  isListVisible: false,
  isModalVisible: false,
  isModalError: false
};

// stageOperatorSelected={action('stageOperatorSelected')}
// stageAddedAfter={action('onStageAddedAfter')}
// stageToggled={action('onStageToggled')}
// runStage={action('runStage')}
// stageAddedAfter={action('stageAddedAfter')}
// stageDeleted={action('stageDeleted')}
// setIsModified={action('setIsModified')}
// openLink={action('openLink')}
// stageCollapseToggled={action('stageCollapseToggled')}

storiesOf('Pipeline', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('default', () => {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Pipeline
          name="my pipeline"
          pipeline={STATS_PIPELINE}
          isExpanded={boolean('Expanded', true)}
          isEnabled={boolean('Enabled', true)}
          isValid={boolean('Valid', true)}
          serverVersion={text('Server Version', '4.0.0')}
          isCommenting={boolean('isCommenting', true)}
          previewCount={number('Preview Count', 100)}
          inputDocuments={STATS_DOCUMENTS}
          fields={FIELDS}
          restorePipeline={RESTORE_PIPELINE}
          savedPipeline={SAVED_PIPELINE}
          collationString="{locale: 'simple'}"
          isLoading
          isModified
          isCommenting
          isSampling
          isAutoPreviewing
          openLink={action('openLink')}
        />
      </DragDropContextProvider>
    );
  });
