import { Grid, Grid2 } from "@mui/material";
import {  useEffect, useRef } from "react";
import SwitchRHF from "../../../../Components/ReactHookFormComp/SwitchRHF/SwitchRHF";
import { validateString } from "../../../../Until/validateYup";
import TextFieldRHF from "../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../../Until/constant";
import * as yup from "yup";
import {useUpdatePhongBanMutation } from "../../../../Api/Phongban";
import { toast } from "react-toastify";
import { useUpdateMenuMutation } from "src/App/Api/MenuApi";
import { useUpdateLoaiHangHoaMutation } from "src/App/Api/LoaiHangHoa";
// ------ Form Config ------ //
const modelObj = {
    name: "name",
},
  labelObj = {
    name: "Tên menu",
  },
  initialFormState = {
    [modelObj.name]: "",
  },
  schema = yup.object().shape({
    [modelObj.name]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa loại hàng hóa" ,
  };
  return title[typeModal] ?? "";
};

const ModalUpdateLoaiHangHoa = (props) => {
  const { showModal, closeModal, typeModal, selectedItem, setTypeModal  ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [updateloaihanghoa ,{isLoading : isUpdatePhongBan}] = useUpdateLoaiHangHoaMutation(),
    isLoading =   isUpdatePhongBan,
    header = getHeader(typeModal);
  const submitForm = (data) => {
    const tempData = {
      id  : data.id,
      [modelObj.name]: data[modelObj.name],
    };

    typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
  },
  
    callApiUpdate = async (paramData) => {
        try {
            await updateloaihanghoa(paramData).unwrap();
            toast.success("Chỉnh sửa thành công thành công")
            refetch(); 
            closeModalWithOtherFunc() 
          } catch (error) {
            toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
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
          [modelObj.name]: selectedItem[modelObj.name] ,
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
    >
      <Grid2 container spacing={2}>

        <Grid2  size={12}>
          <TextFieldRHF
            name={modelObj.name}
            label={labelObj.name}
            disabled={isLoading}
            required
          />
        </Grid2>
      
      </Grid2>
    </RHFDrawer>
  );
};

export default ModalUpdateLoaiHangHoa;