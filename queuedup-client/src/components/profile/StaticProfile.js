// import React, { Fragment } from "react";
// import PropTypes from "prop-types";
// import withStyles from "@material-ui/core/styles/withStyles";
// import dayjs from "dayjs";
// import { Link } from "react-router-dom";
// // mui stuff
// import MuiLink from "@material-ui/core/Link";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// // icons
// import School from "@material-ui/icons/School";
// import HistoryEdu from "@material-ui/icons/HistoryEdu";
// import CalendarToday from "@material-ui/icons/CalendarToday";

// const styles = (theme) => ({
//   paper: {
//     padding: 20,
//   },
//   profile: {
//     "& .image-wrapper": {
//       textAlign: "center",
//       position: "relative",
//     },
//     "& .profile-image": {
//       width: 200,
//       height: 200,
//       objectFit: "cover",
//       maxWidth: "100%",
//       borderRadius: "50%",
//     },
//     "& .profile-details": {
//       textAlign: "center",
//       "& span, svg": {
//         verticalAlign: "middle",
//       },
//       "& a": {
//         color: theme.palette.primary.main,
//       },
//     },
//     "& hr": {
//       border: "none",
//       margin: "0 0 10px 0",
//     },
//   },
// });

// const StaticProfile = (props) => {
//   const {
//     classes,
//     profile: { username, createdAt, imageURL, aboutMe, college, major },
//   } = props;

//   return (
//     <Paper className={classes.paper}>
//       <div className={classes.profile}>
//         <div className="image-wrapper">
//           <img className="profile-image" src={imageURL} alt={username} />
//         </div>
//         <MuiLink
//           component={Link}
//           to={`/users/${username}`}
//           color="primary"
//           variant="h5"
//         >
//           {username}
//         </MuiLink>
//         <hr />
//         {aboutMe && <Typography variant="body2">{aboutMe}</Typography>}
//         <hr />
//         {college && (
//           <Fragment>
//             <School color="primary" /> <span>{college}</span>
//             <hr />
//           </Fragment>
//         )}
//         {major && (
//           <Fragment>
//             <HistoryEdu color="primary" /> <span>{major}</span>
//             <hr />
//           </Fragment>
//         )}
//         <CalendarToday color="primary" />{" "}
//         <span>Member since {dayjs(createdAt).format("MMM YYYY")}</span>
//       </div>
//     </Paper>
//   );
// };

// StaticProfile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(StaticProfile);
