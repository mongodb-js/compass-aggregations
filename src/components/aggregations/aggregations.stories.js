import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE as BASE_STATE } from 'modules';
import Aggregations from './aggregations';
import { configureStore } from 'utils/configureStore';

const EXAMPLE = {
  pipeline: [],
  fields: [],
  // { name: '_id', value: '_id', score: 1, meta: 'field', version: '0.0.0' },
  // { name: 'name', value: 'name', score: 1, meta: 'field', version: '0.0.0'}
  inputDocuments: {
    documents: [],
    isLoading: false,
    isExpanded: true,
    count: 0
  },
  savedPipeline: {
    isNameValid: true,
    pipelines: [],
    isListVisible: false,
    isModalVisible: false,
    isModalError: false
  }
};
/**
 * From Nathan's aggregation examples
 * @see https://gist.github.com/imlucas/5c92b6cfd46cba2a8bbb4a428c37c31b#file-aggregations-js-L31-L42
 */
// very simple aggregation to showcase $match with $count
const VERY_SIMPLE_EXAMPLE = {
  ...EXAMPLE,
  namespace: 'aggregations.solarSystem',
  pipeline: [
    {
      id: 0,
      stageOperator: '$match',
      stage: `{
  type: "Terrestrial planet"
}`,
      previewDocuments: []
    },
    {
      id: 1,
      stageOperator: '$count',
      stage: '"terrestrial planets"',
      previewDocuments: []
    }
  ]
};

// gathering stats when items are in an array using $project accumulators
const ARRAY_STATS_EXAMPLE = {
  ...EXAMPLE,
  namespace: 'aggregations.solarSystem',
  pipeline: [
    {
      id: 0,
      stageOperator: '$project',
      stage: `{
  _id: 0,
  average_cpi: {$avg: "$trends.icecream_cpi" },
  max_cpi: {$max: "$trends.icecream_cpi" },
  min_cpi: {$min: "$trends.icecream_cpi" },
  cpi_deviation: {$stdDevPop: "$trends.icecream_cpi" }
}`,
      previewDocuments: []
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
      id: 0,
      stageOperator: '$match',
      stage: `{
  cast: { $in: ['Tom Hanks', 'Daniel Day-Lewis'] }
}`,
      previewDocuments: []
    },
    {
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
};

// do I have schema problems?
// the following tells me if I have mistyped names or bad references for a lookup
const COMPLEX_EXAMPLE = {
  ...EXAMPLE,
  namespace: 'aggregations.air_alliances',
  pipeline: [
    {
      id: 0,
      stageOperator: '$lookup',
      stage: `{
  from: "air_airlines",
  let: { maybe_name: "$airlines" },
  pipeline: [
    {
      $match: {
        $expr: {
          $gt: [
            {
              $size: {
                $setIntersection: [
                  "$$maybe_name",
                  ["$name", "$alias", "$iata", "$icao"]
                ]
              }
            },
            0
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        name_is: "$name",
        ref_name: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$$maybe_name",
                cond: {
                  $in: ["$$this", ["$name", "$alias", "$iata", "$icao"]]
                }
              }
            },
            0
          ]
        }
      }
    }
  ],
  as: "found"
}
}`,
      previewDocuments: []
    },
    {
      id: 1,
      stageOperator: '$match',
      stage: `{
  $expr: {
    $ne: [{ $size: "$airlines" }, { $size: "$found" }]
  }
}`,
      previewDocuments: []
    },
    {
      id: 2,
      stageOperator: '$project',
      stage: `{
  _id: 0,
  name: 1,
  not_found: {
    $setDifference: ["$airlines", "$found.ref_name"]
  },
  needs_updating: {
    $filter: {
      input: "$found",
      cond: {
        $ne: ["$$this.name_is", "$$this.ref_name"]
      }
    }
  }
}`,
      previewDocuments: []
    }
  ]
};

storiesOf('Agg Plugin', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
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
  .add('Example: Very Simple', () => {
    const store = configureStore({
      ...BASE_STATE,
      ...VERY_SIMPLE_EXAMPLE
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
  });
