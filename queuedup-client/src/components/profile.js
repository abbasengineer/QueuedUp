import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { getProfileData } from "../redux/actions/data-actions";

// mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import { uploadImage } from "../redux/actions/user-actions";

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

// profile of currently logged-in user
export class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const {
      classes,
      user: {
        credentials: {
          username,
          fullName,
          createdAt,
          imageURL,
          aboutMe,
          college,
          major,
        },
        isAuth,
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
          maxWidth="sm"
        >
          <IconButton
            className={classes.closeButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.dialogContent}>
            <Grid container>
              <Grid item>
                <Avatar
                  variant="rounded"
                  src={imageURL}
                  title={username}
                  className={classes.image}
                ></Avatar>
              </Grid>
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
                accept="image/*"
                hidden="hidden"
              />
              <Tooltip title="Edit profile picture" placement="bottom">
                <IconButton onClick={this.handleEditPicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
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
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  user: state.user,
  open: state.open,
});

const mapActionsToProps = { uploadImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
