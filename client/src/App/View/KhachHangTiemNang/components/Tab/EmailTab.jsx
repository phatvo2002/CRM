import { Grid2, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetAllQuery,
  useGetByTiemNangIdQuery,
} from "src/App/Api/MailDaGui.Api";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { useDeleteMutation } from "src/App/Api/MailDaGui.Api";
import { toast } from "react-toastify";

const EmailTab = () => {
  const { id } = useParams();
  const columns = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRows.length === 0}
            color="error"
               onClick={handleDelete}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200, flex: 1 },
    { field: "diaChiGui", headerName: "Địa chỉ gửi", width: 200, flex: 1 },
    { field: "diaChiNhan", headerName: "Địa chỉ nhận ", width: 200, flex: 1 },
    {
      field: "",
      headerName: "Ngày tạo",
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {" "}
          <Moment format="DD/MM/YYYY HH:SS">
            {new Date(params?.row?.createAt)}
          </Moment>
        </div>
      ),
    },
  ];

  const { data: dataMailDaGui ,refetch} = useGetByTiemNangIdQuery(id);
  const [deleteMail]=useDeleteMutation()
  const [selectedRows, setSelectedRow] = useState("");
  const [row, setRow] = useState([]);

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRow(selectedRows);
  };

  const handleDelete = async()=>
  {
     const response = await deleteMail(selectedRows[0]?.id)
     console.log(response)
     if(response?.data?.status === 200)
     {
      toast.success("Xóa dữ liệu thành công")
      refetch()
     }else toast.error(response?.data?.message)
  }

  useEffect(() => {
    if (dataMailDaGui) {
      setRow(dataMailDaGui);
    } else setRow([]);
  }, [dataMailDaGui]);
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <CustomDatagrid
            rows={row}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialPageSize={25}
            checkboxSelection={true}
            showTopToolbar={true}
            onRowSelectionChange={handleRowSelectionChange}
          />
          {/* Modal thêm mới */}
        </Grid2>
      </Grid2>
    </>
  );
};

export default EmailTab;
