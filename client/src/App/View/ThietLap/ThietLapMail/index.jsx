import { Button, Grid2, IconButton } from "@mui/material";
import React, { useState } from "react";
import { ModalHuongDanSuDung } from "./Modal/ModalHuongDanSuDung";
import CardContent from "@mui/material/CardContent";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import { ModalThietLapMail } from "./Modal/ModalThietLapMail";
const index = () => {
  const [open, setOpen] = useState(false);
  const [modalMailService , setModalMailService] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenModalMailService = () => {
    setModalMailService(true);
  }
  const handleCloseModalMailService = () => {
    setModalMailService(false);
  }
  return (
    <>
      <Grid2 container spacing={2}>
        <h1>Thiết lập mail cá nhân</h1>
        <Grid2 size={12}>
          <p>Thiết lập mail để gửi dễ dàng</p>
          <p>
            Lưu ý : Việc sử dụng dữ liệu từ API của Google sẽ luôn tuân thủ
            chính sách dữ liệu của người dùng (
            <button
              onClick={() =>
                window.open(
                  "https://developers.google.com/terms/api-services-user-data-policy",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              google api services user data policy
            </button>
            )
          </p>
        </Grid2>
        <Grid2 size={12}>
          <Button onClick={handleClickOpen} variant="contained">
            Hướng dẫn sử dụng
          </Button>
        </Grid2>
        {/* modal */}
        <ModalHuongDanSuDung open={open} handleClose={handleClose} />
        <Grid2 size={3}>
          <CardContent
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
              textAlign: "center",
            }}
          >
            <Grid2>
              <IconButton sx={{ width: 10 }}>
                <MarkAsUnreadIcon fontSize="1rem"/>
              </IconButton>
            </Grid2>
            <Button size="small" sx={{ fontSize: "1.2rem" }} variant="outlined" onClick={()=>handleOpenModalMailService()}>
              Thiết lập
            </Button>
          </CardContent>
        </Grid2>
      </Grid2>
      {/* Modal thiết lập mail */}
      <ModalThietLapMail
        showModal={modalMailService}
        closeModal={handleCloseModalMailService}
      />
    </>
  );
};

export default index;
