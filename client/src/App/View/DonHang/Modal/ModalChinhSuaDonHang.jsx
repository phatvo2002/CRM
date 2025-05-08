import { Grid2, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateDonhangMutation } from "src/App/Api/DonHangApi";
import {
  useGetAllLoaiDonHangQuery,
  useGetAllTinhTrangDonHangQuery,
  useGetAllTinhTrangGhiDoanhSoQuery,
} from "src/App/Api/GetDataApi";
import { useGetKhachHangMucTieuByNguoiDungIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import { useGetLienHeByKhachHangMucTieuIdQuery } from "src/App/Api/LienHeApi";
import { AutocompleteRHF, TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";

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
  };
const ModalChinhSuaDonHang = ({
  selectedItem,
  openModal,
  handleClose,
  refetch,
}) => {
  const [khachHangId, setKhachHangId] = useState(null);
  const [updateDonhang] = useUpdateDonhangMutation();
    const valueTuNgay = dayjs("1900-01-01").format('YYYY-MM-DD');
    const valueDenNgay = dayjs("2100-12-31").format('YYYY-MM-DD');
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    { data: dataTinhTrangDonHang, isLoading: isGetTinhTrangIsFetching } =
      useGetAllTinhTrangDonHangQuery(undefined, { skip: openModal == false }),
    {
      data: dataTinhTrangGhiDoanhSo,
      isLoading: isGetTinhTrangGhiIDoanhSoIsFetching,
    } = useGetAllTinhTrangGhiDoanhSoQuery(undefined, {
      skip: openModal == false,
    }),
    { data: dataLoaiDonHang, isLoading: isGetLoaiDonHangFetching } =
      useGetAllLoaiDonHangQuery(undefined, { skip: openModal == false }),
    { data: dataLienHe, isLoading: isGetLienHeFetching } =
      useGetLienHeByKhachHangMucTieuIdQuery(khachHangId, {
        skip: openModal == false,
      }),
    { data: dataKhachhangMucTieu, isLoading: isGetKhachHangIsFeatching } =
      useGetKhachHangMucTieuByNguoiDungIdQuery({tuNgay : valueTuNgay , denNgay :valueDenNgay }, {
        skip: openModal == false,
      });
      const isLoading =
    isGetTinhTrangIsFetching ||
    isGetLoaiDonHangFetching ||
    isGetLienHeFetching ||
    isGetKhachHangIsFeatching;
    console.log(selectedItem)
  const submitForm = (data) => {
    const tempData = {
      [modelObj.tenDonHang]: data[modelObj.tenDonHang],
      [modelObj.moTaDonHang]: data[modelObj.moTaDonHang],
      [modelObj.ngayDatHang]: data[modelObj.ngayDatHang],
      [modelObj.hanThanhToan]: data[modelObj.hanThanhToan],
      [modelObj.hanGiaoHang]: data[modelObj.hanGiaoHang],
      [modelObj.giaTriDonHang]: data[modelObj.giaTriDonHang],
      [modelObj.soTienConPhaiThu]: 0,
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
      [modelObj.maTinhTrangGhiDoanhSo]: data[modelObj.maTinhTrangGhiDoanhSo],
    };
    callApiUpdate(tempData);
  };
  const callApiUpdate = async (params) => {
    try {
      const response = await updateDonhang(params);
      if (response?.status == 200) {
        toast.success("Chỉnh sửa đơn hàng thành công");
      } else {
        toast.warning(response?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  },
  closeModalWithOtherFunc = () => {
    modalRef.current.reset(initialFormState);
    handleClose();
  },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          [modelObj.id]: selectedItem?.id,
          [modelObj.tenDonHang]: selectedItem?.tenDonHang,
          [modelObj.moTaDonHang]: selectedItem?.moTaDonHang,
          [modelObj.ngayDatHang]: selectedItem?.ngayDatHang,
          [modelObj.soTienConPhaiThu]: selectedItem?.soTienConPhaiThu,
          [modelObj.thucThuDonHang]: selectedItem?.thucThuDonHang,
          [modelObj.giaTriDonHang]: selectedItem?.giaTriDonHang,
          [modelObj.hanThanhToan]: selectedItem?.hanThanhToan,
          [modelObj.hanGiaoHang]: selectedItem?.hanGiaoHang,
          [modelObj.maLoaiDonHang]: selectedItem?.maLoaiDonHang,
          [modelObj.maBaoGia]: selectedItem?.maBaoGia,
          [modelObj.maKhachHang]: selectedItem?.maKhachHang,
          [modelObj.maLienHe]: selectedItem?.maLienHe,
          [modelObj.maTinhTrangDonHang]: selectedItem?.maTinhTrangDonHang,
          [modelObj.maTinhTrangGhiDoanhSo]: selectedItem?.maTinhTrangGhiDoanhSo,
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
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  return <>
       <RHFDrawer
             handleClose={closeModalWithOtherFunc}
             submitForm={submitForm}
             isOpen={openModal}
             header={"Chỉnh sửa đơn hàng"}
             type={null}
             fullScreen={true}
             loading={isLoading}
             initialFormState={initialFormState}
            //  schema={}
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
                 <TextFieldRHF
                   name={modelObj.giaTriDonHang}
                   label={labelObj.giaTriDonHang}
                   disabled={isLoading}
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
  </>;
};

export default ModalChinhSuaDonHang;
