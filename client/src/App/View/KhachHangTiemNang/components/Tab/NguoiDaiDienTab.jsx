import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetLienHeByKhachHangTiemNangIdQuery } from 'src/App/Api/LienHeApi';
import { Tooltip } from 'recharts';
import { Button, Grid2, IconButton } from '@mui/material';
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
const NguoiDaiDienTab = () => {
  const { id } = useParams()
  const [modalAdd, setModalAdd] = useState(false),
    [rows, setRows] = useState([]),
    [selectedRow, setSelectedRow] = useState([]),
    [modalUpdate, setModalUpdate] = useState(false);
  const { data: dataLienHe } = useGetLienHeByKhachHangTiemNangIdQuery(id)

  const columns = [
    {
      field: "action",
      width: 200,
      headerName: "Thao tác",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            margin: 5,
          }}
        >
          <Tooltip title="Sửa thông tin ">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
            // onClick={handleOpenModalUpdateDonViTinh}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              disabled={selectedRow.length === 0}
              style={{}}
            // onClick={handleDeleteDonViTinh}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    { field: "id", headerName: "Mã Liên Hệ", width: 200 ,flex: 1},
    { field: "tenLienHe", headerName: "Tên Liên Hệ", width: 200 ,flex: 1 },
    { field: "email", headerName: "Địa chỉ Email", width: 200 },
    { field: "soDienThoai", headerName: "Số Điện Thoại", width: 200 },
  ]

  const handleOpenModalAdd = () => {
    setModalAdd(true)
  }
  const handleCloseModalAdd = () => {
    setModalAdd(false)
  }
  useEffect(() => {
    if (dataLienHe) {
      setRows(dataLienHe);
    }
  }, [dataLienHe]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  return (
    <Grid2 container spacing={2}>
       <Grid2 size={12}>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: 1 }}
                  startIcon={<PermContactCalendarIcon />}
                  color="inherit"
                  // onClick={handleOpenModalAddDonViTinh}
                >
                  Thêm liên hệ
                </Button>
              </Grid2>
      <Grid2 size={12}>
        <CustomDatagrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialPageSize={25}
          checkboxSelection={false}
          showTopToolbar={true}
          onRowSelectionChange={handleRowSelectionChange}
        />
      </Grid2>
    </Grid2>
  )
}

export default NguoiDaiDienTab