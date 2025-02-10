import { Grid2 } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  useUpdateGiaiDoanMutation,
  useUpdateNgayKyVongMutation,
} from "src/App/Api/CoHoiApi";
import { useGetAllGiaiDoanBanHangQuery } from "src/App/Api/GiaiDoanBanHangApi";
import {
  AutocompleteRHF,
  DatePickerRHF,
} from "src/App/Components/ReactHookFormComp";
import DateTimePickerRHF from "src/App/Components/ReactHookFormComp/DateTimePickerRHF";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { commonMapDataAutocomplete } from "src/App/Until/mapData.helper";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
const modelObj = {
    id: "id",
    ngayKyVong: "ngayKyVong",
  },
  labelObj = {
    ngayKyVong: "Ngày kì vọng kết thúc",
  },
  initialFormState = {
    [modelObj.ngayKyVong]: new Date(),
  },
  schema = yup.object().shape({
    [modelObj.ngayKyVong]: validateString(),
  });
const ModalChinhSuaNgayKyVong = (prop) => {
  const { showModal, closeModal, selectedItem, refetch, typeModal, isLoading } =
      prop,
    _isMounted = useRef(false),
    modalRef = useRef(null);
  const [updateGiaiDoan] = useUpdateNgayKyVongMutation();
  const submitForm = (data) => {
      const tempData = {
        [modelObj.id]: selectedItem[0]?.id,
        [modelObj.ngayKyVong]: data[modelObj.ngayKyVong],
      };

      callApiUpdate(tempData);
    },
    callApiUpdate = async (paramData) => {
      try {
        await updateGiaiDoan({
            cohoiId: paramData?.id,
            ngayKyVong: paramData?.ngayKyVong 
              ? new Date(paramData.ngayKyVong).toISOString() 
              : null,
          }).unwrap();          
        toast.success("Cập nhật thành công");
        refetch();
        closeModalWithOtherFunc();
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
          [modelObj.ngayKyVong]: selectedItem?.ngayKyVongKetThuc,
        },
        { keepDirty: true }
      );
    };
  console.log(selectedItem);
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
        header={"Chỉnh sửa ngày kỳ vọng kết thúc"}
        type={typeModal}
        loading={isLoading}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <DateTimePickerRHF
              name={modelObj.ngayKyVong}
              label={labelObj.ngayKyVong}
              disabled={isLoading}
              required
            />
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};

export default ModalChinhSuaNgayKyVong;
