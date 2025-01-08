import {
  Button,
  Grid2,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SwitchRHF from "../../../Components/ReactHookFormComp/SwitchRHF/SwitchRHF";
import { validateString } from "../../../Until/validateYup";
import TextFieldRHF from "../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../Until/constant";
import * as yup from "yup";
import { toast } from "react-toastify";
import AutocompleteRHF from "../../../Components/ReactHookFormComp/AutocompleteRHF/AutocompleteRHF";
import { commonMapDataAutocomplete } from "../../../Until/mapData.helper";
import DatePickerRHF from "../../../Components/ReactHookFormComp/DatePickerRHF";
import TextAreaRHF from "../../../Components/ReactHookFormComp/TextAreaRHF/TextAreaRHF"
import {
  useGetAllDoanhThuQuery,
  useGetAllLinhVucNgheNghiepQuery,
  useGetAllLoaiHinhNgheNghiepQuery,
  useGetAllLoaiTiemNangQuery,
  useGetAllNganhNgheByLinhVucIdQuery,
  useGetAllNguonGocKhachHangQuery,
  useGetAllPhongBanKhachHangQuery,
} from "src/App/Api/GetDataApi";
import { useUpdateKhachHangTiemNangMutation } from "src/App/Api/KhachHangTiemNangApi";
// ------ Form Config ------ //
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
    [modelObj.nguoiDungId]: null,
    [modelObj.phongBanId]: null,
    [modelObj.tenKhachHang]: null,
    [modelObj.soDienThoaiDiDong]: null,
    [modelObj.chucDanh]: null,
    [modelObj.soZalo]: null,
    [modelObj.emailCaNhan]: null,
    [modelObj.emailCoQuan]: null,
    [modelObj.tenToChuc]: null,
    [modelObj.maSoThue]: null,
    [modelObj.ngayThanhLap]: null,
    [modelObj.diaChi]: null,
    [modelObj.thongTinMoTa]: null,
    [modelObj.maPhongbanKhachHang]: null,
    [modelObj.maLoaiTiemNang]: null,
    [modelObj.maLoaiHinhNgheNghiep]: null,
    [modelObj.maNganhNghe]: null,
    [modelObj.maDoanhThu]: null,
    [modelObj.maLinhVuc]: null,
    [modelObj.isDungChung]: false,
  },
  schema = yup.object().shape({
    [modelObj.tenKhachHang]: validateString(),
    [modelObj.soDienThoaiDiDong]: validateString(),
    [modelObj.emailCaNhan]: validateString(),
    [modelObj.diaChi]: validateString(),
  });
// ------ End Of Form Config ------ //
const userData = JSON.parse(localStorage.getItem('authorizationData'));
const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa khách hàng tiềm năng",
  };
  return title[typeModal] ?? "";
};

const UpdateKhachHangTiemNang = (props) => {
  const [linhVucId, setLinhVucId] = useState("");
  const { showModal, closeModal, typeModal, setLoading, selectedItem, setTypeModal, refetch } =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),

    header = getHeader(typeModal),
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
    [updateKhachHangTiemNang] = useUpdateKhachHangTiemNangMutation();
  const isLoading = isGetNganhNgheFetching || isGetLinhVucFetching || isGetLoaiHinhFetching || isGetLoaiTiemNangFetching || isGetNguonGocKhachHangFetching || isGetPhongBanKhachHangFetching;

  const submitForm = (data) => {
    const tempData = {
      id: data.id,
      [modelObj.tenKhachHang]: data[modelObj.tenKhachHang],
      [modelObj.soDienThoaiDiDong]: data[modelObj.soDienThoaiDiDong],
      [modelObj.soDienThoaiCoQuan]: data[modelObj.soDienThoaiCoQuan],
      [modelObj.chucDanh]: data[modelObj.chucDanh],
      [modelObj.soZalo]: data[modelObj.soZalo],
      [modelObj.emailCaNhan]: data[modelObj.emailCaNhan],
      [modelObj.emailCoQuan]: data[modelObj.emailCoQuan],
      [modelObj.orderNumber]: data[modelObj.orderNumber],
      [modelObj.tenToChuc]: data[modelObj.tenToChuc],
      [modelObj.maSoThue]: data[modelObj.maSoThue],
      [modelObj.ngayThanhLap]: data[modelObj.ngayThanhLap],
      [modelObj.diaChi]: data[modelObj.diaChi],
      [modelObj.thongTinMoTa]: data[modelObj.thongTinMoTa],
      [modelObj.maNguonGocKhachHang]: data[modelObj.maNguonGocKhachHang],
      [modelObj.maPhongbanKhachHang]: data[modelObj.maPhongbanKhachHang],
      [modelObj.maLoaiTiemNang]: data[modelObj.maLoaiTiemNang],
      [modelObj.maLinhVuc]: data[modelObj.maLinhVuc],
      [modelObj.maNganhNghe]: data[modelObj.maNganhNghe],
      [modelObj.maDoanhThu]: data[modelObj.maDoanhThu],
      [modelObj.isDungChung]: data[modelObj.isDungChung],
      [modelObj.nguoiDungId]: userData?.response?.id,
      [modelObj.phongBanId]: userData?.response?.phongBan?.id,
    };

    typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
  },

    callApiUpdate = async (paramData) => {
      try {
        await updateKhachHangTiemNang(paramData).unwrap();
        toast.success("Chỉnh sửa thành công thành công")
        refetch();
        closeModalWithOtherFunc()
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận quản trị hệ thống để được hỗ trợ");
      } finally {
        setLoading(false);
      }
    },
    closeModalWithOtherFunc = () => {
      setTypeModal("");
      modalRef.current.reset(initialFormState);
      closeModal();
    },


    getInitialStateFromApiToUpdate = async (selectedItem) => {

      modalRef.current?.reset(
        {
          ...selectedItem,
          id: selectedItem?.id,
          [modelObj.tenKhachHang]: selectedItem[modelObj.tenKhachHang],
          [modelObj.soDienThoaiDiDong]: selectedItem[modelObj.soDienThoaiDiDong],
          [modelObj.soDienThoaiCoQuan]: selectedItem[modelObj.soDienThoaiCoQuan],
          [modelObj.chucDanh]: selectedItem[modelObj.chucDanh],
          [modelObj.soZalo]: selectedItem[modelObj.soZalo],
          [modelObj.emailCaNhan]: selectedItem[modelObj.emailCaNhan],
          [modelObj.emailCoQuan]: selectedItem[modelObj.emailCoQuan],
          [modelObj.tenToChuc]: selectedItem[modelObj.tenToChuc],
          [modelObj.maSoThue]: selectedItem[modelObj.maSoThue],
          [modelObj.ngayThanhLap]: selectedItem[modelObj.ngayThanhLap],
          [modelObj.diaChi]: selectedItem[modelObj.diaChi],
          [modelObj.thongTinMoTa]: selectedItem[modelObj.thongTinMoTa],
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
    if (selectedItem[0] && typeModal === TYPE_MODAL.UPDATE) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0], typeModal]);

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
      type={typeModal}
      loading={isLoading}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
      fullScreen={true}
    >
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
    </RHFDrawer>
  );
};

export default UpdateKhachHangTiemNang;