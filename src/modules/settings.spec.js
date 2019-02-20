import reducer, {
  TOGGLE_IS_EXPANDED,
  TOGGLE_COMMENT_MODE,
  SET_SAMPLE_SIZE,
  SET_MAX_TIMEOUT_MS,
  toggleSettingsIsExpanded,
  toggleSettingsIsCommentMode,
  setSettingsSampleSize,
  setSettingsMaxTimeoutMS,
  INITIAL_STATE
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
        let state;
        it('isExpanded is set to true', () => {
          state = reducer(undefined, toggleSettingsIsExpanded());
          expect(state).to.deep.equal({
            ...INITIAL_STATE,
            isExpanded: true
          });
        });

        it('isExpanded is set to false', () => {
          state = {
            ...INITIAL_STATE,
            isExpanded: true
          };
          expect(reducer(state, toggleSettingsIsExpanded())).to.deep.equal({
            ...INITIAL_STATE,
            isExpanded: false
          });
        });
      });
    });

    describe('#toggleSettingsCommentMode', () => {
      it('returns the action type', () => {
        expect(toggleSettingsIsCommentMode()).to.deep.equal({
          type: TOGGLE_COMMENT_MODE
        });
      });
      describe('#reducer', () => {
        let state;
        it('first toggles to off', () => {
          state = reducer(undefined, toggleSettingsIsCommentMode());
          expect(state).to.deep.equal({
            ...INITIAL_STATE,
            isCommentMode: false
          });
        });

        it('next toggles to back on is set to false', () => {
          state = {
            ...INITIAL_STATE,
            isCommentMode: false
          };
          expect(reducer(state, toggleSettingsIsCommentMode())).to.deep.equal({
            ...INITIAL_STATE,
            isCommentMode: true
          });
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
      describe('#reducer', () => {
        let state;
        it('passes the value and flips isDefault', () => {
          state = reducer(undefined, setSettingsSampleSize(1000));
          expect(state).to.deep.equal({
            ...INITIAL_STATE,
            sampleSize: 1000
          });
        });
        it('setting the value again back to a default flips it back', () => {
          state = reducer(state, setSettingsSampleSize(INITIAL_STATE.sampleSize));
          expect(state).to.deep.equal({
            ...INITIAL_STATE,
            sampleSize: INITIAL_STATE.sampleSize
          });
        });
      });
    });

    describe('#setSettingsMaxTimeoutMS', () => {
      it('returns the action type', () => {
        expect(setSettingsMaxTimeoutMS(10000)).to.deep.equal({
          type: SET_MAX_TIMEOUT_MS,
          value: 10000
        });
      });
      describe('#reducer', () => {
        let state;
        it('passes the value and flips isDefault', () => {
          state = reducer(undefined, setSettingsMaxTimeoutMS(10000));
          expect(state).to.deep.equal({
            ...INITIAL_STATE,
            maxTimeoutMS: 10000
          });
        });
        it('setting the value again back to a default flips it back', () => {
          state = reducer(state, setSettingsMaxTimeoutMS(INITIAL_STATE.maxTimeoutMS));
          expect(state).to.deep.equal({
            ...INITIAL_STATE,
            maxTimeoutMS: INITIAL_STATE.maxTimeoutMS
          });
        });
      });
    });
  });
});
