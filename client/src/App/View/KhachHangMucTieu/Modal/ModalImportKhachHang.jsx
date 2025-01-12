import React from "react";
import { Button, Grid2 } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import RHFDrawer from "src/App/Components/ReactHookFormComp/RHFDrawer";
import {
    Dropzone,
    FileItem,
    FullScreenPreview,
    FileMosaic,
  } from "@files-ui/react";
import { useImportKhachHangMucTieuMutation } from "src/App/Api/KhachHangMucTieuApi";
import { toast } from "react-toastify";
import { TYPE_MODAL } from "src/App/Until/constant";
const ModalImportKhachHang = (props) => {
  const { showModal, closeModal, typeModal, refetch } = props,
    _isMounted = useRef(false),
    modalRef = useRef(null),
    header = "Import khách hàng",
    isLoading = false,
    closeModalWithOtherFunc = () => {
      // modalRef.current.reset(initialFormState);
      setFiles([]);
      closeModal();
    };

  // uploadFile
 const [uploadFile] = useImportKhachHangMucTieuMutation();
  const [files, setFiles] = React.useState([]);
  const updateFiles = (incommingFiles) => {
    // //do something with the files
    // console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSubmit = async () => {
    try {
      if (files.length === 0) {
        toast.warning("Vui lòng chọn file để import");
        return;
      }
      const response = await uploadFile(files[0].file).unwrap();
      if (response.status === 200) {
        toast.success(response.message);
        closeModalWithOtherFunc()
        refetch
      }
    } catch (error) {
      toast.error(
        "Đã có lỗi xảy ra , vui lòng liên hệ nhân viên quản trị hệ thống để nhận hỗ trợ"
      );
    }
  };
  return (
    <div>
      <RHFDrawer
        handleClose={closeModalWithOtherFunc}
        //   submitForm={submitForm}
        isOpen={showModal}
        header={header}
        fullScreen
        type={TYPE_MODAL.VIEW}
        loading={isLoading}
        //   initialFormState={initialFormState}
        //   schema={schema}
        ref={modalRef}
      >
        <Grid2 container spacing={2}>
          <Dropzone
            onChange={updateFiles}
            label={"Upload file của bạn ..."}
            value={files}
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
            ))}
          </Dropzone>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Import khách hàng
          </Button>
        </Grid2>
      </RHFDrawer>
    </div>
  );
};

export default ModalImportKhachHang;
