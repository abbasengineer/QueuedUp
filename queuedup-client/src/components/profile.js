import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { uploadImage } from "../redux/actions/user-actions";
import { editUserDetails } from "../redux/actions/user-actions";

// mui
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";

// icons
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
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
  icon: {
    verticalAlign: "middle",
  },
  iconTitle: {
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
  editButton: {
    fontFamily: "Hind",
    textTransform: "none",
  },
  textField: {
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
    editing: false,

    fullName: "",
    aboutMe: "",
    major: "",
    college: "",
  };

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      fullName: user.credentials.fullName ? user.credentials.fullName : "",
      aboutMe: user.credentials.aboutMe ? user.credentials.aboutMe : "",
      major: user.credentials.major ? user.credentials.major : "",
      college: user.credentials.college ? user.credentials.college : "",
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });

    const { user } = this.props;

    this.setState({
      fullName: user.credentials.fullName ? user.credentials.fullName : "",
      aboutMe: user.credentials.aboutMe ? user.credentials.aboutMe : "",
      major: user.credentials.major ? user.credentials.major : "",
      college: user.credentials.college ? user.credentials.college : "",
    });
  };

  handleEditChange = () => {
    this.setState({ editing: !this.state.editing });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const userDetails = {
      fullName: this.state.fullName,
      aboutMe: this.state.aboutMe,
      major: this.state.major,
      college: this.state.college,
    };

    this.props.editUserDetails(userDetails);
    this.handleEditChange();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { username, imageURL, createdAt },
      },
    } = this.props;

    let editProfileButton = this.state.editing ? (
      <DialogActions>
        <Button
          className={classes.editButton}
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          onClick={this.handleEditChange}>
          Cancel
        </Button>
        <Button
          className={classes.editButton}
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          onClick={this.handleSubmit}>
          Apply changes
        </Button>
      </DialogActions>
    ) : (
      <DialogActions>
        <Button
          className={classes.editButton}
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<EditIcon />}
          onClick={this.handleEditChange}>
          Edit profile
        </Button>
      </DialogActions>
    );

    let fullNameField = this.state.editing ? (
      <TextField
        name="fullName"
        type="text"
        placeholder="Your full name"
        value={this.state.fullName}
        onChange={this.handleChange}
        inputProps={{
          className: classes.textField,
        }}
      />
    ) : (
      <Typography className={classes.field} color="secondary">
        {this.props.user.credentials.fullName}
      </Typography>
    );

    let aboutMeField = this.state.editing ? (
      <TextField
        name="aboutMe"
        type="text"
        placeholder="Tell us about yourself"
        value={this.state.aboutMe}
        onChange={this.handleChange}
        inputProps={{
          className: classes.textField,
        }}
      />
    ) : (
      <Typography className={classes.field} color="secondary">
        {this.props.user.credentials.aboutMe}
      </Typography>
    );

    let majorField = this.state.editing ? (
      <TextField
        name="major"
        type="text"
        placeholder="What are you studying?"
        value={this.state.major}
        onChange={this.handleChange}
        inputProps={{
          className: classes.textField,
        }}
      />
    ) : (
      <Typography className={classes.field} color="secondary">
        {this.props.user.credentials.major}
      </Typography>
    );

    let collegeField = this.state.editing ? (
      <TextField
        name="college"
        type="text"
        placeholder="Your college at UCSC"
        value={this.state.college}
        onChange={this.handleChange}
        inputProps={{
          className: classes.textField,
        }}
      />
    ) : (
      <Typography className={classes.field} color="secondary">
        {this.props.user.credentials.college}
      </Typography>
    );

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
            onClick={this.handleClose}>
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
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
                accept="image/*"
                hidden="hidden"
              />
              <Grid item xs>
                <Typography className={classes.username} color="secondary">
                  {username}
                </Typography>
                <Typography className={classes.iconTitle}>
                  <CalendarToday className={classes.icon} color="primary" />
                  Member since {dayjs(createdAt).format("MMM YYYY")}
                </Typography>
              </Grid>
            </Grid>
            <Tooltip title="Edit profile picture" placement="bottom">
              <IconButton onClick={this.handleEditPicture} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <hr className={classes.hr} />
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  Name
                </Typography>
                {fullNameField}
              </Grid>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  About Me
                </Typography>
                {aboutMeField}
              </Grid>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  Major
                </Typography>
                {majorField}
              </Grid>
              <Grid item>
                <Typography className={classes.fieldTitle} color="secondary">
                  College
                </Typography>
                {collegeField}
              </Grid>
            </Grid>
          </DialogContent>
          {editProfileButton}
        </Dialog>
      </div>
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  user: state.user,
});

const mapActionsToProps = { uploadImage, editUserDetails };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
