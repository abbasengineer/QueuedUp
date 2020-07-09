import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { Button } from "@material-ui/core";
import Link from 'react-router-dom/Link';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
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
}));

export default function QueuedUpAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "queued-up-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose} component = {Link} to='/'>
        Home
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose} component = {Link} to='/login'>
        Log In
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose} component = {Link} to='/signup'>
        Sign Up
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
        Log Out
      </MenuItem>
    </Menu>
  );

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
          />
          <Typography
            className={classes.title}
            variant="h4"
            noWrap
            style={{ color: "#434343" }}>
            QueuedUp
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="#434343">
              <AddCommentIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="my account"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="#434343">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
