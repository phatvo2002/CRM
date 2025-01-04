import { Button, Container, IconButton, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { TYPE_MODAL } from '../../../Until/constant';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from 'sweetalert2';
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import ModalAddMenu from './Modal/ModalAddMenu';
import ModalUpdateMenu from './Modal/ModalUpdateMenu';
import { useDeleteMenuMutation, useGetAllMenuQuery } from 'src/App/Api/MenuApi';
const QuanLyMenu = () => {
  const columns = [
    { field: "orderNumber", headerName: "Số thứ tự", width: 200, flex: 1 },
    { field: "name", headerName: "Tên menu", width: 200, flex: 1 },
    { field: "url", headerName: "Đường dẫn", width: 200, flex: 1 },
    { field: "icon", headerName: "Icon", width: 200, flex: 1 },
    { field: "isActive", headerName: "Kích hoạt", width: 200, flex: 1 ,
      renderCell: (params) => (
       <div>
         <Switch checked={params.row.isActive} disabled/>
       </div>
      ),

    },
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
const { data: menuList, refetch } = useGetAllMenuQuery();
const [DeleteMenu] = useDeleteMenuMutation()

const onOpenModalAddMenu = () =>{
  setOpenModalAdd(true);
  setOpenmodal(false);
  setTypeModal(TYPE_MODAL.INSERT)
}



const  onCloseModalAddMenu = () => {
  setTypeModal("");
  setOpenModalAdd(false);
};

const onOpenModalUpdatePhongBan = () => {
  setOpenModalUpdate(true)
  setTypeModal(TYPE_MODAL.UPDATE)
}

const onCloseModalUpdateMenu = ()=>{
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
       await DeleteMenu(selectedRow[0]?.id)
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
  if (menuList) {
    setRows(menuList);
  }
}, [menuList]);

const handleRowSelectionChange = (selectedRows) => {
  setSelectedRow(selectedRows)
};

return (
<Container style={{ maxWidth: "100%" }}>
<Button style={{}} onClick={gotoLink}>
            <KeyboardBackspaceIcon/>
          </Button>
  <div style={{ width: "100%" }}>
    <h2>Danh Sách Menu</h2>
    <Button
      variant="contained"
      style={{ marginTop: "10px",}}
      onClick={onOpenModalAddMenu}
    >
      {" "}
      <AddIcon></AddIcon> Thêm mới 
    </Button>
  
    <CustomDatagrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[10, 25, 50]}
      initialPageSize={25}
      checkboxSelection={false}
      showTopToolbar={true}
      onRowSelectionChange={handleRowSelectionChange}
    />

  </div>
  {/* <ModalThemSua openModal={openModal} selectedRow={selectedRow} closeModal={handelCloseModalThemSua} /> */}

  {/* Modal thêm chức vụ */}

  <ModalAddMenu 
  selectedItem={selectedRow} 
  closeModal={onCloseModalAddMenu}   
  typeModal={typeModal}
  setTypeModal={setTypeModal}
  showModal={openModalAdd}
  setLoading={setLoading}
  refetch = {refetch}
  />
  <ModalUpdateMenu
    selectedItem={selectedRow} 
    closeModal={onCloseModalUpdateMenu}   
    typeModal={typeModal}
    setTypeModal={setTypeModal}
    showModal={openModalUpdate}
    setLoading={setLoading}
    refetch = {refetch}
  />
</Container>

)
}

export default QuanLyMenu