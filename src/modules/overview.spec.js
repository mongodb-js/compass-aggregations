import reducer, { overviewToggled, OVERVIEW_TOGGLED, overviewStageModified, OVERVIEW_STAGE_MODIFIED, overviewStageAdded, OVERVIEW_STAGE_ADDED, overviewStageRemoved, OVERVIEW_STAGE_REMOVED, INITIAL_STATE } from './overview';
import { generateStageWithDefaults as toStage } from 'utils/stage';

describe('overview module', () => {
  it('returns the OVERVIEW_TOGGLED action', () => {
    expect(overviewToggled()).to.deep.equal({
      type: OVERVIEW_TOGGLED
    });
  });

  it('returns the OVERVIEW_STAGE_ADDED action', () => {
    const _stage = toStage({ id: 'adding' });
    expect(overviewStageAdded(_stage)).to.deep.equal({
      type: OVERVIEW_STAGE_ADDED,
      stage: _stage
    });
  });
  it('returns the OVERVIEW_STAGE_REMOVED action', () => {
    const _stage = toStage({ id: 'removing' });
    expect(overviewStageRemoved(_stage)).to.deep.equal({
      type: OVERVIEW_STAGE_REMOVED,
      stage: _stage
    });
  });
  it('returns the OVERVIEW_STAGE_MODIFIED', () => {
    const _stage = toStage({ id: 'updating' });
    expect(overviewStageModified(_stage)).to.deep.equal({
      type: OVERVIEW_STAGE_MODIFIED,
      stage: _stage
    });
  });

  describe('#reducer', () => {
    describe('when the action is overview toggled', () => {
      const state = Object.assign({}, INITIAL_STATE);

      it('toggles to being on first', () => {
        expect(reducer(state, overviewToggled())).to.deep.equal({
          ...state,
          isOn: true
        });
      });

      it('next toggles to being off', () => {
        expect(reducer(state, overviewToggled())).to.deep.equal({
          ...state,
          isOn: false
        });
      });
    });
  });
});

describe('when the action is stage added', () => {
  it('must mark itself as having a stage');
  it('tracks the new stage');
  it('knows it has any stages expanded');
  it('remains off');
});
