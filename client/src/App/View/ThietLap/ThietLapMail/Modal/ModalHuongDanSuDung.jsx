import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const ModalHuongDanSuDung = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"lg"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Hướng dẫn lấy mật khẩu từ tài khoản Gmail cá nhân"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
           <b>Các bước thực hiện</b>
           <p>Đăng nhâp tài khoản gmail của mình tại: https://myaccount.google.com</p>
           <p>Quá trình đăng nhập hoàn tất, thực hiện chọn mục “Bảo mật” bên trái.</p>
           <p>Tài đây thực hiện bật xác minh 2 bước (nếu đã bật thì bỏ qua bước này)</p>
           <img src={'https://wiki.nhanhoa.com/wp-content/uploads/2023/07/huong-dan-lay-mat-khau-ung-dung-mail-tren-tai-khoan-gmail-1.jpg'}/>
           <p>+ Tại giao diện này sẽ bắt bạn nhập lại mật khẩu Gmail lần nữa cũng như cung cấp số điện thoại đang sử dụng. Quá trình hoàn tất quay lại trang https://myaccount.google.com sẽ có thêm tùy chọn “Mật khẩu ứng dụng”</p>
           <img src={`https://wiki.nhanhoa.com/wp-content/uploads/2023/07/huong-dan-lay-mat-khau-ung-dung-mail-tren-tai-khoan-gmail-2.jpg`}/>
           <p>
           + Tại đây các bạn sẽ buộc phải nhập mật khẩu và mã khóa OTP lần nữa. Sau đó thực hiện tạo mật khẩu ứng dụng của mình với các tùy chọn lưu ý là: Thư và Máy tính dùng Windows như hình.

Tại đây các bạn sẽ buộc phải nhập mật khẩu và mã khóa OTP lần nữa. Sau đó thực hiện tạo mật khẩu ứng dụng của mình với các tùy chọn lưu ý là: Thư và Máy tính dùng Windows như hình.
           </p>
           <img src={`https://wiki.nhanhoa.com/wp-content/uploads/2023/07/huong-dan-lay-mat-khau-ung-dung-mail-tren-tai-khoan-gmail-3.jpg`}/>
          <p>
          Một đoạn mã gồm 16 ký tự như hình dưới sẽ xuất hiện, các bạn thực hiện lưu lại mã này. Đây chính là mật khẩu ứng dụng dùng cho dịch vụ mail trên tài khoản Gmail của các bạn
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};
