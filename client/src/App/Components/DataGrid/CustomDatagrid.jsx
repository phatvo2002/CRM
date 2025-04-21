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
import "../DataGrid/CustomDatagrid.css"
import { Box, MenuItem, Select } from '@mui/material';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  fontSize: "1rem",
  "& .MuiDataGrid-row:nth-of-type(odd)": {
    backgroundColor: "transparent", 
  },
  "& .MuiDataGrid-row:nth-of-type(even)": {
    backgroundColor: "transparent",
  },
}));
// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   fontSize: '1rem',
//   '& .MuiDataGrid-virtualScroller': {
//     scrollbarWidth: 'none', 
//     '&::-webkit-scrollbar': {
//       display: 'none', 
//     },
//   },
// }));
// function CustomPagination() {
//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//   return (
//     <Pagination
//       color="primary"
//       variant="outlined"
//       shape="rounded"
//       showFirstButton 
//       showLastButton
//       page={page + 1}
//       sx={{
//         display: "flex",
//         paddingRight: "50%",
//       }}
//       count={pageCount}
//       renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   );
// }
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handlePageSizeChange = React.useCallback((event) => {
    const newSize = event.target.value;
    apiRef.current.setPageSize(newSize);
  }, [apiRef]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
      }}
    >
      {/* Page Size Selector */}
      <Select
        value={pageSize}
        onChange={handlePageSizeChange}
        size="small"
        variant="outlined"
        sx={{ minWidth: 100 }}
      >
        {[5, 10, 20, 50, 100].map((size) => (
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
        sx={{
          display: "flex",
        }}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </Box>
  );
}
const CustomDatagrid = ({
  rows ,
  columns ,
  pageSizeOptions = [10, 25, 50, 100],
  initialPageSize = 25,
  getRowId,
  checkboxSelection ,
  disableMultipleSelection = false,
  disableRowSelectionOnClick = true,
  showTopToolbar ,
  onRowSelectionChange,
  height
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
  const CustomHeaderWithToolbar = () => {
    return (
      <div style={{ display: 'flex',fontSize:"1rem", justifyContent: 'space-between', alignItems: 'center' }}>
        <GridToolbar/>
      </div>
    );
  };

  return (
    <div style={{  width: '100%', overflow: 'auto'  }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection}
        disableMultipleSelection={disableMultipleSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        showTopToolbar={showTopToolbar}
        pageSizeOptions={pageSizeOptions}
        showCellVerticalBorder={true}
        style={{ marginTop: '10px' }}
        localeText={{
          toolbarColumns: "Cột",
          toolbarFilters: "Bộ lọc",
          toolbarDensity: "Mật độ",
          toolbarExport: "Xuất dữ liệu",
          toolbarQuickFilterPlaceholder:"Tìm kiếm"
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        componentsProps={{
          pagination: {
            sx: {
              justifyContent: "flex-start", 
            },
          },
          
        }}
        onRowSelectionModelChange={handleRowSelectionChange}
        slots={{
          pagination: CustomPagination,
          toolbar: GridToolbar,
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
    </div>
  );
};

export default CustomDatagrid;
