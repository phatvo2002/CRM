import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { validateString } from "../../../Until/validateYup";
import TextFieldRHF from "../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../Until/constant";
import * as yup from "yup";
import toastr from "toastr";

// ------ Form Config ------ //
const modelObj = {
  tenKhachHang: "tenKhachHang",
  soDienThoaiDiDong: "soDienThoaiDiDong",
  emailCaNhan: "emailCaNhan",
  diaChi: "diaChi",
};
const labelObj = {
  tenKhachHang: "Tên Khách hàng",
  soDienThoaiDiDong: "Số điện thoại di động",
  emailCaNhan: "Email cá nhân",
  diaChi: "Địa chỉ",
};
const initialFormState = {
  [modelObj.tenKhachHang]: null,
  [modelObj.soDienThoaiDiDong]: null,
  [modelObj.emailCaNhan]: null,
  [modelObj.diaChi]: null,
};
const schema = yup.object().shape({
  [modelObj.tenKhachHang]: validateString(),
  [modelObj.soDienThoaiDiDong]: validateString(),
  [modelObj.emailCaNhan]: validateString(),
  [modelObj.diaChi]: validateString(),
});

// ------ Get Header Title ------ //
const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa thông tin người dùng",
  };
  return title[typeModal] ? "" : "Chỉnh sửa thông tin người dùng";
};

const ModalUpdateUser = (props) => {
  const { showModal, closeModal, typeModal, setTypeModal } = props;

  const modalRef = useRef(null);
  const header = getHeader(typeModal);

  const submitForm = (data) => {
    // Xử lý logic submit form tại đây
    toastr.success("Chỉnh sửa thành công!");
    closeModal();
  };

  const closeModalWithOtherFunc = () => {
    setTypeModal("");
    modalRef.current.reset(initialFormState);
    closeModal();
  };

  return (
    <RHFDrawer
      handleClose={closeModalWithOtherFunc}
      submitForm={submitForm}
      isOpen={showModal}
      header={header} // Bổ sung Header hiển thị tiêu đề
      type={typeModal}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.tenKhachHang}
            label={labelObj.tenKhachHang}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.soDienThoaiDiDong}
            label={labelObj.soDienThoaiDiDong}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.emailCaNhan}
            label={labelObj.emailCaNhan}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.diaChi}
            label={labelObj.diaChi}
            required
          />
        </Grid>
      </Grid>
    </RHFDrawer>
  );
};

export default ModalUpdateUser;
