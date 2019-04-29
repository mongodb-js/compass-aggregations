import React from 'react';
import { mount } from 'enzyme';

import PipelineBuilderToolbar from './pipeline-builder-toolbar';
import styles from './pipeline-builder-toolbar.less';

describe('PipelineBuilderToolbar [Component]', () => {
  let component;
  let savedPipelinesListToggleSpy;
  let getSavedPipelinesSpy;
  let exportToLanguageSpy;
  let newPipelineSpy;
  let newPipelineFromTextSpy;
  let clonePipelineSpy;
  let nameChangedSpy;
  let saveSpy;
  let setIsModifiedSpy;
  let collationCollapseSpy;
  let toggleOverviewSpy;

  beforeEach(() => {
    savedPipelinesListToggleSpy = sinon.spy();
    getSavedPipelinesSpy = sinon.spy();
    exportToLanguageSpy = sinon.spy();
    newPipelineSpy = sinon.spy();
    newPipelineFromTextSpy = sinon.spy();
    clonePipelineSpy = sinon.spy();
    nameChangedSpy = sinon.spy();
    saveSpy = sinon.spy();
    setIsModifiedSpy = sinon.spy();
    collationCollapseSpy = sinon.spy();
    toggleOverviewSpy = sinon.spy();
  });

  afterEach(() => {
    component = null;
    savedPipelinesListToggleSpy = null;
    getSavedPipelinesSpy = null;
    exportToLanguageSpy = null;
    newPipelineSpy = null;
    newPipelineFromTextSpy = null;
    clonePipelineSpy = null;
    nameChangedSpy = null;
    saveSpy = null;
    setIsModifiedSpy = null;
    toggleOverviewSpy = null;
  });

  context('when not deployed to atlas', () => {
    beforeEach(() => {
      component = mount(
        <PipelineBuilderToolbar
          isAtlasDeployed={false}
          savedPipelinesListToggle={savedPipelinesListToggleSpy}
          getSavedPipelines={getSavedPipelinesSpy}
          savingPipelineOpen={saveSpy}
          saveCurrentPipeline={saveSpy}
          savedPipeline={{ isListVisible: true }}
          newPipeline={newPipelineSpy}
          newPipelineFromText={newPipelineFromTextSpy}
          clonePipeline={clonePipelineSpy}
          nameChanged={nameChangedSpy}
          name=""
          isModified
          isCollationExpanded
          isOverviewOn={false}
          toggleOverview={toggleOverviewSpy}
          setIsModified={setIsModifiedSpy}
          collationCollapseToggled={collationCollapseSpy}
          exportToLanguage={exportToLanguageSpy}
        />
      );
    });

    it('renders the wrapper div', () => {
      expect(
        component.find(`.${styles['pipeline-builder-toolbar']}`)
      ).to.be.present();
    });

    it('renders the save pipeline button', () => {
      expect(
        component.find(
          `.${styles['pipeline-builder-toolbar-save-pipeline-button']}`
        )
      ).to.be.present();
    });

    it('renders the dropdown menu', () => {
      expect(component.find('.dropdown-toggle')).to.be.present();
    });
  });

  context('when deployed to atlas', () => {
    beforeEach(() => {
      component = mount(
        <PipelineBuilderToolbar
          isAtlasDeployed
          savedPipelinesListToggle={savedPipelinesListToggleSpy}
          getSavedPipelines={getSavedPipelinesSpy}
          saveCurrentPipeline={saveSpy}
          savingPipelineOpen={saveSpy}
          savedPipeline={{ isListVisible: true }}
          newPipeline={newPipelineSpy}
          newPipelineFromText={newPipelineFromTextSpy}
          clonePipeline={clonePipelineSpy}
          nameChanged={nameChangedSpy}
          name=""
          isModified
          isCollationExpanded
          isOverviewOn={false}
          toggleOverview={toggleOverviewSpy}
          setIsModified={setIsModifiedSpy}
          collationCollapseToggled={collationCollapseSpy}
          exportToLanguage={exportToLanguageSpy}
        />
      );
    });

    it('does not render the save pipeline button', () => {
      expect(
        component.find(`.${styles['pipeline-builder-toolbar-save-pipeline-button']}`)
      ).to.not.be.present();
    });

    it('does not render export to language', () => {
      expect(
        component.find(`.${styles['pipeline-builder-toolbar-export-to-language']}`)
      ).to.not.be.present();
    });

    it('does not render the pipeline name input', () => {
      expect(
        component.find(`.${styles['pipeline-builder-toolbar-name']}`)
      ).to.not.be.present();
    });

    it('does not render the saved pipelines toggle button', () => {
      expect(
        component.find(`.${styles['pipeline-builder-toolbar-open-saved-pipelines-button']}`)
      ).to.not.be.present();
    });
  });
});
