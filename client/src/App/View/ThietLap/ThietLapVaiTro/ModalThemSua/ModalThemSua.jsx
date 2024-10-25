import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import MenuApi from "../../../../Api/MenuApi"
import Swal  from 'sweetalert2';

import { Grid } from '@mui/material';
const ModalThemSua = (props) => {
    const {
        openModal,
        selectedRow,
        closeModal
    } = props;
    const [menu,setMenu] = useState([])
    const [menuRole,setMenuRole] = useState([])
    const [checkedMenuIds, setCheckedMenuIds] = useState([]);
      const handleCheckboxChange = (event, menuId) => {
    
        if (event.target.checked) {
          setCheckedMenuIds(prev => [...prev, menuId]);
        } else {
          setCheckedMenuIds(prev => prev.filter(id => id !== menuId));
        }
      };

      const handelSubmit = async () => {
         const data = {
            oid:selectedRow[0],
            menu :checkedMenuIds
          }
         const res =  await MenuApi.UpdateMenuRole(data)
         if(res.status == 200)
         {
             closeModal()
             Swal.fire({
                 position: "center",
                 icon: "success",
                 title: "Phân quyền thành công ",
                 showConfirmButton: false,
                 timer: 1500
               });
         }
        else
        {
          alert("đã có lỗi xảy ra")
        }
      }

    useEffect(() => {
        if(openModal)
        {
            const getAllMenu = async()=>{
                const res = await MenuApi.GetAllMenu();
                if(res.length > 0)
                {
                  setMenu(res)
             
                }
                else
                {
                  setMenu([])
                }
            }
            getAllMenu()
        }
         
    },[openModal])

    useEffect(() => {
        if(openModal)
        {
            const getAllMenuRole = async()=>{
                const res = await MenuApi.GetMenuRoleById(selectedRow[0]);
                if(res.length > 0)
                {
                  setMenuRole(res)
                  setCheckedMenuIds(res.map(e => e.menuId))
                }
                else
                {
                  setMenuRole([])
                }
            }
            getAllMenuRole()
        }
         
    },[openModal])
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
        {menu.map((item )=>{
            return (
                <Grid>
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