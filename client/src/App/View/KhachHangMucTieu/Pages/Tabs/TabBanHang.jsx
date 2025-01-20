import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByKhachHangIdQuery,
  useUpdateHangHoaQuanTamMutation,
} from "src/App/Api/HangHoaQuanTam";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";

const TabBanHang = () => {
  const { id } = useParams();
  const [hangHoa, setHangHoa] = useState([]);
  const { data: rows, refetch } = useGetHangHoaQuanTamByKhachHangIdQuery(id);
  const { data: hangHoas } = useGetAllHangHoaQuery();
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();

  useEffect(() => {
    if (rows) {
      setHangHoa(rows);
    }
  }, [rows]);

  // thêm mới 1 dòng hàng hóa
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      khachHangTiemNangId: null,
      khachHangId: id,
      soLuong: 0,
      thanhTien: 0,
      tongTien: 0,
      isNew: true,
    };

    setHangHoa((prev) => [...prev, newRow]);
  };
  const handleSaveClick = async (id) => {
    const currentRow = hangHoa.find((row) => row.id === id);
    if (!currentRow) {
      toast.error("Không tìm thấy hàng hóa để lưu!");
      return;
    }

    let updatedRow;
    if (currentRow.isNew === true) {
      updatedRow = await createData(currentRow).unwrap();
      currentRow.isNew = false;
    } else {
      updatedRow = await updateData(currentRow).unwrap();
    }
    // setHangHoa((prev) =>
    //   prev.map((row) => (row.id === id ? { ...updatedRow } : row))
    // );
    toast.success("Lưu dữ liệu thành công!");
  };
  const processRowUpdate = (newRow) => {
    const selectedItem = hangHoas?.find(
      (item) => item.id === newRow.maHangHoaId
    );
    const updatedThanhTien = selectedItem
      ? selectedItem.donGia * (newRow.soLuong || 0)
      : 0;
    const updateTongTien = selectedItem ? updatedThanhTien : 0;
    const updatedRow = {
      ...newRow,
      thanhTien: updatedThanhTien,
      tongTien: updateTongTien,
    };
    setHangHoa((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );

    return updatedRow;
  };
  const handleDeleteClick = (id) => async () => {
    const rowToDelete = hangHoa.find((row) => row.id === id);
    if (rowToDelete?.isNew) {
      setHangHoa((prev) => prev.filter((row) => row.id !== id));
      toast.success("Đã xóa hàng hóa thành công!");
    } else {
      try {
        await deleteData(id).unwrap();
        setHangHoa((prev) => prev.filter((row) => row.id !== id));
        toast.success("Xóa hàng hóa thành công!");
      } catch (error) {
        toast.error("Đã có lỗi trong quá trình xóa!");
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
          onClick={() => handleSaveClick(id)}
          color="primary"
        >
          <SaveIcon />
        </IconButton>,
        <IconButton
          key={`delete-${id}`}
          onClick={handleDeleteClick(id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>,
      ],
    },
    {
      field: "maHangHoaId",
      headerName: "Hàng Hóa",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions:
        hangHoas?.map((item) => ({ value: item.id, label: item.tenHangHoa })) ||
        [],
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.value);
        return selectedItem ? selectedItem.tenHangHoa : "";
      },
    },
    {
      field: "soLuong",
      headerName: "Số Lượng",
      width: 150,
      editable: true,
    },
    {
      field: "thanhTien",
      headerName: "Thành Tiền",
      width: 200,
      editable: false,
      renderCell: (params) => params.value,
    },
    {
      field: "tongTien",
      headerName: "Tổng Tiền",
      width: 200,
    },
  ];
  return (
    <div>
      <DataGrid
        rows={hangHoa}
        columns={columns}
        editMode="row"
        sx={{width:"100%"}}
        style={{ fontSize: "1rem" }}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
              >
                Thêm hàng hóa
              </Button>
            </GridToolbarContainer>
          ),
        }}
      />
    </div>
  );
};

export default TabBanHang;
