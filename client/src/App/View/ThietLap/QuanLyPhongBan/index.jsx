import { Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from '@mui/x-data-grid';
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAddPhongBan from './Modal/ModalAddPhongBan';
import { TYPE_MODAL } from '../../../Until/constant';
import ModalUpdatePhongBan from './Modal/ModalUpdatePhongBan';
import { useDeletePhongBanMutation, useGetPhongbanQuery } from '../../../Api/Phongban';
import toastr from 'toastr';
import Swal from 'sweetalert2';
const QuanLyPhongban = () => {
  const columns = [
    {
      field: "",
      headerName: "Thao tác",
      width: 150,
      renderCell: () => (
        <div>
          <Button style={{color:"green"}} onClick={onOpenModalUpdatePhongBan}  disabled={selectedRow.length > 0 ? false : true}> 
            <CreateIcon ></CreateIcon>
          </Button>
          <Button style={{color:"red"}} onClick={handleDeletePhongBan} disabled={selectedRow.length > 0 ? false : true}>
            <DeleteIcon  ></DeleteIcon>
          </Button>
        </div>
      ),
    },
    { field: "soThuTu", headerName: "Số thứ tự", width: 200, flex: 1 },
    { field: "maQuanLy", headerName: "mã quản lý", width: 200, flex: 1 },
    { field: "tenPhongBan", headerName: "Tên phòng ban", width: 200, flex: 1 },
    { field: "moTa", headerName: "Mô tả", width: 200, flex: 1 },
  
]

const [selectedRow, setSelectedRow] = useState([]);
const [openModal , setOpenmodal] = useState(false);
const [typeModal, setTypeModal] = useState("");
const [openModalAdd, setOpenModalAdd] = useState(false);
const [openModalUpdate , setOpenModalUpdate] = useState(false);
const [rows, setRows] = useState([]);

const [loading ,setLoading] = useState(false);

const {data: phongbanlist ,refetch } = useGetPhongbanQuery()
const [PhongBanDelete] = useDeletePhongBanMutation()

const onOpenModalAddPhongBan = () =>{
  setOpenModalAdd(true);
  setOpenmodal(false);
  setTypeModal(TYPE_MODAL.INSERT)
}



const  onCloseModalAddPhongban = () => {
  setTypeModal("");
  setOpenModalAdd(false);
};

const onOpenModalUpdatePhongBan = () => {
  setOpenModalUpdate(true)
  setTypeModal(TYPE_MODAL.UPDATE)
}

const onCloseModalUpdatePhongBan = ()=>{
  setOpenModalUpdate(false)
  setTypeModal("");
}


const handleDeletePhongBan = async () =>{
  Swal.fire({
    title: "Bạn có muốn xóa phòng ban này",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có"
  }).then(async (result) =>  {
    if (result.isConfirmed) {
       await PhongBanDelete(selectedRow[0]?.id)
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetch()
    }
  });
}
 


useEffect(() => {
  if (phongbanlist) {
    setRows(phongbanlist);
  }
}, [phongbanlist]);

return (
<Container style={{ maxWidth: "100%" }}>
  <div style={{ width: "100%" }}>
    <h2>Danh Sách Phòng Ban</h2>
    <p>Đây là phần quản lý thông tin của các phòng ban trong công ty</p>
   
    <Button
      variant="contained"
      style={{ marginTop: "10px",}}
      onClick={onOpenModalAddPhongBan}
    >
      {" "}
      <AddIcon></AddIcon> Thêm mới 
    </Button>
  
    <DataGrid
      rows={rows}
      columns={columns}
      style={{ marginTop: "10px" }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        const selectedRows = rows.filter((row) => newRowSelectionModel.includes(row.id));
        setSelectedRow(selectedRows);
      }}
      pageSizeOptions={[5 ,10 ,25]}
      checkboxSelection={false}

    />
  </div>
  {/* <ModalThemSua openModal={openModal} selectedRow={selectedRow} closeModal={handelCloseModalThemSua} /> */}

  {/* Modal thêm chức vụ */}

  <ModalAddPhongBan 
  selectedItem={selectedRow} 
  closeModal={onCloseModalAddPhongban}   
  typeModal={typeModal}
  setTypeModal={setTypeModal}
  showModal={openModalAdd}
  setLoading={setLoading}
  refetch = {refetch}
  />
  <ModalUpdatePhongBan
    selectedItem={selectedRow} 
    closeModal={onCloseModalUpdatePhongBan}   
    typeModal={typeModal}
    setTypeModal={setTypeModal}
    showModal={openModalUpdate}
    setLoading={setLoading}
    refetch = {refetch}
  />
</Container>

)
}

export default QuanLyPhongban