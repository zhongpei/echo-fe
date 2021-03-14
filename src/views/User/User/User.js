import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { Toolbar, Table } from './components';
import apis from 'apis';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const User = () => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState('');
  const [limit] = useState(10);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [refresh1, setRefresh1] = useState(+new Date());
  const [refresh2, setRefresh2] = useState(+new Date());

  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);

  useEffect(() => {
    const getData = () => {
      apis.downstream({ page: page1, pageSize: 1000 }).then(res => {
        if (res.status === 0) {
          setTable1(res.data.records || []);
        }
      }).catch(e => console.log(e));
    }
    getData();
  }, [refresh1, page1]);
  useEffect(() => {
    const getData = () => {
      apis.nat({ page: page2, pageSize: 1000 }).then(res => {
        if (res.status === 0) {
          setTable2(res.data.records || []);
        }
      }).catch(e => console.log(e));
    }
    getData();
  }, [refresh2, page2]);

  const showTable1 = table1.filter(item => {
    return JSON.stringify(item).includes(keyword);
  });
  const showTable2 = table2.filter(item => {
    return JSON.stringify(item).includes(keyword);
  });

  return (
    <div className={classes.root}>
      <Toolbar onInputChange={(k) => {
        setKeyword(k);
        setPage1(1);
        setPage2(1);
      }} setRefresh={(val) => {
        setRefresh1(val);
        setRefresh2(val);
      }} />
      <div className={classes.content}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              代理出口服务器
            </Typography>
            <Table
              data={showTable1.slice((page1 - 1) * limit, page1 * limit)}
              total={showTable1.length}
              rowsPerPage={limit}
              pageState={[page1, setPage1]}
              changeStatus={'downstreamStatus'}
              setRefresh={setRefresh1} />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              Nat 服务器
            </Typography>
            <Table
              data={showTable2.slice((page2 - 1) * limit, page2 * limit)}
              total={showTable2.length}
              rowsPerPage={limit}
              pageState={[page2, setPage2]}
              changeStatus={'natStatus'}
              setRefresh={setRefresh2} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default User;
