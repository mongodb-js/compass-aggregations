import reducer, { collapseToggled, COLLAPSE_TOGGLED } from './collapser';

describe('collapser module', () => {
  describe('#collapseToggled', () => {
    it('returns the COLLAPSE_TOGGLED action', () => {
      expect(collapseToggled()).to.deep.equal({
        type: COLLAPSE_TOGGLED
      });
    });
  });

  describe('#reducer', () => {
    context('when the action is not collapse toggled', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })).to.equal(false);
      });
    });

    context('when the action is collapse toggled', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, collapseToggled())).to.equal(true);
      });
    });
  });
});
