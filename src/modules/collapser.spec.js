import reducer, { collapseChanged, COLLAPSE_CHANGED } from './collapser';

describe('collapser module', () => {
  describe('#collapseChanged', () => {
    it('returns the COLLAPSE_CHANGED action', () => {
      expect(collapseChanged(true)).to.deep.equal({
        type: COLLAPSE_CHANGED,
        collapsed: true
      });
    });
  });

  describe('#reducer', () => {
    context('when the action is not collapse changed', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })).to.equal(false);
      });
    });

    context('when the action is collapse changed', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, collapseChanged(true))).to.equal(true);
      });
    });
  });
});
