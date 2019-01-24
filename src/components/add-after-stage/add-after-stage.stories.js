import React from 'react';
import { storiesOf } from '@storybook/react';

import {ComponentPreview} from '../../../.storybook/decorators';

import AddAfterStage from './';

storiesOf('AddAfterStage', module)
  .addDecorator(story => <ComponentPreview>{story()}</ComponentPreview>)
  .add('default', () => {
    return (
      <AddAfterStage
        index={1}
        stageAddedAfter={() => {
          alert('onStageAddedAfter');
        }}
      />
    );
  });
