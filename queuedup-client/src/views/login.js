import React, { Component } from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'; 
const styles = {
  form: {
  textAlign : 'center'
 },
 loginTitle:{
  margin: '2px auto 40px auto'
 },
 TextField:{
  margin: '60px auto 0px auto'
 },
 button:{
  margin: '80px auto 0px auto'
 },
 customError:{
    color: 'red',
    frontSize: '0.8rem'
 }
};

class login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
      
    }
  }
  handleSubmit = (event) =>{
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/login', userData)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err =>{
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })

  };
  handleChange = (event) =>{
    this.setState({
    [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <Typography variant='h3' className={classes.loginTitle}> 
            Welcome Back
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id="email" 
              name="email" 
              type="email" 
              label="Email" 
              className={classes.TextField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email} 
              onChange={this.handleChange} 
              fullWidth/>
              <TextField 
                id="password" 
                name="password" 
                type="password" 
                label="Password" 
                className={classes.TextField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password} 
                onChange={this.handleChange} 
                fullWidth/>
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Log In
            </Button>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(login);
