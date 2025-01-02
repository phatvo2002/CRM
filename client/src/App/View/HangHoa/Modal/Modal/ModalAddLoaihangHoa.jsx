import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import TextFieldRHF from "../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../../Until/constant";
import { validateString } from "../../../../Until/validateYup";
import * as yup from "yup";
import SwitchRHF from "../../../../Components/ReactHookFormComp/SwitchRHF/SwitchRHF";
import { useAddPhongbanMutation } from "../../../../Api/Phongban";
import {toast} from 'react-toastify';
import { useAddMenuMutation } from "src/App/Api/MenuApi";
import { useAddLoaiHangHoaMutation } from "src/App/Api/LoaiHangHoa";
// ------ Form Config ------ //
const modelObj = {
  name: "name",
},
  labelObj = {
    name: "Tên loại hàng hóa",
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
    [TYPE_MODAL.INSERT]: "Thêm mới loại hàng hóa",
  };
  return title[typeModal] ?? "";
};

const ModalAddLoaihangHoa = (props) => {
  const { showModal, closeModal, typeModal, setTypeModal ,setLoading ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [addLoaiHangHoa] = useAddLoaiHangHoaMutation(),
    isLoading = false,
    header = getHeader(typeModal);

  const submitForm = (data) => {
    const tempData = {
      [modelObj.name]: data[modelObj.name],
      
    };
    typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
 
  },
    callApiInsert = async (data) => {
      try {
        await addLoaiHangHoa(data).unwrap();
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
        closeModalWithOtherFunc() 
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
            name={modelObj.name}
            label={labelObj.name}
            disabled={isLoading}
            required
          />
        </Grid>

      </Grid>
    </RHFDrawer>
  );
};

export default ModalAddLoaihangHoa;
