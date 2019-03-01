import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';

import PipelineToolbar from 'components/pipeline-toolbar';
import { configureStore } from 'utils/configureStore';

const INITIAL_STATE = {

};

storiesOf('<PipelineToolbar>', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('Default', () => {
    const store = configureStore(INITIAL_STATE);
    return (
      <Provider store={store}>
        <PipelineToolbar />
      </Provider>
    );
  });
