import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import  { useGetAllMenuQuery, useGetMenuRoleByIdQuery, useUpdateMenuRoleMutation } from "../../../../Api/MenuApi";

import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
const ModalThemSua = (props) => {
    const {
        openModal,
        selectedRow,
        closeModal
    } = props;
    const [menu,setMenu] = useState([])
    const [menuRole,setMenuRole] = useState([])
    const [checkedMenuIds, setCheckedMenuIds] = useState([]);
    const { data: menuData } = useGetAllMenuQuery({ skip: !openModal });
    const { data: menuRoleData } = useGetMenuRoleByIdQuery(selectedRow[0]?.id, {
      skip: !openModal || !selectedRow[0],
  });
    const [updateGroupMenu] = useUpdateMenuRoleMutation()
      const handleCheckboxChange = (event, menuId) => {
    
        if (event.target.checked) {
          setCheckedMenuIds(prev => [...prev, menuId]);
        } else {
          setCheckedMenuIds(prev => prev.filter(id => id !== menuId));
        }
      };

      const handelSubmit = async () => {
         const data = {
            oid:selectedRow[0]?.id,
            menu :checkedMenuIds
          }
         const res =  await updateGroupMenu(data)
         if(res?.data.status== 200)
         {
             closeModal()
             toast.success("Phân quyền thành công!");
         }
        else
        {
          alert("đã có lỗi xảy ra")
        }
      }

     useEffect(() => {
        if (menuData) {
            setMenu(menuData.length > 0 ? menuData : []);
        }
    }, [menuData]);

    useEffect(() => {
      if (menuRoleData) {
          if (menuRoleData.length > 0) {
              setMenuRole(menuRoleData);
              setCheckedMenuIds(menuRoleData.map(e => e.menuId));
          } else {
              setMenuRole([]);
          }
      }
  }, [menuRoleData]);
  return (
    <React.Fragment>
    <Dialog
      open={openModal}
      keepMounted
      fullWidth={true}
      maxWidth="sm"    
    //   onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Phân quyền menu</DialogTitle>
      <DialogContent>
        {menu.map((item ,index)=>{
            return (
                <Grid key={index}>
                    <Checkbox
                    checked={checkedMenuIds.includes(item.id)}
                    onChange={(e) => handleCheckboxChange(e, item.id)}
                    name={`menu-${item.id}`}
                  />
                  <label>{item.name}</label>
                 
              </Grid>
        
            )
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Đóng</Button>
        <Button onClick={handelSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  )
}

export default ModalThemSua