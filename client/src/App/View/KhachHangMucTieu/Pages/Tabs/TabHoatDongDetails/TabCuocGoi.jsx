import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from 'react-router-dom';
import { useDeleteCuocGoiMutation, useGetCuocGoiByKhachHangIdQuery } from 'src/App/Api/CuocGoiApi';
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import ModalUpdateCuocGoi from '../../../Modal/ModalUpdateCuocGoi';
import Swal from 'sweetalert2';
const TabCuocGoi = () => {
  const columnsCuocGoi = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRowCuocGoi.length === 0}
            onClick={handleOpenModalUpdate}
          >
            <CreateIcon color="primary"></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
           disabled={selectedRowCuocGoi.length === 0}
           onClick={handelDeleteCuocGoi}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    {
      field: "",
      headerName: "Ngày bắt đầu",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}> <Moment format="DD/MM/YYYY HH:SS">{new Date(params?.row?.ngayBatDau)}</Moment></div>
      ),
    },
    {
      field: "category",
      headerName: "Loại cuộc gọi",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {params?.row?.loaiCuocGoi?.tenCuocGoi}
        </div>
      ),
    },
    {
      field: "isHoanThanh",
      headerName: "Đã hoàn thành",
      width: 200,
      renderCell: (params) => (
        <div>
          {params?.row?.isHoanThanh === false ? (
            <span
              style={{
                backgroundColor: "#ff1744",
                textAlign: "center",
                padding: 2,
                borderRadius: 10,
                color: "white",
              }}
            >
              Chưa hoàn thành
            </span>
          ) : (
            <span
              style={{
                backgroundColor: "#76ff03",
                textAlign: "center",
                padding: 2,
                borderRadius: 10,
                color: "white",
              }}
            >
              Đã hoàn thành
            </span>
          )}
        </div>
      ),
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}> <Moment format="DD/MM/YYYY HH:SS">{new Date(params?.row?.createAt)}</Moment></div>
      ),
    },

  ];
  const { id } = useParams(),
    [selectedRowCuocGoi, setSelectedRowCuocGoi] = useState([]),
    [rows, setRows] = useState([]),
    [modalUpdate, setModalUpdate] = useState(false);
  const { data: cuocGoiByKhachHangId, refetch } =
    useGetCuocGoiByKhachHangIdQuery(id);
  const [deleteCuocGoi] = useDeleteCuocGoiMutation()
  const handleOpenModalUpdate = () => setModalUpdate(true)
  const handleCloseModalUpdate = () => setModalUpdate(false)
  const handleRowCuocGoiSelectionChange = (selectedRows) => {
    setSelectedRowCuocGoi(selectedRows);
  };
  const handelDeleteCuocGoi = () => {
      Swal.fire({
        title: "Bạn có muốn xóa dữ liệu này",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCuocGoi(selectedRowCuocGoi[0]?.id);
          Swal.fire({
            title: "Xóa thành công",
            icon: "success",
          });
          refetch();
        }
      });
    };
  useEffect(() => {
    if (cuocGoiByKhachHangId) {
      setRows(cuocGoiByKhachHangId);
    }
  }, [cuocGoiByKhachHangId]);
  return (
    <>
      <CustomDatagrid
        rows={rows}
        columns={columnsCuocGoi}
        pageSizeOptions={[10, 25, 50]}
        initialPageSize={25}
        checkboxSelection={true}
        showTopToolbar={true}
        onRowSelectionChange={handleRowCuocGoiSelectionChange}
      />
      {/* ModalUpdate cuộc gọi */}
      <ModalUpdateCuocGoi
        showModal={modalUpdate}
        closeModal={handleCloseModalUpdate}
        selectedItem={selectedRowCuocGoi}
        refetch={refetch}
      />
    </>
  )
}

export default TabCuocGoi