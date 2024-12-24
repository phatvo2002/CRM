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
import { useAddMenuMutation } from "App/Api/MenuApi";
// ------ Form Config ------ //
const modelObj = {
orderNumber: "orderNumber",
  name: "name",
  url: "url",
  icon :"icon",
  isAcTive : "isAcTive"

},
  labelObj = {
    orderNumber: "Số thứ tự",
    name: "Tên menu",
    url: "Đường dẫn",
    icon :  "Icon",
    isAcTive :"Kích hoạt menu"
  },
  initialFormState = {
    [modelObj.orderNumber]: "",
    [modelObj.name]: "",
    [modelObj.url]: "",
    [modelObj.icon]: "",
    [modelObj.isAcTive]: false,
  },
  schema = yup.object().shape({
    [modelObj.orderNumber]: validateString(),
    [modelObj.name]: validateString(),
    [modelObj.url]: validateString(),
    [modelObj.icon]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.INSERT]: "Thêm mới menu",
  };
  return title[typeModal] ?? "";
};

const ModlaAddCuocGoi = (props) => {
  const { showModal, closeModal, typeModal, setTypeModal ,setLoading ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [addMenu] = useAddMenuMutation(),
    isLoading = false,
    header = getHeader(typeModal);

  const submitForm = (data) => {
    const tempData = {
      [modelObj.orderNumber]: data[modelObj.orderNumber],
      [modelObj.name]: data[modelObj.name],
      [modelObj.url]: data[modelObj.url],
      [modelObj.icon]: data[modelObj.icon],
      [modelObj.isAcTive]: data[modelObj.isAcTive],
    };

    typeModal === TYPE_MODAL.INSERT && callApiInsert(tempData);
 
  },
    callApiInsert = async (data) => {
      try {
        await addMenu(data).unwrap();
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
            name={modelObj.orderNumber}
            label={labelObj.orderNumber}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.name}
            label={labelObj.name}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.url}
            label={labelObj.url}
            disabled={isLoading}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldRHF
            name={modelObj.icon}
            label={labelObj.icon}
            disabled={isLoading}
            required
          />
        </Grid>
        <Grid item xs={12}>
        <label>{labelObj.isAcTive}</label>
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

export default ModlaAddCuocGoi;
