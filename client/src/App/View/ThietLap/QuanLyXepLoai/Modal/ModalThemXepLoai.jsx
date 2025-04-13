
import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useCreateMutation } from "src/App/Api/XepLoai.api";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";

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

const ModalThemXepLoai = ({
  showModal,
  closeModal,
  refetch,
}) => {
  const _isMounted = useRef(false);
  const modalRef = useRef(null);
  const [create] = useCreateMutation();
  const submitForm = (data) => {
    const tempData = {
      [modelObj.tenXepLoai]: data[modelObj.tenXepLoai],
      [modelObj.tuDiem]: data[modelObj.tuDiem],
      [modelObj.denDiem]: data[modelObj.denDiem],
      [modelObj.maMau]: data[modelObj.maMau],
    };
    callApiInsert(tempData);
  };
  const callApiInsert = async (params) => {
    const response = await create(params);
    if (response?.data?.status === 200) {
      toast.success("Thêm dữ liệu thành công");
      refetch();
      closeModalWithOtherFunc()
    } else toast.error(response?.data?.message);
  };
  const closeModalWithOtherFunc = () => {
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
    <>
      <RHFDrawer
        handleClose={closeModalWithOtherFunc}
        submitForm={submitForm}
        isOpen={showModal}
        header={"Thêm mới xếp loại"}
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

export default ModalThemXepLoai;
