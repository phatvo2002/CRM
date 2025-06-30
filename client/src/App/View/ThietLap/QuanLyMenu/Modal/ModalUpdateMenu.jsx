import { Grid } from "@mui/material";
import {  useEffect, useRef } from "react";
import SwitchRHF from "../../../../Components/ReactHookFormComp/SwitchRHF/SwitchRHF";
import { validateString } from "../../../../Until/validateYup";
import TextFieldRHF from "../../../../Components/ReactHookFormComp/TextFieldRHF/TextFieldRHF";
import RHFDrawer from "../../../../Components/ReactHookFormComp/RHFDrawer/RHFDrawer";
import { TYPE_MODAL } from "../../../../Until/constant";
import * as yup from "yup";
import {useUpdatePhongBanMutation } from "../../../../Api/Phongban";
import { toast } from "react-toastify";
import { useGetAllMenuParentQuery, useUpdateMenuMutation } from "src/App/Api/MenuApi";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { AutocompleteRHF } from "src/App/Components/ReactHookFormComp";
// ------ Form Config ------ //
const modelObj = {
    orderNumber: "orderNumber",
    name: "name",
    url: "url",
    icon :"icon",
    isAcTive : "isAcTive",
    parentId: "parentId"
},
  labelObj = {
    orderNumber: "Số thứ tự",
    name: "Tên menu",
    url: "Đường dẫn",
    icon :  "icon",
    isAcTive :"Kích hoạt menu",
     parentId: "Menu Cha"
  },
  initialFormState = {
    [modelObj.orderNumber]: 0,
    [modelObj.name]: "",
    [modelObj.url]: "",
    [modelObj.icon]: "",
    [modelObj.isAcTive]: false,
    [modelObj.parentId]: null,
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
    [TYPE_MODAL.UPDATE]: "Chỉnh sửa menu" ,
  };
  return title[typeModal] ?? "";
};

const ModalUpdateMenu = (props) => {
  const { showModal, closeModal, typeModal,setLoading, selectedItem, setTypeModal  ,refetch} =
    props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    [updateMenu ,{isLoading : isUpdatePhongBan}] = useUpdateMenuMutation(),
    isLoading =   isUpdatePhongBan,
    header = getHeader(typeModal);
  const { data: dataMenuParent , isFetching : isGetAllMenuParentFetching } = useGetAllMenuParentQuery()
  const submitForm = (data) => {
    const tempData = {
      id  : data.id,
      [modelObj.orderNumber]: data[modelObj.orderNumber],
      [modelObj.name]: data[modelObj.name],
      [modelObj.url]: data[modelObj.url],
      [modelObj.icon]: data[modelObj.icon],
      [modelObj.parentId]: data[modelObj.parentId],
      [modelObj.isAcTive]: data[modelObj.isAcTive]
    };

    typeModal === TYPE_MODAL.UPDATE && callApiUpdate(tempData);
  },


  
    callApiUpdate = async (paramData) => {
        try {
            await updateMenu(paramData).unwrap();
            toast.success("Chỉnh sửa thành công thành công")
            closeModalWithOtherFunc() 
            refetch(); 
          } catch (error) {
            toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
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
          [modelObj.orderNumber]: selectedItem[modelObj.orderNumber] ,
          [modelObj.name]: selectedItem[modelObj.name] ,
          [modelObj.url]: selectedItem[modelObj.url] ,
          [modelObj.icon]: selectedItem[modelObj.icon],
          [modelObj.isAcTive]: selectedItem?.isActive,
          [modelObj.parentId]: selectedItem?.parentId
        },
        { keepDirty: true }
      );
    };
  useEffect(() => {
    if (selectedItem[0] && typeModal === TYPE_MODAL.UPDATE) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0], typeModal]);

    console.log(selectedItem)
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
         <AutocompleteRHF
            name={modelObj.parentId}
            label={labelObj.parentId}
            isGetOnlyId
            data={commonMapDataAutocomplete(dataMenuParent, "name")}
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

export default ModalUpdateMenu;