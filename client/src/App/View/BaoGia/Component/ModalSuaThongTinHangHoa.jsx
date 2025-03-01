import { Box, Button, Grid2, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByBaoGiaIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { useUpdateTongTienMutation } from "src/App/Api/BaoGiaApi";
const ModalSuaThongTinHangHoa = ({ showModal, closeModal, selectedItem , refetch }) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    [hangHoa, setHangHoa] = useState([]);
  const { data: hangHoas } = useGetAllHangHoaQuery(undefined, {
    skip: showModal == false,
  });
  const { data: rows } = useGetHangHoaQuanTamByBaoGiaIdQuery(selectedItem[0]?.id , {skip : showModal == false});
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();
  const [updateBaoGia] = useUpdateTongTienMutation();
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      tenHangHoa :"",
      khachHangTiemNangId: null,
      khachHangId: null,
      coHoiId: null,
      baoGiaId: selectedItem[0]?.id,
      soLuong: 0,
      thueSuat: 0,
      tienThue: 0,
      donGia: 0,
      thanhTien: 0,
      tongTien: 0,
      chiecKhauDonHang: 0,
      isNew: true,
    };
    setHangHoa((prev) => [...prev, newRow]);
  };
  const handleSaveClick = async (id) => {
    const currentRow = hangHoa.find((row) => row.id === id);
    if (!currentRow) {
      toast.error("Không tìm thấy hàng hóa để lưu!");
      return;
    }
    let updatedRow;
    if (currentRow.isNew === true) {
      updatedRow = await createData(currentRow).unwrap();
      currentRow.isNew = false;
    } else {
      updatedRow = await updateData(currentRow).unwrap();
    }
    toast.success("Lưu dữ liệu thành công!");
  };
  const processRowUpdate = (newRow) => {
    const selectedItem = hangHoas?.find(
      (item) => item.id === newRow.maHangHoaId
    );
    const updatedThanhTien = selectedItem
      ? selectedItem.donGia * (newRow.soLuong || 0)
      : 0;
    // const updateTongTien = selectedItem ? updatedThanhTien : 0;
    const updateTienThue = selectedItem
      ? (selectedItem.donGia * newRow?.thueSuat * (newRow.soLuong || 0)) / 100
      : 0;
    const updateTongTien = selectedItem ? updatedThanhTien + updateTienThue : 0;
    const updatedRow = {
      ...newRow,
      tienThue: updateTienThue,
      thanhTien: updatedThanhTien,
      tongTien: updateTongTien,
      donGia: selectedItem.donGia,
    };
    setHangHoa((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    return updatedRow;
  };
  const handleDeleteClick = (id) => async () => {
    const rowToDelete = hangHoa.find((row) => row.id === id);
    if (rowToDelete?.isNew) {
      setHangHoa((prev) => prev.filter((row) => row.id !== id));
      toast.success("Đã xóa hàng hóa thành công!");
    } else {
      try {
        await deleteData(id).unwrap();
        setHangHoa((prev) => prev.filter((row) => row.id !== id));
        toast.success("Xóa hàng hóa thành công!");
      } catch (error) {
        toast.error("Đã có lỗi trong quá trình xóa!");
      }
    }
  };
  const totalAmount = hangHoa.reduce(
    (sum, row) => sum + (row.tongTien || 0),
    0
  );
  const totalChiecKhau = hangHoa.reduce(
    (sum, row) => sum + (Number(row.chiecKhauDonHang) || 0),
    0
  );
  const totalAmountFinal =
    hangHoa.reduce((sum, row) => sum + (row.tongTien || 0), 0) -
    hangHoa.reduce((sum, row) => sum + (Number(row.chiecKhauDonHang) || 0), 0);

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 200,
      getActions: ({ id }) => [
        <IconButton
          key={`edit-${id}`}
          onClick={() => handleSaveClick(id)}
          color="primary"
        >
          <SaveIcon />
        </IconButton>,
        <IconButton
          key={`delete-${id}`}
          onClick={handleDeleteClick(id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>,
      ],
    },
    {
      field: "maHangHoaId",
      headerName: "Hàng Hóa",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions:
        hangHoas?.map((item) => ({ value: item.id, label: item.tenHangHoa })) ||
        [],
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.value);
        return selectedItem ? selectedItem.id : "";
      },
    },
    {
      field: "tenHangHoa",
      headerName: "Tên hàng hóa",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.row.maHangHoaId);
        return selectedItem ? selectedItem.tenHangHoa : "" ;
      },
    },
    {
      field: "soLuong",
      headerName: "Số Lượng",
      width: 300,
      editable: true,
    },
    {
      field: "donGia",
      headerName: "Đơn giá",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find(
          (item) => item.id === params.row.maHangHoaId
        );
        return selectedItem ? selectedItem.donGia.toLocaleString("vi-VN") : 0;
      },
    },
    {
      field: "thueSuat",
      headerName: "Thuế suất (%)",
      width: 150,
      editable: true,
    },

    {
      field: "tienThue",
      headerName: "Tiền thuế",
      width: 200,
      editable: false,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
    {
      field: "thanhTien",
      headerName: "Thành Tiền",
      width: 200,
      editable: false,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
    {
      field: "chiecKhauDonHang",
      headerName: "Chiếc khấu đơn hàng",
      width: 200,
      editable: true,
      renderCell: (params) => {
        const value = Number(params.value) || 0;
        return value.toLocaleString("vi-VN");
      },
    },
    {
      field: "tongTien",
      headerName: "Tổng Tiền",
      width: 200,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
  ];
  const closeModalWithOtherFunc = () => {
    modalRef.current.reset(setHangHoa([]));
    closeModal();
  },
     getInitialStateFromApiToUpdate = async (selectedItem) => {
        modalRef.current?.reset(
          {
            ...selectedItem,
          },
          { keepDirty: true }
        );
      };
    useEffect(() => {
      if (selectedItem[0]) {
        getInitialStateFromApiToUpdate(selectedItem[0]);
      }
    }, [selectedItem[0]]);
  useEffect(() => {
    if ( rows) {
      setHangHoa(rows);
    }
  }, [rows]);
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  const submitForm = (data) => {
    const tempData = {
         tongTien: totalAmountFinal,
    };

    callApiChinhSua(tempData);
  },
  callApiChinhSua = async (paramData) => {
      try {
        await updateBaoGia({baoGiaId :selectedItem[0]?.id,tongTien : paramData?.tongTien}).unwrap();
        toast.success("Chỉnh sửa hàng hóa thành công");
        closeModalWithOtherFunc();
        refetch()
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  return ( 
  <>
   <RHFDrawer
        handleClose={closeModalWithOtherFunc}
        submitForm={submitForm}
        isOpen={showModal}
        header={"Chỉnh sửa hàng hóa"}
        //type={typeModal}
        fullScreen={true}
        //loading={isLoading}
        //initialFormState={initialFormState}
        //schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <DataGrid
              rows={hangHoa}
              columns={columns}
              editMode="row"
              sx={{ width: "100%" }}
              style={{ fontSize: "1rem" }}
              processRowUpdate={processRowUpdate}
              componentsProps={{
                footer: {
                  style: {
                    padding: "10px",
                    fontWeight: "bold",
                    textAlign: "right",
                  },
                },
              }}
              slots={{
                toolbar: () => (
                  <GridToolbarContainer>
                    <Button
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddClick}
                    >
                      Thêm hàng hóa
                    </Button>
                  </GridToolbarContainer>
                ),
                footer: () => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        bgcolor: "background.default",
                        color:"text.primary",
                      }}
                    >
                      <Typography variant="h6">
                        Thành tiền: {totalAmount.toLocaleString("vi-VN")} VND
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        bgcolor: "background.default",
                        color:"text.primary",
                      }}
                    >
                      <Typography variant="h6">
                        Tiền chiếc khấu:{totalChiecKhau.toLocaleString("vi-VN")}{" "}
                        VND
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        bgcolor: "background.default",
                        color:"text.primary",
                      }}
                    >
                      <Typography variant="h6">
                        Tổng tiền: {totalAmountFinal.toLocaleString("vi-VN")}{" "}
                        VND
                      </Typography>
                    </Box>
                  </>
                ),
              }}
            />
          </Grid2>
        </Grid2>
      </RHFDrawer>
  </>
);
};

export default ModalSuaThongTinHangHoa;
