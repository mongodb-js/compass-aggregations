import React from 'react';
import { mount } from 'enzyme';

import PipelineBuilderToolbar from 'components/pipeline-builder-toolbar';
import styles from './pipeline-builder-toolbar.less';

describe('PipelineBuilderToolbar [Component]', () => {
  let component;
  let savedPipelinesListToggleSpy;
  let getSavedPipelinesSpy;
  let copyToClipboardSpy;
  let newPipelineSpy;
  let clonePipelineSpy;
  let nameChangedSpy;
  let saveSpy;
  let setIsModifiedSpy;

  beforeEach(() => {
    savedPipelinesListToggleSpy = sinon.spy();
    getSavedPipelinesSpy = sinon.spy();
    copyToClipboardSpy = sinon.spy();
    newPipelineSpy = sinon.spy();
    clonePipelineSpy = sinon.spy();
    nameChangedSpy = sinon.spy();
    saveSpy = sinon.spy();
    setIsModifiedSpy = sinon.spy();

    component = mount(
      <PipelineBuilderToolbar
        savedPipelinesListToggle={savedPipelinesListToggleSpy}
        getSavedPipelines={getSavedPipelinesSpy}
        saveCurrentPipeline={saveSpy}
        savedPipeline={{ isListVisible: true }}
        newPipeline={newPipelineSpy}
        clonePipeline={clonePipelineSpy}
        nameChanged={nameChangedSpy}
        name=""
        isModified
        setIsModified={setIsModifiedSpy}
        copyToClipboard={copyToClipboardSpy} />
    );
  });

  afterEach(() => {
    component = null;
    savedPipelinesListToggleSpy = null;
    getSavedPipelinesSpy = null;
    copyToClipboardSpy = null;
    newPipelineSpy = null;
    clonePipelineSpy = null;
    nameChangedSpy = null;
    saveSpy = null;
    setIsModifiedSpy = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles['pipeline-builder-toolbar']}`)).to.be.present();
  });

  it('renders the save pipeline button', () => {
    expect(component.find(`.${styles['pipeline-builder-toolbar-save-pipeline-button']}`)).
      to.be.present();
  });

  it('renders the dropdown menu', () => {
    expect(component.find('.dropdown-toggle')).to.be.present();
  });
});
