import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid2, Paper } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllDoanhThuQuery, useGetAllLinhVucNgheNghiepQuery, useGetAllLoaiHinhNgheNghiepQuery, useGetAllLoaiTiemNangQuery, useGetAllNganhNgheByLinhVucIdQuery, useGetAllNguonGocKhachHangQuery, useGetAllPhongBanKhachHangQuery } from 'src/App/Api/GetDataApi';
import { useAddKhachHangMucTieuMutation } from 'src/App/Api/KhachHangMucTieuApi';
import { AutocompleteRHF, DatePickerRHF, SwitchRHF, TextFieldRHF } from 'src/App/Components/ReactHookFormComp';
import TextAreaRHF from 'src/App/Components/ReactHookFormComp/TextAreaRHF';
import { commonMapDataAutocomplete } from 'src/App/Until/mapData.helper';
import { validateString } from 'src/App/Until/validateYup';
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import * as yup from "yup";
const modelObj = {
  id: "id",
  tenKhachHang: "tenKhachHang",
  tenVietTat: "tenVietTat",
  maSoThue: "maSoThue",
  soDienThoai: "soDienThoai",
  email: "email",
  taiKhoanNganHang: "taiKhoanNganHang",
  website: "website",
  ngayThanhLap: "ngayThanhLap",
  moTa: "moTa",
  isDungChung: "isDungChung",
  isKhachHangCaNhan: "isKhachHangCaNhan",
  isNhaPhanPhoi: "isNhaPhanPhoi",
  thongTinHoaDon: "thongTinHoaDon",
  thongTinGiaoHang: "thongTinGiaoHang",
  maPhongbanKhachHang: "maPhongbanKhachHang",
  maNguonGocKhachHang: "maNguonGocKhachHang",
  maLoaiTiemNang: "maLoaiTiemNang",
  maLoaiHinhNgheNghiep: "maLoaiHinhNgheNghiep",
  maNganhNghe: "maNganhNghe",
  maLinhVuc: "maLinhVuc",
  maDoanhThu: "maDoanhThu",
},
  labelObj = {
    id: "Mã Khách hàng",
    tenKhachHang: "Tên Khách hàng",
    tenVietTat: "Tên viết tắt",
    maSoThue: "Mã số thuế",
    soDienThoai: "Số điện thoại",
    email: "Email",
    taiKhoanNganHang: "Tài khoản ngân hàng",
    website: "Website",
    ngayThanhLap: "Ngày thành lập",
    moTa: "Mô tả",
    isDungChung: "Khách hàng dùng chung",
    isKhachHangCaNhan: "Khách hàng cá nhân",
    isNhaPhanPhoi: "Nhà phân phối",
    thongTinHoaDon: "Thông tin hóa đơn",
    thongTinGiaoHang: "Thông tin giao hàng",
    maPhongbanKhachHang: "Phòng ban khách hàng",
    maNguonGocKhachHang: "Nguồn gốc khách hàng",
    maLoaiTiemNang: "Loại tiềm năng",
    maLoaiHinhNgheNghiep: "Loại hình nghề nghiệp",
    maNganhNghe: "Tên ngành nghề",
    maLinhVuc: "Tên lĩnh vực",
    maDoanhThu: "Doanh thu",
  },
  initialFormState = {
    [modelObj.id]: null,
    [modelObj.tenKhachHang]: null,
    [modelObj.tenVietTat]: null,
    [modelObj.maSoThue]: null,
    [modelObj.soDienThoai]: null,
    [modelObj.email]: null,
    [modelObj.taiKhoanNganHang]: null,
    [modelObj.website]: null,
    [modelObj.tenToChuc]: null,
    [modelObj.ngayThanhLap]: null,
    [modelObj.moTa]: null,
    [modelObj.isDungChung]: false,
    [modelObj.isKhachHangCaNhan]: false,
    [modelObj.isNhaPhanPhoi]: false,
    [modelObj.thongTinHoaDon]: null,
    [modelObj.thongTinGiaoHang]: null,
    [modelObj.maLoaiTiemNang]: null,
    [modelObj.maLoaiHinhNgheNghiep]: null,
    [modelObj.maNganhNghe]: null,
    [modelObj.maDoanhThu]: null,
    [modelObj.maLinhVuc]: null,
  };
const AddKhachHangMucTieu = () => {
  const userData = JSON.parse(localStorage.getItem('authorizationData'));
  const navigate = useNavigate();
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
    [createKhachHangMucTieu] = useAddKhachHangMucTieuMutation(),
    schema = yup.object().shape({
      [modelObj.tenKhachHang]: validateString(),
      [modelObj.soDienThoai]: validateString(),
      [modelObj.email]: validateString(),
      [modelObj.thongTinGiaoHang]: validateString(),
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
    const generateRandomSequence = (length) => {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9
      }
      return result;
    }
  const submitForm = (data) => {
    const tempData = {
      [modelObj.id]: "KH" + generateRandomSequence(6),
      [modelObj.tenKhachHang]: data[modelObj.tenKhachHang],
      [modelObj.tenVietTat]: data[modelObj.tenVietTat],
      [modelObj.maSoThue]: data[modelObj.maSoThue],
      [modelObj.soDienThoai]: data[modelObj.soDienThoai],
      [modelObj.email]: data[modelObj.email],
      [modelObj.taiKhoanNganHang]: data[modelObj.taiKhoanNganHang],
      [modelObj.website]: data[modelObj.website],
      [modelObj.ngayThanhLap]: data[modelObj.ngayThanhLap],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.isDungChung]: data[modelObj.isDungChung],
      [modelObj.isKhachHangCaNhan]: data[modelObj.isKhachHangCaNhan],
      [modelObj.isNhaPhanPhoi]: data[modelObj.isNhaPhanPhoi],
      [modelObj.thongTinHoaDon]: data[modelObj.thongTinHoaDon],
      [modelObj.thongTinGiaoHang]: data[modelObj.thongTinGiaoHang],
      [modelObj.maPhongbanKhachHang]: data[modelObj.maPhongbanKhachHang],
      [modelObj.maNguonGocKhachHang]: data[modelObj.maNguonGocKhachHang],
      [modelObj.maLoaiTiemNang]: data[modelObj.maLoaiTiemNang],
      [modelObj.maLoaiHinhNgheNghiep]: data[modelObj.maLoaiHinhNgheNghiep],
      [modelObj.maLinhVuc]: data[modelObj.maLinhVuc],
      [modelObj.maNganhNghe]: data[modelObj.maNganhNghe],
      [modelObj.maDoanhThu]: data[modelObj.maDoanhThu],
    };
    if (userData?.response?.phongBan?.id == null || userData?.response?.phongBan?.id === undefined) {
      toast.warning("Bạn chưa được phân phòng ban nên chưa thể thực hiện thao tác này")
    }
    else {
      callApiAddData(tempData)
    }

  };
  const callApiAddData = async (data) => {
    const response = await createKhachHangMucTieu(data)
    if (response?.data?.status === 200) {
      toast.success("Thêm khách hàng thành công")
      navigate(-1)
      reset(initialFormState);
    }
    else {
      toast.error("Đã có lỗi xảy ra , vui lòng liên hệ nhân viên quản trị hệ thống để nhận hỗ trợ")
    }
  }
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}></Grid2>
        <h3>KHÁCH HÀNG</h3>
        <Grid2 size={12}>
          <Paper>
            <FormProvider {...methods}>
              <form
                style={{ width: "100%" , padding : 30}}
                onSubmit={handleSubmit(submitForm)}
                noValidate
              >
                <Grid2 size={12}>
                  <h4>1. Thông tin chung</h4>
                </Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.id}
                      label={labelObj.id}
                     disabled={true}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.tenKhachHang}
                      label={labelObj.tenKhachHang}
                      // disabled={isLoading}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.tenVietTat}
                      label={labelObj.tenVietTat}
                      // disabled={isLoading}
                    />
                  </Grid2>

                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.maSoThue}
                      label={labelObj.maSoThue}
                      // disabled={isLoading}
                      required
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.soDienThoai}
                      label={labelObj.soDienThoai}
                    // disabled={isLoading}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.email}
                      label={labelObj.email}
                    // disabled={isLoading}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <AutocompleteRHF
                      name={modelObj.maNguonGocKhachHang}
                      label={labelObj.maNguonGocKhachHang}
                      isGetOnlyId
                      // disabled={isLoading}
                      data={commonMapDataAutocomplete(dataNguonGocKhachHang, "name")}
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
                  <Grid2 size={12}>
                    <h4>2. Thông tin bổ sung</h4>
                  </Grid2>
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.taiKhoanNganHang}
                      label={labelObj.taiKhoanNganHang}
                    // disabled={isLoading}
                    />
                  </Grid2>
                  <DatePickerRHF
                    name={modelObj.ngayThanhLap}
                    label={labelObj.ngayThanhLap}
                    maxDate={modelObj.ngayThanhLap}
                  />
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
                  <Grid2 size={6}>
                    <TextFieldRHF
                      name={modelObj.website}
                      label={labelObj.website}
                    // disabled={isLoading}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <h4 style={{ padding: 2 }}>3. Thông tin địa chỉ</h4>
                  </Grid2>
                  <Grid2 size={12}>
                    <TextAreaRHF
                      name={modelObj.thongTinGiaoHang}
                      label={labelObj.thongTinGiaoHang}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <TextAreaRHF
                      name={modelObj.thongTinHoaDon}
                      label={labelObj.thongTinHoaDon}
                    />
                  </Grid2>

                  <Grid2 size={12}>
                    <h4 style={{ padding: 2 }}>4. Thông tin dữ liệu</h4>
                  </Grid2>
                  <p>Là khách hàng dùng chung</p>
                  <SwitchRHF
                    name={modelObj.isDungChung}
                  />
                   <p>Là khách hàng cá nhân</p>
                  <SwitchRHF
                    name={modelObj.isKhachHangCaNhan}
                  />
                   <p>Là khách hàng nhà phân phối</p>
                  <SwitchRHF
                    name={modelObj.isNhaPhanPhoi}
                  />
                </Grid2>
                <Grid2 size={12}>

                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    style={{ marginRight: 10 }}
                    type="submit"
                  >
                    Lưu khách hàng
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
        </Grid2>
      </Grid2>
    </>
  )
}

export default AddKhachHangMucTieu