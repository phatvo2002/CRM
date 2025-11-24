import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
  gridPageSizeSelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Box, MenuItem, Select, IconButton, Typography, InputAdornment, Tooltip, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
// Styled DataGrid with modern look
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  fontSize: '0.875rem',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.primary,
  '& .MuiDataGrid-row': {
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.grey[100],
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
  },
}));

// Custom Pagination Component
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handlePageSizeChange = React.useCallback(
    (event) => {
      const newSize = event.target.value;
      apiRef.current.setPageSize(newSize);
    },
    [apiRef]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        backgroundColor: 'background.primary',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      {/* Page Size Selector */}
      <Select
        value={pageSize}
        onChange={handlePageSizeChange}
        size="small"
        variant="outlined"
        sx={{
          minWidth: 120,
          backgroundColor: 'background.primary',
          borderRadius: 1,
          '& .MuiSelect-select': {
            padding: '6px 12px',
          },
        }}
      >
        {[10, 25, 50, 100].map((size) => (
          <MenuItem key={size} value={size}>
            Hiển thị {size} dòng
          </MenuItem>
        ))}
      </Select>

      {/* Pagination */}
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        page={page + 1}
        count={pageCount}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'background.primary',
              color: 'primary.contrastText',
            },
            '&.Mui-selected': {
              backgroundColor: 'background.primary',
              color: 'primary.contrastText',
            },
          },
        }}
        renderItem={(props) => <PaginationItem {...props} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
}

// Custom Toolbar Component
// const CustomToolbar = () => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 1,
//         borderBottom: 1,
//         borderColor: 'divider',
//         backgroundColor: 'grey.50',
//       }}
//     >
//       <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
//         Dữ liệu
//       </Typography>
//       <Box sx={{ display: 'flex', gap: 1 }}>
//         <GridToolbar
//           slotProps={{
//             quickFilter: {
//               placeholder: 'Tìm kiếm...',
//               InputProps: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               },
//               sx: {
//                 width: 300,
//                 '& .MuiInputBase-root': {
//                   borderRadius: 1,
//                   backgroundColor: 'background.primary',
//                 },
//               },
//             },
//           }}
//         />
//         <IconButton color="primary" aria-label="filter">
//           <FilterListIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

const CustomToolbar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1.5,
        backgroundColor: 'background.primary',
        borderRadius: '8px 8px 0 0',
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        Dữ liệu
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 250,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              backgroundColor: 'background.paper',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Tooltip title="Bộ lọc">
          <IconButton color="primary" aria-label="filter">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xuất dữ liệu">
          <IconButton color="primary" aria-label="export">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
// Main CustomDatagrid Component
const CustomDatagrid = ({
  rows,
  columns,
  pageSizeOptions = [10, 25, 50, 100],
  initialPageSize = 25,
  getRowId,
  count,
  checkboxSelection,
  disableMultipleSelection = false,
  disableRowSelectionOnClick = true,
  showTopToolbar = true,
  onRowSelectionChange,
  onPaginationChange,
  height = 'auto',
}) => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: initialPageSize,
    page: 0,
  });



  const handleRowSelectionChange = (newRowSelectionModel) => {
    if (onRowSelectionChange) {
      const selectedRows = rows.filter((row) => newRowSelectionModel.includes(row.id));
      onRowSelectionChange(selectedRows);
    }
  };

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);


    if (onPaginationChange) {
      onPaginationChange({
        pageNumber: newModel.page + 1,
        pageSize: newModel.pageSize,
      });
    }
  };

 


  return (
    <Box
      sx={{
        width: '100%',
        height :'100%',
        overflow: 'auto',
        borderRadius: 1,
        backgroundColor: 'background.primary',
      }}
    >
      <StyledDataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection}
        disableMultipleSelection={disableMultipleSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={pageSizeOptions}
        showCellVerticalBorder
        getRowId={getRowId}
        sx={{
          '& .MuiDataGrid-main': {
            borderRadius: 1,
          },
        }}
        localeText={{
          toolbarColumns: 'Cột',
          toolbarFilters: 'Bộ lọc',
          toolbarDensity: 'Mật độ',
          toolbarExport: 'Xuất dữ liệu',
          toolbarQuickFilterPlaceholder: 'Tìm kiếm',
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: initialPageSize, page: 1},
          },
        }}
        onRowSelectionModelChange={handleRowSelectionChange}
        slots={{
          pagination: CustomPagination,
          toolbar: showTopToolbar ? CustomToolbar : null,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          },
        }}
      />
    </Box>
  );
};

export default  CustomDatagrid;