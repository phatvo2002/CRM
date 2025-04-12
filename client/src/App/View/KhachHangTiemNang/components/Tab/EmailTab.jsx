import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetAllQuery } from 'src/App/Api/MailDaGui.Api'
import DeleteIcon from "@mui/icons-material/Delete";

const EmailTab = () => {
  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{ margin: "0 10px" }}
           //  disabled={selectedRow.length === 0}
             color='error'
          //   onClick={handelDelete}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "id", headerName: "Mã Liên Hệ", width: 200 , flex : 1 },
    { field: "tenLienHe", headerName: "Tên Liên Hệ", width: 200 ,flex : 1  },
    { field: "email", headerName: "Địa chỉ Email", width: 200 ,flex : 1  },
    { field: "soDienThoai", headerName: "Số Điện Thoại", width: 200 ,flex : 1  },
   
  ]

  const {data : dataMailDaGui} = useGetAllQuery()
  const [selectedRows, setSelectedRow] = useState("")
  const [row , setRow]= useState([])

  useEffect(()=>
  {
      if(dataMailDaGui)
      {
        setRow(dataMailDaGui)
      }else setRow([])
  },[dataMailDaGui])
  return (
    <div>EmailTab</div>
  )
}

export default EmailTab