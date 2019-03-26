import reducer, {
  projectionsChanged,
  PROJECTIONS_CHANGED
} from 'modules/projections';

describe('projections module', () => {
  describe('#projectionsChanged', () => {
    it('returns the PROJECTIONS_CHANGED action', () => {
      expect(projectionsChanged([])).to.deep.equal({
        type: PROJECTIONS_CHANGED,
        projections: []
      });
    });
  });

  describe('#reducer', () => {
    context('when the action is not limit changed', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })).to.deep.equal([]);
      });
    });

    context('when the action is maxTimeMSChanged changed', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, projectionsChanged([1]))).to.deep.equal([1]);
      });
    });
  });
});
