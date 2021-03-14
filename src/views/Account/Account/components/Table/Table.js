import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import DirectionsRailwayIcon from '@material-ui/icons/DirectionsRailway';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { makeStyles } from '@material-ui/styles';
import { Table } from 'views/common';
import { useSnackbar } from 'notistack';
import { OpeDialog } from 'components';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { AppContext } from 'adapter';
import moment from 'moment';

import apis from 'apis';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    justifyContent: 'center'
  },
  tableButton: {
    marginRight: theme.spacing(1)
  },
}));

const DataTable = props => {
  const { setUser } = useContext(AppContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { className, data, total, rowsPerPage, pageState, setRefresh, ...rest } = props;
  const [page, setPage] = pageState;

  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState({});

  const classes = useStyles();

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const doLogin = (item) => {
    apis.login({
      userName: item.userName,
      password: item.passwd,
    }).then(res => {
      if (res.status !== 0) {
        enqueueSnackbar(res.errorMessage || res.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      } else {
        apis.setStore({ ...res.data, mock: true }, "Echo-4G-USER-MOCK");
        setUser({
          ...res.data,
          mock: true,
          time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });
        history.push('/');
      }
    });
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Table
          data={data}
          columns={[
            {
              label: 'ID',
              key: 'id'
            }, {
              label: '账号',
              key: 'userName'
            }, {
              label: '密码',
              key: 'passwd'
            }, {
              label: 'auth',
              render: (item) => (
                <span>{item.authAccount ? `${item.authAccount}/${item.authPwd}` : ''}</span>
              )
            }, {
              label: 'user',
              key: 'userQuota'
            }, {
              label: 'register',
              key: 'registerQuota'
            }, {
              label: 'qps',
              key: 'qpsQuota'
            }, {
              label: 'white-ip',
              key: 'authWhiteIpCount'
            }, {
              label: '操作',
              render: (item) => (
                <>
                  <Button
                    startIcon={<DeviceHubIcon style={{ fontSize: 16 }} />}
                    size="small"
                    color="primary"
                    className={classes.tableButton}
                    onClick={() => { setEdit(item); setOpenDialog(true) }}
                    variant="contained">编辑</Button>
                  <Button
                    startIcon={<DirectionsRailwayIcon style={{ fontSize: 16 }} />}
                    size="small"
                    color="primary"
                    className={classes.tableButton}
                    onClick={() => doLogin(item)}
                    variant="contained">登录</Button>
                </>
              )
            }
          ]}
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Pagination
          count={Math.ceil(total / rowsPerPage) || 1}
          page={page}
          onChange={handlePageChange}
          shape="rounded" />
      </CardActions>
      <OpeDialog
        title="修改参数"
        opeContent={(
          <>
            <Grid
              container
              spacing={6}
              wrap="wrap"
            >
              <Grid item xs={6} >
                <Typography gutterBottom variant="h6" >
                  user-quota
                </Typography>
                <TextField
                  className={classes.dialogInput}
                  size="small"
                  variant="outlined"
                  value={edit.userQuota}
                  onChange={(e) => setEdit({ ...edit, userQuota: e.target.value })} />
              </Grid>
              <Grid item xs={6} >
                <Typography gutterBottom variant="h6" >
                  register-quota
                </Typography>
                <TextField
                  className={classes.dialogInput}
                  size="small"
                  variant="outlined"
                  value={edit.registerQuota}
                  onChange={(e) => setEdit({ ...edit, registerQuota: e.target.value })} />
              </Grid>
              <Grid item xs={6} >
                <Typography gutterBottom variant="h6" >
                  qps-quota
                </Typography>
                <TextField
                  className={classes.dialogInput}
                  size="small"
                  variant="outlined"
                  value={edit.qpsQuota}
                  onChange={(e) => setEdit({ ...edit, qpsQuota: e.target.value })} />
              </Grid>
              <Grid item xs={6} >
                <Typography gutterBottom variant="h6" >
                  whitelist-count
                </Typography>
                <TextField
                  className={classes.dialogInput}
                  size="small"
                  variant="outlined"
                  value={edit.authWhiteIpCount}
                  onChange={(e) => setEdit({ ...edit, authWhiteIpCount: e.target.value })} />
              </Grid>
            </Grid>
          </>
        )}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        doDialog={() => {
          return apis.userQuota({
            userId: edit.id,
            registerQuota: edit.registerQuota,
            authWhiteIpCount: edit.authWhiteIpCount,
            userQuota: edit.userQuota,
            qpsQuota: edit.qpsQuota
          }).then(res => {
            if (res.status === 0) {
              setRefresh(+new Date());
              setEdit({});
              return '操作成功';
            }
            throw new Error(res.message);
          });
        }}
        okText="保存"
        okType="primary" />
    </Card>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default DataTable;
