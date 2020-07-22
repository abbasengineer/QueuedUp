import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import defaultUserImage from '../images/defaultUserImage.png';
// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import School from '@material-ui/icons/School';
import HistoryEdu from '@material-ui/icons/HistoryEdu';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme,
  username: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  }
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={defaultUserImage} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.username} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <School color="primary"/> <span>College</span>
          <hr />
          <HistoryEdu color="primary"/> <span> Major </span>
          <hr />
          <CalendarToday color="primary" /> Member since
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);