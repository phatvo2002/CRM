import { Grid2, IconButton, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'recharts'
import { useGetCoHoiListQuery } from 'src/App/Api/CoHoiApi'
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NoImage from "../../../../Assets/image/no-image.png"
import Person2Icon from "@mui/icons-material/Person2";
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import Moment from 'react-moment';

export const TabListCoHoi = ({dataCoHoi}) => {
  
  const [selectedRow, setSelectedRow] = useState([]),
  [rows, setRows] = useState([]);
  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            // disabled={selectedRowLichHen.length === 0}
            // onClick={handleOpenModalUpdateLichHen}
          >
            <EditIcon color="primary"></EditIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            // disabled={selectedRowLichHen.length === 0}
            // onClick={handelDeleteLichHen}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    {
      field: "",
      headerName: "Nhân viên chăm sóc",
      width: 200,
      renderCell: (params) => {
        return params?.row?.nguoiDung?.ten ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px" }}>
            {params?.row?.nguoiDung?.hinhAnh == null ? (
              <img 
                src={NoImage} 
                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
              />
            ) : (
              <img 
                src={'data:image/jpeg;base64,' + params?.row?.nguoiDung?.hinhAnh} 
                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
              />
            )}
          </div>
          <span>
            {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}
          </span>
        </div>        
        ) : (
          <div></div>
        );
      },
    },
    {
      field: "tenCoHoi",
      headerName: "Tên cơ hội",
      width: 250,
      renderCell: (params) => (
        <div>
          <Link
            to={`/cohoi/${params.id}`}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "inherit",
            }}
          >
            <Person2Icon style={{ color: "#1976d2" }} />
            <span style={{ fontWeight: "500" }}>{params.value}</span>
          </Link>
        </div>
      ),
    },
    { field: "id", headerName: "Mã cơ hội", width: 200 },
    {
      field: "giaidoan", headerName: "Giai đoạn", width: 200,
      renderCell: (params) =>
      (
        <div>
          {console.log(params)}
          {params.row.giaiDoanBanHang?.tenGiaiDoan}
        </div>
      )
    },
    { field: "soTien", headerName: "Số tiền", width: 200,
      renderCell : (params) => (
        <div>{params.value.toLocaleString("vi-VN")} VND</div>
      )
     },
    {
      field: "ngayKyVongKetThuc",
      headerName: "Ngày kỳ vọng kết thúc",
      width: 200,
      renderCell: (params) => (
        <div><Moment format="DD/MM/YYYY ">{new Date(params.value)}</Moment></div>
      )
    },
    // {
    //   field: "soDienThoai",
    //   headerName: "Số điện thoại cá nhân",
    //   width: 200,
    //   renderCell: (params) => (
    //     <div>
    //       {params.value ?  <div><PhoneIcon/>{params.value}</div> : <div></div>}
    //     </div>
    //   ),
    // },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      width: 200,
      renderCell : (params) => (
         <div><Moment format="DD/MM/YYYY ">{new Date(params.value)}</Moment></div>
      )
    },
  
  ];
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };
  useEffect(() => {
    setRows(dataCoHoi);
  }, [dataCoHoi]);
  return (
    <>
      <Grid2 container spacing={2}>
       
          <CustomDatagrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialPageSize={25}
            checkboxSelection={true}
            showTopToolbar={true}
            onRowSelectionChange={handleRowSelectionChange}
          />
      </Grid2>
  
    </>
  )
}
