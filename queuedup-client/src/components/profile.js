import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

// icons
import School from "@material-ui/icons/School";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  image: {
    minWidth: 130,
    minHeight: 130,
  },
  username: {
    fontFamily: "Hind",
    fontWeight: "bold",
    textAlign: "left",
    textDecoration: "none",
    fontSize: "35px",
    paddingLeft: 15,
  },
  calendarButton: {
    verticalAlign: "middle",
  },
  memberSince: {
    fontFamily: "Hind",
    opacity: "0.6",
    paddingTop: 15,
    paddingLeft: 15,
  },
  hr: {
    clear: "both",
    visibility: "hidden",
  },
  fieldTitle: {
    fontFamily: "Hind",
    fontWeight: "bold",
  },
  field: {
    fontFamily: "Hind",
  },
  closeButton: {
    opacity: "0.2",
    size: "small",
    position: "absolute",
    left: "90%",
  },
  dialogContent: {
    padding: 20,
  },
  menuItem: {
    fontFamily: "Hind",
  },
});

export class Profile extends Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      user: { credentials, loading, isAuth },
      profile: {
        username,
        fullName,
        createdAt,
        imageURL,
        aboutMe,
        college,
        major,
      },
    } = this.props;

    let profileMarkup = (
      <div>
        <MenuItem className={classes.menuItem} onClick={this.handleOpen}>
          Profile
        </MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <IconButton
            className={classes.closeButton}
            onClick={this.handleClose}
            alignItems="center">
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.dialogContent}>
            <Grid container>
              <Grid item>
                <Avatar
                  variant="rounded"
                  src={imageURL}
                  title={username}
                  className={classes.image}></Avatar>
              </Grid>
              <Grid item xs>
                <Typography className={classes.username} color="secondary">
                  {username}
                </Typography>
                <Typography className={classes.memberSince}>
                  <CalendarToday
                    className={classes.calendarButton}
                    color="primary"
                  />{" "}
                  Member since {dayjs(createdAt).format("MMM YYYY")}
                </Typography>
              </Grid>
            </Grid>
            <hr className={classes.hr} />
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  Name
                </Typography>
                <Typography className={classes.field} color="secondary">
                  {fullName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  About Me
                </Typography>
                <Typography className={classes.field} color="secondary">
                  {aboutMe}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  Major
                </Typography>
                <Typography className={classes.field} color="secondary">
                  {major}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  College
                </Typography>
                <Typography className={classes.field} color="secondary">
                  {college}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
