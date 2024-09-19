import { Grid } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
// import { useAddClassificationMutation, useUpdateClassificationMutation } from "src/apis/ClassificationApi";
import TextFieldRHF from "../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../../Until/constant";
import { validateString } from "../../../../Until/validateYup";
import RoleApi from "../../../../Api/RoleApi";
import * as yup from "yup";
import Swal from "sweetalert2";
// ------ Form Config ------ //
const modelObj = {
  tenChucVu: "tenChucVu",
  moTa: "moTa",
},
  labelObj = {
    tenChucVu: "Tên chức vụ",
    moTa: "Mô tả",
  },
  initialFormState = {
    [modelObj.tenChucVu]: "",
    [modelObj.moTa]: "",
  },
  schema = yup.object().shape({
    [modelObj.tenChucVu]: validateString(),
    [modelObj.moTa]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.INSERT]: "Thêm mới",
  };
  return title[typeModal] ?? "";
};

const ModalAdd = (props) => {
  const [isLoading ,setIsLoading] = useState(false)
  const { showModal, closeModal, typeModal, selectedItem, setTypeModal ,setLoading } =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    header = getHeader(typeModal);

  const submitForm = (data) => {
    const tempData = {
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.tenChucVu]: data[modelObj.tenChucVu],
    };

    typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
  },
    callApiInsert = async  (paramData) => {
      const response =  await RoleApi.AddChucVU(paramData);

      if(response.status === 200){
        setLoading(true)
        closeModalWithOtherFunc()
      }else
      {
        setLoading(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Có lỗi đã xảy ra",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    closeModalWithOtherFunc = () => {
      setTypeModal("");
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
      <Grid container spacing={2}>

      <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.tenChucVu}
            label={labelObj.tenChucVu}
            disabled={isLoading}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.moTa}
            label={labelObj.moTa}
            disabled={isLoading}
            required
          />
        </Grid>
      </Grid>
    </RHFDrawer>
  );
};

export default ModalAdd;
