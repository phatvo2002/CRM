import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { validateString } from "src/App/Until/validateYup";
import { useUpdateMutation } from "src/App/Api/ChiNhanh.api";
import { toast } from "react-toastify";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { SwitchRHF, TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import { Grid } from "@mui/material";

const modelObj = {
  id: "id",
  tenChiNhanh: "tenChiNhanh",
  diaChi: "diaChi",
  moTa: "moTa",
  isChiNhanhTong: "isChiNhanhTong"
};
const labelObj = {
  id: "Mã chi nhánh",
  tenChiNhanh: "Tên chi nhánh",
  diaChi: "Địa chỉ",
  moTa: "Mô tả",
  isChiNhanhTong: "Chi nhánh tổng"
};
const initialFormState = {
  [modelObj.id]: null,
  [modelObj.tenChiNhanh]: "",
  [modelObj.diaChi]: "",
  [modelObj.moTa]: "",
  [modelObj.isChiNhanhTong]: false,
},
  schema = yup.object().shape({
    [modelObj.tenChiNhanh]: validateString(),
    [modelObj.diaChi]: validateString(),
    [modelObj.moTa]: validateString()
  });
const ModalUpdate = ({ showModal, closeModal, selectedItem, refetch }) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    [updateChiNhanh] = useUpdateMutation();

  const submitForm = (data) => {
    const tempData = {
      id: selectedItem[0]?.id,
      [modelObj.tenChiNhanh]: data[modelObj.tenChiNhanh],
      [modelObj.diaChi]: data[modelObj.diaChi],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.isChiNhanhTong]: data[modelObj.isChiNhanhTong],
    };
    
    callApiUpdate(tempData);
  },
    callApiUpdate = async (paramData) => {
      try {
        var response = await updateChiNhanh(paramData);
        if (response?.data?.status === 200) {
          toast.success("Chỉnh sửa dữ liệu thành công")
          refetch();
          closeModalWithOtherFunc();
        }
      } catch (error) {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận");
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
          id: selectedItem?.id,
          [modelObj.tenChiNhanh]: selectedItem[modelObj.tenChiNhanh],
          [modelObj.diaChi]: selectedItem[modelObj.diaChi],
          [modelObj.moTa]: selectedItem[modelObj.moTa],
          [modelObj.isChiNhanhTong]: selectedItem[modelObj.isChiNhanhTong],
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
        header={"Chỉnh sửa thông tin chi nhánh"}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldRHF
              name={modelObj.tenChiNhanh}
              label={labelObj.tenChiNhanh}
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

          <Grid item xs={12}>
            <TextFieldRHF
              name={modelObj.moTa}
              label={labelObj.moTa}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <span>Chi nhánh tổng</span>
            <SwitchRHF
              name={modelObj.isChiNhanhTong}
              label={labelObj.isChiNhanhTong}
              required
            />
          </Grid>
        </Grid>
      </RHFDrawer>
    </>
  );
};

export default ModalUpdate;
