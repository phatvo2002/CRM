import { Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'

const CustomButtonAction = (props) => {
  const {
    menuId,
    typeButton,
    action,
    colorStyle,
    type,
    nameButton,
    size,
    icon,
    styleText
  } = props;


  const handleCheckPermission = () => {
    const dataPermission = JSON.parse(localStorage.getItem("permission") || "[]");
    const permissionItem = dataPermission?.menuRoleData.find(r=> r.menuId == menuId);
    if (!permissionItem) {
      toast.warning("Không tìm thấy quyền truy cập.");
      return;
    }

    switch (type) {
      case "xem":
        permissionItem.xem ? action() : toast.warning(`Bạn không có quyền được ${styleText}`);
        break;
      case "them":
        permissionItem.them ? action() : toast.warning(`Bạn không có quyền được ${styleText}`);
        break;
      case "sua":
        permissionItem.sua ? action() : toast.warning(`Bạn không có quyền được ${styleText}`);
        break;
      case "xoa":
        permissionItem.xoa ? action() : toast.warning(`Bạn không có quyền được ${styleText}`);
        break;
      default:
        toast.warning("Loại quyền không hợp lệ");
        break;
    }
  };

  return (
    <React.Fragment>
      {typeButton == 1 ? <Button
        startIcon={icon}
        color={colorStyle}
        size={size}
        variant='contained'
        onClick={handleCheckPermission}
        style={{borderRadius :6}}
      >
        {nameButton}
      </Button> :
       <IconButton  onClick={handleCheckPermission}>
           {React.cloneElement(icon, { sx: { color: {colorStyle} } })}
           {nameButton == null ? null : <Typography variant='body2'>{nameButton}</Typography>}
      </IconButton>}
    </React.Fragment>
  );
};

export default CustomButtonAction;
