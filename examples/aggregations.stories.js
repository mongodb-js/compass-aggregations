import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE } from 'modules';
import Aggregations from 'components/aggregations';
import { configureStore } from 'utils/configureStore';

import BASIC_EXAMPLE from './example-basic.js';
import COMPLEX_EXAMPLE from './example-complex.js';

const BASE_STATE = {
  ...INITIAL_STATE
};

import {
  INITIAL_INPUT_DOCUMENTS,
  EXAMPLE,
  STAGE_DEFAULTS
} from './example-constants.js';

// gathering stats when items are in an array using $project accumulators
const ARRAY_STATS_EXAMPLE = {
  ...EXAMPLE,
  namespace: 'aggregations.icecream_data',
  pipeline: [
    {
      ...STAGE_DEFAULTS,
      id: 0,
      stageOperator: '$project',
      stage: `{
  _id: 0,
  average_cpi: {$avg: "$trends.icecream_cpi" },
  max_cpi: {$max: "$trends.icecream_cpi" },
  min_cpi: {$min: "$trends.icecream_cpi" },
  cpi_deviation: {$stdDevPop: "$trends.icecream_cpi" }
}`,
    }
  ]
};

// gathering metacritic info for movies that have Tom Hanks or Daniel Day-Lewis
// as cast members
const GROUPED_STATS_EXAMPLE = {
  ...EXAMPLE,
  namespace: 'aggregations.movies',
  pipeline: [
    {
      ...STAGE_DEFAULTS,
      id: 0,
      stageOperator: '$match',
      stage: `{
  cast: { $in: ['Tom Hanks', 'Daniel Day-Lewis'] }
}`,
      previewDocuments: []
    },
    {
      ...STAGE_DEFAULTS,
      id: 1,
      stageOperator: '$group',
      stage: `{
  _id: 0,
  average_rating: { $avg: '$metacritic' },
  films_counted: { $sum: 1 },
  min_rating: { $min: '$metacritic' },
  max_rating: { $max: '$metacritic' }
}`,
      previewDocuments: []
    }
  ]
BASE_STATE.dataService.dataService = {
  aggregate: () => {}
};

storiesOf('<Aggregations>', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('Example: Basic', () => {
    const store = configureStore({
      ...BASE_STATE,
      ...BASIC_EXAMPLE
    });
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  })
  .add('Example: Very Complex', () => {
    const store = configureStore({
      ...BASE_STATE,
      ...COMPLEX_EXAMPLE
    });
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  })
  .add('Example: Array Stats', () => {
    const store = configureStore({
      ...BASE_STATE,
      ...ARRAY_STATS_EXAMPLE
    });
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  })
  .add('Example: Grouped Stats', () => {
    const store = configureStore({
      ...BASE_STATE,
      ...GROUPED_STATS_EXAMPLE
    });
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  })
  .add('Default', () => {
    const store = configureStore(BASE_STATE);
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  })
  .add('Fullscreen > On', () => {
    const store = configureStore({
      ...BASE_STATE,
      isFullscreenOn: true
    });
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  })
  .add('Settings > Open', () => {
    const state = {
      ...BASE_STATE
    };

    state.settings.isExpanded = true;

    const store = configureStore(state);
    return (
      <Provider store={store}>
        <Aggregations />
      </Provider>
    );
  });
