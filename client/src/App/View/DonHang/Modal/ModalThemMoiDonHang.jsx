import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByBaoGiaIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import {
  validateAutocomplete,
  validateDatePicker,
  validateString,
} from "src/App/Until/validateYup";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetAllLoaiDonHangQuery,
  useGetAllTinhTrangDonHangQuery,
  useGetAllTinhTrangGhiDoanhSoQuery,
} from "src/App/Api/GetDataApi";
import { useGetBaoGiaListQuery } from "src/App/Api/BaoGiaApi";
import { useGetKhachHangMucTieuByNguoiDungIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { v4 as uuidv4 } from "uuid";
import {
  AutocompleteRHF,
  TextFieldRHF,
} from "src/App/Components/ReactHookFormComp";
import { useGetLienHeByKhachHangMucTieuIdQuery } from "src/App/Api/LienHeApi";
import { toast } from "react-toastify";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useAddDonHangMutation } from "src/App/Api/DonHangApi";
import Swal from "sweetalert2";
const modelObj = {
    id: "id",
    tenDonHang: "tenDonHang",
    moTaDonHang: "moTaDonHang",
    ngayDatHang: "ngayDatHang",
    soTienConPhaiThu: "soTienConPhaiThu",
    thucThuDonHang: "thucThuDonHang",
    giaTriDonHang: "giaTriDonHang",
    hanThanhToan: "hanThanhToan",
    hanGiaoHang: "hanGiaoHang",
    ngayGhiDoanhSo: "ngayGhiDoanhSo",
    maLoaiDonHang: "maLoaiDonHang",
    maBaoGia: "maBaoGia",
    maKhachHang: "maKhachHang",
    maLienHe: "maLienHe",
    maTinhTrangDonHang: "maTinhTrangDonHang",
    maTinhTrangGhiDoanhSo: "maTinhTrangGhiDoanhSo",
    isGhiDoanhSo: "isGhiDoanhSo",
    thongTinHoaDon: "thongTinHoaDon",
    thongTinGiaoHang: "thongTinGiaoHang",
    hangHoaQuanTam: "hangHoaQuanTam",
  },
  labelObj = {
    id: "Mã đơn hàng",
    tenDonHang: "Tên đơn hàng",
    moTaDonHang: "Mô tả đơn hàng",
    ngayDatHang: "Ngày đặt hàng",
    soTienConPhaiThu: "Số tiền còn phải thu",
    thucThuDonHang: "Thực thu đơn hàng",
    giaTriDonHang: "Giá trị đơn hàng",
    hanThanhToan: "Hạn thanh toán",
    hanGiaoHang: "Hạn giao hàng",
    ngayGhiDoanhSo: "Ngày ghi doanh số",
    maLoaiDonHang: "loại đơn hàng",
    maBaoGia: "Báo giá",
    maKhachHang: "Khách hàng",
    maLienHe: "Liên hệ",
    maTinhTrangDonHang: "Tình trạng dơn hàng",
    maTinhTrangGhiDoanhSo: "Tình trạng ghi doanh số",
    thongTinHoaDon: "Thông tin hóa đơn",
    thongTinGiaoHang: "Thông tin giao hàng",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenDonHang]: "",
    [modelObj.moTaDonHang]: "",
    [modelObj.ngayDatHang]: new Date(),
    [modelObj.soTienConPhaiThu]: 0,
    [modelObj.thucThuDonHang]: 0,
    [modelObj.giaTriDonHang]: 0,
    [modelObj.hanThanhToan]: new Date(),
    [modelObj.hanGiaoHang]: new Date(),
    [modelObj.ngayGhiDoanhSo]: null,
    [modelObj.maLoaiDonHang]: null,
    [modelObj.maBaoGia]: null,
    [modelObj.maKhachHang]: null,
    [modelObj.maLienHe]: null,
    [modelObj.maTinhTrangDonHang]: null,
    [modelObj.isGhiDoanhSo]: false,
    [modelObj.thongTinHoaDon]: "",
    [modelObj.thongTinGiaoHang]: "",
    [modelObj.hangHoaQuanTam]: [],
  },
  schema = yup.object().shape({
    [modelObj.tenDonHang]: validateString(),
    [modelObj.maKhachHang]: validateString(),
    [modelObj.hanThanhToan]: validateDatePicker(),
    [modelObj.hanGiaoHang]: validateDatePicker(),
    [modelObj.thongTinHoaDon]: validateString(),
    [modelObj.thongTinGiaoHang]: validateString(),
  });
export const ModalThemMoiDonHang = ({ showModal, closeModal, refetch }) => {
  const [khachHangId, setKhachHangId] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    [hangHoa, setHangHoa] = useState([]),
    { data: hangHoas } = useGetAllHangHoaQuery(undefined, {
      skip: showModal == false,
    }),
    { data: dataTinhTrangDonHang, isLoading: isGetTinhTrangIsFetching } =
      useGetAllTinhTrangDonHangQuery(undefined, { skip: showModal == false }),
    {
      data: dataTinhTrangGhiDoanhSo,
      isLoading: isGetTinhTrangGhiIDoanhSoIsFetching,
    } = useGetAllTinhTrangGhiDoanhSoQuery(undefined, {
      skip: showModal == false,
    }),
    { data: dataLoaiDonHang, isLoading: isGetLoaiDonHangFetching } =
      useGetAllLoaiDonHangQuery(undefined, { skip: showModal == false }),
    { data: dataLienHe, isLoading: isGetLienHeFetching } =
      useGetLienHeByKhachHangMucTieuIdQuery(khachHangId, {
        skip: showModal == false,
      }),
    { data: dataKhachhangMucTieu, isLoading: isGetKhachHangIsFeatching } =
      useGetKhachHangMucTieuByNguoiDungIdQuery(undefined, {
        skip: showModal == false,
      }),
    [createData] = useAddHangHoaQuanTamMutation(),
    [updateData] = useUpdateHangHoaQuanTamMutation(),
    [deleteData] = useDeleteHangHoaQuanTamMutation(),
    [convertDonHang] = useAddDonHangMutation();
  const isLoading =
    isGetTinhTrangIsFetching ||
    isGetLoaiDonHangFetching ||
    isGetLienHeFetching ||
    isGetKhachHangIsFeatching;
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      tenHangHoa: "",
      khachHangTiemNangId: null,
      khachHangId: null,
      baoGiaId: null,
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
      setIsSave(true);
    } else {
      updatedRow = await updateData(currentRow).unwrap();
      setIsSave(true);
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
        const selectedItem = hangHoas?.find(
          (item) => item.id === params.row.maHangHoaId
        );
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
      headerName: "Chiết Khấu đơn hàng",
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
  ];
  const submitForm = (data) => {
      Swal.fire({
        // title: titleChange(event),
        text: "Bạn có muốn tạo hóa đơn này ? Lưu ý sau khi xác nhận bạn sẽ không thể chỉnh sửa hàng hóa",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then((result) => {
        if (result.isConfirmed) {
          const tempData = {
            [modelObj.tenDonHang]: data[modelObj.tenDonHang],
            [modelObj.moTaDonHang]: data[modelObj.moTaDonHang],
            [modelObj.ngayDatHang]: data[modelObj.ngayDatHang],
            [modelObj.hanThanhToan]: data[modelObj.hanThanhToan],
            [modelObj.hanGiaoHang]: data[modelObj.hanGiaoHang],
            [modelObj.giaTriDonHang]: totalAmountFinal,
            [modelObj.soTienConPhaiThu]: totalAmountFinal,
            [modelObj.thucThuDonHang]: 0,
            [modelObj.ngayGhiDoanhSo]: null,
            [modelObj.thongTinGiaoHang]: data[modelObj.thongTinGiaoHang],
            [modelObj.thongTinHoaDon]: data[modelObj.thongTinHoaDon],
            [modelObj.maLoaiDonHang]: data[modelObj.maLoaiDonHang],
            [modelObj.maBaoGia]: data[modelObj.maBaoGia],
            [modelObj.maKhachHang]: data[modelObj.maKhachHang],
            [modelObj.maLienHe]: data[modelObj.maLienHe],
            [modelObj.maLoaiDonHang]: data[modelObj.maLoaiDonHang],
            [modelObj.maTinhTrangDonHang]: data[modelObj.maTinhTrangDonHang],
            [modelObj.maTinhTrangGhiDoanhSo]:
              data[modelObj.maTinhTrangGhiDoanhSo],
            [modelObj.hangHoaQuanTam]: hangHoa,
          };
          callApiConvert(tempData);
        }
      });
    },
    callApiConvert = async (paramData) => {
      try {
        var response = await convertDonHang(paramData).unwrap();
        if (response?.status === 200) {
          toast.success("Thêm mới đơn thành công");
          closeModalWithOtherFunc();
          refetch();
        } else {
          toast.warning(response?.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    },
    getInitialStateFromApiToUpdate = async () => {
      modalRef.current?.reset(
        {
          [modelObj.maTinhTrangDonHang]: 2,
          [modelObj.maTinhTrangGhiDoanhSo]: 1,
          [modelObj.maLoaiDonHang]: 1,
          [modelObj.ngayDatHang]: new Date(),
          [modelObj.hanThanhToan]: new Date(),
          [modelObj.hanGiaoHang]: new Date(),
        },
        { keepDirty: true }
      );
    };
  useEffect(() => {
    getInitialStateFromApiToUpdate();
  }, []);
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
        header={"Sinh đơn hàng"}
        type={null}
        fullScreen={true}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <h3>Thông tin chung</h3>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Mã Đơn hàng"
              variant="outlined"
              disabled
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayDatHang}
              label={labelObj.ngayDatHang}
              disabled={isLoading}
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
              onChangeCallback={(v) => setKhachHangId(v)}
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maLienHe}
              label={labelObj.maLienHe}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataLienHe, "name")}
              skeletonLoading={isGetLienHeFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.tenDonHang}
              label={labelObj.tenDonHang}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maLoaiDonHang}
              label={labelObj.maLoaiDonHang}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataLoaiDonHang, "name")}
              skeletonLoading={isGetLoaiDonHangFetching}
            />
          </Grid2>
          {/* <Grid2 size={6}>
              <AutocompleteRHF
                name={modelObj.maBaoGia}
                label={labelObj.maBaoGia}
                isGetOnlyId
                disabled={isLoading}
                data={commonMapDataAutocomplete(dataBaoGia, "name")}
                skeletonLoading={isBaoGiaFetching}
              />
            </Grid2> */}
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.hanThanhToan}
              label={labelObj.hanThanhToan}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.hanGiaoHang}
              label={labelObj.hanGiaoHang}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Giá trị đơn hàng"
              variant="outlined"
              value={totalAmountFinal}
              type="number"
              disabled
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <h3>Thông tin hàng hóa</h3>
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
                      }}
                    >
                      <Typography variant="h6">
                        Thành tiền: {totalAmount.toLocaleString("vi-VN")}{" "}
                        <span>&#x0111;</span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        bgcolor: "background.default",
                      }}
                    >
                      <Typography variant="h6">
                        Tiền chiết khấu:{totalChiecKhau.toLocaleString("vi-VN")}{" "}
                        <span>&#x0111;</span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        bgcolor: "background.default",
                      }}
                    >
                      <Typography variant="h6">
                        Tổng tiền: {totalAmountFinal.toLocaleString("vi-VN")}{" "}
                        <span>&#x0111;</span>
                      </Typography>
                    </Box>
                  </>
                ),
              }}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextAreaRHF
              name={modelObj.moTaDonHang}
              label={labelObj.moTaDonHang}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextAreaRHF
              name={modelObj.thongTinGiaoHang}
              label={labelObj.thongTinGiaoHang}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextAreaRHF
              name={modelObj.thongTinHoaDon}
              label={labelObj.thongTinHoaDon}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maTinhTrangDonHang}
              label={labelObj.maTinhTrangDonHang}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataTinhTrangDonHang, "name")}
              skeletonLoading={isGetTinhTrangIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maTinhTrangGhiDoanhSo}
              label={labelObj.maTinhTrangGhiDoanhSo}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataTinhTrangGhiDoanhSo, "name")}
              skeletonLoading={isGetTinhTrangGhiIDoanhSoIsFetching}
            />
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};
