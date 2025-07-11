import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RoleApi from "../../../Api/RoleApi";
import ModalThemSua from "./ModalThemSua/ModalThemSua";
import ModalAdd from "./ModalThemSua/ModalAdd";
import Swal from "sweetalert2";
import { TYPE_MODAL } from "../../../Until/constant";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "src/App/Components/CustomButton/ButtonCustom";
const ThietLapVaiTro = () => {
  const navigate = useNavigate();
  const columns = [
      {
      field: "",
      headerName: "Action",
      width: 100,
      renderCell: () => (
        <div>
          <Button disabled={selectedRow.length > 0 ? false : true}>
            <CreateIcon></CreateIcon>
          </Button>
          {/* <Button disabled={selectedRow.length > 0 ? false : true}>
            <DeleteIcon onClick={handleDeleteNguoiDung}></DeleteIcon>
          </Button> */}
        </div>
      ),
    },
    { field: "tenChucVu", headerName: "Tên chức vụ", width: 200, flex: 1 },
    { field: "moTa", headerName: "Mô Tả", width: 200, flex: 1 },

  ];
  const [datatable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const handleShowModalThemSua = () => {
    setOpenModalAdd(false);
    setOpenmodal(true);
  };

  const onOpenModalAddItem = () => {
    setOpenModalAdd(true);
    setOpenmodal(false);
    setTypeModal(TYPE_MODAL.INSERT);
  };
  const handelCloseModalThemSua = () => {
    setOpenmodal(false);
    setOpenModalAdd(false);
  };

  const onCloseModalAdd = () => {
    setTypeModal("");
    setOpenModalAdd(false);
  };
  const getDataChucVu = async () => {
    const response = await RoleApi.GetChucVu();
    if (response.length > 0) {
      setDataTable(response);
      setLoading(false);
    } else {
      setDataTable([]);
      setLoading(false);
    }
  };

  const handleDeleteNguoiDung = () => {
    Swal.fire({
      title: "Bạn có muốn xóa chưc vụ này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await RoleApi.deleteChucVu(selectedRow[0]);
        Swal.fire({
          title: "Xóa công",
          icon: "success",
        });
        setLoading(true);
      }
    });
  };

  useEffect(() => {
    getDataChucVu();
  }, []);

  useEffect(() => {
    if (loading) getDataChucVu();
    setLoading(false);
  }, [loading]);
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  const backLink = async () => {
    navigate(-1);
  };
  return (
    <Container style={{ maxWidth: "100%" }}>
      <div style={{ width: "100%" }}>
        <h2>Phân QUYỀN CHỨC VỤ</h2>
        <p>Phân quyền các chức vụ có trong phần mềm LPCRM</p>

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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={onOpenModalAddItem}
            >
              {" "}
              <AddIcon></AddIcon> Thêm mới chức vụ
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: "10px", marginLeft: "10px" }}
              onClick={handleShowModalThemSua}
              disabled={!selectedRow[0]}
            >
              {" "}
              <AddIcon></AddIcon> Phân quyền 
            </Button>
          </div>
        </div>

        <CustomDatagrid
          rows={datatable}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialPageSize={25}
          checkboxSelection={true}
          showTopToolbar={true}
          onRowSelectionChange={handleRowSelectionChange}
        />
      </div>
      <ModalThemSua
        openModal={openModal}
        selectedRow={selectedRow}
        closeModal={handelCloseModalThemSua}
      />

      {/* Modal thêm chức vụ */}

      <ModalAdd
        selectedItem={selectedRow}
        closeModal={onCloseModalAdd}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={openModalAdd}
        setLoading={setLoading}
      />
    </Container>
  );
};

export default ThietLapVaiTro;
