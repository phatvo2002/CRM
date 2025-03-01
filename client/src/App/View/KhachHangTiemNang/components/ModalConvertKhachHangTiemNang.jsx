import { Grid2 } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TextFieldRHF from "src/App/Components/ReactHookFormComp/TextFieldRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { SwitchRHF } from "src/App/Components/ReactHookFormComp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { validateDatePicker } from "src/App/Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  useGetAllDoanhThuQuery,
  useGetAllLinhVucNgheNghiepQuery,
  useGetAllLoaiHinhNgheNghiepQuery,
  useGetAllLoaiTiemNangQuery,
  useGetAllNganhNgheByLinhVucIdQuery,
  useGetAllNguonGocKhachHangQuery,
  useGetAllPhongBanKhachHangQuery,
} from "src/App/Api/GetDataApi";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import { useConvertKhachHangMucTieuMutation } from "src/App/Api/KhachHangMucTieuApi";
import { useGetHangHoaQuanTamByKhachHangTiemNangIdQuery } from "src/App/Api/HangHoaQuanTam";
import { useGetLienHeByKhachHangTiemNangIdQuery } from "src/App/Api/LienHeApi";
// ------ Form Config ------ //
const modelObj = {
  id: "id",
  tenKhachHang: "tenKhachHang",
  tenVietTat: "tenVietTat",
  maSoThue: "maSoThue",
  soDienThoai: "soDienThoai",
  taiKhoanNganHang: "taiKhoanNganHang",
  ngayThanhLap: "ngayThanhLap",
  email: "email",
  website: "website",
  moTa: "moTa",
  isDungChung: "isDungChung",
  isKhachHangCaNhan: "isKhachHangCaNhan",
  isNhaPhanPhoi: "isNhaPhanPhoi",
  khachHangTiemNangId: "khachHangTiemNangId",
  thongTinHoaDon: "thongTinHoaDon",
  thongTinGiaoHang: "thongTinGiaoHang",
  maPhongbanKhachHang: "maPhongbanKhachHang",
  maNguonGocKhachHang: "maNguonGocKhachHang",
  maLoaiTiemNang: "maLoaiTiemNang",
  maLoaiHinhNgheNghiep: "maLoaiHinhNgheNghiep",
  maNganhNghe: "maNganhNghe",
  maLinhVuc: "maLinhVuc",
  maDoanhThu: "maDoanhThu",
  hangHoaQuanTam:"hangHoaQuanTam",
  LienHe:"LienHe"
},
  labelObj = {
    id: "Mã khách hàng",
    tenKhachHang: "Tên khách hàng",
    tenVietTat: "Tên viết tắt",
    maSoThue: "Mã số thuế",
    soDienThoai: "Số điện thoại",
    taiKhoanNganHang: "Tài khoản ngân hàng",
    ngayThanhLap: "Ngày thành lập / Ngày sinh",
    email: "Email",
    website: "WebSite",
    moTa: "Mô tả",
    isDungChung: "Khách hàng dùng chung",
    isKhachHangCaNhan: "Khách hàng cá nhân",
    isNhaPhanPhoi: "Khách hàng là nhà phân phối",
    thongTinHoaDon: "Thông tin hóa đơn",
    thongTinGiaoHang: "Thông tin giao hàng",
    maPhongbanKhachHang: "Phòng ban khách hàng",
    maNguonGocKhachHang: "Nguồn gốc khách hàng",
    maLoaiTiemNang: "Loại khách hàng",
    maLoaiHinhNgheNghiep: "Loại hình nghề nghiệp",
    maNganhNghe: "Ngành nghề",
    maLinhVuc: "Lĩnh vực",
    maDoanhThu: "Doanh thu",
    LienHe:"LienHe"
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenKhachHang]: "",
    [modelObj.tenVietTat]: "",
    [modelObj.maSoThue]: "",
    [modelObj.soDienThoai]: "",
    [modelObj.email]: "",
    [modelObj.website]: "",
    [modelObj.moTa]: "",
    [modelObj.taiKhoanNganHang]: "",
    [modelObj.ngayThanhLap]: new Date(),
    [modelObj.isDungChung]: false,
    [modelObj.isKhachHangCaNhan]: false,
    [modelObj.isNhaPhanPhoi]: false,
    [modelObj.thongTinHoaDon]: "",
    [modelObj.thongTinGiaoHang]: "",
    [modelObj.maPhongbanKhachHang]: 0,
    [modelObj.maNguonGocKhachHang]: 0,
    [modelObj.maLoaiTiemNang]: 0,
    [modelObj.maLoaiHinhNgheNghiep]: 0,
    [modelObj.maNganhNghe]: 0,
    [modelObj.maLinhVuc]: 0,
    [modelObj.maDoanhThu]: 0,
    [modelObj.hangHoaQuanTam] :[],
    [modelObj.LienHe] :[]
  },
  schema = yup.object().shape({
    [modelObj.soDienThoai]: validateString(),
    [modelObj.email]: validateString(),
    [modelObj.tenKhachHang]: validateString(),
  });
// ------ End Of Form Config ------ //

const ModalConvertKhachHangTiemNang = (props) => {
  const {
    showModal,
    closeModal,
    typeModal,
    selectedItem,
    refetch,
  } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [linhVucId, setLinhVucId] = useState(""),
    { id } = useParams(),
    header = "Chuyển đổi tiềm năng thành khách hàng",
    {
      data: dataHangHoaQuanTam,
      isFetching: { ishangHoaQuanTamFetching },
    } = useGetHangHoaQuanTamByKhachHangTiemNangIdQuery(selectedItem?.id , {skip:selectedItem?.id == null}),
    {
      data: dataLienHe,
      isFetching: { isdataLienheFetching },
    } = useGetLienHeByKhachHangTiemNangIdQuery(selectedItem?.id , {skip:selectedItem?.id == null}),
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
    [convertKhachHang] = useConvertKhachHangMucTieuMutation();
  const isLoading = ishangHoaQuanTamFetching || isdataLienheFetching || isGetNguonGocKhachHangFetching || isGetLoaiTiemNangFetching
   ||  isGetLoaiHinhFetching || isGetLinhVucFetching || isGetNganhNgheFetching
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
      [modelObj.website]: data[modelObj.website],
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
      [modelObj.maNganhNghe]: data[modelObj.maNganhNghe],
      [modelObj.maLinhVuc]: data[modelObj.maLinhVuc],
      [modelObj.maDoanhThu]: data[modelObj.maDoanhThu],
      [modelObj.khachHangTiemNangId] :id,
      [modelObj.hangHoaQuanTam] :dataHangHoaQuanTam,
      [modelObj.LienHe] : dataLienHe,
    };

    callApiUpdate(tempData);
  },
    callApiUpdate = async (paramData) => {
      try {
        const response = await convertKhachHang(paramData).unwrap();
        if(response?.status === 200)
        {
          toast.success(response?.message);
          closeModalWithOtherFunc();
        }
         else
         {
           toast.success(response?.message);
         }
      } catch (error) {
        toast.error(error);
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
          [modelObj.tenKhachHang]: selectedItem[modelObj.tenKhachHang],
          [modelObj.soDienThoai]: selectedItem?.soDienThoaiDiDong,
          [modelObj.email]: selectedItem?.emailCaNhan,
          [modelObj.ngayThanhLap]: selectedItem[modelObj.ngayThanhLap] !== null || undefined ? selectedItem[modelObj.ngayThanhLap] : new Date(),
          [modelObj.thongTinMoTa]: selectedItem[modelObj.thongTinMoTa],
          [modelObj.thongTinGiaoHang]: selectedItem?.diaChi,
          [modelObj.maNguonGocKhachHang]: selectedItem[modelObj.maNguonGocKhachHang],
          [modelObj.maPhongbanKhachHang]: selectedItem[modelObj.maPhongbanKhachHang],
          [modelObj.maLoaiTiemNang]: selectedItem[modelObj.maLoaiTiemNang],
          [modelObj.maLoaiHinhNgheNghiep]: selectedItem[modelObj.maLoaiHinhNgheNghiep],
          [modelObj.maNganhNghe]: selectedItem[modelObj.maNganhNghe],
          [modelObj.maDoanhThu]: selectedItem[modelObj.maDoanhThu],
          [modelObj.maLinhVuc]: selectedItem[modelObj.maLinhVuc],
          [modelObj.isDungChung]: selectedItem[modelObj.isDungChung],
        },
        { keepDirty: true }
      );
    };

  useEffect(() => {
    if (selectedItem) {
      getInitialStateFromApiToUpdate(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return (
    <RHFDrawer
      handleClose={closeModalWithOtherFunc}
      submitForm={submitForm}
      isOpen={showModal}
      header={header}
      submitName={"Chuyển đổi"}
      type={typeModal}
      loading={isLoading}
      fullScreen={true}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <h3>I. Thông tin chung</h3>
        </Grid2>
        {/* <Grid2 size={6}>
          <TextFieldRHF label={labelObj.id}
           disabled={true} />
        </Grid2> */}
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.tenKhachHang}
            label={labelObj.tenKhachHang}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.tenVietTat}
            label={labelObj.tenVietTat}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.maSoThue}
            label={labelObj.maSoThue}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.soDienThoai}
            label={labelObj.soDienThoai}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.email}
            label={labelObj.email}
            disabled={isLoading}
            required
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
        <Grid2 size={12}>
          <h3>2. Thông tin bổ sung</h3>
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.taiKhoanNganHang}
            label={labelObj.taiKhoanNganHang}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.website}
            label={labelObj.website}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={6}>
          <DateTimePickerRHF
            name={modelObj.ngayThanhLap}
            label={labelObj.ngayThanhLap}
            disabled={isLoading}
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
        <Grid2 size={12}>
          <h3>3. Thông địa chỉ</h3>
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
        <Grid2 size={12}>
          <h3>4. Thông liên hệ (Dành cho khách hàng là doanh nghiệp)</h3>
        </Grid2>

        <Grid2 size={12}>
          <TextAreaRHF
            name={modelObj.moTa}
            label={labelObj.moTa}
            disabled={isLoading}
          />
        </Grid2>

        <Grid2 size={12}>
          <label>{labelObj.isDungChung}</label>
          <SwitchRHF
            name={modelObj.isDungChung}
            label={labelObj.isDungChung}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={12}>
          <label>{labelObj.isKhachHangCaNhan}</label>
          <SwitchRHF
            name={modelObj.isKhachHangCaNhan}
            label={labelObj.isKhachHangCaNhan}
            disabled={isLoading}
          />
        </Grid2>
        <Grid2 size={12}>
          <label>{labelObj.isNhaPhanPhoi}</label>
          <SwitchRHF
            name={modelObj.isNhaPhanPhoi}
            label={labelObj.isNhaPhanPhoi}
            disabled={isLoading}
          />
        </Grid2>
      </Grid2>

    </RHFDrawer>
  );
};

export default ModalConvertKhachHangTiemNang;
