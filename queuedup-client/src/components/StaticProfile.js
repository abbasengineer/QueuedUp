import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
// mui stuff
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";
// icons
import School from "@material-ui/icons/School";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
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
  calendarButton: {
    verticalAlign: "middle",
  },
  memberSince: {
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
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: {
      username,
      createdAt,
      imageURL,
      fullName,
      aboutMe,
      college,
      major,
    },
  } = props;

  return (
    <div>
      <Grid container>
        <Grid item>
          <Avatar
            variant="rounded"
            src={imageURL}
            title={username}
            className={classes.image}
          ></Avatar>
        </Grid>
        <Grid item xs>
          <Typography className={classes.username} color="secondary">
            {username}
          </Typography>
          <Typography className={classes.memberSince}>
            <CalendarToday className={classes.calendarButton} color="primary" />{" "}
            Member since {dayjs(createdAt).format("MMM YYYY")}
          </Typography>
        </Grid>
      </Grid>
      <hr className={classes.hr} />
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography className={classes.fieldTitle} color="secondary">
            Name
          </Typography>
          <Typography className={classes.field} color="secondary">
            {fullName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.fieldTitle} color="secondary">
            About Me
          </Typography>
          <Typography className={classes.field} color="secondary">
            {aboutMe}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.fieldTitle} color="secondary">
            Major
          </Typography>
          <Typography className={classes.field} color="secondary">
            {major}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.fieldTitle} color="secondary">
            College
          </Typography>
          <Typography className={classes.field} color="secondary">
            {college}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
