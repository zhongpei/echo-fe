import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@material-ui/core';

import Empty from '../Empty';

const DataTable = props => {
  let {
    data,
    columns,
    size = "medium",
    checkbox = false,
    checkedKey = '',
    checked = [],
    handleSelectAll = () => { },
    handleSelectOne = () => { },
  } = props;

  return (
    <PerfectScrollbar>
      <Table size={size}>
        <TableHead>
          <TableRow>
            {checkbox ? (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={checked.length === data.length}
                  color="primary"
                  indeterminate={
                    checked.length > 0 &&
                    checked.length < data.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
            ) : null}
            {columns.map(item => (
              <TableCell key={item.label}>{item.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {data.length > 0 ? (
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                hover
                key={String(index)}
              >
                {checkbox ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={checked.indexOf(row[checkedKey]) !== -1}
                      color="primary"
                      onChange={event => handleSelectOne(event, row[checkedKey])}
                      value="true"
                    />
                  </TableCell>
                ) : null}
                {columns.map(col => (
                  <TableCell key={col.label}>{typeof col.render === 'function' ? col.render(row) : row[col.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + (checkbox ? 1 : 0)}>
                  <Empty text="暂无数据" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
      </Table>
    </PerfectScrollbar>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default DataTable;
