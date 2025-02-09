import { Grid2, IconButton, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import NoImage from "../../../../Assets/image/no-image.png";
import Person2Icon from "@mui/icons-material/Person2";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import Moment from "react-moment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const TabListCoHoi = ({ dataCoHoi }) => {
  const [selectedRow, setSelectedRow] = useState([]),
    [rows, setRows] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");

  const handleActionChange = (event, rowId) => {
    setSelectedAction((prev) => ({
      ...prev,
      [rowId]: event.target.value,
    }));
    console.log(`Row ${rowId} selected action:`, event.target.value);
  };
  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => (
        <Select
          value={selectedAction[params.row.id] || ""}
          onChange={(event) => handleActionChange(event, params.row.id)}
          displayEmpty
          style={{ width: "100%" }}
        >
          <MenuItem value="" disabled>
            Chọn thao tác
          </MenuItem>
          <MenuItem value="edit">
            <EditIcon color="success" style={{ marginRight: 8 }} />
            Chỉnh sửa giai đoạn
          </MenuItem>
          <MenuItem value="calendar">
            <CalendarMonthIcon color="warning" style={{ marginRight: 8 }} />
            Thay đổi ngày kỳ vọng
          </MenuItem>
          <MenuItem value="assign">
            <AssignmentIndIcon color="primary" style={{ marginRight: 8 }} />
            Bàn giao công việc
          </MenuItem>
          <MenuItem value="delete">
            <DeleteIcon color="error" style={{ marginRight: 8 }} />
            Xóa dữ liệu
          </MenuItem>
        </Select>
      ),
    },
    {
      field: "",
      headerName: "Nhân viên chăm sóc",
      width: 200,
      renderCell: (params) => {
        return params?.row?.nguoiDung?.ten ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
              }}
            >
              {params?.row?.nguoiDung?.hinhAnh == null ? (
                <img
                  src={NoImage}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img
                  src={
                    "data:image/jpeg;base64," + params?.row?.nguoiDung?.hinhAnh
                  }
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
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
      field: "giaidoan",
      headerName: "Giai đoạn",
      width: 200,
      renderCell: (params) => (
        <div>
          {console.log(params)}
          {params.row.giaiDoanBanHang?.tenGiaiDoan}
        </div>
      ),
    },
    {
      field: "soTien",
      headerName: "Số tiền",
      width: 200,
      renderCell: (params) => (
        <div>{params.value.toLocaleString("vi-VN")} VND</div>
      ),
    },
    {
      field: "ngayKyVongKetThuc",
      headerName: "Ngày kỳ vọng kết thúc",
      width: 200,
      renderCell: (params) => (
        <div>
          <Moment format="DD/MM/YYYY ">{new Date(params.value)}</Moment>
        </div>
      ),
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
      renderCell: (params) => (
        <div>
          <Moment format="DD/MM/YYYY ">{new Date(params.value)}</Moment>
        </div>
      ),
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
      {/* modal sửa  */}
    </>
  );
};
