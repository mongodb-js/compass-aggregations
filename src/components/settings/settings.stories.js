import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE as _BASE_STATE } from 'modules/settings';
import Settings from './settings';
import { configureStore } from 'utils/configureStore';

const INITIAL_STATE = {
  ..._BASE_STATE,
  isExpanded: true
};

storiesOf('Settings', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('Expanded', () => {
    const store = configureStore(INITIAL_STATE);
    return (
      <Provider store={store}>
        <Settings isCommenting isExpanded settings={INITIAL_STATE} />
      </Provider>
    );
  });
