import { Button, Grid2, IconButton, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import TodayIcon from "@mui/icons-material/Today";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ModlaAddCuocGoi from "./Modal/ModalAddCuocGoi";
import ModalUpdateCuocGoi from "./Modal/ModalUpdateCuocGoi";
import { TYPE_MODAL } from "src/App/Until/constant";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCuocGoiMutation, useGetCuocGoiByKhachHangTiemNangIdQuery } from "src/App/Api/CuocGoiApi";
import Swal from "sweetalert2";
const CongViecThucHienTab = () => {
  
  const columnsCuocGoi = [
       {
      field: "action",
      headerName: "Thao tác",
      flex:1,
      renderCell: () => (
        <div style={{alignItems : "center"}}>
        <IconButton style={{}} disabled={selectedRowCuocGoi.length === 0}  onClick={onOpenModalUpdateCuocGoi} >
            <CreateIcon ></CreateIcon>
        </IconButton>
          <IconButton style={{ margin:"0 10px"}} disabled={selectedRowCuocGoi.length === 0} onClick={handelDeleteCuocGoi}>
            <DeleteIcon  ></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200, flex: 1 },
    { field: "moTa", headerName: "Mô tả", width: 200, flex: 1 },
    { field: "", headerName: "Ngày bắt đầu", width: 200, flex: 1 ,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {params?.row?.ngayBatDau}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Loại cuộc gọi",
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          {params?.row?.loaiCuocGoi?.tenCuocGoi}
        </div>
      ),
    },
    {
      field: "isHoanThanh",
      headerName: "Đã hoàn thành",
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <div>
          {params?.row?.isHoanThanh === false ? (
            <span style={{backgroundColor:"#ff1744" , textAlign:"center",padding:2 , borderRadius : 10 , color :"white"}}>Chưa hoàn thành</span>
          ) : (
            <span style={{backgroundColor:"#76ff03" , textAlign:"center",padding:2 , borderRadius : 10 , color :"white"}}>Đã hoàn thành</span>
          )}
        </div>
      )
    },
    { field: "createAt", headerName: "Ngày tạo", width: 200, flex: 1 },
 
  ];
  const {id} = useParams()
  const [value, setValue] = useState("1"),
    [modalAddCuocGoi, setModalAddCuocGoi] = useState(false),
    [modalUpdateCuocGoi, setModalUpdateCuocGoi] = useState(false),
    [typeModal, setTypeModal] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [rows, setRows] = useState([]),
    [selectedRowCuocGoi, setSelectedRowCuocGoi] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const { data: cuocGoiByKhachHangId , refetch } =
    useGetCuocGoiByKhachHangTiemNangIdQuery(id);
  const [deleteCuocGoi] = useDeleteCuocGoiMutation()

  const handelModalAddCuocGoi = () => {
    setModalAddCuocGoi(true);
    setTypeModal(TYPE_MODAL.INSERT);
  };
  const onCloseModalAddCuocGoi = () => {
    setTypeModal("");
    setModalAddCuocGoi(false);
  };
  const onOpenModalUpdateCuocGoi = () => {
    setModalUpdateCuocGoi(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };

  const onCloseModalUpdateCuocGoi = () => {
    setModalUpdateCuocGoi(false);
    setTypeModal("");
  };
  const handelDeleteCuocGoi = () => 
  {
     Swal.fire({
         title: "Bạn có muốn xóa dữ liệu này",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Có"
       }).then(async (result) =>  {
         if (result.isConfirmed) {
            await deleteCuocGoi(selectedRowCuocGoi[0]?.id)
             Swal.fire({
               title: "Xóa thành công",
               icon: "success",
             });
             refetch()
         }
       });
  }
  const handleRowCuocGoiSelectionChange = (selectedRows) => {
    setSelectedRowCuocGoi(selectedRows);
  };

  useEffect(() => {
    if (cuocGoiByKhachHangId) {
      setRows(cuocGoiByKhachHangId);
    }
  }, [cuocGoiByKhachHangId]);
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<PermPhoneMsgIcon />}
            onClick={handelModalAddCuocGoi}
          >
            Thêm Cuộc gọi
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginLeft: 1 }}
            startIcon={<PermContactCalendarIcon />}
          >
            Thêm nhiệm vụ
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: 1 }}
            startIcon={<TodayIcon />}
          >
            Thêm lịch hẹn
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  fontFamily: "inherit",
                }}
              >
                <TabList onChange={handleChange} aria-label="lab">
                  <Tab label="Cuộc gọi" value="1" />

                  <Tab label="Nhiệm vụ" value="2" />
                  <Tab label="Lịch hẹn" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <CustomDatagrid
                  rows={rows}
                  columns={columnsCuocGoi}
                  pageSizeOptions={[10, 25, 50]}
                  initialPageSize={25}
                  checkboxSelection={false}
                  showTopToolbar={true}
                  onRowSelectionChange={handleRowCuocGoiSelectionChange}
                />
              </TabPanel>
              <TabPanel value="2"></TabPanel>
              <TabPanel value="3"></TabPanel>
            </TabContext>
          </Box>
        </Grid2>
        {/* Modal Add cuoc goi */}
        <ModlaAddCuocGoi
          showModal={modalAddCuocGoi}
          closeModal={onCloseModalAddCuocGoi}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          setLoading={setIsLoading}
          refetch = {refetch}
        />
        {/* Modal update cuộc gọi  */}
        <ModalUpdateCuocGoi 
        selectedItem={selectedRowCuocGoi} 
        closeModal={onCloseModalUpdateCuocGoi}   
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={modalUpdateCuocGoi}
        setLoading={setIsLoading}
        refetch = {refetch}
        />
      </Grid2>
    </>
  );
};

export default CongViecThucHienTab;
