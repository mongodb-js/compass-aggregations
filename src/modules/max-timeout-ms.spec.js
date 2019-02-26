import reducer, {
  maxTimeoutMSChanged,
  MAX_TIMEOUT_MS_CHANGED
} from 'modules/max-timeout-ms';

describe('max-timeout-ms module', () => {
  describe('#maxTimeoutMSChanged', () => {
    it('returns the MAX_TIMEOUT_MS_CHANGED action', () => {
      expect(maxTimeoutMSChanged(100)).to.deep.equal({
        type: MAX_TIMEOUT_MS_CHANGED,
        maxTimeoutMS: 100
      });
    });
  });

  describe('#reducer', () => {
    context('when the action is not limit changed', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, { type: 'test' })).to.equal(5000);
      });
    });

    context('when the action is maxTimeoutMSChanged changed', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, maxTimeoutMSChanged(100))).to.equal(100);
      });
    });
  });
});
