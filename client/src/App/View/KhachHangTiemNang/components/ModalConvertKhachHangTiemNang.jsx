import { Grid2 } from "@mui/material";
import { useEffect, useRef } from "react";
import TextFieldRHF from "../../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { validateString } from "../../../../../Until/validateYup";
import * as yup from "yup";
import { SwitchRHF } from "src/App/Components/ReactHookFormComp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { validateDatePicker } from "../../../../../Until/validateYup";
import AutocompleteRHF from "src/App/Components/ReactHookFormComp/AutocompleteRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  useGetAllDoanhThuQuery,
  useGetAllKetQuaCuocGoiQuery,
  useGetAllLinhVucNgheNghiepQuery,
  useGetAllLoaiCuocGoiQuery,
  useGetAllLoaiHinhNgheNghiepQuery,
  useGetAllLoaiTiemNangQuery,
  useGetAllNganhNgheByLinhVucIdQuery,
  useGetAllNguonGocKhachHangQuery,
  useGetAllPhongBanKhachHangQuery,
} from "src/App/Api/GetDataApi";
import { useUpdateCuocGoiMutation } from "src/App/Api/CuocGoiApi";
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
    id: "Mã khách hàng",
    tenKhachHang: "Tên khách hàng",
    tenVietTat: "Tên viết tắt",
    maSoThue: "Mã số thuế",
    soDienThoai: "Số điện thoại",
    taiKhoanNganHang: "Tài khoản ngân hàng",
    ngayThanhLap :"Ngày thành lập / Ngày sinh",
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
    [modelObj.taiKhoanNganHang]:"",
    [modelObj.ngayThanhLap]:"",
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
      setLoading,
      selectedItem,
      setTypeModal,
      refetch,
    } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams(),
    [updateCuocGoi, { isLoading: isUpdateCuocGoi }] =
      useUpdateCuocGoiMutation(),
    header = "Chuyển đổi tiềm năng thành khách hàng",
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
    } = useGetAllDoanhThuQuery();
  const isLoading =
    isUpdateCuocGoi || isGetCuocGoiFetching || isGetKetQuaCuocGoiFetching;
  const submitForm = (data) => {
      const tempData = {
        [modelObj.id]: "KH" + Math.floor(Math.random() * 6),
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
      };

      typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
    },
    callApiUpdate = async (paramData) => {
      try {
        await updateCuocGoi(paramData).unwrap();
        toast.success("Chỉnh sửa thành công thành công");
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
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
          [modelObj.tieuDe]: selectedItem[modelObj.tieuDe],
          [modelObj.moTa]: selectedItem[modelObj.moTa],
          [modelObj.ngayBatDau]: selectedItem[modelObj.ngayBatDau]
            ? new Date(selectedItem[modelObj.ngayBatDau])
            : null,
          [modelObj.isHoanThanh]: selectedItem[modelObj.isHoanThanh],
          [modelObj.ketQuaCuocGoiId]: selectedItem[modelObj.ketQuaCuocGoiId],
          [modelObj.khachHangTiemNangId]:
            selectedItem[modelObj.khachHangTiemNangId],
          [modelObj.soPhutGoi]: selectedItem[modelObj.soPhutGoi],
          [modelObj.soGiayGoi]: selectedItem[modelObj.soGiayGoi],
        },
        { keepDirty: true }
      );
    };

  console.log(selectedItem[0]?.ngayBatDau);
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
    >
      <Grid2 container spacing={2}>
        <h3>I. Thông tin chung</h3>
        <Grid2 size={6}>
          <TextFieldRHF label={labelObj.id} disabled={true} />
        </Grid2>
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
            required
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
          <TextFieldRHF
            name={modelObj.soDienThoai}
            label={labelObj.soDienThoai}
            disabled={isLoading}
            required
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
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.website}
            label={labelObj.website}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <DateTimePickerRHF
            name={modelObj.ngayThanhLap}
            label={labelObj.ngayThanhLap}
            disabled={isLoading}
            required
          />
        </Grid2>
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
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.thongTinGiaoHang}
            label={labelObj.thongTinGiaoHang}
            disabled={isLoading}
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <TextFieldRHF
            name={modelObj.thongTinHoaDon}
            label={labelObj.thongTinHoaDon}
            disabled={isLoading}
            required
          />
        </Grid2>
         <Grid2 size={12}>
          <h3>4. Thông liên hệ (Dành cho khách hàng là doanh nghiệp)</h3>
        </Grid2>

         <Grid2 size={12}>
          <label>{labelObj.isDungChung}</label>
          <SwitchRHF
            name={modelObj.isDungChung}
            label={labelObj.isDungChung}
            disabled={isLoading}
            required
          />
        </Grid2>
         <Grid2 size={12}>
          <label>{labelObj.isKhachHangCaNhan}</label>
          <SwitchRHF
            name={modelObj.isKhachHangCaNhan}
            label={labelObj.isKhachHangCaNhan}
            disabled={isLoading}
            required
          />
        </Grid2>
          <Grid2 size={12}>
          <label>{labelObj.isNhaPhanPhoi}</label>
          <SwitchRHF
            name={modelObj.isNhaPhanPhoi}
            label={labelObj.isNhaPhanPhoi}
            disabled={isLoading}
            required
          />
        </Grid2>


      
        {/* <Grid2 size={6}>
            
          <AutocompleteRHF
            name={modelObj.loaiCuocGoiId}
            label={labelObj.loaiCuocGoiId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(loaiCuocGoiData, "name")}
            skeletonLoading={isGetCuocGoiFetching}
          />
        </Grid2> */}
        {/* <Grid2 size={6}>
          <AutocompleteRHF
            name={modelObj.ketQuaCuocGoiId}
            label={labelObj.ketQuaCuocGoiId}
            isGetOnlyId
            disabled={isLoading}
            data={commonMapDataAutocomplete(KetQuaCuocGoiData, "name")}
            skeletonLoading={isGetKetQuaCuocGoiFetching}
          />
        </Grid2>
        <Grid2 size={12}>
          <label>{labelObj.isHoanThanh}</label>
          <SwitchRHF
            name={modelObj.isHoanThanh}
            label={labelObj.isHoanThanh}
            disabled={isLoading}
            required
          />
        </Grid2> */}
    </RHFDrawer>
  );
};

export default ModalConvertKhachHangTiemNang;
