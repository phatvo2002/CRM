import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SaveIcon from '@mui/icons-material/Save';
import { useGetAllHangHoaQuery } from 'src/App/Api/HangHoa';
import { useAddHangHoaQuanTamMutation, useDeleteHangHoaQuanTamMutation, useUpdateHangHoaQuanTamMutation, useGetHangHoaQuanTamByKhachHangTiemNangIdQuery } from 'src/App/Api/HangHoaQuanTam';

const HangHoaQuanTamTab = () => {
  const { id } = useParams(); // Lấy id khách hàng tiềm năng từ URL
  const [hangHoa, setHangHoa] = useState([]);
  const { data: rows, refetch } = useGetHangHoaQuanTamByKhachHangTiemNangIdQuery(id); // Lấy dữ liệu từ API
  const { data: hangHoas } = useGetAllHangHoaQuery(); // Lấy danh sách hàng hóa từ API
  const [createData] = useAddHangHoaQuanTamMutation();
  const [updateData] = useUpdateHangHoaQuanTamMutation();
  const [deleteData] = useDeleteHangHoaQuanTamMutation();

  useEffect(() => {
    if (rows) {
      setHangHoa(rows);
    }
  }, [rows]);

  // Thêm mới hàng hóa vào bảng hanghoaquantam
  const handleAddClick = () => {
    const newRow = {
      id: uuidv4(),
      maHangHoaId: '',
      khachHangTiemNangId: id,
      soLuong: 0,
      thanhTien: 0,
      tongTien: 0,
    };

    setHangHoa((prev) => [...prev, newRow]);
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await deleteData(id).unwrap();
      setHangHoa((prev) => prev.filter((row) => row.id !== id));
      toast.success("Xóa hàng hóa thành công!");
    } catch (error) {
      toast.error("Đã có lỗi trong quá trình xóa!");
    }
  };

  const handleSaveClick = async () => {
    try {
      // Cập nhật tất cả các hàng hóa đã thay đổi vào cơ sở dữ liệu
      await Promise.all(
        hangHoa.map(async (row) => {
          const updatedRow = await updateData(row).unwrap();
          return updatedRow;
        })
      );
      toast.success("Cập nhật dữ liệu thành công!");
    } catch (error) {
      toast.error("Đã có lỗi trong quá trình lưu!");
    }
  };

  const processRowUpdate = (newRow) => {
    setHangHoa((prev) => prev.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  // Cột dữ liệu trong DataGrid
  const columns = [
    {
      field: 'maHangHoaId',
      headerName: 'Hàng Hóa',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: hangHoas?.map(item => ({ value: item.id, label: item.tenHangHoa })) || [],
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params.value);
        return selectedItem ? selectedItem.tenHangHoa : '';
      },
    },
    {
      field: '',
      headerName: 'Số lượng',
      type: 'number',
      width: 80,
      editable: true,
      valueSetter: (params) => {
        const newSoLuong = params.value;
        return newSoLuong ? newSoLuong : 0;
      }
    },
    {
      field: '',
      headerName: 'Đơn giá',
      width: 220,
      editable: true,
      renderCell: (params) => {
        const selectedItem = hangHoas?.find((item) => item.id === params?.row?.maHangHoaId);
        return selectedItem ? (params.row.soLuong * selectedItem?.donGia) : 0; 
      },
    },
    {
      field: 'tongTien',
      headerName: 'Tổng tiền',
      width: 220,
    
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
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
          color="secondary"
        />
      ]
    }
  ];

  return (
    <div>
      <DataGrid
        rows={hangHoa}
        columns={columns}
        editMode="row"
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                Thêm hàng hóa
              </Button>
            </GridToolbarContainer>
          ),
        }}
      />
      <Button onClick={handleSaveClick} variant="contained" color="primary">
        Lưu thay đổi
      </Button>
    </div>
  );
};

export default HangHoaQuanTamTab;
