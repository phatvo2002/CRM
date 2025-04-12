import { Grid2 } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAddKPINhanVienMutation } from "src/App/Api/KPINhanVien.api";
import {
  useAddMucTieuDoanhSoMutation,
  useGetAllMucTieuDoanhSoQuery,
} from "src/App/Api/MucTieuDoanhSo.Api";
import { useGetPhongBanQuery } from "src/App/Api/Phongban";
import {
  useGetUserAllQuery,
  useGetUserIsNhanVienQuery,
  useGetUserIsTruongPhongQuery,
} from "src/App/Api/UserApi";
import {
  AutocompleteRHF,
  TextFieldRHF,
} from "src/App/Components/ReactHookFormComp";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  validateAutocomplete,
  validateDatePicker,
  validateNumber,
  validateString,
} from "src/App/Until/validateYup";
import * as yup from "yup";

const modelObj = {
    tenKPI: "tenKPI",
    maQuanLy: "maQuanLy",
    tenPhongBan: "tenPhongBan",
    ngayBatDau: "ngayBatDau",
    ngayKetThuc: "ngayKetThuc",
    soCuocGoi: "soCuocGoi",
    soLichHen: "soLichHen",
    soEmailTuongTacKhachHang: "soEmailTuongTacKhachHang",
    soEmailBaoGia: "soEmailBaoGia",
    soKhachHangTiemNangDaChuyenDoi: "soKhachHangTiemNangDaChuyenDoi",
    doanhSo: "doanhSo",
    isDatMucTieu: "isDatMucTieu",
    maTrangThaiKPI: "maTrangThaiKPI",
    nguoiDungId: "nguoiDungId",
    phongBanId: "phongBanId",
    MaMucTieuDoanhSo: "MaMucTieuDoanhSo",
    GhiChu: "GhiChu"
  },
  labelObj = {
    tenKPI: "Tên KPI",
    maQuanLy: "Mã Quản Lý",
    tenPhongBan: "Tên phòng ban",
    ngayBatDau: "Ngày bắt đầu",
    ngayKetThuc: "Ngày kết thúc",
    soCuocGoi: "Số cuộc gọi",
    soLichHen: "Số lịch hẹn",
    soEmailTuongTacKhachHang: "Email Tương tác khách hàng",
    soKhachHangTiemNangDaChuyenDoi: "Số khách hàng tiềm năng chuyển đổi",
    soEmailBaoGia: "Email báo giá",
    doanhSo: "Doanh số bán hàng",
    maTrangThaiKPI: "Trạng thái",
    nguoiDungId: "Bàn giao cho",
    phongBanId: "Phòng ban thực hiện",
    MaMucTieuDoanhSo: "Mục tiêu",
    GhiChu: "Ghi chú"
  },
  initialFormState = {
    [modelObj.tenKPI]: "",
    [modelObj.maQuanLy]: "",
    [modelObj.tenPhongBan]: "",
    [modelObj.ngayBatDau]: new Date(),
    [modelObj.ngayKetThuc]: new Date(),
    [modelObj.soCuocGoi]: 0,
    [modelObj.soLichHen]: 0,
    [modelObj.soEmailTuongTacKhachHang]: 0,
    [modelObj.soKhachHangTiemNangDaChuyenDoi]: 0,
    [modelObj.soEmailBaoGia]: 0,
    [modelObj.doanhSo]: 0,
    [modelObj.maTrangThaiKPI]: null,
    [modelObj.nguoiDungId]: "",
    [modelObj.phongBanId]: "",
    [modelObj.MaMucTieuDoanhSo]: null,
    [modelObj.GhiChu]: "",
  },
  schema = yup.object().shape({
    [modelObj.tenKPI]: validateString(),
    [modelObj.maQuanLy]: validateString(),
    [modelObj.ngayBatDau]: validateDatePicker(),
    [modelObj.ngayKetThuc]: validateDatePicker(),
    [modelObj.soCuocGoi]: validateNumber(),
    [modelObj.soLichHen]: validateNumber(),
    [modelObj.soEmailTuongTacKhachHang]: validateNumber(),
    [modelObj.soEmailBaoGia]: validateNumber(),
    [modelObj.doanhSo]: validateNumber(),
    [modelObj.nguoiDungId]: validateString(),
    // [modelObj.phongBanId]: validateString(),
  });
const ModalThemMoi = ({
  showModal,
  closeModal,
  refetch,
  checkpermission,
  checkAdminPerMission,
}) => {
  const valueTuNgay = dayjs("1900-01-01");
  const valueDenNgay = dayjs("2100-12-31");
  const { data: userData, isLoading: isUserLoading } =
    useGetUserIsTruongPhongQuery(null, { skip: checkpermission == true });
  const { data: dataNhanVien, isLoading: isUserNhanVienLoading } =
    useGetUserIsNhanVienQuery(null, { skip: checkpermission == false });
  const { data: phongBanData, isLoading: isPhongBanLoading } =
    useGetPhongBanQuery();
  const { data: dataMucTieu, isLoading: isMucTieuLoading } =
    useGetAllMucTieuDoanhSoQuery(
      {
        tuNgay: valueTuNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
        denNgay: valueDenNgay.format("YYYY-MM-DD HH:mm:ss.SSS"),
      }
    );

  const [addMucTieu] = useAddMucTieuDoanhSoMutation();
  const [addKPINhanVien] = useAddKPINhanVienMutation();

  const _isMounted = useRef(false);
  const modalRef = useRef(null);

  const closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    },
    getInitialStateFromApiToUpdate = async () => {
      modalRef.current?.reset(
        {
          [modelObj.ngayBatDau]: new Date(),
          [modelObj.ngayKetThuc]: new Date(),
        },
        { keepDirty: true }
      );
    };
  const isLoading =
    isUserLoading ||
    isPhongBanLoading ||
    isMucTieuLoading ||
    isUserNhanVienLoading;

  const submitForm = (data) => {
      const tempData = {
        [modelObj.tenKPI]: data[modelObj.tenKPI],
        [modelObj.tenPhongBan]: data[modelObj.tenPhongBan],
        [modelObj.maQuanLy]: data[modelObj.maQuanLy],
        [modelObj.ngayBatDau]: data[modelObj.ngayBatDau],
        [modelObj.ngayKetThuc]: data[modelObj.ngayKetThuc],
        [modelObj.soCuocGoi]: data[modelObj.soCuocGoi],
        [modelObj.soLichHen]: data[modelObj.soLichHen],
        [modelObj.soEmailTuongTacKhachHang]:
          data[modelObj.soEmailTuongTacKhachHang],
        [modelObj.soKhachHangTiemNangDaChuyenDoi]:
          data[modelObj.soKhachHangTiemNangDaChuyenDoi],
        [modelObj.soEmailBaoGia]: data[modelObj.soEmailBaoGia],
        [modelObj.doanhSo]: data[modelObj.doanhSo],
        [modelObj.nguoiDungId]: data[modelObj.nguoiDungId],
        [modelObj.phongBanId]: data[modelObj.phongBanId],
        [modelObj.maTrangThaiKPI]: 1,
      };
      const tempDataKPINhanVien = {
        [modelObj.tenKPI]: data[modelObj.tenKPI],
        [modelObj.maQuanLy]: data[modelObj.maQuanLy],
        [modelObj.ngayBatDau]: data[modelObj.ngayBatDau],
        [modelObj.ngayKetThuc]: data[modelObj.ngayKetThuc],
        [modelObj.soCuocGoi]: data[modelObj.soCuocGoi],
        [modelObj.soLichHen]: data[modelObj.soLichHen],
        [modelObj.soEmailTuongTacKhachHang]:
          data[modelObj.soEmailTuongTacKhachHang],
        [modelObj.soKhachHangTiemNangDaChuyenDoi]:
          data[modelObj.soKhachHangTiemNangDaChuyenDoi],
        [modelObj.soEmailBaoGia]: data[modelObj.soEmailBaoGia],
        [modelObj.doanhSo]: data[modelObj.doanhSo],
        [modelObj.nguoiDungId]: data[modelObj.nguoiDungId],
        [modelObj.MaMucTieuDoanhSo]: data[modelObj.MaMucTieuDoanhSo],
        [modelObj.maTrangThaiKPI]: 1,
      };
      if(checkpermission == true)
      {
        callApiAddKPINhanVien(tempDataKPINhanVien)
      }else callApiConvert(tempData);
    },
    callApiConvert = async (paramData) => {
      try {
        await addMucTieu(paramData).unwrap();
        toast.success("Thêm mới mục tiêu thành công");
        closeModalWithOtherFunc();
        refetch();
      } catch (error) {
        console.log(error);
      }
    };
  const callApiAddKPINhanVien = async (paramData) => {
    try {
      await addKPINhanVien(paramData).unwrap();
      toast.success("Thêm mới thành công");
      closeModalWithOtherFunc();
      refetch();
    } catch (error) {
      console.log(error);
    }
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
        header={"Thêm mục tiêu"}
        type={null}
        fullScreen={true}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.tenKPI}
              label={labelObj.tenKPI}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayBatDau}
              label={labelObj.ngayBatDau}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayKetThuc}
              label={labelObj.ngayKetThuc}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.maQuanLy}
              label={labelObj.maQuanLy}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.soCuocGoi}
              label={labelObj.soCuocGoi}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.soLichHen}
              label={labelObj.soLichHen}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.soKhachHangTiemNangDaChuyenDoi}
              label={labelObj.soKhachHangTiemNangDaChuyenDoi}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.soEmailTuongTacKhachHang}
              label={labelObj.soEmailTuongTacKhachHang}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.soEmailBaoGia}
              label={labelObj.soEmailBaoGia}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.doanhSo}
              label={labelObj.doanhSo}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2>
          {checkpermission == true && (
            <Grid2 size={6}>
              <AutocompleteRHF
                name={modelObj.MaMucTieuDoanhSo}
                label={labelObj.MaMucTieuDoanhSo}
                isGetOnlyId
                disabled={isLoading}
                data={commonMapDataAutocomplete(dataMucTieu, "name")}
                skeletonLoading={isUserLoading}
              />
            </Grid2>
          )}

          {checkpermission == true && (
            <Grid2 size={6}>
              <AutocompleteRHF
                name={modelObj.nguoiDungId}
                label={labelObj.nguoiDungId}
                isGetOnlyId
                disabled={isLoading}
                data={commonMapDataAutocomplete(dataNhanVien, "name")}
                skeletonLoading={isUserNhanVienLoading}
              />
            </Grid2>
          )}
          {checkpermission == false && (
            <Grid2 size={6}>
              <AutocompleteRHF
                name={modelObj.nguoiDungId}
                label={labelObj.nguoiDungId}
                isGetOnlyId
                disabled={isLoading}
                data={commonMapDataAutocomplete(userData, "name")}
                skeletonLoading={isUserLoading}
              />
            </Grid2>
          )}
          {checkpermission == false && (
            <Grid2 size={6}>
              <AutocompleteRHF
                name={modelObj.phongBanId}
                label={labelObj.phongBanId}
                isGetOnlyId
                disabled={isLoading}
                data={commonMapDataAutocomplete(phongBanData, "name")}
                skeletonLoading={isPhongBanLoading}
              />
            </Grid2>
          )}

          {checkpermission == true && (
            <Grid2 size={12}>
              <TextAreaRHF
                name={modelObj.GhiChu}
                label={labelObj.GhiChu}
                disabled={isLoading}
                required
              />
            </Grid2>
          )}
          {/* <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.tenPhongBan}
              label={labelObj.tenPhongBan}
              disabled={isLoading}
              type="number"
              required
            />
          </Grid2> */}
        </Grid2>
      </RHFDrawer>
    </>
  );
};

export default ModalThemMoi;
