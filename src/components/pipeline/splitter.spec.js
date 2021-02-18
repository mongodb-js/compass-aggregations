import React from 'react';
import { mount } from 'enzyme';

import Splitter from './splitter';
import styles from './splitter.less';

describe('Splitter [Component]', () => {
  let component;

  afterEach(() => {
    component = null;
  });

  it('renders the wrapper div', () => {
    component = mount(<Splitter />);
    expect(component.find(`.${styles.splitter}`)).to.be.present();
    expect(component.find(`.${styles['splitter-editing-view']}`)).to.not.be.present();
    expect(component.find(`.${styles['splitter-editing-collation']}`)).to.not.be.present();
  });
  it('renders editing-collation', () => {
    component = mount(<Splitter isCollationExpanded />);
    expect(component.find(`.${styles['splitter-editing-collation']}`)).to.be.present();
  });
  it('renders view-collation', () => {
    component = mount(<Splitter isEditingView />);
    expect(component.find(`.${styles['splitter-editing-view']}`)).to.be.present();
  });
});
