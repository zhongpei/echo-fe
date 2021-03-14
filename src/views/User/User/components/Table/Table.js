import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Table } from 'views/common';
import { useSnackbar } from 'notistack';
import {
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';

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
  const { enqueueSnackbar } = useSnackbar();
  const { className, data, total, rowsPerPage, pageState, setRefresh, ...rest } = props;
  const [page, setPage] = pageState;

  const classes = useStyles();

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleChange = (item) => {
    apis[props.changeStatus]({ id: item.id, enabled: !item.enabled })
      .then(res => {
        if (res.status === 0) {
          enqueueSnackbar('操作成功', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
          setRefresh(+new Date());
        } else {
          enqueueSnackbar(res.error, {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
        }
      }).catch((e) => {
        enqueueSnackbar(e.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
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
              label: 'SID',
              key: 'serverId'
            }, {
              label: 'URL',
              key: 'apiBaseUrl'
            }, {
              label: '',
              render: (item) => (
                <>
                  <Switch
                    checked={item.enabled}
                    onChange={() => handleChange(item)}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
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
    </Card>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default DataTable;
