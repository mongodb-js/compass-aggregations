import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { Modal } from 'react-bootstrap';
import { TextButton } from 'hadron-react-buttons';

import styles from './saving-pipeline-modal.less';

/**
 * Saving pipeline modal.
 */
class SavingPipelineModal extends PureComponent {
  static displayName = 'SavingPipelineModalComponent';

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    savingPipelineCancel: PropTypes.func.isRequired,
    savingPipelineApply: PropTypes.func.isRequired,
    savingPipelineNameChanged: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOpen: false,
    isSaving: false,
    name: ''
  };

  /**
   * Handle the value of the input being changed.
   *
   * @param {Event} evt
   * @returns {ConstrainVideoFacingModeParameters}
   */
  onNameChanged(evt) {
    this.props.savingPipelineNameChanged(evt.currentTarget.value);
  }

  /**
   * Render the component.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <Modal
        className={styles['saving-pipeline-modal']}
        show={this.props.isOpen}
        onHide={this.props.savingPipelineCancel}>
        <Modal.Header closeButton>
          <h4>Save Pipeline</h4>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={this.props.name}
            onChange={this.onNameChanged.bind(this)}
            className="form-control input-lg"
          />
        </Modal.Body>
        <Modal.Footer>
          <TextButton
            id="cancel-saving-pipeline"
            className="btn btn-default btn-sm"
            text="Cancel"
            clickHandler={this.props.savingPipelineCancel}
          />
          <TextButton
            id="apply-saving-pipeline"
            className="btn btn-primary btn-sm"
            text="Create New"
            disabled={this.props.name === ''}
            clickHandler={this.props.savingPipelineApply}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SavingPipelineModal;
