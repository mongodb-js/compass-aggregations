import React from 'react';
import { mount } from 'enzyme';

import PipelinePreviewToolbar from 'components/pipeline-preview-toolbar';
import styles from './pipeline-preview-toolbar.less';

describe('PipelinePreviewToolbar [Component]', () => {
  let component;
  let toggleSampleSpy;
  let toggleAutoPreviewSpy;

  beforeEach(() => {
    toggleSampleSpy = sinon.spy();
    toggleAutoPreviewSpy = sinon.spy();
    component = mount(
      <PipelinePreviewToolbar
        toggleSample={toggleSampleSpy}
        toggleAutoPreview={toggleAutoPreviewSpy}
        isModified
        isSampling
        isAutoPreviewing
      />
    );
  });

  afterEach(() => {
    component = null;
    toggleSampleSpy = null;
    toggleAutoPreviewSpy = null;
  });

  it('renders the wrapper div', () => {
    expect(
      component.find(`.${styles['pipeline-preview-toolbar']}`)
    ).to.be.present();
  });

  describe('Sample Mode', () => {
    it('renders the sample mode text', () => {
      expect(
        component
          .find(`.${styles['pipeline-preview-toolbar-sample-mode']}`)
          .hostNodes()
      ).to.have.text('Sample Mode');
    });
    it('renders the tooltip', () => {
      const toggleClassName = styles['pipeline-preview-toolbar-toggle-sample'];
      expect(
        component.find(`.${toggleClassName} .hadron-tooltip`)
      ).to.be.present();
    });
  });
  describe('Auto-Preview', () => {
    it('renders the auto preview mode text', () => {
      expect(
        component
          .find(`.${styles['pipeline-preview-toolbar-auto-preview-mode']}`)
          .hostNodes()
      ).to.have.text('Auto Preview');
    });
    it('renders the tooltip', () => {
      const toggleClassName =
        styles['pipeline-preview-toolbar-toggle-auto-preview'];
      expect(
        component.find(`.${toggleClassName} .hadron-tooltip`)
      ).to.be.present();
    });
  });

  context('when toggling sampling', () => {
    it('calls the action', () => {
      component
        .find(`.${styles['pipeline-preview-toolbar-toggle-sample-button']}`)
        .hostNodes()
        .simulate('click');
      expect(toggleSampleSpy.calledOnce).to.equal(true);
    });
  });

  context('when toggling auto previewing', () => {
    it('calls the action', () => {
      component
        .find(
          `.${styles['pipeline-preview-toolbar-toggle-auto-preview-button']}`
        )
        .hostNodes()
        .simulate('click');
      expect(toggleAutoPreviewSpy.calledOnce).to.equal(true);
    });
  });
});
