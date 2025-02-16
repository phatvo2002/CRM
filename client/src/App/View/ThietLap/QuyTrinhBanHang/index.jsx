import newStyled from "@emotion/styled";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetAllLoaiDuBaoQuery,
  useGetAllPhanLoaiDuBaoQuery,
} from "src/App/Api/GetDataApi";
import {
  useAddGiaiDoanBanHangMutation,
  useDeleteGiaiDoanBanHangMutation,
  useGetAllGiaiDoanBanHangQuery,
  useUpdateGiaiDoanBanHangMutation,
} from "src/App/Api/GiaiDoanBanHangApi";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";

const index = () => {
  const [data, setData] = useState([]);
  const { data: loaiDuBao } = useGetAllLoaiDuBaoQuery();
  const { data: phanLoaiDuBao } = useGetAllPhanLoaiDuBaoQuery();
  const { data: giaiDoanBanHang } = useGetAllGiaiDoanBanHangQuery();
  const [createGiaiDoanBanHang] = useAddGiaiDoanBanHangMutation();
  const [updateGiaiDoanBanHang] = useUpdateGiaiDoanBanHangMutation();
  const [deleteGiaiDoanBanHang] = useDeleteGiaiDoanBanHangMutation();

  const handleAddGiaiDoanBanHang = () => {
    const newRow = {
      id: uuidv4(),
      stt: 0,
      tenGiaiDoan: "",
      tiLeThanhCong: "",
      maLoaiDuBao: "",
      maPhanLoaiDuBao: "",
      isNew: true,
    };
    setData((prev) => [...prev, newRow]);
  };
  const navigate = useNavigate();

  const handleSave = async (id) => {
    const currentRow = data.find((row) => row.id === id);
    if (!currentRow) {
      toast.error("Không tìm thấy dữ liệu");
      return;
    }
    let updateRow;
    if (currentRow.isNew === true) {
      updateRow = await createGiaiDoanBanHang(currentRow);
      currentRow.isNew = false;
    } else {
      updateRow = await updateGiaiDoanBanHang(currentRow);
    }
    toast.success("Thêm giai đoạn thành công");
  };
  const handleSaveUpdate = (newRow) => {
    const updateRow = {
      ...newRow,
    };
    setData((prev) =>
      prev.map((row) => (row.id === updateRow.id ? updateRow : row))
    );
    return updateRow;
  };
  const handleDelete = (id) => async () => {
    const rowToDelete = data.find((row) => row.id === id);
    if (rowToDelete?.isNew) {
      setData((prev) => prev.filter((row) => row.id !== id));
    } else {
      try {
        await deleteGiaiDoanBanHang(id).unwrap();
        setData((prev) => prev.filter((row) => row.id !== id));
        toast.success("Xóa hàng hóa thành công");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 200,
      getActions: ({ id }) => [
        <IconButton
          key={`edit-${id}`}
          onClick={() => handleSave(id)}
          color="primary"
        >
          <SaveIcon />
        </IconButton>,
        <IconButton
          key={`delete-${id}`}
          onClick={handleDelete(id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>,
      ],
    },
    {
      field: "stt",
      headerName: "Số thứ tự",
      width: 200,
      editable: true,
    },
    {
      field: "tenGiaiDoan",
      headerName: "Tên giai đoạn",
      width: 200,
      editable: true,
    },
    {
      field: "tiLeThanhCong",
      headerName: "Tỉ lệ thành công",
      width: 200,
      editable: true,
    },
    {
      field: "maLoaiDuBao",
      headerName: "Loại dự báo",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions:
        loaiDuBao?.map((item) => ({ value: item.id, label: item.name })) || [],
      renderCell: (params) => {
        const selectedItem = loaiDuBao?.find(
          (item) => item.id === params.value
        );
        return selectedItem ? selectedItem.name : "";
      },
    },
    {
      field: "maPhanLoaiDuBao",
      headerName: "Phân loại dự báo",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions:
        phanLoaiDuBao?.map((item) => ({ value: item.id, label: item.name })) ||
        [],
      renderCell: (params) => {
        const selectedItem = phanLoaiDuBao?.find(
          (item) => item.id === params.value
        );
        return selectedItem ? selectedItem.name : "";
      },
    },
  ];

  useEffect(() => {
    if (giaiDoanBanHang) {
      setData(giaiDoanBanHang);
    }
  }, [giaiDoanBanHang]);

  const backLink = async () => {
    navigate("/quantrihethong");
  };

  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        editMode="row"
        sx={{ width: "100%" }}
        style={{ fontSize: "1rem" }}
        processRowUpdate={handleSaveUpdate}
        slots={{
          toolbar: () => (
            <GridToolbarContainer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                margin: "10px 0",
              }}
            >
              <Button
                style={{ margin: "10px 0" }}
                variant="contained"
                onClick={backLink}
              >
                {" "}
                <ArrowBackIosIcon /> Quay lại
              </Button>
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddGiaiDoanBanHang}
              >
                Thêm giai đoạn
              </Button>
            </GridToolbarContainer>
          ),
        }}
      />
    </div>
  );
};

export default index;
