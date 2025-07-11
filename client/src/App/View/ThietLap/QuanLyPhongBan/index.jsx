import {
  Button,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ModalAddPhongBan from "./Modal/ModalAddPhongBan";
import { TYPE_MODAL } from "../../../Until/constant";
import ModalUpdatePhongBan from "./Modal/ModalUpdatePhongBan";
import {
  useDeletePhongBanMutation,
  useGetPhongBanQuery,
  useGetPhongbanQuery,
} from "../../../Api/Phongban";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Swal from "sweetalert2";
import NoImage from "src/App/Assets/image/no-image.png";
import ButtonCustom from "src/App/Components/CustomButton/ButtonCustom";
const QuanLyPhongban = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data: phongbanlist, refetch } = useGetPhongBanQuery();
  const [PhongBanDelete] = useDeletePhongBanMutation();

  const onOpenModalAddPhongBan = () => {
    setOpenModalAdd(true);
    setOpenmodal(false);
    setTypeModal(TYPE_MODAL.INSERT);
  };

  const onCloseModalAddPhongban = () => {
    setTypeModal("");
    setOpenModalAdd(false);
  };

  const onOpenModalUpdatePhongBan = () => {
    setOpenModalUpdate(true);
    setTypeModal(TYPE_MODAL.UPDATE);
  };

  const onCloseModalUpdatePhongBan = () => {
    setOpenModalUpdate(false);
    setTypeModal("");
  };

  const handleDeletePhongBan = async () => {
    Swal.fire({
      title: "Bạn có muốn xóa phòng ban này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await PhongBanDelete(selectedRow[0]?.id);
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const backLink = async () => {
    navigate(-1);
  };
  useEffect(() => {
    if (phongbanlist) {
      setRows(phongbanlist);
    }
  }, [phongbanlist]);
  const Row = ({ data }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow
          sx={{ "& > *": { borderBottom: "1px solid rgba(224, 224, 224, 1)" } }}
        >
          <TableCell
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            <Checkbox
              color="primary"
              checked={selectedRow?.id === data.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRow(data);
                } else {
                  setSelectedRow([]);
                }
              }}
            />
            <IconButton
              color="success"
              disabled={selectedRow == []}
              onClick={onOpenModalUpdatePhongBan}
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              color="error"
              disabled={selectedRow == []}
              onClick={onOpenModalUpdatePhongBan}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
          <TableCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            {data?.soThuTu}
          </TableCell>
          <TableCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            {data?.tenPhongBan}
          </TableCell>
          <TableCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            {data?.maQuanLy}
          </TableCell>
           <TableCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            {data?.chiNhanh?.tenChiNhanh}
          </TableCell>
          <TableCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              padding: "8px",
            }}
          >
            {data?.moTa}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Danh sách nhân viên
                </Typography>
                <Table
                  size="small"
                  aria-label="purchases"
                  sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                          width: "40px",
                        }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                          width: "100px",
                        }}
                      >
                        Hình ảnh
                      </TableCell>
                      <TableCell
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                          width: "200px",
                        }}
                      >
                        Họ và tên
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                          width: "150px",
                        }}
                      >
                        Chức vụ
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                          width: "200px",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderRight: "1px solid rgba(224, 224, 224, 1)",
                          width: "200px",
                        }}
                      >
                        Địa chỉ
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.nguoidung.map((item2, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "& > *": {
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        ></TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {item2?.hinhAnh == "" ? (
                            <div>
                              <img
                                src={NoImage}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  margin: "0 auto",
                                  display: "block",
                                }}
                              />
                            </div>
                          ) : (
                            <div>
                              <img
                                src={"data:image/jpeg;base64," + item2?.hinhAnh}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  margin: "0 auto",
                                  display: "block",
                                }}
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {`${item2?.hoVaDem} ${item2?.ten}`}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {item2?.chucVu?.tenChucVu}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {item2?.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {item2?.diaChi}
                        </TableCell>
                          <TableCell
                          align="center"
                          sx={{
                            borderRight: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                     
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Container style={{ maxWidth: "100%" }}>
      <div style={{ width: "100%" }}>
        <h2>Danh Sách Phòng Ban</h2>
        <p>Đây là phần quản lý thông tin của các phòng ban trong công ty</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10px",
            margin: "10px 0",
          }}
        >
         <ButtonCustom handle={backLink}/>
          <Button
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={onOpenModalAddPhongBan}
          >
            {" "}
            <AddIcon></AddIcon> Thêm mới
          </Button>
        </div>

        {/* <CustomDatagrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialPageSize={25}
          checkboxSelection={true}
          showTopToolbar={true}
          onRowSelectionChange={handleRowSelectionChange}
        /> */}
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Thao tác</TableCell>
                <TableCell align="center">Số thứ tự</TableCell>
                <TableCell align="center">Tên phòng ban</TableCell>
                <TableCell align="center">Mã quản lý</TableCell>
                <TableCell align="center">Chi nhánh</TableCell>
                <TableCell align="center">Mô tả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.soThuTu} data={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <ModalThemSua openModal={openModal} selectedRow={selectedRow} closeModal={handelCloseModalThemSua} /> */}

      {/* Modal thêm chức vụ */}

      <ModalAddPhongBan
        selectedItem={selectedRow}
        closeModal={onCloseModalAddPhongban}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={openModalAdd}
        setLoading={setLoading}
        refetch={refetch}
      />
      <ModalUpdatePhongBan
        selectedItem={selectedRow}
        closeModal={onCloseModalUpdatePhongBan}
        typeModal={typeModal}
        setTypeModal={setTypeModal}
        showModal={openModalUpdate}
        setLoading={setLoading}
        refetch={refetch}
      />
    </Container>
  );
};

export default QuanLyPhongban;
