import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Divider,
  Grid2,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCheckDocThongBaoMutation, useDeleteThongBaoMutation, useGetThongBaoByNguoiDungIdQuery } from "src/App/Api/ThongBaoApi";
import { Link } from "react-router-dom";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const NotificationList = () => {
  const { data: dataNoti , refetch } = useGetThongBaoByNguoiDungIdQuery();
  const [checkXemThonBao] = useCheckDocThongBaoMutation()
  const [deleteThongbao] = useDeleteThongBaoMutation()
  const [modalThongBao , setModalThongBao] = useState(false)
  const [thongBaoId , setThongBaoId] = useState("")
  const handleClickXemThongBao = async (id) => {
     await checkXemThonBao(id)
  }

   const handleDeleteNhiemVu = async (id) => {
      Swal.fire({
        title: "Bạn có muốn xóa thông báo này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then(async (result) => {
        if (result.isConfirmed) {
           await deleteThongbao(id)
            toast.success("Xóa thông báo thành công")
            refetch();
        }
      });
    };
    return (
    <div style={{ padding: "20px" }}>
      <Typography
        style={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
        variant="h5"
        gutterBottom
      >
        Thông báo - Nhắc nhở
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />
      <Grid container spacing={2}>
        {dataNoti?.length > 0 ? (
          dataNoti.map((noti) => (
            <Grid item xs={12} key={noti.id}>
              <Card>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: "bold",
                      }}
                      variant="h6"
                    >
                      {noti.tieuDe}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginLeft: "20px", whiteSpace: "nowrap" }}
                    >
                      {new Date(noti.createAt).toLocaleDateString("vi-VN")}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: "10px" }}
                    >
                      {noti.noiDung}
                    </Typography>
                    <Button
                      startIcon={ <BackspaceIcon
                        fontSize="large"
                        style={{ cursor: "pointer" }}
                        
                      />}
                      onClick={()=> handleDeleteNhiemVu(noti?.id)}
                    >
                    </Button>
                   
                  
                  </div>
                  <Link style={{padding : 0 , margin : 0,color:"#0276aa" , textDecoration:"none"}} color="" to={noti.duongDan} onClick={()=>handleClickXemThongBao(noti?.id)}>Thực hiện</Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>
            Không có thông báo
          </div>
        )}
      </Grid>
      
    </div>
  );
};

export default NotificationList;
