import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { editPost } from "../redux/actions/data-actions";

const styles = (theme) => ({
  grid: {
    marginTop: 15,
  },
  dialogContent: {
    fontFamily: "Hind",
  },
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

class EditPost extends Component {
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
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.editPost(this.props.postID, { content: this.state.content });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <Grid container className={classes.grid}>
          <Grid item>
            <Tooltip title="Edit post" placement="bottom">
              <IconButton
                className={classes.editButton}
                onClick={this.handleOpen}
                size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <DialogTitle>
            <span
              id="alert-dialog-title"
              style={{ fontFamily: "Hind", color: "secondary" }}>
              Edit post
            </span>
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                className={classes.dialogContent}
                name="content"
                type="text"
                multiline
                rows={6}
                label={
                  <span style={{ fontFamily: "Hind" }}>Choose wisely</span>
                }
                error={errors.content ? true : false}
                helperText={errors.content}
                inputProps={{
                  className: classes.textField,
                }}
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
    );
  }
}

EditPost.propTypes = {
  classes: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  editPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  UI: state.UI,
});

export default connect(mapStateToProps, { editPost })(
  withStyles(styles)(EditPost)
);
