import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import VerticalSidebar from "./VerticalSidebar";
import {Button, Segment, Sidebar} from "semantic-ui-react";
import CustomInput from "./CustomInput";
import { fetchQueries } from '../../actions';

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pastInput: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
componentDidMount() {
  this.props.fetchQueries();
}


  handleFormSubmit(vals) {
    this.props.onSubmit(vals);
  }

  render() {
    const { pristine, reset, submitting, handleSubmit} = this.props;
    return (
        <div>

          <Button
              onClick={() => this.setState({visible: !this.state.visible})}
          >
            Show Queries
          </Button>
          <VerticalSidebar
              visible={this.state.visible}
              pastQueries = {this.props.pastQueries}
              handleFormSubmit = {this.handleFormSubmit}
          />


          <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>

            <Sidebar.Pusher dimmed={false}>
              <Segment basic>
                <form
                    onSubmit={handleSubmit(this.handleFormSubmit)}
                    className="ui form error"
                >
                  <Field name="query" component={CustomInput} label="Enter Search Query"/>
                  <button className="ui button primary" type="submit" disabled={submitting}>Submit</button>
                  <Button bsStyle="primary" type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                  </Button>
                </form>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>

        </div>

    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a query';
  }

  return errors;
};

const mapStateToProps = (state, props) => ({
  initialValues: state?.results?.query || '', // retrieve name from redux store
  pastQueries: Object.values(state.results.pastQueries),
  query: props.pastQueries?  props.pastQueries[props.pastQueries.length - 1] : '', // retrieve name from redux store
})

export default connect(
    mapStateToProps,
    {fetchQueries}
)(reduxForm({
  validate,
  form: 'syncValidation', // a unique identifier for this fom
})(QueryForm))
