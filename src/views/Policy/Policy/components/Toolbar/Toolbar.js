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
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

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
}));

const Toolbar = props => {
  const { className, onInputChange, setRefresh, ...rest } = props;

  const classes = useStyles();
  const [account, setAccount] = useState('');

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
          startIcon={<QueuePlayNextIcon />}
          color="primary"
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          添加白名单
        </Button>
      </div>
      <OpeDialog
        title="添加白名单"
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
                  IP
                </Typography>
                <TextField
                  className={classes.dialogInput}
                  size="small"
                  variant="outlined"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)} />
              </Grid>
            </Grid>
          </>
        )}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        doDialog={() => {
          return apis.whiteListAdd({
            ip: account
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
