// form to add a new post
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/Textfield";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { addPost } from "../redux/actions/data-actions";
import { connect } from "react-redux";


const styles = (theme) => ({
    ...theme,
    submitButton: {
        position: 'relative',
    },
    progressSpinner: {
        position: 'absolute',
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    },
});

class AddPost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    /*componentWillReceiveProps(nextProps){
        if(next.Props.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProp.UI.errors && !nextProps.UI.loading){
            this.setState({ body: ''});
            this.handleClose();
        };
    };*/

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false, errors: {} });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPost({ body: this.state.body });
    };


    render(){
        const { errors } = this.state;
        const { 
            classes, 
            UI: { loading }
        } = this.props;

        return (
            <Fragment>
                <IconButton onClick = {this.handleOpen} tip = "Add a Post!">
                    <AddIcon/>
                </IconButton>
                <Dialog 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    fullWidth 
                    maxWidth='sm'
                >
                    <IconButton 
                        tip = "Close" 
                        onClick = {this.handleClose} 
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </IconButton> 
                    <DialogTitle> Add a Post</DialogTitle>
                    <DialogContent>

                        <from onSubmit={this.handleSubmit}>

                            <TextField
                                name="body"
                                type="text"
                                label="post"
                                multiline
                                rows="3"
                                placecholder="Post to your fellow engineering peers"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" varian="contained" color="primary"
                                className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>

                        </from>

                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    classes: state.classes
});

export default connect(
    mapStateToProps, 
    { addPost }
)(withStyles(styles)(AddPost));