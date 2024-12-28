import React, { useState } from 'react'
import { DropzoneAreaBase } from 'mui-file-dropzone';
import { Button } from '@mui/material';
import { useImportKhachHangMutation } from 'src/App/Api/KhachHangTiemNangApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ImportKhachHang = () => {
    const navigate = useNavigate()
    const [files, setFiles] = useState([]);
    const [uploadFile, { isLoading }] = useImportKhachHangMutation();
    const handleAdd = (newFiles) => {
        setFiles([...files, ...newFiles]);
      };
    
      const handleDelete = (deletedFile) => {
        setFiles(files.filter((file) => file !== deletedFile));
      };
    const handleAutoLink = () => {
        navigate(-1)
    }
    

  const handleSubmit = async() => {
    try {
        if (files.length === 0) {
         toast.warning("Vui lòng chọn file để import")
          return;
        }
        const response = await uploadFile(files[0].file).unwrap();
        if(response.status === 200)
        {
            toast.success(response.message)
            setTimeout(() => {
                handleAutoLink()
            }, 2000);
        }
      } catch (error) {
        toast.error("Đã có lỗi xảy ra , vui lòng liên hệ nhân viên quản trị hệ thống để nhận hỗ trợ")
      }
  };

  return (
    <div> <DropzoneAreaBase
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
  <Button style={{ margin : 10 }} variant="contained" onClick={handleSubmit}>Import khách hàng</Button>
  </div>
  )
}

export default ImportKhachHang