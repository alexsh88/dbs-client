import React from 'react';
import { connect } from 'react-redux';
import { createQuery } from '../../actions';
import QueryForm from './QueryForm';

class QueryCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createQuery(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Search</h3>
        <QueryForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createQuery }
)(QueryCreate);
