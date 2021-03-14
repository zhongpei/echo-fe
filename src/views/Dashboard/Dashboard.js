import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
  Policy,
  Device,
} from './components';
import apis from 'apis';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [device, setDevice] = useState([]);
  const [whitelist, setWhitelit] = useState([]);

  useEffect(() => {
    const getData = () => {
      apis.whiteList().then(res => {
        if (res.status === 0) {
          setWhitelit(res.data);
        }
      }).catch(e => console.log(e));

      apis.getDevice({ page: 1, pageSize: 1000 }).then(res => {
        if (res.status === 0) {
          setDevice(res.data.records);
        }
      }).catch(e => console.log(e));
    }
    getData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          sm={8}
          xs={12}
        >
          <Device />
        </Grid>
        <Grid
          item
          sm={4}
          xs={12}
        >
          <Policy whitelist={whitelist} device={device} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
