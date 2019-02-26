import reducer, {
  reset,
  clearPipeline,
  restoreSavedPipeline,
  clonePipeline,
  newPipeline,
  applySettings,
  RESET,
  CLEAR_PIPELINE,
  RESTORE_PIPELINE,
  NEW_PIPELINE,
  CLONE_PIPELINE,
  APPLY_SETTINGS
} from 'modules';
import { toggleOverview, TOGGLE_OVERVIEW } from 'modules/is-overview-on';
import { largeLimitChanged, LARGE_LIMIT_CHANGED } from 'modules/large-limit';
import { limitChanged, LIMIT_CHANGED } from 'modules/limit';
import { maxTimeoutMSChanged, MAX_TIMEOUT_MS_CHANGED } from 'modules/max-timeout-ms';

describe('root [ module ]', () => {
  describe('#reset', () => {
    it('returns the action', () => {
      expect(reset()).to.deep.equal({
        type: RESET
      });
    });
  });

  describe('#clearPipeline', () => {
    it('returns the action', () => {
      expect(clearPipeline()).to.deep.equal({
        type: CLEAR_PIPELINE
      });
    });
  });

  describe('#restoreSavedPipeline', () => {
    it('returns the action', () => {
      expect(restoreSavedPipeline({ name: 'test' })).to.deep.equal({
        type: RESTORE_PIPELINE,
        restoreState: { name: 'test' }
      });
    });
  });

  describe('#newPipeline', () => {
    it('returns the NEW_PIPELINE action', () => {
      expect(newPipeline()).to.deep.equal({
        type: NEW_PIPELINE
      });
    });
  });

  describe('#clonePipeline', () => {
    it('returns the CLONE_PIPELINE action', () => {
      expect(clonePipeline()).to.deep.equal({
        type: CLONE_PIPELINE
      });
    });
  });

  describe('#toggleOverview', () => {
    it('returns the TOGGLE_OVERVIEW action', () => {
      expect(toggleOverview()).to.deep.equal({
        type: TOGGLE_OVERVIEW
      });
    });
  });

  describe('#maxTimeoutMS', () => {
    it('returns the MAX_TIMEOUT_MS_CHANGED action', () => {
      expect(maxTimeoutMSChanged(100)).to.deep.equal({
        type: MAX_TIMEOUT_MS_CHANGED,
        maxTimeoutMS: 100
      });
    });
  });

  describe('#limit', () => {
    it('returns the LIMIT_CHANGED action', () => {
      expect(limitChanged(100)).to.deep.equal({
        type: LIMIT_CHANGED,
        limit: 100
      });
    });
  });

  describe('#largeLimit', () => {
    it('returns the LARGE_LIMIT_CHANGED action', () => {
      expect(largeLimitChanged(100)).to.deep.equal({
        type: LARGE_LIMIT_CHANGED,
        largeLimit: 100
      });
    });
  });

  describe('#applySettings', () => {
    it('returns the APPLY_SETTINGS action', () => {
      expect(applySettings({})).to.deep.equal({
        type: APPLY_SETTINGS,
        settings: {}
      });
    });
  });

  describe('#reducer', () => {
    context('when the action is NEW_PIPELINE', () => {
      const prevState = {
        dataService: 'test-ds',
        namespace: 'test.test',
        fields: 'test-fields',
        serverVersion: '3.6.0',
        inputDocuments: ['test']
      };

      let state;

      before(() => {
        state = reducer(prevState, newPipeline());
      });

      it('keeps the data service', () => {
        expect(state.dataService).to.equal('test-ds');
      });

      it('keeps the namespace', () => {
        expect(state.namespace).to.equal('test.test');
      });

      it('keeps the fields', () => {
        expect(state.fields).to.equal('test-fields');
      });

      it('keeps the server version', () => {
        expect(state.serverVersion).to.equal('3.6.0');
      });

      it('keeps the input documents', () => {
        expect(state.inputDocuments).to.deep.equal(['test']);
      });

      it('sets id to null', () => {
        expect(state.id).to.equal('');
      });
    });

    context('when the action is CLONE_PIPELINE', () => {
      const prevState = {
        id: 'testing',
        name: 'test'
      };

      let state;

      before(() => {
        state = reducer(prevState, clonePipeline());
      });

      it('sets id to a new id', () => {
        expect(state.id).to.not.equal('testing');
      });

      it('updates the name', () => {
        expect(state.name).to.equal('test (copy)');
      });
    });

    context('when the action is CLONE_PIPELINE', () => {
      const prevState = {
        id: 'testing',
        name: 'test'
      };

      let state;

      before(() => {
        state = reducer(prevState, clonePipeline());
      });

      it('sets id to a new id', () => {
        expect(state.id).to.not.equal('testing');
      });

      it('updates the name', () => {
        expect(state.name).to.equal('test (copy)');
      });
    });

    // describe('when the action is APPLY_SETTINGS', () => {
    //   const prevState = {
    //     settings: {
    //       largeLimit: 
    //     }
    //   };

    //   let state;

    //   it('first toggle turns it on', () => {
    //     state = reducer(prevState, toggleOverview());
    //     expect(state.isOverviewOn).to.equal(true);
    //   });

    //   it('second toggle turns it back off', () => {
    //     state = reducer(state, toggleOverview());
    //     expect(state.isOverviewOn).to.equal(false);
    //   });
    // });

    describe('when the action is TOGGLE_OVERVIEW', () => {
      describe('#overview', () => {
        const prevState = {
          isOverviewOn: false
        };

        let state;

        it('first toggle turns it on', () => {
          state = reducer(prevState, toggleOverview());
          expect(state.isOverviewOn).to.equal(true);
        });

        it('second toggle turns it back off', () => {
          state = reducer(state, toggleOverview());
          expect(state.isOverviewOn).to.equal(false);
        });
      });

      describe('#pipeline[].isExpanded', () => {
        const prevState = {
          isOverviewOn: false,
          pipeline: [
            {
              isExpanded: true
            }
          ]
        };

        let state;

        it('first toggle collapses the opened stage', () => {
          state = reducer(prevState, toggleOverview());
          expect(state.pipeline[0].isExpanded).to.equal(false);
        });

        it('second toggle expands the stage', () => {
          state = reducer(state, toggleOverview());
          expect(state.pipeline[0].isExpanded).to.equal(true);
        });
      });

      describe('#inputDocuments.isExpanded', () => {
        const prevState = {
          isOverviewOn: false,
          inputDocuments: {
            isExpanded: true
          }
        };

        let state;

        it('first toggle collapses it', () => {
          state = reducer(prevState, toggleOverview());
          expect(state.inputDocuments.isExpanded).to.equal(false);
        });

        it('second toggle expands the stage', () => {
          state = reducer(state, toggleOverview());
          expect(state.inputDocuments.isExpanded).to.equal(true);
        });
      });
    });
  });
});
