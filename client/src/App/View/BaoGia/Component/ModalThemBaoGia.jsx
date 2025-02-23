import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useConvertBaoGiaMutation } from "src/App/Api/BaoGiaApi";
import { useGetCoHoiListQuery } from "src/App/Api/CoHoiApi";
import { useGetAllTinhTrangBaoGiaQuery } from "src/App/Api/GetDataApi";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByCoHoiIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import { useGetKhachHangMucTieuByNguoiDungIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import { validateDatePicker, validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import { v4 as uuidv4 } from "uuid";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  AutocompleteRHF,
  TextFieldRHF,
} from "src/App/Components/ReactHookFormComp";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
const modelObj = {
    id: "id",
    tenBaoGia: "tenBaoGia",
    ngayBaoGia: "ngayBaoGia",
    ngayHetHan: "ngayHetHan",
    diaChi: "diaChi",
    maSoThue: "maSoThue",
    tongTien: "tongTien",
    maTinhTrangBaoGia: "maTinhTrangBaoGia",
    maCoHoi: "maCoHoi",
    maKhachHang: "maKhachHang",
    hangHoaQuanTams: "hangHoaQuanTams",
    moTa: "moTa",
  },
  labelObj = {
    id: "Mã báo giá",
    tenBaoGia: "Tên báo giá",
    ngayBaoGia: "Ngày báo giá",
    ngayHetHan: "Ngày hết hạn",
    maSoThue: "Mã số thuế",
    tongTien: "tongTien",
    maTinhTrangBaoGia: "Tình trạng báo giá",
    maCoHoi: "Cơ hội",
    maKhachHang: "Khach Hàng",
    diaChi: "Địa chỉ",
    hangHoaQuanTam: "Hàng hóa quan tâm",
    moTa: "Thông tin Mô tả",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenBaoGia]: "",
    [modelObj.ngayBaoGia]: new Date(),
    [modelObj.ngayHetHan]: new Date(),
    [modelObj.maSoThue]: "",
    [modelObj.tongTien]: 0,
    [modelObj.maTinhTrangBaoGia]: null,
    [modelObj.maCoHoi]: null,
    [modelObj.maKhachHang]: null,
    [modelObj.diaChi]: "",
    [modelObj.hangHoaQuanTams]: [],
    [modelObj.moTa]: "",
  },
  schema = yup.object().shape({
    [modelObj.tenBaoGia]: validateString(),
    [modelObj.ngayBaoGia]: validateDatePicker(),
    [modelObj.ngayHetHan]: validateDatePicker(),
    [modelObj.maKhachHang]: validateString(),
    // [modelObj.maCoHoi]: validateString(),
  });
const ModalThemBaoGia = ({
  showModal,
  closeModal,
  typeModal,
  refetch
}) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    [coHoiId, setCoHoiId] = useState(""),
    [hangHoa, setHangHoa] = useState([]);
  const { data: hangHoas } = useGetAllHangHoaQuery(undefined, {
    skip: showModal == false,
  });
  const { data: rows } = useGetHangHoaQuanTamByCoHoiIdQuery(coHoiId);
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();
  const { data: dataKhachhangMucTieu, isLoading: isGetKhachHangIsFeatching } =
    useGetKhachHangMucTieuByNguoiDungIdQuery(undefined, {
      skip: showModal == false,
    });
  const {
    data: dataTinhTrangBaoGia,
    isLoading: isGetTinhTrangBaoGiaIsFetching,
  } = useGetAllTinhTrangBaoGiaQuery({ skip: showModal == false });
  const { data: dataCoHoi, isLoading: isGetCoHoiIsFetching } =
      useGetCoHoiListQuery({ skip: showModal == false }),
    [convertBaoGia] = useConvertBaoGiaMutation();
  const isLoading = isGetCoHoiIsFetching || isGetKhachHangIsFeatching || isGetTinhTrangBaoGiaIsFetching
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      khachHangTiemNangId: null,
      khachHangId: null,
      coHoiId: null,
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
        return selectedItem ? selectedItem.tenHangHoa : "";
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
  const submitForm = (data) => {
    const tempData = {
      [modelObj.tenBaoGia]: data[modelObj.tenBaoGia],
      [modelObj.ngayBaoGia]: data[modelObj.ngayBaoGia],
      [modelObj.ngayHetHan]: data[modelObj.ngayHetHan],
      [modelObj.maSoThue]: data[modelObj.maSoThue],
      [modelObj.tongTien]: totalAmountFinal,
      [modelObj.maCoHoi]: data[modelObj.maCoHoi],
      [modelObj.maTinhTrangBaoGia]: data[modelObj.maTinhTrangBaoGia],
      [modelObj.maKhachHang]: data[modelObj.maKhachHang],
      [modelObj.diaChi]: data[modelObj.diaChi],
      [modelObj.hangHoaQuanTams]: hangHoa,
    };

    callApiThemBaoGia(tempData);
  },
  callApiThemBaoGia = async (paramData) => {
    try {
      console.log(paramData);
      await convertBaoGia(paramData).unwrap();
      toast.success("Thêm báo giá thành công");
      closeModalWithOtherFunc();
      refetch()
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    };
  useEffect(() => {
    if (rows) {
      setHangHoa(rows);
    }
  }, [rows]);
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  return (
    <>
      <RHFDrawer
        handleClose={closeModalWithOtherFunc}
        submitForm={submitForm}
        isOpen={showModal}
        header={"Thêm báo giá"}
        type={typeModal}
        fullScreen={true}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <h3>Thông tin chi tiết</h3>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Mã báo giá"
              variant="outlined"
              disabled
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.tenBaoGia}
              label={labelObj.tenBaoGia}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maTinhTrangBaoGia}
              label={labelObj.maTinhTrangBaoGia}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataTinhTrangBaoGia, "name")}
              skeletonLoading={isGetTinhTrangBaoGiaIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maKhachHang}
              label={labelObj.maKhachHang}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataKhachhangMucTieu, "name")}
              skeletonLoading={isGetKhachHangIsFeatching}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.maSoThue}
              label={labelObj.maSoThue}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maCoHoi}
              label={labelObj.maCoHoi}
              isGetOnlyId
              disabled={isLoading}
              // onChangeCallback={(v)=> setCoHoiId(v)}
              data={commonMapDataAutocomplete(dataCoHoi, "name")}
              skeletonLoading={isGetCoHoiIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayBaoGia}
              label={labelObj.ngayBaoGia}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayHetHan}
              label={labelObj.ngayHetHan}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextAreaRHF
              name={modelObj.diaChi}
              label={labelObj.diaChi}
              disabled={isLoading}
              required
            />
          </Grid2>

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
          <Grid2 size={12}>
            <Grid2 size={12}>
              <TextAreaRHF
                name={modelObj.moTa}
                label={labelObj.moTa}
                disabled={isLoading}
                required
              />
            </Grid2>
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};

export default ModalThemBaoGia;
