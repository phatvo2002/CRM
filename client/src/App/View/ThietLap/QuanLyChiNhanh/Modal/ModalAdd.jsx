
import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { SwitchRHF, TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useCreateMutation } from "src/App/Api/ChiNhanh.api";
import { Label } from "recharts";
const modelObj = {
  id: "id",
  tenChiNhanh: "tenChiNhanh",
  diaChi: "diachi",
  moTa: "moTa",
  isChiNhanhTong :"isChiNhanhTong",
  soThuTu :"soThuTu"
};
const labelObj = {
  id: "Mã chi nhánh",
  tenChiNhanh: "Tên chi nhánh",
  diaChi: "Địa chỉ",
  moTa: "Mô tả",
  isChiNhanhTong :"Chi nhánh tổng",
  soThuTu :"soThuTu"
};
const initialFormState = {
    [modelObj.id]: null,
    [modelObj.tenChiNhanh]: "",
    [modelObj.diaChi]: "",
    [modelObj.moTa]: "",
    [modelObj.soThuTu]: 0,
    [modelObj.isChiNhanhTong]: false,
  },
  schema = yup.object().shape({
    [modelObj.tenChiNhanh]: validateString(),
    [modelObj.diaChi]: validateString(),
    [modelObj.moTa]: validateString()
  });

const ModalAdd = ({
  showModal,
  closeModal,
  refetch,
}) => {
  const _isMounted = useRef(false);
  const modalRef = useRef(null);
  const [create] = useCreateMutation();
  const submitForm = (data) => {
    const tempData = {
      id : uuidv4(),
      [modelObj.tenChiNhanh]: data[modelObj.tenChiNhanh],
      [modelObj.diaChi]: data[modelObj.diaChi],
      [modelObj.moTa]: data[modelObj.moTa],
      [modelObj.isChiNhanhTong]: data[modelObj.isChiNhanhTong],
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
              name={modelObj.soThuTu}
              label={labelObj.soThuTu}
              type={"number"}
              required
            />
          </Grid>
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

export default ModalAdd;
