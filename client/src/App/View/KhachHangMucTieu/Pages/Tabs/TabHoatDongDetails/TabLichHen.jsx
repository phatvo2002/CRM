import { Chip, Grid2, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useParams } from 'react-router-dom'
import { useDeleteLichHenMutation, useGetLichHenByKhachHangIdQuery } from 'src/App/Api/LichhenApi'
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import ModalUpdateLichHen from './Modal/ModalUpdateLichHen';
import Swal from 'sweetalert2';
const TabLichHen = () => {
  const columnsLichHen = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRowLichHen.length === 0}
            onClick={handleOpenModalUpdate}
          >
            <CreateIcon color="primary"></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRowLichHen.length === 0}
            onClick={handelDeleteLichHen}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    {
      field: "ngayBatDau",
      headerName: "Ngày bắt đầu",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <Moment format="DD/MM/YYYY ">{new Date(params?.row?.ngayBatDau)}</Moment>
        </div>
      ),
    },
    {
      field: "ngayKetThuc",
      headerName: "Ngày kết thúc",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <Moment format="DD/MM/YYYY">{new Date(params?.row?.ngayKetThuc)}</Moment>
        </div>
      ),
    },
    {
      field: "",
      headerName: "Trạng thái thực hiện",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <div>
            {params?.row?.trangThaiThucHien?.name.trim() === "Chưa thực hiện" ? (
              <Typography style={{ backgroundColor: "red", color: "white", textAlign: "center", padding: 3, borderRadius: 50, marginTop: 10 }}>
                Chưa thực hiện
              </Typography>
            ) : params?.row?.trangThaiThucHien?.name.trim() === "Đang thực hiện" ? (
              <Typography style={{ backgroundColor: "yellow", color: "black", textAlign: "center", padding: 3, borderRadius: 50, marginTop: 10 }}>
                Đang thực hiện
              </Typography>
            ) : params?.row?.trangThaiThucHien?.name.trim() === "Hoàn thành" ? (
              <Typography style={{ backgroundColor: "green", color: "white", textAlign: "center", padding: 3, borderRadius: 50, marginTop: 10 }}>
                Hoàn thành
              </Typography>
            ) : (
              <div>Trạng thái không xác định</div>
            )}
          </div>

        </div>
      ),
    },
    { field: "createAt", headerName: "Ngày tạo", width: 200 },
  ];
  const { id } = useParams()
  const [modalUpdateLichHen, setModalUpdateLichHen] = useState(false)
  const [rowLichHen, setRowLichHen] = useState([])
  const [selectedRowLichHen, setSelectedRowLichHen] = useState([])
  const handleRowLichHenSelectionChange = (selectedRows) => {
    setSelectedRowLichHen(selectedRows);
  };
  const handleOpenModalUpdate = () => setModalUpdateLichHen(true)
  const handleCloseModalUpdate = () => setModalUpdateLichHen(false)
  const { data: lichHenData, refetch: isLichHenRefetch } =
    useGetLichHenByKhachHangIdQuery(id, { skip: id == null || id == undefined });
  const [deleteLichHen] = useDeleteLichHenMutation()
  const handelDeleteLichHen = () => {
    Swal.fire({
      title: "Bạn có muốn xóa dữ liệu này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteLichHen(selectedRowLichHen[0]?.id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        isLichHenRefetch();
      }
    });
  };
  useEffect(() => {
    if (lichHenData) {
      setRowLichHen(lichHenData);
    }
  }, [lichHenData]);
  return (
    <>
      <Grid2>
        <CustomDatagrid
          rows={rowLichHen}
          columns={columnsLichHen}
          pageSizeOptions={[10, 25, 50]}
          initialPageSize={25}
          checkboxSelection={true}
          showTopToolbar={true}
          onRowSelectionChange={handleRowLichHenSelectionChange}
        />
      </Grid2>
      {/* modal update  */}
      <ModalUpdateLichHen
        showModal={modalUpdateLichHen}
        closeModal={handleCloseModalUpdate}
        selectedItem={selectedRowLichHen}
        refetch={isLichHenRefetch}
      />
    </>
  )
}

export default TabLichHen