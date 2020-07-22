import React, { Component, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import StaticProfile from "../components/static-profile";

export class user extends Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    const username = this.props.match.params.username;

    axios
      .get(`/user/${username}`)
      .then((response) => {
        this.setState({
          profile: response.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <Grid item sm={8} xs={12}>
          {this.state.profile === null ? (
            <p>
              <CircularProgress />
            </p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Fragment>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(user);
