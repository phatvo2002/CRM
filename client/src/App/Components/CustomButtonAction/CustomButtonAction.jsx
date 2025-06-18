import { Button } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'

const CustomButtonAction = (props) => {
  const {
    menuId,
    action,
    colorStyle,
    type,
    nameButton,
    size,
    icon
  } = props;

  const handleCheckPermission = () => {
    const dataPermission = JSON.parse(localStorage.getItem("permission") || "[]");
    const permissionItem = dataPermission.find(r => r.menuId === menuId);

    if (!permissionItem) {
      toast.warning("Không tìm thấy quyền truy cập.");
      return;
    }

    switch (type) {
      case "xem":
        permissionItem.xem ? action() : toast.warning("Bạn không có quyền được xem");
        break;
      case "them":
        permissionItem.them ? action() : toast.warning("Bạn không có quyền được thêm");
        break;
      case "sua":
        permissionItem.sua ? action() : toast.warning("Bạn không có quyền được sửa");
        break;
      case "xoa":
        permissionItem.xoa ? action() : toast.warning("Bạn không có quyền được xóa");
        break;
      default:
        toast.warning("Loại quyền không hợp lệ");
        break;
    }
  };

  return (
    <Button
      startIcon={icon}
      color={colorStyle}
      size={size}
      variant='contained'
      onClick={handleCheckPermission}
    >
      {nameButton}
    </Button>
  );
};

export default CustomButtonAction;
