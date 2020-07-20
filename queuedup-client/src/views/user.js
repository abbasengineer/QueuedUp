import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/data-actions";
import StaticProfile from "../components/StaticProfile";
import { CircularProgress } from "@material-ui/core";

export class user extends Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.getUserData(username);

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
    const { posts, loading } = this.props.data;
    const postsMarkup = loading ? (
      <p>
        <CircularProgress />
      </p>
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : (
      posts.map((post) => <Post key={post.postID} post={post} />)
    );

    return (
      <Fragment>
        <Grid container spacing={16}></Grid>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
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
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
