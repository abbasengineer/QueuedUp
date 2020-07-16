import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";

const styles = (theme) => ({
  username: {
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Hind",
    textDecoration: "none",
  },
  contents: {
    textAlign: "left",
    fontFamily: "Hind",
  },
  comment: {
    marginLeft: 7,
    marginTop: 5,
  },
  image: {
    minWidth: 45,
    minHeight: 45,
  },
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;

    return (
      <Grid container>
        {comments.map((comment) => {
          const { username, content, createdAt, imageURL } = comment;

          return (
            <Fragment key={createdAt}>
              <Grid
                container
                className={classes.comment}
                spacing={2}
                item
                sm={10}>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    src={imageURL}
                    title={username}
                    className={classes.image}></Avatar>
                </Grid>
                <Grid item xs>
                  <Typography
                    className={classes.username}
                    color="secondary"
                    component={Link}
                    to={`/users/${username}`}>
                    {username}
                  </Typography>
                  <Typography className={classes.contents}>
                    {content}
                  </Typography>
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
