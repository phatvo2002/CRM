import {
  Button,
  Grid2,
  Paper,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { validateString } from "../../../Until/validateYup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldRHF from "../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import AutocompleteRHF from "../../../Components/ReactHookFormComp/AutocompleteRHF/AutocompleteRHF";
import { commonMapDataAutocomplete } from "../../../Until/mapData.helper";
import DatePickerRHF from "../../../Components/ReactHookFormComp/DatePickerRHF";
import SwitchRHF from "../../../Components/ReactHookFormComp/SwitchRHF/SwitchRHF"
import TextAreaRHF from "../../../Components/ReactHookFormComp/TextAreaRHF/TextAreaRHF"
import {
  useGetAllDoanhThuQuery,
  useGetAllLinhVucNgheNghiepQuery,
  useGetAllLoaiHinhNgheNghiepQuery,
  useGetAllLoaiTiemNangQuery,
  useGetAllNganhNgheByLinhVucIdQuery,
  useGetAllNguonGocKhachHangQuery,
  useGetAllPhongBanKhachHangQuery,
} from "App/Api/GetDataApi";
//
const modelObj = {
    nguoiDungId: "nguoiDungId",
    phongBanId: "phongBanId",
    tenKhachHang: "tenKhachHang",
    soDienThoaiDiDong: "soDienThoaiDiDong",
    soDienThoaiCoQuan: "soDienThoaiCoQuan",
    chucDanh: "chucDanh",
    soZalo: "soZalo",
    emailCaNhan: "emailCaNhan",
    emailCoQuan: "emailCoQuan",
    tenToChuc: "tenToChuc",
    maSoThue: "maSoThue",
    ngayThanhLap: "ngayThanhLap",
    diaChi: "diaChi",
    thongTinMoTa: "thongTinMoTa",
    maPhongbanKhachHang: "maPhongbanKhachHang",
    maNguonGocKhachHang: "maNguonGocKhachHang",
    maLoaiTiemNang: "maLoaiTiemNang",
    maLoaiHinhNgheNghiep: "maLoaiHinhNgheNghiep",
    maNganhNghe: "maNganhNghe",
    maLinhVuc: "maLinhVuc",
    maDoanhThu: "maDoanhThu",
    isDungChung: "isDungChung",
  },
  labelObj = {
    tenKhachHang: "Tên Khách hàng",
    soDienThoaiDiDong: "Số điện thoại di động",
    soDienThoaiCoQuan: "Số điện thoại cơ quan",
    chucDanh: "Chức danh",
    soZalo: "Số zalo ",
    emailCaNhan: "Email cá nhân",
    emailCoQuan: "Email cơ quan",
    tenToChuc: "Tên công ty",
    maSoThue: "Mã số thuế",
    ngayThanhLap: "Ngày thành lập",
    diaChi: "Địa chỉ",
    thongTinMoTa: "Thông tin mô tả",
    maPhongbanKhachHang: "Phòng ban khách hàng",
    maNguonGocKhachHang: "Nguồn gốc khách hàng",
    maLoaiTiemNang: "Loại tiềm năng",
    maLoaiHinhNgheNghiep: "Loại hình nghề nghiệp",
    maNganhNghe: "Tên ngành nghề",
    maLinhVuc: "Tên lĩnh vực",
    maDoanhThu: "Doanh thu",
  },
  initialFormState = {
    [modelObj.nguoiDungId]: "",
    [modelObj.phongBanId]: "",
    [modelObj.tenKhachHang]: "",
    [modelObj.soDienThoaiDiDong]: "",
    [modelObj.chucDanh]: "",
    [modelObj.soZalo]: "",
    [modelObj.emailCaNhan]: "",
    [modelObj.emailCoQuan]: "",
    [modelObj.tenToChuc]: "",
    [modelObj.maSoThue]: "",
    [modelObj.ngayThanhLap]: "",
    [modelObj.diaChi]: "",
    [modelObj.thongTinMoTa]: "",
    [modelObj.maPhongbanKhachHang]: "",
    [modelObj.maLoaiTiemNang]: "",
    [modelObj.maLoaiHinhNgheNghiep]: "",
    [modelObj.maNganhNghe]: "",
    [modelObj.maDoanhThu]: "",
    [modelObj.isDungChung]: false,
  };
const AddKhachHangTiemNang = () => {
  const navigate = useNavigate();

  
  const userData = JSON.parse(localStorage.getItem('authorizationData'));

  console.log(userData);

  const [linhVucId, setLinhVucId] = useState("");
  const previousPage = () => {
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn hủy bỏ và không lưu dữ liệu?"
      );
      if (isConfirmed) {
        navigate(-1);
        reset(initialFormState);
      }
    },
    {
      data: dataPhongBanKhachHang,
      isFetching: { isGetPhongBanKhachHangFetching },
    } = useGetAllPhongBanKhachHangQuery(),
    {
      data: dataNguonGocKhachHang,
      isFetching: { isGetNguonGocKhachHangFetching },
    } = useGetAllNguonGocKhachHangQuery(),
    {
      data: dataLoaiTiemNang,
      isFetching: { isGetLoaiTiemNangFetching },
    } = useGetAllLoaiTiemNangQuery(),
    {
      data: dataLoaiHinh,
      isFetching: { isGetLoaiHinhFetching },
    } = useGetAllLoaiHinhNgheNghiepQuery(),
    {
      data: dataLinhVuc,
      isFetching: { isGetLinhVucFetching },
    } = useGetAllLinhVucNgheNghiepQuery(),
    {
      data: dataNganhNghe,
      isFetching: { isGetNganhNgheFetching },
    } = useGetAllNganhNgheByLinhVucIdQuery(linhVucId, {
      skip: linhVucId === "" || linhVucId === null || linhVucId === undefined,
    }),
    {
      data: dataLoaiDoanhThu,
      isFetching: { isGetDoanhThuFetching },
    } = useGetAllDoanhThuQuery(),
    schema = yup.object().shape({
      [modelObj.tenKhachHang]: validateString(),
      [modelObj.soDienThoaiDiDong]: validateString(),
      [modelObj.emailCaNhan]: validateString(),
      [modelObj.diaChi]: validateString(),
    });
  const methods = useForm({
      resolver: schema ? yupResolver(schema) : null,
      defaultValues: initialFormState,
      mode: "all",
      shouldFocusError: true,
      shouldUseNativeValidation: false,
    }),
    {
      handleSubmit,
      reset,
      formState: { isDirty, isValid },
    } = methods;

  const submitForm = (data) => {
    const tempData = {};
  };

  return (
    <>
      <Grid2 container alignItems="center" spacing={2}>
        <Grid2 size={12}>
          <h2>Khách hàng tiềm năng</h2>
        </Grid2>
       
      </Grid2>
      <Paper style={{ padding: 30 }}>
        <FormProvider {...methods}>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <h4>1. Thông tin chung</h4>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.tenKhachHang}
                  label={labelObj.tenKhachHang}
                  // disabled={isLoading}
                  required
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maPhongbanKhachHang}
                  label={labelObj.maPhongbanKhachHang}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(
                    dataPhongBanKhachHang,
                    "name"
                  )}
                  skeletonLoading={isGetPhongBanKhachHangFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.soDienThoaiDiDong}
                  label={labelObj.soDienThoaiDiDong}
                  // disabled={isLoading}
                  required
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.soDienThoaiCoQuan}
                  label={labelObj.soDienThoaiCoQuan}
                  // disabled={isLoading}
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maNguonGocKhachHang}
                  label={labelObj.maNguonGocKhachHang}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(
                    dataNguonGocKhachHang,
                    "name"
                  )}
                  skeletonLoading={isGetNguonGocKhachHangFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maLoaiTiemNang}
                  label={labelObj.maLoaiTiemNang}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(dataLoaiTiemNang, "name")}
                  skeletonLoading={isGetLoaiTiemNangFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.soZalo}
                  label={labelObj.soZalo}
                  // disabled={isLoading}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.emailCaNhan}
                  label={labelObj.emailCaNhan}
                  // disabled={isLoading}
                  required
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.emailCoQuan}
                  label={labelObj.emailCoQuan}
                  // disabled={isLoading}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.maSoThue}
                  label={labelObj.maSoThue}
                  // disabled={isLoading}
                />
              </Grid2>
              <Grid2 size={12}>
                <h4 style={{ padding: 2 }}>2. Thông tin công ty</h4>
              </Grid2>
              <Grid2 size={6}>
                <TextFieldRHF
                  name={modelObj.tenToChuc}
                  label={labelObj.tenToChuc}
                  // disabled={isLoading}
                />
              </Grid2>
            
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maLoaiHinhNgheNghiep}
                  label={labelObj.maLoaiHinhNgheNghiep}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(dataLoaiHinh, "name")}
                  skeletonLoading={isGetLoaiHinhFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maLinhVuc}
                  label={labelObj.maLinhVuc}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(dataLinhVuc, "name")}
                  onChangeCallback={(v) => setLinhVucId(v)}
                  skeletonLoading={isGetLinhVucFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maNganhNghe}
                  label={labelObj.maNganhNghe}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(dataNganhNghe, "name")}
                  skeletonLoading={isGetNganhNgheFetching}
                />
              </Grid2>
              <Grid2 size={6}>
                <AutocompleteRHF
                  name={modelObj.maDoanhThu}
                  label={labelObj.maDoanhThu}
                  isGetOnlyId
                  // disabled={isLoading}
                  data={commonMapDataAutocomplete(dataLoaiDoanhThu, "name")}
                  skeletonLoading={isGetDoanhThuFetching}
                />
              </Grid2>
              <DatePickerRHF
                  name={modelObj.ngayThanhLap}
                  label={labelObj.ngayThanhLap}
                  maxDate={modelObj.ngayThanhLap}
                />
              <Grid2 size={12}>
                <h4 style={{ padding: 2 }}>3. Thông tin địa chỉ</h4>
              </Grid2>
              <Grid2 size={12}>
                  <TextAreaRHF
                       name={modelObj.diaChi}
                       label={labelObj.diaChi}
                  />
               </Grid2>
              <Grid2 size={12}>
              <TextAreaRHF
                       name={modelObj.thongTinMoTa}
                       label={labelObj.thongTinMoTa}
                  />
              </Grid2>
                <p>Là khách hàng dùng chung</p>
              <SwitchRHF
                name={modelObj.isDungChung}
              />
            </Grid2>
            <Grid2 size={12}>

            <Button
            variant="outlined"
            startIcon={<AddIcon />}
            style={{ marginRight: 10 }}
          >
            Lưu tiềm năng
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            color="error"
            onClick={previousPage}
          >
            Hủy bỏ
          </Button>
            </Grid2>
          </form>
        </FormProvider>
      </Paper>
    </>
  );
};

export default AddKhachHangTiemNang;
