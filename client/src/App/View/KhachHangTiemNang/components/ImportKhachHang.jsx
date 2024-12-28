import React, { useState } from "react";
import { Button } from "@mui/material";
import { useImportKhachHangMutation } from "src/App/Api/KhachHangTiemNangApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dropzone,
  FileItem,
  FullScreenPreview,
  FileMosaic,
} from "@files-ui/react";
const ImportKhachHang = () => {
  const navigate = useNavigate();

  const [uploadFile, { isLoading }] = useImportKhachHangMutation();
  const [files, setFiles] = React.useState([]);
  const updateFiles = (incommingFiles) => {
    //do something with the files
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleAutoLink = () => {
    navigate(-1);
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
        setTimeout(() => {
          handleAutoLink();
        }, 2000);
      }
    } catch (error) {
      toast.error(
        "Đã có lỗi xảy ra , vui lòng liên hệ nhân viên quản trị hệ thống để nhận hỗ trợ"
      );
    }
  };

  return (
    <div>
      <Dropzone
        onChange={updateFiles}
        label={"Upload file của bạn ..."}
        value={files}
      >
        {files.map((file) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
        ))}
      </Dropzone>
      <Button style={{ margin: 10 }} variant="contained" onClick={handleSubmit}>
        Import khách hàng
      </Button>
      {/* <DropzoneAreaBase
    fileObjects={files}
    onAdd={handleAdd}
    onDelete={handleDelete}
    acceptedFiles={[".xls", ".xlsx"]}
    maxFileSize={10000000} // 10MB
    filesLimit={1}
    showPreviews
    showPreviewsInDropzone
    dropzoneText={"Kéo và thả file hoặc click để chọn (Kích thước tối đa 10 MB ...)"}
  />
  <Button style={{ margin : 10 }} variant="contained" onClick={handleSubmit}>Import khách hàng</Button> */}
    </div>
  );
};

export default ImportKhachHang;
