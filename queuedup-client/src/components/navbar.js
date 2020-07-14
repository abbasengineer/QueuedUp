import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logoutUser } from "../redux/actions/user-actions";
import { connect } from "react-redux";
import AddPost from "./add-post";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: "none",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontFamily: "Hind",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  menuItem: {
    fontFamily: "Hind",
  },
});

class QueuedUpAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutClose = (event) => {
    event.preventDefault();

    this.handleClose();
    this.props.logoutUser();
  };

  render() {
    const { classes, isAuth } = this.props;

    let { anchorEl } = this.state;

    const isMenuOpen = Boolean(anchorEl);
    const menuId = "queued-up-account-menu";

    const loggedInMenu = (
      <Fragment>
        <MenuItem className={classes.menuItem} onClick={this.handleLogoutClose}>
          Log Out
        </MenuItem>
      </Fragment>
    );

    const loggedOutMenu = (
      <Fragment>
        <MenuItem
          className={classes.menuItem}
          onClick={this.handleClose}
          component={Link}
          to="/login">
          Log In
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={this.handleClose}
          component={Link}
          to="/signup">
          Sign Up
        </MenuItem>
      </Fragment>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isMenuOpen}
        onClose={this.handleClose}
        getContentAnchorEl={null}>
        {isAuth ? loggedInMenu : loggedOutMenu}
      </Menu>
    );

    const addPostIcon = <AddPost />;

    return (
      <div className={classes.grow}>
        <AppBar
          position="static"
          style={{ background: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <img
              style={{ display: "flex", padding: 15 }}
              src="logo.png"
              alt="logo"
              height="40"
              width="40"
              component={Link}
              to="/"></img>
            <Typography
              className={classes.title}
              color="secondary"
              variant="h4"
              noWrap
              component={Link}
              to="/">
              QueuedUp
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isAuth ? addPostIcon : null}
              <IconButton
                edge="end"
                aria-label="my account"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleOpen}>
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

QueuedUpAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

const mapActionsToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(QueuedUpAppBar));
