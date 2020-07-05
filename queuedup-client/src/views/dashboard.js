import React, { Component } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  Card: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  Username: {
    fontWeight: "bold",
  },
});

export class dashboard extends Component {
  state = {
    posts: null,
  };

  // fetch posts from server, using Axios to send HTTP requests to the server
  componentDidMount() {
    axios
      .get("/getposts")
      .then((response) => {
        console.log(response.data);

        this.setState({
          posts: response.data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { classes } = this.props;

    let recentPosts = this.state.posts ? (
      this.state.posts.map((post) => (
        <Card className={classes.Card}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Typography className={classes.Username}>
                {post.username}:
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>{post.content}</Typography>
            </Grid>
          </Grid>
        </Card>
      ))
    ) : (
      <Typography>No posts yet!</Typography>
    );

    return (
      <Container container className={classes.root} spacing={0}>
        <Container item>{recentPosts}</Container>
      </Container>
    );
  }
}

export default withStyles(styles)(dashboard);
