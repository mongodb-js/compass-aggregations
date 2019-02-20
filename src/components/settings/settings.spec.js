import React from 'react';
import { shallow } from 'enzyme';

import Settings from './settings.jsx';
import styles from './settings.less';

describe('Settings [Component]', () => {
  var state, component, saveSettingsSpy;

  beforeEach(() => {
    saveSettingsSpy = sinon.spy();

    state = {
      maxTimeMS: 5000,
      sampleModeEnabled: true,
      sampleSize: 1000
    };

    component = shallow(
      <Settings
        saveSettings={saveSettingsSpy}
        {...state}
      />
    );
  });

  afterEach(() => {
    component = null;
    saveSettingsSpy = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles.settings}`)).to.be.present();
  });
});
