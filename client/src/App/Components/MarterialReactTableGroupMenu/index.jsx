import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { useState } from 'react';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';


const MarterialReactTableGroup = ({
  columns,
  data,
  subName,
  subColumns,
  childata,
  setRowSelection,
  setSelectedRow,
  rowSelection,
  handleOpenUpdate
}) => {
  // ✅ Tách rowSelection riêng cho bảng con (Detail Panel)
  const [subRowSelection, setSubRowSelection] = useState({});
  const [subSelectedRows, setSubSelectedRows] = useState([]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    //enableRowActions: true,
    enableRowSelection: true,
    localization: MRT_Localization_VI,
    onRowSelectionChange: (updater) => {
      const newRowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);

      const selectedData = Object.keys(newRowSelection)
        .map((idx) => data[Number(idx)]);
      setSelectedRow(selectedData); // ✅ Dữ liệu đã chọn của bảng chính
    },
    state: {
      rowSelection,
    },
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-actions', 'mrt-row-expand', 'mrt-row-select'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },

    // ✅ Detail Panel (bảng con)
    renderDetailPanel: ({ row }) => {
      const dataParent = childata.filter(item => item.parentId === row.original.id);

      const subTable = useMaterialReactTable({
        columns: subColumns,
        data: dataParent || [],
        enablePagination: false,
        enableSorting: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableRowActions: true,
        enableRowSelection: true,
        localization: MRT_Localization_VI,
        state: {
          rowSelection: subRowSelection,
        },
        onRowSelectionChange: (updater) => {
          const newRowSelection = typeof updater === 'function' ? updater(subRowSelection) : updater;
          setSubRowSelection(newRowSelection);

          const selectedData = Object.keys(newRowSelection)
            .map((idx) => dataParent[Number(idx)]);
          setSelectedRow(selectedData); 
        },
      });

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
          })}
        >
          <Typography variant="h6" gutterBottom>
            {subName}
          </Typography>
          <MaterialReactTable table={subTable} />
        </Box>
      );
    },

    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],

    renderTopToolbar: ({ table }) => {
      const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="contained"
              disabled={selectedRows.length === 0}
              onClick={() => {
                console.log('Bảng chính - đã chọn:', selectedRows);
              }}
            >
              Xuất Dữ Liệu
            </Button>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default MarterialReactTableGroup;
