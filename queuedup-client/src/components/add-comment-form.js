import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addComment } from "../redux/actions/data-actions";

const styles = (theme) => ({
  form: {
    textAlign: "center",
    padding: 20,
  },
  TextField: {
    align: "center",
  },
  SubmitButton: {
    margin: "10px auto 0px auto",
    fontFamily: "Hind",
    textTransform: "none",
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
      <Grid
        item
        sm={12}
        className={classes.form}
        style={{ textAlign: "center" }}
        alignItems="center">
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="content"
            type="text"
            label="Comment on this post"
            className={classes.TextField}
            value={this.state.content}
            onChange={this.handleChange}
            fullWidth></TextField>
          <Button
            className={classes.SubmitButton}
            type="submit"
            variant="contained"
            color="primary"
            size="Large"
            disabled={!isAuth}>
            Submit
          </Button>
        </form>
      </Grid>
    );
  }
}

AddCommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
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
