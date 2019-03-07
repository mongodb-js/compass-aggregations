import React from 'react';
import { mount } from 'enzyme';

import SavingPipelineModal from 'components/saving-pipeline-modal';

import styles from './saving-pipeline-modal.less';

describe('SavingPipelineModal [Component]', () => {
  context('when the component is rendered', () => {
    let component;
    const savingPipeline = {
      isOpen: true,
      name: '',
      isSaving: false
    };

    const savingPipelineNameChangedSpy = sinon.spy();
    const savingPipelineApplySpy = sinon.spy();
    const savingPipelineCancelSpy = sinon.spy();

    beforeEach(() => {
      component = mount(
        <SavingPipelineModal
          savingPipelineCancel={savingPipelineCancelSpy}
          savingPipelineApply={savingPipelineApplySpy}
          savingPipelineNameChanged={savingPipelineNameChangedSpy}
          {...savingPipeline}
        />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the wrapper div', () => {
      expect(component.find(styles['saving-pipeline-modal'])).to.be.present();
    });
  });
});
