/**
 *
 * ContactForm
 *
 */

import React from 'react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Form, TextArea, Button } from 'semantic-ui-react';
// import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class ContactForm extends React.PureComponent {
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input id="form-subcomponent-shorthand-input-first-name" label="First name" placeholder="First name" />
            <Form.Input id="form-subcomponent-shorthand-input-last-name" label="Last name" placeholder="Last name" />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input id="form-subcomponent-shorthand-input-first-name" label="Email" placeholder="Email" />
            <Form.Input id="form-subcomponent-shorthand-input-last-name" label="Subject" placeholder="Subject" />
          </Form.Group>
          <Form.Field id="form-textarea-control-opinion" control={TextArea} label="Body" placeholder="Body" />
          <Form.Field id="form-button-control-public" control={Button} content="Submit Message" />
        </Form>
      </div>
    );
  }
}

ContactForm.propTypes = {};

export default ContactForm;
