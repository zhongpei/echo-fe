import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CellWifiIcon from '@material-ui/icons/CellWifi';
import GrainIcon from '@material-ui/icons/Grain';
import TelegramIcon from '@material-ui/icons/Telegram';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import { AppContext } from 'adapter';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { user } = useContext(AppContext);
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: '概览',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: '白名单配置',
      href: '/policy',
      icon: <GrainIcon />
    },
    {
      title: '代理',
      href: '/proxy',
      icon: <TelegramIcon />
    },
  ];

  if (user.isAdmin) {
    pages.push({
      title: '(Admin)账号信息',
      href: '/account',
      icon: <ChildCareIcon />
    });
    pages.push({
      title: '(Admin)代理服务器',
      href: '/users',
      icon: <CellWifiIcon />
    });
    pages.push({
      title: '(Admin)账号白名单',
      href: '/admin',
      icon: <TouchAppIcon />
    });
  }

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
