import React, { useEffect, useRef, useState } from "react";
import { useGetCoHoiListQuery } from "src/App/Api/CoHoiApi";
import { useGetAllTinhTrangBaoGiaQuery } from "src/App/Api/GetDataApi";
import { useGetKhachHangMucTieuByNguoiDungIdQuery } from "src/App/Api/KhachHangMucTieuApi";
import { validateDatePicker, validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import TextAreaRHF from "src/App/Components/ReactHookFormComp/TextAreaRHF";
import { v4 as uuidv4 } from "uuid";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  AutocompleteRHF,
  TextFieldRHF,
} from "src/App/Components/ReactHookFormComp";
import { toast } from "react-toastify";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import { useUpdateBaoGiaMutation } from "src/App/Api/BaoGiaApi";
const modelObj = {
    id: "id",
    tenBaoGia: "tenBaoGia",
    ngayBaoGia: "ngayBaoGia",
    ngayHetHan: "ngayHetHan",
    diaChi: "diaChi",
    maSoThue: "maSoThue",
    tongTien: "tongTien",
    maTinhTrangBaoGia: "maTinhTrangBaoGia",
    maCoHoi: "maCoHoi",
    maKhachHang: "maKhachHang",
    moTa: "moTa",
  },
  labelObj = {
    id: "Mã báo giá",
    tenBaoGia: "Tên báo giá",
    ngayBaoGia: "Ngày báo giá",
    ngayHetHan: "Ngày hết hạn",
    maSoThue: "Mã số thuế",
    tongTien: "tongTien",
    maTinhTrangBaoGia: "Tình trạng báo giá",
    maCoHoi: "Cơ hội",
    maKhachHang: "Khach Hàng",
    diaChi: "Địa chỉ",
    moTa: "Thông tin Mô tả",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenBaoGia]: "",
    [modelObj.ngayBaoGia]: new Date(),
    [modelObj.ngayHetHan]: new Date(),
    [modelObj.maSoThue]: "",
    [modelObj.tongTien]: 0,
    [modelObj.maTinhTrangBaoGia]: null,
    [modelObj.maCoHoi]: null,
    [modelObj.maKhachHang]: null,
    [modelObj.diaChi]: "",
    [modelObj.hangHoaQuanTams]: [],
    [modelObj.moTa]: "",
  },
  schema = yup.object().shape({
    [modelObj.tenBaoGia]: validateString(),
    [modelObj.ngayBaoGia]: validateDatePicker(),
    [modelObj.ngayHetHan]: validateDatePicker(),
    [modelObj.maKhachHang]: validateString(),
    // [modelObj.maCoHoi]: validateString(),
  });
const ModalSuaThongTinBaoGia = ({
  selectedItem,
  showModal,
  closeModal,
  typeModal,
  refetch
}) => {
    console.log(selectedItem)
  const _isMounted = useRef(false),
    modalRef = useRef(null);
  const { data: dataKhachhangMucTieu, isLoading: isGetKhachHangIsFeatching } =
    useGetKhachHangMucTieuByNguoiDungIdQuery(undefined, {
      skip: showModal == false,
    });
  const {
    data: dataTinhTrangBaoGia,
    isLoading: isGetTinhTrangBaoGiaIsFetching,
  } = useGetAllTinhTrangBaoGiaQuery({ skip: showModal == false });
  const { data: dataCoHoi, isLoading: isGetCoHoiIsFetching } =
      useGetCoHoiListQuery({ skip: showModal == false }),
    [updateBaoGia] = useUpdateBaoGiaMutation();
  const isLoading =
    isGetTinhTrangBaoGiaIsFetching ||
    isGetCoHoiIsFetching ||
    isGetKhachHangIsFeatching;
  const submitForm = (data) => {
    const tempData = {
      [modelObj.id]: selectedItem[0]?.id,
      [modelObj.tenBaoGia]: data[modelObj.tenBaoGia],
      [modelObj.ngayBaoGia]: data[modelObj.ngayBaoGia],
      [modelObj.ngayHetHan]: data[modelObj.ngayHetHan],
      [modelObj.maSoThue]: data[modelObj.maSoThue],
      [modelObj.tongTien]: selectedItem[0]?.tongTien,
      [modelObj.maCoHoi]: data[modelObj.maCoHoi],
      [modelObj.maTinhTrangBaoGia]: data[modelObj.maTinhTrangBaoGia],
      [modelObj.maKhachHang]: data[modelObj.maKhachHang],
      [modelObj.diaChi]: data[modelObj.diaChi],
    };

    callApiUpdate(tempData);
  },
  callApiUpdate = async (paramData) => {
    try {
      await updateBaoGia(paramData).unwrap();
      toast.success("Chỉnh sửa thành công");
      closeModalWithOtherFunc();
      refetch()
    } catch (error) {
      console.log(error);
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
          [modelObj.id]: selectedItem?.id,
          [modelObj.tenBaoGia]: selectedItem?.tenBaoGia,
          [modelObj.ngayBaoGia]: selectedItem?.ngayBaoGia,
          [modelObj.ngayHetHan]: selectedItem?.ngayHetHan,
          [modelObj.maSoThue]: selectedItem?.maSoThue,
          [modelObj.tongTien]: selectedItem?.tongTien,
          [modelObj.maCoHoi]: selectedItem?.maCoHoi,
          [modelObj.maTinhTrangBaoGia]: selectedItem?.maTinhTrangBaoGia,
          [modelObj.maKhachHang]: selectedItem?.maKhachHang,
          [modelObj.diaChi]: selectedItem?.diaChi,
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
  return (
    <>
      <RHFDrawer
        handleClose={closeModalWithOtherFunc}
        submitForm={submitForm}
        isOpen={showModal}
        header={"Sinh báo giá"}
        type={typeModal}
        fullScreen={true}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <h3>Thông tin chi tiết</h3>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Mã báo giá"
              variant="outlined"
              disabled
            />
          </Grid2>
          <Grid2 size={6}>
            <TextFieldRHF
              name={modelObj.tenBaoGia}
              label={labelObj.tenBaoGia}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={6}>
            <AutocompleteRHF
              name={modelObj.maTinhTrangBaoGia}
              label={labelObj.maTinhTrangBaoGia}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataTinhTrangBaoGia, "name")}
              skeletonLoading={isGetTinhTrangBaoGiaIsFetching}
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
            <AutocompleteRHF
              name={modelObj.maCoHoi}
              label={labelObj.maCoHoi}
              isGetOnlyId
              disabled={isLoading}
              data={commonMapDataAutocomplete(dataCoHoi, "name")}
              skeletonLoading={isGetCoHoiIsFetching}
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayBaoGia}
              label={labelObj.ngayBaoGia}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DateTimePickerRHF
              name={modelObj.ngayHetHan}
              label={labelObj.ngayHetHan}
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextAreaRHF
              name={modelObj.diaChi}
              label={labelObj.diaChi}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <Grid2 size={12}>
              <TextAreaRHF
                name={modelObj.moTa}
                label={labelObj.moTa}
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

export default ModalSuaThongTinBaoGia;
