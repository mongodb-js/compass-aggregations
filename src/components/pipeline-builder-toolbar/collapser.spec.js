import React from 'react';
import { mount } from 'enzyme';

import Collapser from './collapser';
import styles from './collapser.less';

describe('Collapser [Component]', () => {
  context('when the collation is expanded', () => {
    let component;
    const spy = sinon.spy();

    beforeEach(() => {
      component = mount(<Collapser isCollapsed collapseToggled={spy} />);
    });

    afterEach(() => {
      component = null;
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles.collapser}`)).to.be.present();
    });

    it('renders the collapse text', () => {
      expect(component.find('button')).to.have.prop(
        'title',
        'Collapse all stages'
      );
    });

    it('renders the collapse button', () => {
      expect(component.find('.fa-angle-down')).to.be.present();
    });
  });

  context('when the collation is collapsed', () => {
    let component;
    const spy = sinon.spy();

    beforeEach(() => {
      component = mount(
        <Collapser isCollapsed={false} collapseToggled={spy} />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the expand text', () => {
      expect(component.find('button')).to.have.prop('title', 'Expand all stages');
    });

    it('renders the expand button', () => {
      expect(component.find('.fa-angle-right')).to.be.present();
    });
  });

  context('when clicking on the button', () => {
    let component;
    const spy = sinon.spy();

    beforeEach(() => {
      component = mount(
        <Collapser
          isCollapsed={false}
          collapseToggled={spy}
        />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('toggles the expansion and sets as modified', () => {
      component.find('button').simulate('click');
      expect(spy.calledWith(1)).to.equal(false);
    });
  });
});
