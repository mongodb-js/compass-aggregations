import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE } from 'modules';
import { configureStore } from 'utils/configureStore';

import { STAGE_DEFAULTS } from './example-constants.js';

import { ObjectId } from 'bson';

import { action } from '@storybook/addon-actions';

const BASE_STATE = {
  ...INITIAL_STATE
};

const PROPS = {
    ...STAGE_DEFAULTS,
    runStage: action('runStage'),
    stageChanged: action('stageChanged'),
    setIsModified: action('setIsModified'),
    fromStageOperators: true,
    isAutoPreviewing: true,
    index: 0,
    serverVersion: '4.0.0',
    fields: [],
    id: new ObjectId().toHexString(),
    stageOperator: '$project',
    stage: `{
  _id: 0,
  type: "$type",
  avg: {$avg: "$value"}
}`
};

import StageEditor from 'components/stage-editor';

storiesOf('<StageEditor>', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('Default', () => {
    const store = configureStore(INITIAL_STATE);
    return (
      <Provider store={store}>
        <StageEditor {...PROPS} />
      </Provider>
    );
  });
