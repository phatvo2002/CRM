import { Grid2 } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateLienHeMutation } from "src/App/Api/LienHeApi";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";

const modelObj = {
    id: "id",
    tenLienHe: "tenLienHe",
    xungHo: "xungHo",
    email: "email",
    soDienThoai: "soDienThoai",
    khachHangTiemNangId: "khachHangTiemNangId",
    khachHangId: "khachHangId",
  },
  labelObj = {
    id: "Mã Liên hệ",
    tenLienHe: "Tên liên hệ",
    xungHo: "Xưng hô",
    email: "Email",
    soDienThoai: "Số điện thoại",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.tenLienHe]: "",
    [modelObj.xungHo]: "",
    [modelObj.email]: "",
    [modelObj.soDienThoai]: "",
    [modelObj.khachHangTiemNangId]: "",
    [modelObj.khachHangId]: "",
  },
  schema = yup.object().shape({
    [modelObj.tenLienHe]: validateString(),
    [modelObj.email]: validateString(),
    [modelObj.soDienThoai]: validateString(),
  });

const ModalUpdateNguoiDaiDien = (props) => {
  const { showModal, closeModal, selectedItem, refetch } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null);
  const isLoading = false;
  const { id } = useParams();
  const [updateNguoiDaiDien] = useUpdateLienHeMutation();

  const submitForm = (data) => {
    const tempData = {
      id: data?.id,
      [modelObj.tenLienHe]: data[modelObj?.tenLienHe],
      [modelObj.xungHo]: data[modelObj?.xungHo],
      [modelObj.soDienThoai]: data[modelObj?.soDienThoai],
      [modelObj.email]: data[modelObj?.email],
      [modelObj.khachHangTiemNangId]: id,
      [modelObj.khachHangId]: null,
    }
    callApiUpdate(tempData);
  };

  const callApiUpdate = async (params) => {
      try {
        const response = await updateNguoiDaiDien(params);
        if (response?.data?.status == 200) {
          toast.success("Chỉnh sủa dữ liệu thành công");
          refetch();
          closeModalWithOtherFunc();
        } else toast.warning(response?.data?.message);
      } catch (error) {
        toast.error(
          "Đã có lỗi xảy ra vui lòng liên hệ bộ phận chăm sóc khách hàng"
        );
      }
    },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          id: selectedItem?.id,
          [modelObj.tenLienHe]: selectedItem[modelObj.tenLienHe],
          [modelObj.xungHo]: selectedItem[modelObj.xungHo],
          [modelObj.soDienThoai]: selectedItem[modelObj.soDienThoai],
          [modelObj.email]: selectedItem[modelObj.email],
        },
        { keepDirty: true }
      );
    },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
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
    <div>
      <RHFDrawer
        handleClose={closeModalWithOtherFunc}
        submitForm={submitForm}
        isOpen={showModal}
        header={"Chỉnh sửa liên hệ"}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.tenLienHe}
              label={labelObj.tenLienHe}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.xungHo}
              label={labelObj.xungHo}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.email}
              label={labelObj.email}
              disabled={isLoading}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.soDienThoai}
              label={labelObj.soDienThoai}
              disabled={isLoading}
              required
            />
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </div>
  );
};

export default ModalUpdateNguoiDaiDien;
