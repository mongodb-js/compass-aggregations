import reducer, {
  TOGGLE_IS_EXPANDED,
  TOGGLE_COMMENT_MODE,
  SET_SAMPLE_SIZE,
  SET_MAX_TIMEOUT_MS,
  toggleSettingsIsExpanded,
  toggleSettingsCommentMode,
  setSettingsSampleSize,
  setSettingsMaxTimeoutMS
} from './settings';

describe('settings', () => {
  describe('action creators', () => {
    describe('#toggleSettingsIsExpanded', () => {
      it('returns the action type', () => {
        expect(toggleSettingsIsExpanded()).to.deep.equal({
          type: TOGGLE_IS_EXPANDED
        });
      });
      describe('#reducer', () => {
        it('isExpanded is set to true', () => {
          expect(reducer(undefined, toggleSettingsIsExpanded())).to.deep.equal({
            isExpanded: true
          });
        });

        it('isExpanded is set to false', () => {
          expect(reducer(undefined, toggleSettingsIsExpanded())).to.deep.equal({
            isExpanded: false
          });
        });
      });
    });

    describe('#toggleSettingsCommentMode', () => {
      it('returns the action type', () => {
        expect(toggleSettingsCommentMode()).to.deep.equal({
          type: TOGGLE_COMMENT_MODE
        });
      });
    });

    describe('#setSettingsSampleSize', () => {
      it('returns the action type', () => {
        expect(setSettingsSampleSize(1)).to.deep.equal({
          type: SET_SAMPLE_SIZE,
          value: 1
        });
      });
    });

    describe('#setSettingsSampleSize', () => {
      it('returns the action type', () => {
        expect(setSettingsMaxTimeoutMS(10000)).to.deep.equal({
          type: SET_MAX_TIMEOUT_MS,
          value: 10000
        });
      });
    });
  });
});
