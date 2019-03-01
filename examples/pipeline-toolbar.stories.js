import React from 'react';
import { storiesOf } from '@storybook/react';
import { ComponentPreview } from 'storybook/decorators';

import { Provider } from 'react-redux';
import { INITIAL_STATE as BASE_STATE } from 'modules';

import PipelineToolbar from 'components/pipeline-toolbar';
import { configureStore } from 'utils/configureStore';

storiesOf('<PipelineToolbar>', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  // .add('Default', () => {
  //   const store = configureStore(BASE_STATE);
  //   return (
  //     <Provider store={store}>
  //       <PipelineToolbar />
  //     </Provider>
  //   );
  // });
