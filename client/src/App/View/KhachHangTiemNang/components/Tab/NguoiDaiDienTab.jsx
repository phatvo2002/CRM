import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteLienHeMutation, useGetLienHeByKhachHangTiemNangIdQuery } from 'src/App/Api/LienHeApi';
import CreateIcon from "@mui/icons-material/Create";
import { Button, Grid2, IconButton } from '@mui/material';
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ModalAddNguoiDaiDien from './Modal/ModalAddNguoiDaiDien';
import Swal from 'sweetalert2';
const NguoiDaiDienTab = () => {
  const { id } = useParams()
  const [modalAdd, setModalAdd] = useState(false),
    [rows, setRows] = useState([]),
    [selectedRow, setSelectedRow] = useState([]),
    [modalUpdate, setModalUpdate] = useState(false);
  const { data: dataLienHe, refetch: retchLienHe } = useGetLienHeByKhachHangTiemNangIdQuery(id)
  const [deleteLienHe] = useDeleteLienHeMutation()
  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            // disabled={selectedRowCuocGoi.length === 0}
            // onClick={onOpenModalUpdateCuocGoi}
          >
            <CreateIcon></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            // disabled={selectedRowCuocGoi.length === 0}
             onClick={handelDelete}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "id", headerName: "Mã Liên Hệ", width: 200 , flex : 1 },
    { field: "tenLienHe", headerName: "Tên Liên Hệ", width: 200 ,flex : 1  },
    { field: "email", headerName: "Địa chỉ Email", width: 200 ,flex : 1  },
    { field: "soDienThoai", headerName: "Số Điện Thoại", width: 200 ,flex : 1  },
   
  ]

  const handleOpenModalAdd = () => {
    setModalAdd(true)
  }
  const handleCloseModalAdd = () => {
    setModalAdd(false)
  }
    const handelDelete = () => {
      Swal.fire({
        title: "Bạn có muốn xóa dữ liệu này",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteLienHe(selectedRow[0]?.id);
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          });
          retchLienHe();
        }
      });
    };
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
          onClick={handleOpenModalAdd}
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
      <ModalAddNguoiDaiDien
        showModal={modalAdd}
        closeModal={handleCloseModalAdd}
        refetch={retchLienHe}
      />
    </Grid2>
  )
}

export default NguoiDaiDienTab