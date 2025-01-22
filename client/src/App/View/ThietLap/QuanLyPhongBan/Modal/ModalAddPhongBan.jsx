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
// ------ Form Config ------ //
const modelObj = {
  stt: "stt",
  maQuanLy: "maQuanLy",
  tenPhongban: "tenPhongban",
  moTa :"moTa",
  isAcTive : "isAcTive"

},
  labelObj = {
    stt: "Số thứ tự",
    maQuanLy: "Mã quản lý ",
    tenPhongban: "Tên phòng ban",
    moTa :  "Mô tả",
    isAcTive :"Kích hoạt phòng ban"
  },
  initialFormState = {
    [modelObj.stt]: "",
    [modelObj.maQuanLy]: "",
    [modelObj.tenPhongban]: "",
    [modelObj.moTa]: "",
    [modelObj.isAcTive]: "",
  },
  schema = yup.object().shape({
    [modelObj.stt]: validateString(),
    [modelObj.maQuanLy]: validateString(),
    [modelObj.tenPhongban]: validateString(),
    [modelObj.moTa]: validateString(),
    [modelObj.isAcTive]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.INSERT]: "Thêm mới",
  };
  return title[typeModal] ?? "";
};

const ModalAddPhongBan = (props) => {
  const { showModal, closeModal, typeModal, setTypeModal ,setLoading ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [addPhongban] = useAddPhongbanMutation(),
    isLoading = false,
    header = getHeader(typeModal);

  const submitForm = (data) => {
    const tempData = {
      [modelObj.stt]: data[modelObj.stt],
      [modelObj.maQuanLy]: data[modelObj.maQuanLy],
      [modelObj.tenPhongban]: data[modelObj.tenPhongban],
      [modelObj.moTa]: data[modelObj.moTa],
    };

    typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
 
  },
    callApiInsert = async (data) => {
      try {
        await addPhongban(data).unwrap();
        toast.success("Thêm mới thành công!", {
          position: "top-center",
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
          position: "top-center",
          autoClose: 3000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      } finally {
        setLoading(false);
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
            name={modelObj.stt}
            label={labelObj.stt}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.tenPhongban}
            label={labelObj.tenPhongban}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.maQuanLy}
            label={labelObj.maQuanLy}
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
        <Grid item xs={12}>
          <SwitchRHF
            name={modelObj.isAcTive}
            label={labelObj.isAcTive}
            disabled={isLoading}
            required
          />
        </Grid>

      </Grid>
    </RHFDrawer>
  );
};

export default ModalAddPhongBan;
