import { Grid } from "@mui/material";
import {  useEffect, useRef } from "react";
import { validateString } from "../../../../Until/validateYup";
import TextFieldRHF from "../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../../Until/constant";
import * as yup from "yup";
import {useUpdatePhongBanMutation } from "../../../../Api/Phongban";
import toastr from "toastr";

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
    [modelObj.isAcTive]: false,
  },
  schema = yup.object().shape({
    [modelObj.stt]: validateString(),
    [modelObj.maQuanLy]: validateString(),
    [modelObj.tenPhongban]: validateString(),
    [modelObj.moTa]: validateString(),
  });
// ------ End Of Form Config ------ //

const getHeader = (typeModal) => {
  const title = {
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa phòng ban" ,
  };
  return title[typeModal] ?? "";
};

const ModalUpdatePhongBan = (props) => {
  const { showModal, closeModal, typeModal,setLoading, selectedItem, setTypeModal  ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [updatephongban ,{isLoading : isUpdatePhongBan}] = useUpdatePhongBanMutation(),
    isLoading =   isUpdatePhongBan,
    header = getHeader(typeModal);
  const submitForm = (data) => {
    const tempData = {
      id  : data.id,
      [modelObj.stt]: data[modelObj.stt],
      [modelObj.maQuanLy]: data[modelObj.maQuanLy],
      [modelObj.tenPhongban]: data[modelObj.tenPhongban],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.isAcTive]: true
    };

    typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
  },
  
    callApiUpdate = async (paramData) => {
        try {
            await updatephongban(paramData).unwrap();
            toastr.success("Chỉnh sửa thành công!");
            refetch(); 
            closeModalWithOtherFunc() 
          } catch (error) {
            toastr.error("Đã có lỗi đã xảy ra!");
          } finally {
            setLoading(false);
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
          [modelObj.stt]: selectedItem.soThuTu,
          [modelObj.tenPhongban]: selectedItem['tenPhongBan'] ,
          [modelObj.maQuanLy]: selectedItem[modelObj.maQuanLy] ,
          [modelObj.moTa]: selectedItem[modelObj.moTa],
          [modelObj.isAcTive]: selectedItem[modelObj.isAcTive],
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
        {/* <Grid item xs={12}>
          <SwitchRHF
            name={modelObj.isAcTive}
            label={labelObj.isAcTive}
            disabled={isLoading}
            required
          />
        </Grid> */}
      </Grid>
    </RHFDrawer>
  );
};

export default ModalUpdatePhongBan;
