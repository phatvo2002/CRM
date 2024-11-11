import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
import { useRef } from "react";

function CustomImageUpload({
  onImageSelect,
  onImageConvert,
  removeImage,
  setImageDataBasic,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageDataBasic(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        if (onImageConvert) {
          onImageConvert(base64String);
        }

        if (onImageSelect) {
          onImageSelect(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  // const handleRemoveClick = () => {
  //   if (removeImage) {
  //     removeImage();
  //   }
  //   // Make the file input visible again
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = null;
  //   }
  // };

  return (
    <div style={{width:"100%"}} >
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className="UploadButton">
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={handleUploadClick}
        >
          Chọn hình ảnh
        </Button>
      </div>
      {/* <div>
        <Button
          variant="outlined"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleRemoveClick}
          color="error"
        >
          Xóa hình ảnh
        </Button>
      </div> */}
    </div>
  );
}

export default CustomImageUpload;
