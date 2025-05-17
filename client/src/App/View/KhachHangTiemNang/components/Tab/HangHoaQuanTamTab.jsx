import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useGetAllHangHoaQuery } from "src/App/Api/HangHoa";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useAddHangHoaQuanTamMutation,
  useDeleteHangHoaQuanTamMutation,
  useUpdateHangHoaQuanTamMutation,
  useGetHangHoaQuanTamByKhachHangTiemNangIdQuery,
} from "src/App/Api/HangHoaQuanTam";

const HangHoaQuanTamTab = () => {
  const { id } = useParams();
  const [hangHoa, setHangHoa] = useState([]);
  const { data: rows, refetch } =
    useGetHangHoaQuanTamByKhachHangTiemNangIdQuery(id);
  const { data: hangHoas } = useGetAllHangHoaQuery();
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();

  useEffect(() => {
    if (rows) {
      setHangHoa(rows);
    }
  }, [rows]);
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: "",
      tenHangHoa: "",
      khachHangTiemNangId: id,
      maDonViTinh:0,
      thueSuat:0,
      tienThue:0,
      donGia : 0,
      soLuong: 0,
      thanhTien: 0,
      tongTien: 0,
      isNew: true,
    };

    setHangHoa((prev) => [...prev, newRow]);
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
        refetch()
      } else {
        updatedRow = await updateData(currentRow).unwrap();
        refetch()
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
    const updateTienThue = selectedItem ? (((selectedItem.donGia * (newRow?.thueSuat))) * (newRow.soLuong || 0)) / 100 : 0;
    const updateTongTien = selectedItem ? updatedThanhTien + updateTienThue : 0;
    const updatedRow = {
      ...newRow,
      tenHangHoa : selectedItem?.tenHangHoa,
      maDonViTinh :selectedItem?.donViTinh?.id,
      tienThue : updateTienThue,
      thanhTien: updatedThanhTien,
      tongTien: updateTongTien,
      donGia : selectedItem.donGia
    };
    setHangHoa((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );

    return updatedRow;
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
           <DeleteIcon/>
        </IconButton>,
      ],
    },
    {
      field: "maHangHoaId",
      headerName: "Hàng Hóa",
      width: 300,
      editable: true,
      type: "singleSelect",
      valueOptions:
        hangHoas?.map((item) => ({ value: item.id, label: item.tenHangHoa })) ||
        [],
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.value);
        return selectedItem ? selectedItem.id : "";
      },
    },
    {
      field: "tenHangHoa",
      headerName: "Tên hàng hóa",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.row.maHangHoaId);
        return selectedItem ? selectedItem.tenHangHoa : "" ;
      },
    },
    {
      field: "maDonViTinh",
      headerName: "Đơn vị tính",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.row.maHangHoaId);
        return selectedItem ? selectedItem.donViTinh.name  : "" ;
      },
    },
    {
      field: "soLuong",
      headerName: "Số Lượng",
      width: 150,
      editable: true,
    },
    {
      field: "donGia",
      headerName: "Đơn giá",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.row.maHangHoaId);
        return selectedItem ? selectedItem.donGia.toLocaleString("vi-VN") : 0 ;
      },
    },
    {
      field: "thueSuat",
      headerName: "Thuế suất (%)",
      width: 150,
      editable: true,
    },
    {
      field: "tienThue",
      headerName: "Tiền thuế",
      width: 200,
      editable: false,
      renderCell: (params) =>  params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
    {
      field: "thanhTien",
      headerName: "Thành Tiền",
      width: 200,
      editable: false,
      renderCell: (params) =>  params.value ? params.value.toLocaleString("vi-VN") : 0,
    },

    {
      field: "tongTien",
      headerName: "Tổng Tiền",
      width: 200,
      renderCell: (params) =>  params.value ? params.value.toLocaleString("vi-VN") : 0,
    },
  ];

  return (
    <div>
      <DataGrid
        rows={hangHoa}
        columns={columns}
        editMode="row"
        style={{fontSize:"1rem"}}
        // initialState={{
        //   aggregation: {
        //     model: {
        //       tongTien: 'sum',
        //     },
        //   },
        // }}
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

export default HangHoaQuanTamTab;
