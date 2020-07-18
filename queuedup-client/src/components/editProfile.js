import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {editUserDetails} from '../redux/actions/user-actions';

import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/icons/IconButton";
import Button from "@material-ui/icons/Button";
import TextField from "@material-ui/icons/TextField";

const styles = (theme) => ({
      textField: {
        fontFamily: "Hind",
      },
      editButton: {
        opacity: "0.3",
        margin: "0",
        padding: "0",
      },
      confirmButton: {
        fontFamily: "Hind",
        textTransform: "none",
      },
      progressSpinner: {
        position: "absolute",
      },
  });

class editProfile extends Component {
    state ={
        fullName: '',
        aboutMe: '',
        College: '',
        Major: '',
        open: false
    };

    handleOpen = () => {
        this.setState({ 
            open: true,
            fullName: credentials.bio ? credentials.fullName : '',
            aboutMe: credentials.bio ? credentials.aboutMe : '',
            College: credentials.bio ? credentials.College : '',
            Major: credentials.bio ? credentials.Major : ''
        });
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    handleSubmit = (event) => {
        event.preventDefault();
        const userDetails = {
            fullName: this.state.fullName,
            aboutMe: this.state.aboutMe,
            College: this.state.College,
            Major: this.state.Major,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
     };

    componentDidMount(){
        const { credentials } = this.props;
        this.setState({
            fullName: credentials.bio ? credentials.fullName : '',
            aboutMe: credentials.bio ? credentials.aboutMe : '',
            College: credentials.bio ? credentials.College : '',
            Major: credentials.bio ? credentials.Major : ''
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit profile" placement="top">
                    <IconButton 
                    onClick = {this.handleOpen} 
                    className={classes.editButton}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="md">
                <DialogTitle>
                    <span
                    id="alert-dialog-title"
                    style={{ fontFamily: "Hind", color: "secondary" }}>
                    Edit your profile
                    </span>
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                        name="fullName"
                        type="text"
                        label="Full Name"
                        className= {classes.textField}
                        value={this.state.fullName}
                        placeholder="Your full name"
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                        name="aboutMe"
                        type="text"
                        label="About Me"
                        className= {classes.textField}
                        multiline
                        value={this.state.aboutMe}
                        placeholder="Write something about yourself"
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                        name="college"
                        type="text"
                        label="College"
                        className= {classes.textField}
                        value={this.state.College}
                        placeholder="Your college in UCSC"
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                        name="major"
                        type="text"
                        label="Major"
                        className= {classes.textField}
                        value={this.state.Major}
                        placeholder="Your major in UCSC"
                        onChange={this.handleChange}
                        fullWidth
                        />
                    </form>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.confirmButton}
              onClick={this.handleClose}
              type="submit"
              variant="contained"
              color="primary"
              size="medium">
              Cancel
            </Button>
            <Button
              className={classes.confirmButton}
              onClick={this.handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              disabled={loading}>
              Edit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
        </Fragment>
            

        )
    }
}

editProfile.PropTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails}) (withStyles(styles)(editProfile));
