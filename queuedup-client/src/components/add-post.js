// form to add a new post
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddPostIcon from "@material-ui/icons/AddComment";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import { addPost } from "../redux/actions/data-actions";
import { connect } from "react-redux";

const styles = (theme) => ({
  dialogContent: {
    padding: 20,
  },
  textField: {
    fontFamily: "Hind",
  },
  submitButton: {
    margin: "10px auto 0px auto",
    fontFamily: "Hind",
    textTransform: "none",
    fontSize: "15px",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    opacity: "0.2",
    size: "small",
    position: "absolute",
    left: "90%",
  },
});

class AddPost extends Component {
  state = {
    open: false,
    content: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ content: "" });
      this.handleClose();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
    window.location.href = "/"; // redirect page to dashboard to see new post
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addPost({ content: this.state.content });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <IconButton onClick={this.handleOpen} tip="Add a post">
          <AddPostIcon />
        </IconButton>
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
          <Grid item className={classes.formGrid}>
            <DialogTitle>
              <span style={{ fontFamily: "Hind", color: "secondary" }}>
                Add a post
              </span>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="content"
                  type="text"
                  label={
                    <span style={{ fontFamily: "Hind" }}>
                      Post to your fellow engineering peers
                    </span>
                  }
                  error={errors.content ? true : false}
                  helperText={errors.content}
                  inputProps={{
                    className: classes.textField,
                  }}
                  multiline="true"
                  onChange={this.handleChange}
                  fullWidth
                />
                <Grid container wrap="nowrap">
                  <Grid item sm={10}></Grid>
                  <Grid item>
                    <Button
                      className={classes.submitButton}
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="medium"
                      buttonStyle={{ justifyContent: "flex-end" }}
                      startIcon={<SendIcon />}
                      disabled={loading}>
                      Submit
                      {loading && (
                        <CircularProgress
                          size={30}
                          className={classes.progressSpinner}
                        />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </Grid>
        </Dialog>
      </Fragment>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  UI: state.UI,
});

export default connect(mapStateToProps, { addPost })(
  withStyles(styles)(AddPost)
);
