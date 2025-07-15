import { Button, Chip, Container, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDeleteMutation, useGetAllQuery } from "src/App/Api/ChiNhanh.api";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import { toast } from "react-toastify";
import ButtonCustom from "src/App/Components/CustomButton/ButtonCustom";
import ModalAdd from "./Modal/ModalAdd";
import ModalUpdate from "./Modal/ModalUpdate";
const index = () => {
  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRow.length === 0}
            color="success"
            onClick={handleOpenModalUpdate}
          >
            <CreateIcon></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRow.length === 0}
            color="error"
            onClick={handleDeleteXepLoai}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "soThuTu", headerName: "Số thứ tự", width: 100 },
    { field: "tenChiNhanh", headerName: "Tên chi nhánh", width: 200 , flex : 1},
    { field: "diaChi", headerName: "Địa chỉ", width: 200 , flex : 1 },
    { field: "moTa", headerName: "Mô tả", width: 200 , flex : 1},

    
  ];

  const [modalAdd, setModalAdd] = useState();
  const [modalUpdate,setModalUpdate] = useState();
  const navigate = useNavigate();
  const backLink = async () => {
    navigate("-1");
  };
  const [rows, setRows] = useState([]);
  const { data: dataXepLoai , refetch:refetch } = useGetAllQuery();
  const [deleteXepLoai] = useDeleteMutation();
  const [selectedRow, setSelectedRow] = useState([]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };

  useEffect(() => {
    if (dataXepLoai) {
      setRows(dataXepLoai);
    }
  }, [dataXepLoai]);
  const handleOpenModal = () => setModalAdd(true);
  const handleCloseModal = () => setModalAdd(false);

  const handleOpenModalUpdate = ()=> setModalUpdate(true);
  const handleCloseModalUpdate = ()=> setModalUpdate(false);

  const handleDeleteXepLoai= async()=>
  {
     const response = await deleteXepLoai(selectedRow[0]?.id)
     
     if(response?.data?.status === 200)
     {
        toast.success("Xóa dữ liệu thành công")
        refetch()
     }else toast.error(response?.data?.message)
  }

  return (
    <>
      <Container style={{ maxWidth: "100%" }}>
        <div style={{ width: "100%" }}>
          <h2>Chi Nhánh</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
              margin: "10px 0",
            }}
          >
            <ButtonCustom handle={backLink}/>
            <IconButton
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={handleOpenModal}
            >
              <AddIcon />
            </IconButton>
          </div>
             
               <CustomDatagrid
                 rows={rows}
                 columns={columns}
                 pageSizeOptions={[10, 25, 50]}
                 initialPageSize={25}
                 checkboxSelection={true}
                 showTopToolbar={true}
                 onRowSelectionChange={handleRowSelectionChange}
               />
        </div>

        {/* Modal thêm chức vụ */}
        <ModalAdd showModal={modalAdd} closeModal={handleCloseModal} refetch={refetch} />
        <ModalUpdate showModal={modalUpdate}  closeModal={handleCloseModalUpdate} refetch={refetch} selectedItem={selectedRow}/>
      </Container>
    </>
  );
};

export default index;
