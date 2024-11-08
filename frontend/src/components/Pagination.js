import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

const StyledTablePagination = styled(TablePagination)`

  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows,
  .MuiTablePagination-actions {
    margin: 0;
  }

  .MuiSelect-select {
    padding: 0;
  }
`;

export default function Pagination({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  return (
    <StyledTablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
}