import React from 'react';
import { shallow } from 'enzyme';

import StageToolbar from 'components/stage-toolbar';
import StageBuilderToolbar from 'components/stage-builder-toolbar';
import StagePreviewToolbar from 'components/stage-preview-toolbar';

import styles from './stage-toolbar.less';

describe('StageToolbar [Component]', () => {
  let component;
  let stageOperatorSelectedSpy;
  let stageToggledSpy;
  let runStageSpy;
  let stageAddedAfterSpy;
  let stageDeletedSpy;
  let stageCollapseToggledSpy;
  let setIsModifiedSpy;
  let openLinkSpy;

  beforeEach(() => {
    stageOperatorSelectedSpy = sinon.spy();
    stageToggledSpy = sinon.spy();
    runStageSpy = sinon.spy();
    stageAddedAfterSpy = sinon.spy();
    stageDeletedSpy = sinon.spy();
    stageCollapseToggledSpy = sinon.spy();
    setIsModifiedSpy = sinon.spy();
    openLinkSpy = sinon.spy();

    component = shallow(
      <StageToolbar
        stage=""
        isValid
        isEnabled
        isExpanded
        allowWrites
        previewCount={5}
        index={0}
        serverVersion="3.6.0"
        stageOperatorSelected={stageOperatorSelectedSpy}
        stageToggled={stageToggledSpy}
        runStage={runStageSpy}
        stageAddedAfter={stageAddedAfterSpy}
        stageDeleted={stageDeletedSpy}
        setIsModified={setIsModifiedSpy}
        stageCollapseToggled={stageCollapseToggledSpy}
        openLink={openLinkSpy}
        isCommenting
      />
    );
  });

  afterEach(() => {
    component = null;
    stageOperatorSelectedSpy = null;
    stageToggledSpy = null;
    runStageSpy = null;
    stageAddedAfterSpy = null;
    stageDeletedSpy = null;
    stageCollapseToggledSpy = null;
    setIsModifiedSpy = null;
    openLinkSpy = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles['stage-toolbar']}`)).to.be.present();
  });

  it('renders the stage builder toolbar', () => {
    expect(component.find(`.${styles['stage-toolbar']}`))
      .to.have.descendants(StageBuilderToolbar);
  });

  it('renders the stage preview toolbar', () => {
    expect(component.find(`.${styles['stage-toolbar']}`))
      .to.have.descendants(StagePreviewToolbar);
  });
});
