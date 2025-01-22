import { Button, CircularProgress, Typography, Grid2, IconButton, Switch } from "@mui/material";
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
import ModalAddLichHen from "./Modal/ModalAddLichHen";
import ModalUpdateLichHen from "./Modal/ModalUpdateLichHen";
import ModalAddNhiemVu from "./Modal/ModalAddNhiemVu";
import ModalUpdateNhiemVu from "./Modal/ModalUpdateNhiemVu";
import { TYPE_MODAL } from "src/App/Until/constant";
import CustomDatagrid from "src/App/Components/DataGrid/CustomDatagrid";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Moment from "react-moment";
import {
  useDeleteCuocGoiMutation,
  useGetCuocGoiByKhachHangTiemNangIdQuery,
} from "src/App/Api/CuocGoiApi";
import Swal from "sweetalert2";
import { useDeleteLichHenMutation, useGetLichHenByKhachHangTiemNangIdQuery } from "src/App/Api/LichhenApi";
import { useGetNhiemVuByKhachHangTiemNangIdQuery } from "src/App/Api/NhiemVuApi";
const CongViecThucHienTab = () => {
  const columnsCuocGoi = [
    {
      field: "action",
      headerName: "Thao tác",
      flex: 1,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRowCuocGoi.length === 0}
            onClick={onOpenModalUpdateCuocGoi}
          >
            <CreateIcon color="primary"></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRowCuocGoi.length === 0}
            onClick={handelDeleteCuocGoi}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200},
    { field: "moTa", headerName: "Mô tả", width: 200 },
    {
      field: "",
      headerName: "Ngày bắt đầu",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}> <Moment format="DD/MM/YYYY HH:SS">{new Date(params?.row?.ngayBatDau)}</Moment></div>
      ),
    },
    {
      field: "category",
      headerName: "Loại cuộc gọi",
      width: 200,
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
      renderCell: (params) => (
        <div>
          {params?.row?.isHoanThanh === false ? (
            <span
              style={{
                backgroundColor: "#ff1744",
                textAlign: "center",
                padding: 2,
                borderRadius: 10,
                color: "white",
              }}
            >
              Chưa hoàn thành
            </span>
          ) : (
            <span
              style={{
                backgroundColor: "#76ff03",
                textAlign: "center",
                padding: 2,
                borderRadius: 10,
                color: "white",
              }}
            >
              Đã hoàn thành
            </span>
          )}
        </div>
      ),
    },
    {
      field: "",
      headerName: "Ngày tạo",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}> <Moment format="DD/MM/YYYY HH:SS">{new Date(params?.row?.createAt)}</Moment></div>
      ),
    },

  ];
  const columnsLichHen = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: () => (
        <div style={{ alignItems: "center" }}>
          <IconButton
            style={{}}
            disabled={selectedRowLichHen.length === 0}
            onClick={handleOpenModalUpdateLichHen}
          >
            <CreateIcon color="primary"></CreateIcon>
          </IconButton>
          <IconButton
            style={{ margin: "0 10px" }}
            disabled={selectedRowLichHen.length === 0}
            onClick={handelDeleteLichHen}
          >
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      ),
    },
    { field: "tieuDe", headerName: "Tiêu đề", width: 200 },
    { field: "moTa", headerName: "Mô tả", width: 200 },
    {
      field: "ngayBatDau",
      headerName: "Ngày bắt đầu",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <Moment format="DD/MM/YYYY ">{new Date(params?.row?.ngayBatDau)}</Moment>
        </div>
      ),
    },
    {
      field: "ngayKetThuc",
      headerName: "Ngày kết thúc",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <Moment format="DD/MM/YYYY">{new Date(params?.row?.ngayKetThuc)}</Moment>
        </div>
      ),
    },
    {
      field: "",
      headerName: "Trạng thái thực hiện",
      width: 200,
      renderCell: (params) => (
        <div style={{ alignItems: "center" }}>
          <div>
            {params?.row?.trangThaiThucHien?.name.trim() === "Chưa thực hiện" ? (
              <Typography style={{ backgroundColor: "red", color: "white", textAlign: "center", padding: 3, borderRadius: 50, marginTop: 10 }}>
                Chưa thực hiện
              </Typography>
            ) : params?.row?.trangThaiThucHien?.name.trim() === "Đang thực hiện" ? (
              <Typography style={{ backgroundColor: "yellow", color: "black", textAlign: "center", padding: 3, borderRadius: 50, marginTop: 10 }}>
                Đang thực hiện
              </Typography>
            ) : params?.row?.trangThaiThucHien?.name.trim() === "Hoàn thành" ? (
              <Typography style={{ backgroundColor: "green", color: "white", textAlign: "center", padding: 3, borderRadius: 50, marginTop: 10 }}>
                Hoàn thành
              </Typography>
            ) : (
              <div>Trạng thái không xác định</div>
            )}
          </div>

        </div>
      ),
    },
    //  {
    //    field: "isHoanThanh",
    //    headerName: "Đã hoàn thành",
    //    width: 200,
    //    flex: 1,
    //    renderCell: (params) => (
    //      <div>
    //        {params?.row?.isHoanThanh === false ? (
    //          <span style={{backgroundColor:"#ff1744" , textAlign:"center",padding:2 , borderRadius : 10 , color :"white"}}>Chưa hoàn thành</span>
    //        ) : (
    //          <span style={{backgroundColor:"#76ff03" , textAlign:"center",padding:2 , borderRadius : 10 , color :"white"}}>Đã hoàn thành</span>
    //        )}
    //      </div>
    //    )
    //  },
    { field: "createAt", headerName: "Ngày tạo", width: 200 },
  ];
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
            onClick={handleOpenModalUpdateNhiemVu}
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
       flex: 1,
       renderCell: (params) => (
         <div>
            {params?.row?.mucDoUuTien?.name}
         </div>
       )
     },
    // { field: "createAt", headerName: "Ngày tạo", width: 200, flex: 1 },
  ];
  const { id } = useParams();
  const [value, setValue] = useState("1"),
    [modalAddCuocGoi, setModalAddCuocGoi] = useState(false),
    [modalUpdateCuocGoi, setModalUpdateCuocGoi] = useState(false),
    [modalAddLichHen, setModalAddLichHen] = useState(false),
    [modalUpdataLichHen, setModalUpdateLichHen] = useState(false),
    [modalAddNhiemVu, setModalAddNhiemVu] = useState(false),
    [modalUpdateNhiemVu, setModalUpdateNhiemVu] = useState(false),
    [typeModal, setTypeModal] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [rows, setRows] = useState([]),
    [rowLichHen, setRowLichHen] = useState([]),
    [rowNhiemVu, setRowNhiemVu] = useState([]),
    [selectedRowCuocGoi, setSelectedRowCuocGoi] = useState([]),
    [selectedRowLichHen, setSelectedRowLichHen] = useState([]),
    [selectedRowNhiemVu, setSelectedRowNhiemVu] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: cuocGoiByKhachHangId, refetch } =
    useGetCuocGoiByKhachHangTiemNangIdQuery(id);
  const { data: lichHenByKhachHangTiemNangId, isLoading: isLichHenFetching, refetch: isLichHenRefetch } =
    useGetLichHenByKhachHangTiemNangIdQuery(id);
  const { data: nhiemVuByKhachHangTiemNangId, refetch: isNhiemVuRefetch } = useGetNhiemVuByKhachHangTiemNangIdQuery(id)
  const [deleteCuocGoi] = useDeleteCuocGoiMutation();
  const [deleteLichHen] = useDeleteLichHenMutation();

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

  const handleOpenModalAddLichHen = () => {
    setModalAddLichHen(true);
    setTypeModal(TYPE_MODAL.INSERT);
  };
  const handleCloseModalAddLichHen = () => {
    setTypeModal("");
    setModalAddLichHen(false);
  };
  const handleOpenModalUpdateLichHen = () => {
    setModalUpdateLichHen(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };
  const handleCloseModalUpdateLichHen = () => {
    setTypeModal("");
    setModalUpdateLichHen(false);
  };
  const handleOpenModalAddNhiemVu = () => {
    setModalAddNhiemVu(true);
    setTypeModal(TYPE_MODAL.INSERT);
  };
  const handleCloseModalAddNhiemVu = () => {
    setTypeModal("");
    setModalAddNhiemVu(false);
  };
  const handleOpenModalUpdateNhiemVu = () => {
    setModalUpdateNhiemVu(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };
  const handleCloseModalUpdateNhiemVu = () => {
    setTypeModal("");
    setModalUpdateNhiemVu(false);
  };

  const handelDeleteCuocGoi = () => {
    Swal.fire({
      title: "Bạn có muốn xóa dữ liệu này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCuocGoi(selectedRowCuocGoi[0]?.id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetch();
      }
    });
  };
  const handelDeleteLichHen = () => {
    Swal.fire({
      title: "Bạn có muốn xóa lịch hẹn này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteLichHen(selectedRowLichHen[0]?.id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        isLichHenRefetch();
      }
    });
  };
  // const handelDeleteNhiemVu = () => {
  //   Swal.fire({
  //     title: "Bạn có muốn xóa nhiệm vụ này",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Có",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await deleteLichHen(selectedRowLichHen[0]?.id);
  //       Swal.fire({
  //         title: "Xóa thành công",
  //         icon: "success",
  //       });
  //       isLichHenRefetch();
  //     }
  //   });
  // };
  const handleRowCuocGoiSelectionChange = (selectedRows) => {
    setSelectedRowCuocGoi(selectedRows);
  };
  const handleRowLichHenSelectionChange = (selectedRows) => {
    setSelectedRowLichHen(selectedRows);
  };
  const handleRowNhiemVuSelectionChange = (selectedRows) => {
    setSelectedRowNhiemVu(selectedRows);
  };

  useEffect(() => {
    if (cuocGoiByKhachHangId) {
      setRows(cuocGoiByKhachHangId);
    }
  }, [cuocGoiByKhachHangId]);
  useEffect(() => {
    if (lichHenByKhachHangTiemNangId) {
      setRowLichHen(lichHenByKhachHangTiemNangId);
    }
  }, [lichHenByKhachHangTiemNangId]);
  useEffect(() => {
    if (nhiemVuByKhachHangTiemNangId) {
      setRowNhiemVu(nhiemVuByKhachHangTiemNangId);
    }
  }, [nhiemVuByKhachHangTiemNangId]);
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
            sx={{ marginLeft: 1 }}
            startIcon={<TodayIcon />}
            onClick={handleOpenModalAddLichHen}
          >
            Thêm lịch hẹn
          </Button>
          {/* <Button
            variant="outlined"
            color="error"
            sx={{ marginLeft: 1 }}
            startIcon={<PermContactCalendarIcon />}
            onClick={handleOpenModalAddNhiemVu}
          >
            Thêm nhiệm vụ
          </Button> */}

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

                  <Tab label="Lịch hẹn" value="2" />
                  <Tab label="Nhiệm vụ" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <CustomDatagrid
                  rows={rows}
                  columns={columnsCuocGoi}
                  pageSizeOptions={[10, 25, 50]}
                  initialPageSize={25}
                  checkboxSelection={true}
                  showTopToolbar={true}
                  onRowSelectionChange={handleRowCuocGoiSelectionChange}
                />
              </TabPanel>
              <TabPanel value="2">
                <div>
                  <CustomDatagrid
                    rows={rowLichHen}
                    columns={columnsLichHen}
                    pageSizeOptions={[10, 25, 50]}
                    initialPageSize={25}
                    checkboxSelection={true}
                    showTopToolbar={true}
                    onRowSelectionChange={handleRowLichHenSelectionChange}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div>
                  <CustomDatagrid
                    rows={rowNhiemVu}
                    columns={columnsNhiemVu}
                    pageSizeOptions={[10, 25, 50]}
                    initialPageSize={25}
                    checkboxSelection={true}
                    showTopToolbar={true}
                    onRowSelectionChange={handleRowNhiemVuSelectionChange}
                  />
                </div>
              </TabPanel>
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
          refetch={refetch}
        />
        {/* Modal update cuộc gọi  */}
        <ModalUpdateCuocGoi
          selectedItem={selectedRowCuocGoi}
          closeModal={onCloseModalUpdateCuocGoi}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalUpdateCuocGoi}
          setLoading={setIsLoading}
          refetch={refetch}
        />
        {/* Modal add Lịch hẹn */}
        <ModalAddLichHen
          selectedItem={selectedRowLichHen}
          closeModal={handleCloseModalAddLichHen}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalAddLichHen}
          setLoading={setIsLoading}
          refetch={isLichHenRefetch}
        />
        {/* Modal update lịch hẹn  */}
        <ModalUpdateLichHen
          selectedItem={selectedRowLichHen}
          closeModal={handleCloseModalUpdateLichHen}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalUpdataLichHen}
          setLoading={setIsLoading}
          refetch={isLichHenRefetch}
        />
        {/* modal add nhiệm vụ */}
        <ModalAddNhiemVu
          selectedItem={selectedRowNhiemVu}
          closeModal={handleCloseModalAddNhiemVu}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          showModal={modalAddNhiemVu}
          setLoading={setIsLoading}
          refetch={isNhiemVuRefetch}
        />
        {/* modal update nhiệm vụ */}
        <ModalUpdateNhiemVu
           selectedItem={selectedRowNhiemVu}
           closeModal={handleCloseModalUpdateNhiemVu}
           typeModal={typeModal}
           setTypeModal={setTypeModal}
           showModal={modalUpdateNhiemVu}
           setLoading={setIsLoading}
           refetch={isNhiemVuRefetch}
        />
      </Grid2>
    </>
  );
};

export default CongViecThucHienTab;
