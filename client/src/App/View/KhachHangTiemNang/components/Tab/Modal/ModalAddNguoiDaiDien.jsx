import { Grid2 } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetLichHenByKhachHangTiemNangIdQuery } from "src/App/Api/LichhenApi";
import { useAddLienHeMutation } from "src/App/Api/LienHeApi";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TYPE_MODAL } from "src/App/Until/constant";
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

const ModalAddNguoiDaiDien = (props) => {
  const { showModal, closeModal, typeModal, setTypeModal, refetch } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    { id } = useParams(),
    isLoading = false,
    header = "Thêm mới liên hệ";
  const [addLienHe] = useAddLienHeMutation();
  const submitForm = (data) => {
      const tempData = {
        [modelObj.id]: "LH" + Math.random().toString(36).slice(2, 7),
        [modelObj.tenLienHe]: data[modelObj.tenLienHe],
        [modelObj.xungHo]: data[modelObj.xungHo],
        [modelObj.email]: data[modelObj.email],
        [modelObj.soDienThoai]: data[modelObj.soDienThoai],
        [modelObj.khachHangTiemNangId]: id,
        [modelObj.khachHangId]: null,
      };
     callApiInsert(tempData);
    },
    callApiInsert = async (data) => {
      try {
        await addLienHe(data).unwrap();
        toast.success("Thêm mới thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        refetch();
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi khi xảy ra!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    };
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
        header={header}
        type={typeModal}
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

export default ModalAddNguoiDaiDien;
