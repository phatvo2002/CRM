import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';
import RoleApi from '../../../Api/RoleApi';
import UserApi, { useGetUserByIdQuery, useUpdateUserPermissionMutation } from '../../../Api/UserApi';
import { toast } from 'react-toastify';
const ModalUpdateRole = (props) => {
    const {
        openModal,
        selectedRow,
        closeModal
    } = props;

  
    const [role ,setRole] = useState([])
   // const {getUserid , refetch} =useGetUserByIdQuery(selectedRow[0]?.id ,{ skip : !openModal })
    const [checkedRoleId, setCheckedRoleId] = useState("");
    const [checkRoleName, setCheckRoleName] = useState("");
    const [updaterole] = useUpdateUserPermissionMutation()
    const handleCheckboxChange = (event, roleId, roleName) => {
      if (event.target.checked) {
        setCheckedRoleId(roleId);
        setCheckRoleName(roleName);
      } else {
        setCheckedRoleId("");
        setCheckRoleName("");
      }
    };

      const handelSubmit = async () => {
         const res = await updaterole({ userId:selectedRow[0]?.id, roleId: checkedRoleId, roleName: checkRoleName});
         if(res?.data?.status ===200)
         {
          toast.success("Phân quyền thành công", {
            position: "top-right",
            autoClose: 3000,  
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
           closeModal()
         }
         else
         {
          toast.error("Đã có lỗi xảy ra", {
            position: "top-right",
            autoClose: 3000,  
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
         }
      }
    
    useEffect(() => {
        if(openModal)
        {
            const getRole = async()=>{
                const res = await RoleApi.GetChucVu();
                if(res.length > 0)
                {
                  setRole(res)
             
                }
                else
                {
                  setRole([])
                }
            }
            getRole()
        }
         
    },[openModal])
    useEffect(() => {
        if(openModal)
        {
            const getUserById = async()=>{
                if(selectedRow[0])
                {
                //  setUser(getUserid)
                  setCheckedRoleId(selectedRow[0]?.maChucVu)
                }
            }
            getUserById()
        }
         
    },[openModal])

    // console.log(getUserid)
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
      <DialogTitle>Phân quyền </DialogTitle>
      <DialogContent>
        {role.map((item )=>{
            return (
                <Grid>
                    <Checkbox
                     checked={checkedRoleId && checkedRoleId.includes(item.id)}
                    onChange={(e) => handleCheckboxChange(e, item.id , item.tenChucVu)}
                    name={`menu-${item.id}`}
                  />
                  <label>{item.tenChucVu}</label>
                 
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

export default ModalUpdateRole