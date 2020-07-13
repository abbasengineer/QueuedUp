import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  Username: {
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Hind",
    color: "#434343",
    textDecoration: "none",
  },
  Contents: {
    textAlign: "left",
    fontFamily: "Hind",
  },
  Comment: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;

    return (
      <Grid container>
        {comments.map((comment) => {
          const { username, content, createdAt } = comment;

          return (
            <Fragment key={createdAt}>
              <Grid item sm={10}>
                <Grid container className={classes.Comment} spacing={2}>
                  <Grid item>
                    <Typography
                      className={classes.Username}
                      component={Link}
                      to={`/users/${username}`}>
                      {username}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography className={classes.Contents}>
                      {content}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);
