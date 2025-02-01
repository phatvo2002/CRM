import { Grid2 } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AuthApi from "src/App/Api/AuthApi";
import { useGetUserByIdQuery } from "src/App/Api/UserApi";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
const modelObj = {
    passEmail: "passEmail",
    email: "email",
  },
  labelObj = {
    email: "Email",
    passEmail: "Mật khẩu ứng dụng",
  },
  schema = yup.object().shape({
    [modelObj.email]: validateString(),
    [modelObj.passEmail]: validateString(),
  });
export const ModalThietLapMail = (props) => {
  const { showModal, closeModal, typeModal } = props;
  const header = "Cấu hình Mail",
    _isMounted = useRef(false),
    modalRef = useRef(null);
  const { data: userData } = useGetUserByIdQuery(undefined, {
    skip: showModal === false,
  });
  const initialFormState = {
    [modelObj.passEmail]: userData?.password,
    [modelObj.email]: userData?.email,
  };
  const submitForm = (data) => {
      callApiUpdate(data[modelObj.email], data[modelObj.passEmail]);
    },
    callApiUpdate = async (email, passEmail) => {
      try {
        await AuthApi.ActiveEmailService(email, passEmail);
        toast.success("Chỉnh sửa thành công thành công");
        closeModalWithOtherFunc();
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
      }
    },
    closeModalWithOtherFunc = () => {
      closeModal();
    },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          [modelObj.email]: selectedItem?.email,
          [modelObj.passEmail]: selectedItem?.password,
        },
        { keepDirty: true }
      );
    };
  useEffect(() => {
    if (userData) {
      getInitialStateFromApiToUpdate(userData);
    }
  }, [userData]);
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
        header={header}
        type={typeModal}
        loading={false}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.email}
              label={labelObj.email}
              required
            />
          </Grid2>
          <Grid2 size={12}>
            <TextFieldRHF
              name={modelObj.passEmail}
              label={labelObj.passEmail}
              required
              type="password"
            />
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};
