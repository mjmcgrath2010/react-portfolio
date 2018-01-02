import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Wrapper } from '../styles';
import ContactForm from '../../../components/ContactForm/index';
// import PropTypes from 'prop-types';

function Contact() {
  return (
    <Wrapper>
      <h2>Drop me a line</h2>
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <ContactForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}

// About.propTypes = {};

export default Contact;
