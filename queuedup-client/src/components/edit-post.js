import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {editPostcontent} from "../redux/actions/data-actions";

import Button from "@material-ui/core/Button";
import TextFiled from "@material-ui/core/TextFiled";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
    DeleteButton: {
      fontFamily: "Hind",
      opacity: "0.2",
      size: "small",
    },
    ConfirmButton: {
      fontFamily: "Hind",
      color: "#434343",
    },
    DialogTitle: {
      fontFamily: "Hind",
      color: "#434343",
    },
    DialogContent: {
      fontFamily: "Hind",
    },
  });

class editPost extends Component {
    state = {
        content: "",
        open: false,
    };

    componentDidMount(){
        this.setState({
            content: post.content ? post.content : ""
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
        content: post.content ? post.content : ""
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      
      handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        });
      };
      handleSubmit = () =>{
          const editedContent = {
              content: this.state.content,
              postID: this.state.postID
        };
        this.props.editPostcontent(editPostcontent);
        this.handleClose;
      }
      render() {
        const { classes } = this.props;
    
        return (
          <Fragment>
            <Tooltip
             title = "Edit Post"
             placement= "top">
                <IconButton
                className={classes.button}
                color="#434343"
                onClick={this.handleOpen}>
                <EditIcon />
                </IconButton>
             </Tooltip>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="md"> 
              <DialogTitle className={classes.DialogTitle}>
                  Edit Your Post
              </DialogTitle>
              <DialogContent>
                  <form>
                      <TextFiled
                        name = "content"
                        type= "text"
                        lable="Content"
                        multiline
                        rows="5"
                        className= {classes.TextFiled}
                        value={this.state.content}
                        onChange={this.handleChange}
                        fullWidth/>
                  </form>
              </DialogContent>
              <DialogActions>
                <Button
                  className={classes.ConfirmButton}
                  onClick={this.handleClose}
                  color="#434343">
                  Cancel
                </Button>
                <Button
                  className={classes.ConfirmButton}
                  onClick={this.handleSubmit}
                  color="#434343"
                  autoFocus>
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        );
      }
}

editPost.propTypes = {
    classes: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    editPostcontent: PropTypes.func.isRequired,
  };
const mapStateToProps = (state) => ({
    post: state.post
})
export default connect(mapStateToProps, {editPostcontent})(withStyles(styles)(editPost));
