import React from 'react';
import { storiesOf } from '@storybook/react';

import { ComponentPreview } from '../../../.storybook/decorators';

import Pipeline from '.';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// import { withKnobs } from '@storybook/addon-knobs';
// text, boolean, number

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

// PropTypes.shape({
//   id: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired
// });

const STATS_PIPELINE = [
  {
    // TODO (@imlucas) Doc this shape/schema somewhere. Stage object.
    id: new Date().getTime(),
    stageOperator: '$project',
    stage: STATS_EXPR,
    isValid: true,
    isEnabled: true,
    isExpanded: true,
    isLoading: false,
    isComplete: true,
    previewDocuments: [],
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

// const RESTORE_PIPELINE = {
//   isModalVisible: false
// };
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
  // .addDecorator(withKnobs)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('default', () => {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Pipeline
          pipeline={STATS_PIPELINE}
          inputDocuments={STATS_DOCUMENTS}
          fields={FIELDS}
          savedPipeline={SAVED_PIPELINE}
          openLink={(url) => window.open(url)}
        />
      </DragDropContextProvider>
    );
  });
