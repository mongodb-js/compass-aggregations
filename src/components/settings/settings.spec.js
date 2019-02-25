import React from 'react';
import { shallow } from 'enzyme';

import Settings from './settings.jsx';
import { INITIAL_STATE } from 'modules/settings';

import styles from './settings.less';

describe('Settings [Component]', () => {
  let state;
  let component;
  let saveSettingsSpy;
  let toggleSettingsIsExpandedSpy;
  let toggleSettingsIsCommentModeSpy;
  let setSettingsSampleSizeSpy;
  let setSettingsMaxTimeoutMSSpy;
  let setSettingsLimitSpy;

  beforeEach(() => {
    saveSettingsSpy = sinon.spy();
    toggleSettingsIsExpandedSpy = sinon.spy();
    toggleSettingsIsCommentModeSpy = sinon.spy();
    setSettingsSampleSizeSpy = sinon.spy();
    setSettingsMaxTimeoutMSSpy = sinon.spy();
    setSettingsLimitSpy = sinon.spy();

    state = {
      ...INITIAL_STATE,
      saveSettings: saveSettingsSpy,
      toggleSettingsIsExpanded: toggleSettingsIsExpandedSpy,
      toggleSettingsIsCommentMode: toggleSettingsIsCommentModeSpy,
      setSettingsSampleSize: setSettingsSampleSizeSpy,
      setSettingsMaxTimeoutMS: setSettingsMaxTimeoutMSSpy,
      setSettingsLimit: setSettingsLimitSpy
    };
  });

  afterEach(() => {
    component = null;
    toggleSettingsIsExpandedSpy = null;
    toggleSettingsIsCommentModeSpy = null;
    setSettingsSampleSizeSpy = null;
    setSettingsMaxTimeoutMSSpy = null;
    setSettingsLimitSpy = null;
  });

  it('is hidden by default', () => {
    component = shallow(<Settings {...state} />);
    expect(Object.keys(component).length).to.equal(0);
  });

  it('is rendered when isExpanded=true', () => {
    component = shallow(<Settings {...{ ...state, isExpanded: true }} />);
    expect(component.find(`.${styles.settings}`)).to.be.present();
  });
});
