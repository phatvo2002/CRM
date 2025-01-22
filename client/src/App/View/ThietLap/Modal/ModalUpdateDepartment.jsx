import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useGetPhongBanQuery } from 'src/App/Api/Phongban'
import { useUpdateUserDepartmentMutation } from 'src/App/Api/UserApi'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ModalUpdateDepartment = ({openModal,closeModal,selectedRow}) => {

   const {data: dataPhongban} = useGetPhongBanQuery()
   const [userDepartment] = useUpdateUserDepartmentMutation()
   const [phongbanId ,setPhongBanId] = useState("")
   const handleChange =(event ,newValue) =>{
      setPhongBanId(newValue.id)
   }
   const handelSubmit = async ()=>{
      const res = await userDepartment({userId:selectedRow[0]?.id , departmentId:phongbanId})
      if(res?.data?.status === 200)
      {
        toast.success("Phân quyền phòng ban thành công", {
          position: "top-center",
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
          position: "top-center",
          autoClose: 3000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }
   }

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
      <DialogTitle>Phân quyền phòng ban </DialogTitle>
      <DialogContent  sx={{height:"100px"}}>
      <Autocomplete
              disablePortal
              options={dataPhongban || []}
              value={dataPhongban?.find((item) => item.id === selectedRow[0]?.maPhongBan) || phongbanId}
              getOptionLabel={(option) => option.tenPhongBan || ""} 
              fullWidth
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label="Phòng ban" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Đóng</Button>
        <Button onClick={handelSubmit} >Lưu</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  )
}

export default ModalUpdateDepartment