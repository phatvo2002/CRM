import { Button, Container, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAddPhongBan from './Modal/ModalAddPhongBan';
import { TYPE_MODAL } from '../../../Until/constant';
import ModalUpdatePhongBan from './Modal/ModalUpdatePhongBan';
import { useDeletePhongBanMutation, useGetPhongBanQuery, useGetPhongbanQuery } from '../../../Api/Phongban';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from 'sweetalert2';
const QuanLyPhongban = () => {
  const columns = [
    { field: "soThuTu", headerName: "Số thứ tự", width: 200, flex: 1 },
    { field: "maQuanLy", headerName: "mã quản lý", width: 200, flex: 1 },
    { field: "tenPhongBan", headerName: "Tên phòng ban", width: 200, flex: 1 },
    { field: "moTa", headerName: "Mô tả", width: 200, flex: 1 },
    {
      field: "action",
      headerName: "Thao tác",
      flex:1,
      renderCell: () => (
        <div style={{alignItems : "center"}}> 
        <IconButton style={{}} disabled={selectedRow.length === 0}  onClick={onOpenModalUpdatePhongBan} >
            <CreateIcon ></CreateIcon>  
        </IconButton>
          <IconButton style={{ margin:"0 10px"}} disabled={selectedRow.length === 0} onClick={handleDeletePhongBan}>
            <DeleteIcon  ></DeleteIcon>
          </IconButton>
        </div>
      ),
    }
]

const [selectedRow, setSelectedRow] = useState([]);
const [openModal , setOpenmodal] = useState(false);
const [typeModal, setTypeModal] = useState("");
const [openModalAdd, setOpenModalAdd] = useState(false);
const [openModalUpdate , setOpenModalUpdate] = useState(false);
const [rows, setRows] = useState([]);

const [loading ,setLoading] = useState(false);
const navigate = useNavigate()
const { data: phongbanlist, refetch } = useGetPhongBanQuery();
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
const gotoLink = ()=>{
  navigate(-1)
}

 


useEffect(() => {
  if (phongbanlist) {
    setRows(phongbanlist);
  }
}, [phongbanlist]);

return (
<Container style={{ maxWidth: "100%" }}>
<Button style={{}} onClick={gotoLink}>
            <KeyboardBackspaceIcon/>
          </Button>
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
  showCellVerticalBorder
  style={{ marginTop: "10px" }}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 25 },
    },
  }}
  showTopToolbar={true}
  onRowSelectionModelChange={(newRowSelectionModel) => {
    const selectedRows = rows.filter((row) => newRowSelectionModel.includes(row.id));
    setSelectedRow(selectedRows);
  }}
  slotProps={{
    toolbar: {
      showQuickFilter: true,
    },
  }}
  slots={{ toolbar: GridToolbar }}
  pageSizeOptions={[25, 50, 75, 100]}
  checkboxSelection={false}
  disableMultipleSelection={true}  
  disableRowSelectionOnClick={false}  
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