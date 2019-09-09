import React from 'react';
import { shallow } from 'enzyme';

import StagePreviewToolbar from 'components/stage-preview-toolbar';
import styles from './stage-preview-toolbar.less';

describe('StagePreviewToolbar [Component]', () => {
  context('when the stage is enabled', () => {
    let component;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          openLink={sinon.spy()}
          stageOperator="$match"
          isValid
          count={10}
          isEnabled />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.include.text('(Sample of 10 documents)');
    });

    it('renders the stage text with the right link', () => {
      expect(component.find(`.${styles['stage-preview-toolbar-link']}`)).
        to.have.text('$match');
    });

    it('renders the info sprinkle', () => {
      expect(component.find('InfoSprinkle')).
        to.be.present();
      expect(component.find('InfoSprinkle').prop('helpLink')).
        to.include('/aggregation/match');
    });
  });

  context('when the stage is not enabled', () => {
    let component;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          stageOperator="$match"
          isValid
          count={10}
          isEnabled={false} />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('does not render the stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('Stage is disabled. Results not passed in the pipeline.');
    });
  });

  context('when the stage operator is $out', () => {
    let component;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          stageOperator="$out"
          stageValue="collection"
          count={0}
          isValid
          isEnabled />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the $out stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('Documents will be saved to the collection: collection');
    });
  });

  context('when there is no stage operator', () => {
    let component;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          stageOperator={null}
          count={0}
          isValid
          isEnabled />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('A sample of the aggregated results from this stage will be shown below');
    });
  });
});
