import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE as _BASE_STATE } from 'modules/settings';

import { INITIAL_STATE as INITIAL_LIMIT_STATE } from 'modules/limit';
import { INITIAL_STATE as INITIAL_MAX_TIME_MS_STATE } from 'modules/max-time-ms';
import { INITIAL_STATE as INITIAL_LARGE_LIMIT_STATE } from 'modules/large-limit';

import Settings from './settings';
import { configureStore } from 'utils/configureStore';

import { action } from '@storybook/addon-actions';

const INITIAL_STATE = {
  ..._BASE_STATE,
  isExpanded: true,
  limit: INITIAL_LIMIT_STATE,
  largeLimit: INITIAL_LARGE_LIMIT_STATE,
  maxTimeMS: INITIAL_MAX_TIME_MS_STATE
};

const ACTION_PROPS = {
  toggleSettingsIsExpanded: action('toggleSettingsIsExpanded'),
  toggleSettingsIsCommentMode: action('toggleSettingsIsCommentMode'),
  setSettingsSampleSize: action('setSettingsSampleSize'),
  setSettingsMaxTimeMS: action('setSettingsMaxTimeMS'),
  setSettingsLimit: action('setSettingsLimit'),
  applySettings: action('applySettings'),
  runStage: action('runStage')
};

storiesOf('Settings', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('Expanded', () => {
    const store = configureStore(INITIAL_STATE);
    return (
      <Provider store={store}>
        <Settings
          isCommenting
          isExpanded
          settings={INITIAL_STATE}
          {...ACTION_PROPS}
        />
      </Provider>
    );
  });
