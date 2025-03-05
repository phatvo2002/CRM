import React from "react";
import { Grid2 } from "@mui/material";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import { useParams } from "react-router-dom";
import { TYPE_MODAL } from "src/App/Until/constant";
const ModalXuatLinkBaoGia = ({showModal , closeModal}) => {
    const {id} = useParams()
  return (
    <>
      <RHFDrawer
        handleClose={closeModal}
        // submitForm={submitForm}
        isOpen={showModal}
        header={"Xuất link báo giá"}
        type={TYPE_MODAL.VIEW}
        fullScreen={false}
        // loading={isLoading}
        // initialFormState={initialFormState}
        // // schema={schema}
        // ref={modalRef}
      >
        <Grid2 container spacing={2} width={"500px"}>
          <Grid2 size={6}>
            <p>http://localhost:3000/XemBaoGia/{id}</p>
          </Grid2>
        </Grid2>
      </RHFDrawer>
    </>
  );
};

export default ModalXuatLinkBaoGia;
