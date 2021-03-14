import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { AppContext } from 'adapter';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const { user } = useContext(AppContext);
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        className={classes.purple}
        component={RouterLink}
        to="/"
      >
        {user.userName ? user.userName[0] : ''}
      </Avatar>
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.userName}
      </Typography>
      <Typography variant="body2">登录时间: {user.time}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
