import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';
import RoleApi from '../../../Api/RoleApi';
import UserApi, { useGetUserByIdQuery } from '../../../Api/UserApi';
import { toast } from "react-toastify";
import { SkipNext } from '@mui/icons-material';
const ModalUpdateRole = (props) => {
    const {
        openModal,
        selectedRow,
        closeModal
    } = props;

  
    const [role ,setRole] = useState([])
    const [user ,setUser] = useState({})
    const selectedUserId = selectedRow[0]?.id;
    const {data: getUserid, error, refetch } = useGetUserByIdQuery(
      selectedUserId , 
      { skip: !openModal || !selectedRow[0]?.id } // Skip if no ID or modal is closed
    );
   // const {getUserid , refetch} =useGetUserByIdQuery(selectedRow[0]?.id ,{ skip : !openModal })
    const [checkedRoleId, setCheckedRoleId] = useState("");
    const [checkRoleName, setCheckRoleName] = useState("");
    
    const handleCheckboxChange = (event, roleId, roleName) => {
      console.log(roleId, roleName)
      if (event.target.checked) {
        setCheckedRoleId(roleId);
        setCheckRoleName(roleName);
      } else {
        setCheckedRoleId("");
        setCheckRoleName("");
      }
    };

      const handelSubmit = async () => {
         const data = {
            id:selectedRow[0],  
            roleId : checkedRoleId,
            rolename : checkRoleName ,
         }
         const res = await UserApi.UpdateUserPermission(data.id  , data.roleId ,data.rolename)
         console.log(res)
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
  console.log(getUserid)
    useEffect(() => {
        if(openModal)
        {
            const getUserById = async()=>{
                if(getUserid)
                {
                  setUser(getUserid)
                  setCheckedRoleId(getUserid.maChucVu)
                }
                else
                {
                  setUser([])
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
                     checked={checkedRoleId.includes(item.id)}
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