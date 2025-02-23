import React, { useEffect, useRef, useState } from "react";
import { useGetAllTinhTrangBaoGiaQuery } from "src/App/Api/GetDataApi";
import {  validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import {
  AutocompleteRHF,
} from "src/App/Components/ReactHookFormComp";
import { toast } from "react-toastify";
import {  Grid2 } from "@mui/material";
import { useUpdateBaoGiaMutation, useUpdatePheDuyetBaoGiaMutation } from "src/App/Api/BaoGiaApi";
const modelObj = {
    id: "id",
    maTinhTrangBaoGia: "maTinhTrangBaoGia",
  },
  labelObj = {
    id: "Mã báo giá",
    maTinhTrangBaoGia: "Tình trạng báo giá",
  },
  initialFormState = {
    [modelObj.id]: "",
    [modelObj.maTinhTrangBaoGia]: null,
  },
  schema = yup.object().shape({
    [modelObj.maTinhTrangBaoGia]: validateString(),
  });
const ModalPheDuyetBaoGia = ({
  selectedItem,
  showModal,
  closeModal,
  typeModal,
  refetch
}) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null);
  const {
    data: dataTinhTrangBaoGia,
    isLoading: isGetTinhTrangBaoGiaIsFetching,
  } = useGetAllTinhTrangBaoGiaQuery({ skip: showModal == false }),
    [pheDuyetBaogia] = useUpdatePheDuyetBaoGiaMutation();
  const isLoading =
    isGetTinhTrangBaoGiaIsFetching;
  const submitForm = (data) => {
    const tempData = {
      [modelObj.id]: selectedItem[0]?.id,
       maTinhTrangBaoGia: data[modelObj.maTinhTrangBaoGia],
    };

    callApiUpdate(tempData);
  },
  callApiUpdate = async (paramData) => {
    try {
      await pheDuyetBaogia({baoGiaId : selectedItem[0]?.id , trangThaiId :paramData?.maTinhTrangBaoGia}).unwrap();
      toast.success("Cập nhật trạng thái thành công");
      closeModalWithOtherFunc();
      refetch()
    } catch (error) {
      console.log(error);
    }
  },
    closeModalWithOtherFunc = () => {
      modalRef.current.reset(initialFormState);
      closeModal();
    },
    getInitialStateFromApiToUpdate = async (selectedItem) => {
      modalRef.current?.reset(
        {
          ...selectedItem,
          [modelObj.id]: selectedItem?.id,       
          [modelObj.maTinhTrangBaoGia]: selectedItem?.maTinhTrangBaoGia,
        },
        { keepDirty: true }
      );
    };
  useEffect(() => {
    if (selectedItem[0]) {
      getInitialStateFromApiToUpdate(selectedItem[0]);
    }
  }, [selectedItem[0]]);
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
        header={"Duyệt báo giá"}
        type={typeModal}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        width={"500px"}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <AutocompleteRHF
              name={modelObj.maTinhTrangBaoGia}
              label={labelObj.maTinhTrangBaoGia}
              isGetOnlyId
              data={commonMapDataAutocomplete(dataTinhTrangBaoGia, "name")}
              skeletonLoading={isGetTinhTrangBaoGiaIsFetching}
            />
          </Grid2>
         
        </Grid2>
      </RHFDrawer>
    </>
  );
};

export default ModalPheDuyetBaoGia;
