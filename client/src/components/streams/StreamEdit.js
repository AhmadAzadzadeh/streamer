import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    const { id } = this.props.match.params;
    this.props.editStream(id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3>Edit a Stream</h3>
          {/* initialValues is an special property that can communicate with ReduxForm */}
          {/* why we use title and description inside of initialValues ? because inside of StreamForm component
            we have to Field with a name of title and description and  ReduxForm knows this relationship.
          */}
          <StreamForm
            initialValues={{
              title: this.props.stream.title,
              description: this.props.stream.description
            }}
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
