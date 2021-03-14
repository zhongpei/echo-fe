import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { SearchInput, OpeDialog } from 'components';
import {
  Button,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';

import clsx from 'clsx';
import LineStyle from '@material-ui/icons/LineStyle';
import LeakAdd from '@material-ui/icons/LeakAdd';

import apis from 'apis';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {},
  dialog: {
    width: theme.spacing(60)
  },
  dialogInput: {
    width: '100%'
  },
  ml: {
    marginLeft: theme.spacing(2)
  },
}));

const Toolbar = props => {
  const { className, onInputChange, setRefresh, ...rest } = props;

  const classes = useStyles();
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onChange={(v) => onInputChange(v)}
          placeholder="请输入关键词进行查询"
        />
        <span className={classes.spacer} />
        <Button
          startIcon={<LineStyle />}
          color="primary"
          variant="contained"
          onClick={() => { setOpenDialog(true); setMethod('downstreamAdd') }}
        >
          添加代理出口服务器
        </Button>
        <Button
          className={classes.ml}
          startIcon={<LeakAdd />}
          color="primary"
          variant="contained"
          onClick={() => { setOpenDialog(true); setMethod('natAdd') }}
        >
          添加 nat 服务器
        </Button>
      </div>
      <OpeDialog
        title="添加代理账号"
        opeContent={(
          <>
            <Grid
              container
              spacing={6}
              wrap="wrap"
            >
              <Grid
                item
                xs={12}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                >
                  URL
                </Typography>
                <TextField
                  className={classes.dialogInput}
                  size="small"
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)} />
              </Grid>
            </Grid>
          </>
        )}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        doDialog={() => {
          return apis[method]({
            apiUrl: url
          }).then(res => {
            if (res.status === 0) {
              setRefresh(+new Date());
              return '操作成功';
            }
            throw new Error(res.message);
          });
        }}
        okText="保存"
        okType="primary" />
    </div>
  );
};

export default Toolbar;
