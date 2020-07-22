import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { connect } from "react-redux";
import { addComment } from "../redux/actions/data-actions";

const styles = (theme) => ({
  formGrid: {
    textAlign: "center",
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
    float: "right",
  },
});

class AddCommentForm extends Component {
  state = {
    content: "",
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.UI.loading) {
      this.setState({ content: "" }); // clear text after submit
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.props.postID, { content: this.state.content });
  };

  render() {
    const { classes, isAuth } = this.props;

    return (
      <Grid item className={classes.formGrid}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="content"
            type="text"
            autoComplete="off"
            label={
              isAuth ? (
                <span style={{ fontFamily: "Hind" }}>Comment on this post</span>
              ) : (
                <span style={{ fontFamily: "Hind" }}>
                  Log in to join the conversation
                </span>
              )
            }
            disabled={!isAuth}
            value={this.state.content}
            onChange={this.handleChange}
            fullWidth
            inputProps={{
              className: classes.textField,
            }}></TextField>
          <Grid container wrap="nowrap">
            <Grid item xs={9}></Grid>
            <Grid item>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SendIcon />}
                disabled={!isAuth}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  }
}

AddCommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  UI: state.UI,
});

export default connect(mapStateToProps, { addComment })(
  withStyles(styles)(AddCommentForm)
);
