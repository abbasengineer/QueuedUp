import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// mui
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import { CircularProgress } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Tooltip from "@material-ui/core/Tooltip";

// icons
import School from "@material-ui/icons/School";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Mood from "@material-ui/icons/Mood";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  closeButton: {
    opacity: "0.2",
    size: "small",
    position: "absolute",
    left: "90%",
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  dialogContent: {
    padding: 20,
  },
});

export class Profile extends Component {
  onClose = (event) => {
    this.props.onClose && this.props.onClose(event);
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const {
      classes,
      user: {
        credentials: { username, createdAt, imageURL, aboutMe, college, major },
        loading,
        isAuth,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      <Fragment>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <IconButton
            className={classes.closeButton}
            onClick={this.handleClose}
            alignItems="center"
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.dialogContent}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img className="profile-image" src={imageURL} alt={username} />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <Tooltip
                  title={"Edit profile picture"}
                  className={classes.button}
                  placement="top"
                >
                  <IconButton onClick={this.handleEditPicture}>
                    <EditIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </div>
              <MuiLink
                component={Link}
                to={`/users/${username}`}
                color="primary"
                variant="h5"
              >
                {username}
              </MuiLink>
              <hr />
              {aboutMe && <Typography variant="body2">{aboutMe}</Typography>}
              <hr />
              {college && (
                <Fragment>
                  <AccountBalanceIcon color="primary" /> <span>{college}</span>
                  <hr />
                </Fragment>
              )}
              {major && (
                <Fragment>
                  <School color="primary" /> <span>{major}</span>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Member since {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    ) : (
      <CircularProgress />
    );

    if (!this.props.show) {
      return null;
    } else {
      return profileMarkup;
    }
  }
}

Profile.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
