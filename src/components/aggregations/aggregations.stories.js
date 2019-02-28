import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE as BASE_STATE } from 'modules';
import Aggregations from './aggregations';
import { configureStore } from 'utils/configureStore';

const INITIAL_INPUT_DOCUMENTS = {
  documents: [],
  isLoading: false,
  isExpanded: true,
  count: 0
};

const EXAMPLE = {
  pipeline: [],
  fields: [],
  // { name: '_id', value: '_id', score: 1, meta: 'field', version: '0.0.0' },
  // { name: 'name', value: 'name', score: 1, meta: 'field', version: '0.0.0'}
  inputDocuments: {
    ...INITIAL_INPUT_DOCUMENTS
  },
  savedPipeline: {
    isNameValid: true,
    pipelines: [],
    isListVisible: false,
    isModalVisible: false,
    isModalError: false
  }
};

const STAGE_DEFAULTS = {
  previewDocuments: [],
  isExpanded: true,
  error: null,
  syntaxError: '',
  isValid: true,
  isEnabled: true,
  isLoading: false,
  isComplete: true
};

import { ObjectId } from 'bson';

const SOLAR_SYSTEM_DOCUMENTS = [
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d54'),
    name: 'Earth',
    type: 'Terrestrial planet',
    orderFromSun: 3,
    radius: { value: 6378.137, units: 'km' },
    mass: { value: 5.9723e24, units: 'kg' },
    sma: { value: 149600000, units: 'km' },
    orbitalPeriod: { value: 1, units: 'years' },
    eccentricity: 0.0167,
    meanOrbitalVelocity: { value: 29.78, units: 'km/sec' },
    rotationPeriod: { value: 1, units: 'days' },
    inclinationOfAxis: { value: 23.45, units: 'degrees' },
    meanTemperature: 15,
    gravity: { value: 9.8, units: 'm/s^2' },
    escapeVelocity: { value: 11.18, units: 'km/sec' },
    meanDensity: 5.52,
    atmosphericComposition: 'N2+O2',
    numberOfMoons: 1,
    hasRings: false,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d59'),
    name: 'Neptune',
    type: 'Gas giant',
    orderFromSun: 8,
    radius: { value: 24765, units: 'km' },
    mass: { value: 1.02413e26, units: 'kg' },
    sma: { value: 4495060000, units: 'km' },
    orbitalPeriod: { value: 164.79, units: 'years' },
    eccentricity: 0.0113,
    meanOrbitalVelocity: { value: 5.43, units: 'km/sec' },
    rotationPeriod: { value: 0.72, units: 'days' },
    inclinationOfAxis: { value: 28.8, units: 'degrees' },
    meanTemperature: -210,
    gravity: { value: 11.15, units: 'm/s^2' },
    escapeVelocity: { value: 23.5, units: 'km/sec' },
    meanDensity: 1.638,
    atmosphericComposition: 'H2+He',
    numberOfMoons: 14,
    hasRings: true,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d58'),
    name: 'Uranus',
    type: 'Gas giant',
    orderFromSun: 7,
    radius: { value: 25559, units: 'km' },
    mass: { value: 8.6813e25, units: 'kg' },
    sma: { value: 2872460000, units: 'km' },
    orbitalPeriod: { value: 84.01, units: 'years' },
    eccentricity: 0.0457,
    meanOrbitalVelocity: { value: 6.8, units: 'km/sec' },
    rotationPeriod: { value: 0.72, units: 'days' },
    inclinationOfAxis: { value: 97.77, units: 'degrees' },
    meanTemperature: -200,
    gravity: { value: 8.87, units: 'm/s^2' },
    escapeVelocity: { value: 21.3, units: 'km/sec' },
    meanDensity: 1.271,
    atmosphericComposition: 'H2+He',
    numberOfMoons: 27,
    hasRings: true,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d57'),
    name: 'Saturn',
    type: 'Gas giant',
    orderFromSun: 6,
    radius: { value: 60268, units: 'km' },
    mass: { value: 5.6834e26, units: 'kg' },
    sma: { value: 1433530000, units: 'km' },
    orbitalPeriod: { value: 29.457, units: 'years' },
    eccentricity: 0.0566,
    meanOrbitalVelocity: { value: 9.68, units: 'km/sec' },
    rotationPeriod: { value: 0.445, units: 'days' },
    inclinationOfAxis: { value: 26.73, units: 'degrees' },
    meanTemperature: -170,
    gravity: { value: 10.44, units: 'm/s^2' },
    escapeVelocity: { value: 35.5, units: 'km/sec' },
    meanDensity: 0.687,
    atmosphericComposition: 'H2+He',
    numberOfMoons: 62,
    hasRings: true,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d56'),
    name: 'Jupiter',
    type: 'Gas giant',
    orderFromSun: 5,
    radius: { value: 71492, units: 'km' },
    mass: { value: 1.89819e27, units: 'kg' },
    sma: { value: 778570000, units: 'km' },
    orbitalPeriod: { value: 11.86, units: 'years' },
    eccentricity: 0.0489,
    meanOrbitalVelocity: { value: 13.06, units: 'km/sec' },
    rotationPeriod: { value: 0.41, units: 'days' },
    inclinationOfAxis: { value: 3.08, units: 'degrees' },
    meanTemperature: -150,
    gravity: { value: 24.79, units: 'm/s^2' },
    escapeVelocity: { value: 59.5, units: 'km/sec' },
    meanDensity: 1.33,
    atmosphericComposition: 'H2+He',
    numberOfMoons: 67,
    hasRings: true,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d53'),
    name: 'Venus',
    type: 'Terrestrial planet',
    orderFromSun: 2,
    radius: { value: 6051.8, units: 'km' },
    mass: { value: 4.8675e24, units: 'kg' },
    sma: { value: 108210000, units: 'km' },
    orbitalPeriod: { value: 0.615, units: 'years' },
    eccentricity: 0.0067,
    meanOrbitalVelocity: { value: 35.02, units: 'km/sec' },
    rotationPeriod: { value: 243.69, units: 'days' },
    inclinationOfAxis: { value: 177.36, units: 'degrees' },
    meanTemperature: 465,
    gravity: { value: 8.87, units: 'm/s^2' },
    escapeVelocity: { value: 10.36, units: 'km/sec' },
    meanDensity: 5.25,
    atmosphericComposition: 'CO2',
    numberOfMoons: 0,
    hasRings: false,
    hasMagneticField: false
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d52'),
    name: 'Mercury',
    type: 'Terrestrial planet',
    orderFromSun: 1,
    radius: { value: 4879, units: 'km' },
    mass: { value: 3.3e23, units: 'kg' },
    sma: { value: 57910000, units: 'km' },
    orbitalPeriod: { value: 0.24, units: 'years' },
    eccentricity: 0.2056,
    meanOrbitalVelocity: { value: 47.36, units: 'km/sec' },
    rotationPeriod: { value: 58.65, units: 'days' },
    inclinationOfAxis: { value: 0, units: 'degrees' },
    meanTemperature: 125,
    gravity: { value: 3.24, units: 'm/s^2' },
    escapeVelocity: { value: 4.25, units: 'km/sec' },
    meanDensity: 5.43,
    atmosphericComposition: '',
    numberOfMoons: 0,
    hasRings: false,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d51'),
    name: 'Sun',
    type: 'Star',
    orderFromSun: 0,
    radius: { value: 695700, units: 'km' },
    mass: { value: 1.9885e30, units: 'kg' },
    sma: { value: 0, units: 'km' },
    orbitalPeriod: { value: 0, units: 'years' },
    eccentricity: 0,
    meanOrbitalVelocity: { value: 0, units: 'km/sec' },
    rotationPeriod: { value: 25.449, units: 'days' },
    inclinationOfAxis: { value: 7.25, units: 'degrees' },
    meanTemperature: 5600,
    gravity: { value: 274, units: 'm/s^2' },
    escapeVelocity: { value: 617.7, units: 'km/sec' },
    meanDensity: 1.4,
    atmosphericComposition: 'H2+He',
    numberOfMoons: 0,
    hasRings: false,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d55'),
    name: 'Mars',
    type: 'Terrestrial planet',
    orderFromSun: 4,
    radius: { value: 3396.2, units: 'km' },
    mass: { value: 6.4171e23, units: 'kg' },
    sma: { value: 227920000, units: 'km' },
    orbitalPeriod: { value: 1.881, units: 'years' },
    eccentricity: 0.0935,
    meanOrbitalVelocity: { value: 24.07, units: 'km/sec' },
    rotationPeriod: { value: 1.029, units: 'days' },
    inclinationOfAxis: { value: 25.19, units: 'degrees' },
    meanTemperature: -53,
    gravity: { value: 3.71, units: 'm/s^2' },
    escapeVelocity: { value: 5.03, units: 'km/sec' },
    meanDensity: 3.93,
    atmosphericComposition: 'CO2',
    numberOfMoons: 2,
    hasRings: false,
    hasMagneticField: false
  }
];

const MATCHING_SOLAR_SYSTEM_DOCUMENTS = [
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d54'),
    name: 'Earth',
    type: 'Terrestrial planet',
    orderFromSun: 3,
    radius: { value: 6378.137, units: 'km' },
    mass: { value: 5.9723e24, units: 'kg' },
    sma: { value: 149600000, units: 'km' },
    orbitalPeriod: { value: 1, units: 'years' },
    eccentricity: 0.0167,
    meanOrbitalVelocity: { value: 29.78, units: 'km/sec' },
    rotationPeriod: { value: 1, units: 'days' },
    inclinationOfAxis: { value: 23.45, units: 'degrees' },
    meanTemperature: 15,
    gravity: { value: 9.8, units: 'm/s^2' },
    escapeVelocity: { value: 11.18, units: 'km/sec' },
    meanDensity: 5.52,
    atmosphericComposition: 'N2+O2',
    numberOfMoons: 1,
    hasRings: false,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d53'),
    name: 'Venus',
    type: 'Terrestrial planet',
    orderFromSun: 2,
    radius: { value: 6051.8, units: 'km' },
    mass: { value: 4.8675e24, units: 'kg' },
    sma: { value: 108210000, units: 'km' },
    orbitalPeriod: { value: 0.615, units: 'years' },
    eccentricity: 0.0067,
    meanOrbitalVelocity: { value: 35.02, units: 'km/sec' },
    rotationPeriod: { value: 243.69, units: 'days' },
    inclinationOfAxis: { value: 177.36, units: 'degrees' },
    meanTemperature: 465,
    gravity: { value: 8.87, units: 'm/s^2' },
    escapeVelocity: { value: 10.36, units: 'km/sec' },
    meanDensity: 5.25,
    atmosphericComposition: 'CO2',
    numberOfMoons: 0,
    hasRings: false,
    hasMagneticField: false
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d52'),
    name: 'Mercury',
    type: 'Terrestrial planet',
    orderFromSun: 1,
    radius: { value: 4879, units: 'km' },
    mass: { value: 3.3e23, units: 'kg' },
    sma: { value: 57910000, units: 'km' },
    orbitalPeriod: { value: 0.24, units: 'years' },
    eccentricity: 0.2056,
    meanOrbitalVelocity: { value: 47.36, units: 'km/sec' },
    rotationPeriod: { value: 58.65, units: 'days' },
    inclinationOfAxis: { value: 0, units: 'degrees' },
    meanTemperature: 125,
    gravity: { value: 3.24, units: 'm/s^2' },
    escapeVelocity: { value: 4.25, units: 'km/sec' },
    meanDensity: 5.43,
    atmosphericComposition: '',
    numberOfMoons: 0,
    hasRings: false,
    hasMagneticField: true
  },
  {
    _id: new ObjectId('59a06674c8df9f3cd2ee7d55'),
    name: 'Mars',
    type: 'Terrestrial planet',
    orderFromSun: 4,
    radius: { value: 3396.2, units: 'km' },
    mass: { value: 6.4171e23, units: 'kg' },
    sma: { value: 227920000, units: 'km' },
    orbitalPeriod: { value: 1.881, units: 'years' },
    eccentricity: 0.0935,
    meanOrbitalVelocity: { value: 24.07, units: 'km/sec' },
    rotationPeriod: { value: 1.029, units: 'days' },
    inclinationOfAxis: { value: 25.19, units: 'degrees' },
    meanTemperature: -53,
    gravity: { value: 3.71, units: 'm/s^2' },
    escapeVelocity: { value: 5.03, units: 'km/sec' },
    meanDensity: 3.93,
    atmosphericComposition: 'CO2',
    numberOfMoons: 2,
    hasRings: false,
    hasMagneticField: false
  }
];

/**
 * From Nathan's aggregation examples
 * @see https://gist.github.com/imlucas/5c92b6cfd46cba2a8bbb4a428c37c31b#file-aggregations-js-L31-L42
 */
// very simple aggregation to showcase $match with $count
const VERY_SIMPLE_EXAMPLE = {
  ...EXAMPLE,
  inputDocuments: {
    ...INITIAL_INPUT_DOCUMENTS,
    count: 9,
    documents: SOLAR_SYSTEM_DOCUMENTS
  },
  namespace: 'aggregations.solarSystem',
  pipeline: [
    {
      ...STAGE_DEFAULTS,
      id: new ObjectId().toHexString(),
      previewDocuments: MATCHING_SOLAR_SYSTEM_DOCUMENTS,
      stageOperator: '$match',
      stage: `{
  type: "Terrestrial planet"
}`
    },
    {
      ...STAGE_DEFAULTS,
      id: new ObjectId().toHexString(),
      previewDocuments: [{ 'terrestrial planets': 4 }],
      stageOperator: '$count',
      stage: '"terrestrial planets"'
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
  });
