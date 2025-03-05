import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByKhachHangIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import { validateDatePicker, validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { useGetKhachHangMucTieuByNguoiDungIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import {
  AutocompleteRHF,
  TextFieldRHF,
} from "src/App/Components/ReactHookFormComp";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { Box, Button, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetLienHeByKhachHangMucTieuIdQuery } from "src/App/Api/LienHeApi";
import {
  useGetAllLoaiCoHoiQuery,
  useGetAllNguonGocKhachHangQuery,
} from "src/App/Api/GetDataApi";
import { useGetAllLoaiHangHoaQuery } from "src/App/Api/LoaiHangHoa";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { useConvertCoHoiMutation } from "src/App/Api/CoHoiApi";

const modelObj = {
    id: "id",
    tenCoHoi: "tenCoHoi",
    soTien: "soTien",
    tiLeThanhCong: "tiLeThanhCong",
    doanhSoKyVong: "doanhSoKyVong",
    ngayKyVongKetThuc: "ngayKyVongKetThuc",
    maKhachHang: "maKhachHang",
    maLienHe: "maLienHe",
    maLoaiHangHoa: "maLoaiHangHoa",
    maLoaiCoHoi: "maLoaiCoHoi",
    maGiaiDoanBanHang: "maGiaiDoanBanHang",
    maNguonGocKhachHang: "maNguonGocKhachHang",
    diaChi: "diaChi",
    hangHoaQuanTams: "hangHoaQuanTams",
  },
  labelObj = {
    id: "Mã cơ hội",
    tenCoHoi: "Tên cơ hội",
    soTien: "Số tiền",
    tiLeThanhCong: "Tỉ lệ thành công",
    doanhSoKyVong: "Doanh số kì vọng",
    ngayKyVongKetThuc: "Ngày kì vọng kết thúc",
    maKhachHang: "Khách hàng",
    maLienHe: "Liên hệ ",
    maLoaiHangHoa: "Loại hàng hóa",
    maLoaiCoHoi: "Loại cơ hội",
    maGiaiDoanBanHang: "Giai đoạn bán hàng",
    maNguonGocKhachHang: "Nguồn gốc khách hàng",
    diaChi: "Địa chỉ",
    hangHoaQuanTam: "Hàng hóa quan tâm",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenCoHoi]: "",
    [modelObj.soTien]: 0,
    [modelObj.tiLeThanhCong]: 0,
    [modelObj.doanhSoKyVong]: 0,
    [modelObj.ngayKyVongKetThuc]: new Date(),
    [modelObj.maKhachHang]: null,
    [modelObj.maLienHe]: null,
    [modelObj.maLoaiHangHoa]: null,
    [modelObj.maLoaiCoHoi]: null,
    [modelObj.maGiaiDoanBanHang]: null,
    [modelObj.maNguonGocKhachHang]: null,
    [modelObj.diaChi]: "",
    [modelObj.hangHoaQuanTams]: [],
  },
  schema = yup.object().shape({
     [modelObj.tenCoHoi]: validateString(),
     [modelObj.maLoaiCoHoi]: validateString(),
     [modelObj.diaChi]: validateString(),
  });
export const ModalSinhCoHoi = ({
  khachHangData,
  showModal,
  closeModal,
  isLoading,
  typeModal,
}) => {
  
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams();

  const [hangHoa, setHangHoa] = useState([]);
  const { data: rows, refetch } = useGetHangHoaQuanTamByKhachHangIdQuery(id);
  const { data: hangHoas } = useGetAllHangHoaQuery(undefined, {skip : showModal == false });
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();
  const [selectedGiaiDoan, setSelectedGiaiDoan] = useState(null);
  const [tiLeThanhCong, setTiLeThanhCong] = useState(0);
  const { data: dataKhachhangMucTieu, isLoading: isGetKhachHangIsFeatching } =
    useGetKhachHangMucTieuByNguoiDungIdQuery(undefined, {
      skip: showModal == false,
    });
  const { data: dataLienHe, isLoading: isGetLienHeIsFetching } =
    useGetLienHeByKhachHangMucTieuIdQuery(id, { skip: showModal == false });
  const { data: dataLoaiCoHoi, isLoading: isGetLoaiCoHoiIsFetching } =
    useGetAllLoaiCoHoiQuery(undefined, { skip: showModal == false });
  const { data: dataLoaiHangHoa, isLoading: isGetLoaiHangHoaIsFetching } =
    useGetAllLoaiHangHoaQuery(undefined, { skip: showModal == false });
  const { data: dataGiaiDoanBanHang, isLoading: isGetGiaiDoanBanhangFetching } =
    useGetAllGiaiDoanBanHangQuery(undefined, { skip: showModal == false });
  const { data: dataNguonGocBanHang, isLoading: isGetNguonGocBanHangFetching } =
    useGetAllNguonGocKhachHangQuery();
  const [convertCoHoi] = useConvertCoHoiMutation()
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      tenKhachHang:"",
      khachHangTiemNangId: null,
      khachHangId: id,
      soLuong: 0,
      thueSuat: 0,
      tienThue: 0,
      donGia: 0,
      thanhTien: 0,
      tongTien: 0,
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
  const totalAmount = hangHoa.reduce((sum, row) => sum + (row.tongTien || 0), 0);
  const doanhsoKyVongResult = (totalAmount * tiLeThanhCong ) / 100 
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
      headerName: "Mã Hàng Hóa",
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
      field: "tongTien",
      headerName: "Tổng Tiền",
      width: 200,
      renderCell: (params) =>
        params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
  ];

  const generateRandomSequence = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  const submitForm = (data) => {
      const tempData = {
        [modelObj.id]: "CH" + generateRandomSequence(8),
        [modelObj.tenCoHoi]: data[modelObj.tenCoHoi],
        [modelObj.soTien]: totalAmount,
        [modelObj.tiLeThanhCong]: tiLeThanhCong,
        [modelObj.doanhSoKyVong]: doanhsoKyVongResult,
        [modelObj.ngayKyVongKetThuc]: data[modelObj.ngayKyVongKetThuc],
        [modelObj.maKhachHang]: data[modelObj.maKhachHang],
        [modelObj.maLienHe]: data[modelObj.maLienHe],
        [modelObj.maLoaiHangHoa]: data[modelObj.maLoaiHangHoa],
        [modelObj.maLoaiCoHoi]: data[modelObj.maLoaiCoHoi],
        [modelObj.maGiaiDoanBanHang]: data[modelObj.maGiaiDoanBanHang],
        [modelObj.maNguonGocKhachHang]: data[modelObj.maNguonGocKhachHang],
        [modelObj.diaChi]: data[modelObj.diaChi],
        [modelObj.hangHoaQuanTams]: hangHoa,
      };
    
      callApiConvert(tempData);
    },
    callApiConvert = async (paramData) => {
      try {
          await convertCoHoi(paramData).unwrap();
          toast.success("Chuyển đổi thành công")
          closeModalWithOtherFunc() 
        } catch (error) {
          console.log(error)
        } 
    },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          id: selectedItem?.id,
          [modelObj.maKhachHang]: khachHangData?.id,
          [modelObj.maLienHe]: null,
          [modelObj.maNguonGocKhachHang]: khachHangData?.maNguonGocKhachHang,
          [modelObj.diaChi]: khachHangData?.thongTinHoaDon,
          
        },
        { keepDirty: true }
      );
    };

  const handleGiaiDoanChange = (value) => {
    setSelectedGiaiDoan(value);
    const foundGiaiDoan = dataGiaiDoanBanHang.find(
      (giaiDoan) => giaiDoan.id === value
    );
    if (foundGiaiDoan) {
      setTiLeThanhCong(foundGiaiDoan.tiLeThanhCong || 0);
    } else {
      setTiLeThanhCong(0);
    }
  };

  useEffect(() => {
    if (rows) {
      setHangHoa(rows);
    }
  }, [rows]);
  useEffect(() => {
    if (khachHangData) {
      getInitialStateFromApiToUpdate(khachHangData);
    }
  }, [khachHangData]);
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
        header={"Sinh cơ hội"}
        type={typeModal}
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
            <AutocompleteRHF
              name={modelObj.maLienHe}
              label={labelObj.maLienHe}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataLienHe, "name")}
              skeletonLoading={isGetLienHeIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.tenCoHoi}
              label={labelObj.tenCoHoi}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maLoaiCoHoi}
              label={labelObj.maLoaiCoHoi}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataLoaiCoHoi, "name")}
              skeletonLoading={isGetLoaiCoHoiIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maLoaiHangHoa}
              label={labelObj.maLoaiHangHoa}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataLoaiHangHoa, "name")}
              skeletonLoading={isGetLoaiHangHoaIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
          <TextField fullWidth id="outlined-basic"  label="Số tiền" variant="outlined" value={totalAmount.toLocaleString("vi-VN")} />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maGiaiDoanBanHang}
              label={labelObj.maGiaiDoanBanHang}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataGiaiDoanBanHang, "name")}
              skeletonLoading={isGetGiaiDoanBanhangFetching}
              onChangeCallback={(v) => handleGiaiDoanChange(v)}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Tỉ lệ thành công (%)"
              variant="outlined"
              value={tiLeThanhCong}
              disabled
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
          <TextField fullWidth id="outlined-basic"  label="Doanh số kỳ vọng" variant="outlined" value={doanhsoKyVongResult.toLocaleString("vi-VN")} />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayKyVongKetThuc}
              label={labelObj.ngayKyVongKetThuc}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maNguonGocKhachHang}
              label={labelObj.maNguonGocKhachHang}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataNguonGocBanHang, "name")}
              skeletonLoading={isGetNguonGocBanHangFetching}
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
                  style: { padding: "10px", fontWeight: "bold", textAlign: "right" },
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
                  <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, bgcolor: "#f1f1f1" }}>
                    <Typography variant="h6">
                      Tổng tiền: {totalAmount.toLocaleString("vi-VN")} <span>&#x0111;</span>
                    </Typography>
                  </Box>
                ),
              }}
            />
          </Grid2>
          <Grid2 size={12}>
            <Grid2 size={12}>
              <TextAreaRHF
                name={modelObj.diaChi}
                label={labelObj.diaChi}
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
