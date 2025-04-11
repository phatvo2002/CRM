import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { validateString } from "src/App/Until/validateYup";
import { useUpdateMutation } from "src/App/Api/XepLoai.api";
import { toast } from "react-toastify";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import { Grid } from "@mui/material";

const modelObj = {
  tenXepLoai: "tenXepLoai",
  tuDiem: "tuDiem",
  denDiem: "denDiem",
  maMau: "maMau",
};
const labelObj = {
  tenXepLoai: "Tên xếp loại",
  tuDiem: "Từ điểm",
  denDiem: "Đến điểm",
  maMau: "Mã màu",
};
const initialFormState = {
    [modelObj.tenXepLoai]: "",
    [modelObj.tuDiem]: 0,
    [modelObj.denDiem]: 0,
    [modelObj.maMau]: "",
  },
  schema = yup.object().shape({
    [modelObj.tenXepLoai]: validateString(),
    [modelObj.tuDiem]: validateString(),
    [modelObj.denDiem]: validateString(),
    [modelObj.maMau]: validateString(),
  });
const ModalSuaXepLoai = ({ showModal, closeModal, selectedItem, refetch }) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null),
    [updateXepLoai] = useUpdateMutation();

  const submitForm = (data) => {
      const tempData = {
        id: data.id,
        [modelObj.tenXepLoai]: data[modelObj.tenXepLoai],
        [modelObj.tuDiem]: data[modelObj.tuDiem],
        [modelObj.denDiem]: data[modelObj.denDiem],
        [modelObj.maMau]: data[modelObj.maMau],
      };

      callApiUpdate(tempData);
    },
    callApiUpdate = async (paramData) => {
      try {
        var response= await updateXepLoai(paramData);
        if(response?.data?.status === 200)
        {
            toast.error("Chỉnh sửa dữ liệu thành công")
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
        [modelObj.tenXepLoai]: selectedItem[modelObj.tenXepLoai],
        [modelObj.tuDiem]: selectedItem[modelObj.tuDiem],
        [modelObj.denDiem]: selectedItem[modelObj.denDiem],
        [modelObj.maMau]: selectedItem[modelObj.maMau],
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
        header={"Chỉnh sửa xếp loại"}
        initialFormState={initialFormState}
        schema={schema}
        ref={modalRef}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldRHF
              name={modelObj.tenXepLoai}
              label={labelObj.tenXepLoai}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldRHF
              name={modelObj.tuDiem}
              label={labelObj.tuDiem}
              type="number"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldRHF
              name={modelObj.denDiem}
              label={labelObj.denDiem}
                type="number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldRHF
              name={modelObj.maMau}
              label={labelObj.maMau}
              required
            />
          </Grid>
        </Grid>
      </RHFDrawer>
    </>
  );
};

export default ModalSuaXepLoai;
