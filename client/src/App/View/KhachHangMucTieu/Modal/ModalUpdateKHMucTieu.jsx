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
  },
  schema = yup.object().shape({
    [modelObj.tenKhachHang]: validateString(),
    [modelObj.soDienThoai]: validateString(),
    [modelObj.email]: validateString(),
    [modelObj.thongTinGiaoHang]: validateString(),
  });
// ------ End Of Form Config ------ //
const userData = JSON.parse(localStorage.getItem('authorizationData'));
const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa khách hàng mục tiêu",
  };
  return title[typeModal] ?? "";
};

const ModalUpdateKHMucTieu = (props) => {
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
          [modelObj.tenVietTat]: selectedItem[modelObj.tenVietTat],
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
    </RHFDrawer>
  );
};

export default ModalUpdateKHMucTieu;