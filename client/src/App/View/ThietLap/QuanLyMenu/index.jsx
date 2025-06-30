import { Box, Button, Container, IconButton, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useMemo } from 'react';
import { TYPE_MODAL } from "../../../Until/constant";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import ModalAddMenu from "./Modal/ModalAddMenu";
import ModalUpdateMenu from "./Modal/ModalUpdateMenu";
import { useDeleteMenuMutation, useGetAllMenuQuery } from "src/App/Api/MenuApi";
import ButtonCustom from "src/App/Components/CustomButton/ButtonCustom";
import MarterialReactTableGroup from "src/App/Components/MarterialReactTableGroupMenu";
const QuanLyMenu = () => {



  const columns = useMemo(
    () => [
      {
        id: 'menu', //id used to define `group` column
        header: 'Danh sách menu',
        columns: [
          {
            accessorKey: 'thaotac',
            header: 'Thao tác',
            size: 50,
            enableClickToCopy: false,
            filterVariant: 'autocomplete',
            Cell: ({ row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <IconButton onClick={() => onOpenModalUpdatePhongBan()} >
                  <CreateIcon color="success" />
                </IconButton>
                <IconButton onClick={() => handleDeletePhongBan()} >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.name}`,
            id: 'name',
            header: 'Name',
            size: 250,
          },
          {
            accessorKey: 'orderNumber',
            enableClickToCopy: true,
            header: 'Hình ảnh',
            size: 300,
          },
          {
            accessorKey: 'url',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'url',
            size: 300,
          },
          {
            accessorKey: 'icon',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Hình ảnh',
            size: 300,
          },
        ],
      },
    ],
    [],
  );

  const subColumns = useMemo(
    () => [
      {
        id: 'employee', //id used to define `group` column
        header: 'Employee',
        columns: [
          {
            accessorKey: 'thaotac',
            header: 'Thao tác',
            size: 50,
            enableClickToCopy: false,
            filterVariant: 'autocomplete',
            Cell: ({ row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <IconButton onClick={() => onOpenModalUpdatePhongBan()} >
                  <CreateIcon color="success" />
                </IconButton>
                <IconButton onClick={() => handleDeletePhongBan()} >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.name}`,
            id: 'name',
            header: 'Tên menu',
            size: 250,
          },
          {
            accessorKey: 'orderNumber',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Số thứ tự',
            size: 300,
          },
          {
            accessorKey: 'url',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'url',
            size: 300,
          },
          {
            accessorKey: 'icon',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Hình ',
            size: 300,
          },

        ],
      },
    ],
    [],
  );

  const [selectedRow, setSelectedRow] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowChild, setRowsChild] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data: menuList, refetch } = useGetAllMenuQuery();
  const [DeleteMenu] = useDeleteMenuMutation();
  const [rowSelection, setRowSelection] = useState({});

  const onOpenModalAddMenu = () => {
    setOpenModalAdd(true);
    setOpenmodal(false);
    setTypeModal(TYPE_MODAL.INSERT);
  };

  const onCloseModalAddMenu = () => {
    setTypeModal("");
    setOpenModalAdd(false);
  };

  const onOpenModalUpdatePhongBan = () => {
    setOpenModalUpdate(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };

  const onCloseModalUpdateMenu = () => {
    setOpenModalUpdate(false);
    setTypeModal("");
  };

  const handleDeletePhongBan = async () => {
    Swal.fire({
      title: "Bạn có muốn xóa phòng ban này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteMenu(selectedRow[0]?.id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const backLink = async () => {
    navigate("/quantrihethong");
  };

  useEffect(() => {
    if (menuList) {
      setRowsChild(menuList)
      setRows(menuList.filter(item => !item.parentId));
    }
  }, [menuList]);
  return (
    <Container style={{ maxWidth: "100%" }}>
      <div style={{ width: "100%" }}>
        <h2>Danh Sách Menu</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10px",
            margin: "10px 0",
          }}
        >
          <ButtonCustom handle={backLink} />
          <Button
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={onOpenModalAddMenu}
          >
            {" "}
            <AddIcon></AddIcon> Thêm mới
          </Button>
        </div>

        {/* <CustomDatagrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialPageSize={25}
          checkboxSelection={true}
          showTopToolbar={true}
          onRowSelectionChange={handleRowSelectionChange}
        /> */}
        <MarterialReactTableGroup
          columns={columns}
          data={rows}
          subColumns={subColumns}
          childata={rowChild}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          setSelectedRow={setSelectedRow}
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
        refetch={refetch}
      />
      <ModalUpdateMenu
        selectedItem={selectedRow}
        closeModal={onCloseModalUpdateMenu}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={openModalUpdate}
        setLoading={setLoading}
        refetch={refetch}
      />
    </Container>
  );
};

export default QuanLyMenu;
