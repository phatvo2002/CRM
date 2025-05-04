import { Grid2 } from "@mui/material";
import { id } from "date-fns/locale";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useUpdateThucThuDonHangMutation } from "src/App/Api/DonHangApi";
import { TextFieldRHF } from "src/App/Components/ReactHookFormComp";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { validateString } from "src/App/Until/validateYup";
import * as yup from "yup";
const modelObj = {
    id: "id",
    soTien: "soTien",
  },
  labelObj = {
    soTien: "Số tiền",
  },
  initialFormState = {
    [modelObj.soTien]: 0,
  },
  schema = yup.object().shape({
    [modelObj.soTien]: validateString(),
  });
const ModalCapNhatThucThuDonHang = ({ refetch, showModal, handleClose , Id  }) => {
  const _isMounted = useRef(false),
    modalRef = useRef(null);
 
  const [updateThucThuDonHang] = useUpdateThucThuDonHangMutation()
   const submitForm = (data) => {
      const tempData = {
        [modelObj.id] : Id,
        [modelObj.soTien] :data[modelObj.soTien]
      };
  
      callApiInsert(tempData);
   
    },
    callApiInsert = async (params) =>
    {
        try
        {
            const response = await updateThucThuDonHang({id : params?.id , soTien : params?.soTien})
            if(response?.data?.status === 200)
            {
                toast.success("Thành công")
                refetch()
                closeModalWithOtherFunc()
            }else toast.warning(response?.data?.message)
        }catch(error)
        {
            toast.error(error)
        }
       
    }
    const closeModalWithOtherFunc = () => {
        modalRef.current.reset(initialFormState);
        handleClose();
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
      header={"Thêm số tiền"}
      initialFormState={initialFormState}
      schema={schema}
      ref={modalRef}
    >
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextFieldRHF
            name={modelObj.soTien}
            label={labelObj.soTien}
            type={"number"}
            required
          />
        </Grid2>
      </Grid2>
    </RHFDrawer>
  );
};

export default ModalCapNhatThucThuDonHang;
