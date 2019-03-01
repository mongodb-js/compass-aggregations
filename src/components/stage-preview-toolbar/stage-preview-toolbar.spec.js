import React from 'react';
import { shallow } from 'enzyme';

import StagePreviewToolbar from 'components/stage-preview-toolbar';
import styles from './stage-preview-toolbar.less';

describe('StagePreviewToolbar [Component]', () => {
  context('when the stage is enabled', () => {
    let component;
    let openLinkSpy;

    beforeEach(() => {
      openLinkSpy = sinon.spy();

      component = shallow(
        <StagePreviewToolbar
          stageOperator="$match"
          isValid
          count={10}
          isEnabled
          openLink={openLinkSpy} />
      );
    });

    afterEach(() => {
      component = null;
      openLinkSpy = null;
    });

    it('renders the stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('Output after $match stage (Sample of 10 documents)');
    });

    it('has a link to the stage operator docs', () => {
      expect(component.find('a')).to.be.present();
    });

    it('clicking a link to the stage operator docs calls the action creator', () => {
      component
        .find('a')
        .hostNodes()
        .simulate('click');
      expect(openLinkSpy.calledOnce).to.equal(true);
    });
  });

  context('when the stage is not enabled', () => {
    let component;
    let openLinkSpy;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          stageOperator="$match"
          isValid
          count={10}
          isEnabled={false}
          openLink={openLinkSpy} />
      );
    });

    afterEach(() => {
      component = null;
      openLinkSpy = null;
    });

    it('does not render the stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('Stage is disabled. Results not passed in the pipeline.');
    });
  });

  context('when the stage operator is $out', () => {
    let component;
    let openLinkSpy;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          stageOperator="$out"
          stageValue="collection"
          count={0}
          isValid
          isEnabled
          openLink={openLinkSpy} />
      );
    });

    afterEach(() => {
      component = null;
      openLinkSpy = null;
    });

    it('renders the $out stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('Documents will be saved to the collection: collection');
    });
  });

  context('when there is no stage operator', () => {
    let component;
    let openLinkSpy;

    beforeEach(() => {
      component = shallow(
        <StagePreviewToolbar
          stageOperator={null}
          count={0}
          isValid
          isEnabled
          openLink={openLinkSpy} />
      );
    });

    afterEach(() => {
      component = null;
      openLinkSpy = null;
    });

    it('renders the stage text', () => {
      expect(component.find(`.${styles['stage-preview-toolbar']}`)).
        to.have.text('A sample of the aggregated results from this stage will be shown below');
    });
  });
});
