import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";
import Post from "../components/post";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/data-actions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 0),
  },
  Empty: {
    fontFamily: "Hind",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "primary",
    opacity: ".5",
  },
  inputRoot: {
    color: "inherit",
  },
  search: {
    position: "relative",
    flex: "flex-end",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#a4c2f3", 0.15),
    "&:hover": {
      backgroundColor: fade("#d2e1f9", 0.25),
    },
  },
  inputInput: {
    fontFamily: "Hind",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  title: {
    fontFamily: "Hind",
    color: "secondary",
    fontWeight: "bold",
    textAlign: "left",
    textDecoration: "none",
  },
  grid: {
    padding: theme.spacing(0, 3),
  },
  dropDownButton: {
    margin: "0",
    padding: "0",
  },
  recentPostsButton: {
    fontFamily: "Hind",
    textTransform: "none",
    paddingRight: "5px",
    fontWeight: "bold",
    textAlign: "left",
    textDecoration: "none",
    float: "left",
  },
});

export class dashboard extends Component {
  // fetch posts from server, using Axios to send HTTP requests to the server
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.data;

    let discussionPosts;

    if (loading) {
      discussionPosts = <CircularProgress />;
    } else {
      // display the posts
      discussionPosts = posts.map((post) => (
        <Post key={post.postID} post={post} />
      ));
    }

    return (
      <div>
        <Container className={classes.root} spacing={0}>
          <Grid container className={classes.grid}>
            <Grid item sm={2}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.recentPostsButton}>
                Recent posts
                <IconButton className={classes.dropDownButton}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Button>
            </Grid>
            <Grid item sm={8}></Grid>
            <Grid item sm={2}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search QueuedUp…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
          </Grid>
          <Container>{discussionPosts}</Container>
        </Container>
      </div>
    );
  }
}

dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(
  withStyles(styles)(dashboard)
);
