import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid2,
    IconButton,
    Paper,
  } from "@mui/material";
  import DialogActions from "@mui/material/DialogActions";
  import React, { useEffect, useState } from "react";
  import { Tooltip } from "recharts";
  import ReplayIcon from "@mui/icons-material/Replay";
  import PhoneIcon from "@mui/icons-material/Phone";
  import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
  import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
  import Person2Icon from "@mui/icons-material/Person2";
  import Swal from "sweetalert2";
import { useGetKhachHangMucTieuDaXoaQuery, useKhoiphucKhachHangMucTieuMutation } from "src/App/Api/KhachHangMucTieuApi";
  const ModalKhachHangMucTieuDaXoa = ({ handleClose, open ,refetch }) => {
    const [selectedRow, setSelectedRow] = useState([]);
    const [rows, setRows] = useState([]);
    const { data: dataKHDaXoa , refetch : refetchKhDaXoa } = useGetKhachHangMucTieuDaXoaQuery();
    const [phucHoiKhachHang] = useKhoiphucKhachHangMucTieuMutation()
    const handleRowSelectionChange = (selectedRows) => {
      setSelectedRow(selectedRows);
    };
    useEffect(() => {
      setRows(dataKHDaXoa);
    }, [dataKHDaXoa]);
    const columns = [
      {
        field: "action",
        headerName: "Thao tác",
        width: 100,
        renderCell: () => (
          <div style={{ alignItems: "center" }}>
            <IconButton style={{}} disabled={selectedRow.length === 0} onClick={handleRestoreRow}>
              <ReplayIcon color="primary" />
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
              <AssignmentIndIcon style={{ padding: 2 }} color="warning" />
              <span>
                {" "}
                {params?.row?.nguoiDung?.hoVaDem} {params?.row?.nguoiDung?.ten}
              </span>
            </div>
          ) : (
            <div></div>
          );
        },
      },
      {
        field: "tenKhachHang",
        headerName: "Họ và tên",
        width: 200,
        renderCell: (params) => (
          <div>
            <Person2Icon style={{ color: "#1976d2" }} />
            <span style={{ fontWeight: "500" }}>{params.value}</span>
          </div>
        ),
      },
      { field: "diaChi", headerName: "Địa Chỉ", width: 200 },
      {
        field: "soDienThoaiDiDong",
        headerName: "Số điện thoại cá nhân",
        width: 200,
        renderCell: (params) => {
          return params.value ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <PhoneIcon style={{ padding: 2 }} color="success" />
              <span>{params.value}</span>
            </div>
          ) : (
            <div></div>
          );
        },
      },
      {
        field: "soDienThoaiCoQuan",
        headerName: "Số điện thoại cơ quan",
        width: 200,
      },
      { field: "emailCaNhan", headerName: "Email cá nhân", width: 200 },
      { field: "EmailCoQuan", headerName: "Tài khoản", width: 200 },
      { field: "nguonGoc", headerName: "Nguồn gốc khách hàng", width: 200 },
      { field: "linhVuc", headerName: "Lĩnh vực", width: 200 },
      { field: "nghenghiep", headerName: "Nghề nghiệp", width: 200 },
    ];
     const handleRestoreMuliple = async ()=>
      {
        if(confirm("Bạn có muốn phục hồi những khách hàng này ?"))
        {
           await phucHoiKhachHang(selectedRow);
           alert("Phục hồi thành công")
           refetchKhDaXoa()
           refetch()
           handleClose()
        }
      }
      const handleRestoreRow = async()=>
      {
        if(confirm("Bạn có muốn phục hồi khách hàng này ?"))
          {
             await phucHoiKhachHang(selectedRow);
             alert("Phục hồi thành công")
             refetchKhDaXoa()
             refetch()
             handleClose()
          }
      }
    return (
      <div>
        <Dialog
          open={open}
          fullScreen
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Tìm kiếm và phục hồi khách hàng đã xóa"}
          </DialogTitle>
          <DialogContent>
            <Button
              variant="outlined"
              sx={{ marginLeft: 1, width: "250px" }}
              startIcon={<ReplayIcon />}
              color="primary"
              onClick={handleRestoreMuliple}
              disabled={selectedRow == 0}
            >
              Phục hồi hàng loạt
            </Button>
            <Paper>
              <Grid2 size={12}>
                <CustomDatagrid
                  rows={rows}
                  columns={columns}
                  height={500}
                  pageSizeOptions={[10, 25, 50]}
                  initialPageSize={25}
                  checkboxSelection={true}
                  showTopToolbar={false}
                  onRowSelectionChange={handleRowSelectionChange}
                />
              </Grid2>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            {/* <Button onClick={handleClose} autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default ModalKhachHangMucTieuDaXoa;
  