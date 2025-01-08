import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import "../DataGrid/CustomDatagrid.css"
function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: '1px solid #d9d9d9',
      borderRadius: 2,
      ...theme.applyStyles('light', {
        borderColor: 'rgb(67, 67, 67)',
      }),
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    fontSize:"1rem"
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      showFirstButton 
      showLastButton
      page={page + 1}
      sx={{
        display: "flex",
        paddingRight: "50%",
      }}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}


const CustomDatagrid = ({
  rows ,
  columns ,
  pageSizeOptions = [10, 25, 50, 100],
  initialPageSize = 25,
  getRowId,
  checkboxSelection = false,
  disableMultipleSelection = false,
  disableRowSelectionOnClick = false,
  showTopToolbar = true,
  onRowSelectionChange,
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
        pageSizeOptions={pageSizeOptions}
        showCellVerticalBorder={true}
        style={{ marginTop: '10px' }}
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
          toolbar: CustomHeaderWithToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          
        }}
      />
    </div>
  );
};

export default CustomDatagrid;
