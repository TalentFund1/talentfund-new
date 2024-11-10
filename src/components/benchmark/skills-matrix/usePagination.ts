import { useState } from 'react';

export const usePagination = (totalItems: number) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setPage(1); // Reset to first page when changing rows per page
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return {
    page,
    rowsPerPage,
    startIndex,
    endIndex,
    totalPages,
    handlePageChange,
    handleRowsPerPageChange
  };
};