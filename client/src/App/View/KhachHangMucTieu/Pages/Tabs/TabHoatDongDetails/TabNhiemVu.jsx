import { Grid2, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetNhiemVuByKhachHangIdQuery } from 'src/App/Api/NhiemVuApi';
import { useParams } from 'react-router-dom';
import CustomDatagrid from 'src/App/Components/DataGrid/CustomDatagrid';
import ModalUpdateNhiemVu from './Modal/ModalUpdateNhiemVu';
const TabNhiemVu = () => {
  const { id } = useParams(),
    [selectedRowNhiemVu, setSelectedRowNhiemVu] = useState([]),
    [rowNhiemVu, setRowNhiemVu] = useState([]);
  const columnsNhiemVu = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRowNhiemVu.length === 0}
            onClick={handleOpenModalUpdate}
          >
            <VisibilityIcon color="primary"></VisibilityIcon>
          </IconButton>
          {/* <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRowNhiemVu.length === 0}
            onClick={handelDeleteLichHen}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton> */}
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    {
      field: "",
      headerName: "Hạn hoàn thành",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>{params?.row?.hanHoanThanh}</div>
      ),
    },
    {
      field: "mucDoUuTien",
      headerName: "Mức độ ưu tiên",
      width: 200,
      renderCell: (params) => (
        <div>
          {params?.row?.mucDoUuTien?.name}
        </div>
      )
    },
    // { field: "createAt", headerName: "Ngày tạo", width: 200, flex: 1 },
  ];
  const [modalUpdateNhiemVu, setModalUpdateNhiemVu] = useState(false)
  const { data: nhiemVuByKhachHangId, refetch: isNhiemVuRefetch } = useGetNhiemVuByKhachHangIdQuery(id)
  const handleRowNhiemVuSelectionChange = (selectedRows) => {
    setSelectedRowNhiemVu(selectedRows);
  };
  const handleOpenModalUpdate = ()=>setModalUpdateNhiemVu(true)
  const handleCloseModalUpdate =()=>setModalUpdateNhiemVu(false)
  useEffect(() => {
    if (nhiemVuByKhachHangId) {
      setRowNhiemVu(nhiemVuByKhachHangId);
    }
  }, [nhiemVuByKhachHangId]);
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <CustomDatagrid
          rows={rowNhiemVu}
          columns={columnsNhiemVu}
          pageSizeOptions={[10, 25, 50]}
          initialPageSize={25}
          checkboxSelection={true}
          showTopToolbar={true}
          onRowSelectionChange={handleRowNhiemVuSelectionChange}
        />
      </Grid2>
      {/* Modal chỉnh sửa nhiệm vụ */}
      <ModalUpdateNhiemVu
        showModal={modalUpdateNhiemVu}
        closeModal={handleCloseModalUpdate}
        selectedItem={selectedRowNhiemVu}
        refetch={isNhiemVuRefetch}
      />
    </Grid2>
  )
}
export default TabNhiemVu