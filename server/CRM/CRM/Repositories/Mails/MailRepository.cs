using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.HangHoaQuanTams;
using CRM.Repositories.MucTieuDoanhSos;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Globalization;

namespace CRM.Repositories.Mails
{
    public class MailRepository : IMailRepository
    {
        private readonly MailSettings _mailSettings;
        private readonly CrmDbContext _context;
        private readonly IHangHoaQuanTamRepository _hangHoaQuanTamRepository;
        private readonly IMucTieuDoanhSoRepository _mucTieuDoanhSoRepository;
        public MailRepository(IOptions<MailSettings> mailSettings, CrmDbContext context, IHangHoaQuanTamRepository hangHoaQuanTamRepository, IMucTieuDoanhSoRepository mucTieuDoanhSoRepository)
        {
            _mailSettings = mailSettings.Value;
            _context = context;
            _hangHoaQuanTamRepository = hangHoaQuanTamRepository;
            _mucTieuDoanhSoRepository = mucTieuDoanhSoRepository;
        }



        public async Task SendMailAsync(MailRequest request, string Email, string Password, Guid nguoiDungId, Guid PhongBanId)
        {
            var mail = new MimeMessage();
            mail.Sender = MailboxAddress.Parse(Email);
            mail.To.Add(MailboxAddress.Parse(request.ToMail));
            mail.Subject = request.Subject;
            var builder = new BodyBuilder();

            byte[] fileByte;
            if (request.AttachtMent != null && request.AttachtMent.Count > 0)
            {
                foreach (var file in request.AttachtMent)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileByte = ms.ToArray();
                        }
                        builder.Attachments.Add(file.Name, fileByte, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = request.Body;
            mail.Body = builder.ToMessageBody();
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(Email, Password);
            await smtp.SendAsync(mail);
            smtp.Disconnect(true);

            EmailDaGui emailDaGui = new EmailDaGui();
            emailDaGui.Id = Guid.NewGuid();
            emailDaGui.TieuDe = request.Subject;
            emailDaGui.DiaChiGui = Email;
            emailDaGui.DiaChiNhan = request.ToMail;
            emailDaGui.KhachHangTiemNangId = request.KhachHangTiemNangId;
            emailDaGui.KhachHangMucTieuId = request.KhachHangMucTieuId;
            emailDaGui.CreateAt = DateTime.Now;
            emailDaGui.NguoiDungId = nguoiDungId;
            emailDaGui.PhongBanId = PhongBanId;
            _context.EmailDaGuis.Add(emailDaGui);

            await _mucTieuDoanhSoRepository.UpdateMucTieuDoanhSoData(nguoiDungId, PhongBanId, 5, 0);

            await _context.SaveChangesAsync();
        }

        public async Task SendMailDonHangAsync(MailRequest request, string Email, string Password, Guid donHangId, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.DonHangs.Include(d => d.KhachHangMucTieu).FirstOrDefault(d => d.Id == donHangId);

            try
            {
                if (db != null)
                {
                    var hangHoaData = await _hangHoaQuanTamRepository.GetHangHoaQuanTamByDonHangid(donHangId);
                    string chiTietSanPhamRows = "";

                    foreach (var ct in hangHoaData)
                    {
                        chiTietSanPhamRows += $@"
                            <tr>
                               <td>{ct.TenHangHoa}</td>
                               <td>{ct.DonViTinh?.Name}</td>
                               <td>{ct.SoLuong}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.DonGia)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.ThanhTien)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.TienThue)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.TongTien)}</td>
                            </tr>";
                    }

                    var htmlContent = $@"
                    <html>
                       <head>
                        <style>
                              body {{ font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }}
                             .container {{ background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }}
                             .header {{ background-color: #007bff; color: white; padding: 10px; text-align: center; font-size: 20px; }}
                             .content {{ padding: 15px; line-height: 1.5; }}
                             .footer {{ margin-top: 20px; font-size: 12px; color: gray; text-align: center; }}
                             .button {{ display: inline-block; padding: 10px 20px; color: #fff; text-decoration: none; border-radius: 5px; }}
                        </style>
                       </head>
                   <body>
                        <div class='container'>
                           <div class='header'>
                              <h2>Từ LPCRM</h2>
                       </div>
                      <div class='content'>
                          <p> <b>Đơn hàng số</b> : {db.MaQuanLy}</p>
                          <p> <b>Giá trị đơn hàng</b> : {db.GiaTriDonHang.ToString("N0", new CultureInfo("vi-VN")) + " đ"}</p>
                          <p style={{text-align : center}}>Cảm ơn bạn đã đặt hàng thông qua hệ thống của chúng tôi</p>
                          <p style={{text-align : center}}>Xin chào {(db.KhachHangMucTieu.TenKhachHang != "" ? db.KhachHangMucTieu.TenKhachHang : "")}
                                    , Bạn vui lòng kiểm tra thông tin chi tiết đơn hàng và nhấn nút xác nhận để xác nhận nếu bạn đồng ý với mức giá của chúng tôi.</p>
                          <p>{request.Body}</p>
                          <p>Bấm vào nút dưới đây để xác nhân đơn hàng và xem chi tiết đơn đặt hàng :</p>
                          <a href='https://crm2024-sand.vercel.app/donhang/chitietdonhang/{donHangId}' class='button'>Xem chi tiết đơn hàng</a>
                     </div>
                       <div> 
                     <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse; width: 100%; margin: 20px 0;'>
                       <tr style={{margin-top:10px}}>
                       <th style={{margin-left:15px}}>Tên sản phầm</th>
                       <th style={{margin-left:15px}}>Đơn vị tính</th>
                       <th style={{margin-left:15px}}>Số lượng</th>
                       <th style={{margin-left:15px}}>Đơn giá</th>
                       <th style={{margin-left:15px}}>Thành tiền</th>
                       <th style={{margin-left:15px}}>Tiền thuế</th>
                       <th style={{margin-left:15px}}>Tổng tiền</th>
                    </tr>
                      {chiTietSanPhamRows}
                     
                      </table>
                 </div>
                 <div>
                    <h3>Phương thức thanh toán : {db.PhuongThucThanhToan}</h3>
                    
                 </div>
                 <div>
                     <p> <b>Thời hạn giao hàng </b>: {db.HanGiaoHang?.ToString("dd/MM/yyyy")}</p>
                     <p> <b>Thời hạn thanh toán</b>: {db.HanThanhToan?.ToString("dd/MM/yyyy")}</p>
                     <p> <b>Thông tin giao hàng</b> : {db.ThongTinHoaDon}</p>
                     <p> <b>Địa chỉ giao hàng</b> : {db.ThongTinGiaoHang}</p>
                 </div>
             <div class='footer'>
                <p>&copy; {DateTime.Now.Year} LPCRM. Mọi quyền được bảo lưu.</p>
            </div>
                  </div>
                </body>
                  </html>";
                    var mail = new MimeMessage();
                    mail.Sender = MailboxAddress.Parse(Email);
                    if (db.KhachHangMucTieu.Email != null || db.KhachHangMucTieu.Email != "")
                    {
                        mail.To.Add(MailboxAddress.Parse(db.KhachHangMucTieu.Email));
                        mail.Subject = $"Đơn hàng : {db.TenDonHang}";
                        var builder = new BodyBuilder();

                        builder.HtmlBody = htmlContent;
                        mail.Body = builder.ToMessageBody();
                        using var smtp = new MailKit.Net.Smtp.SmtpClient();
                        smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                        smtp.Authenticate(Email, Password);
                        await smtp.SendAsync(mail);
                        smtp.Disconnect(true);
                    }
                    else
                    {
                        new Exception("Email không tồn tại");
                    }

                }

            }
            catch (Exception ex)
            {
                new Exception(ex.ToString());
            }
        }

        public async Task SendMailBaoGiaAsync(MailRequest request, string Email, string Password, Guid baoGiaId, Guid nguoiDungId, Guid phongBanId)
        {
            var dataBaoGia = _context.BaoGias.AsNoTracking().Include(r => r.KhachHangMucTieu).FirstOrDefault(r => r.Id == baoGiaId);
            var dataNguoiDung = _context.Nguoidungs.AsNoTracking().Include(r => r.ChucVu).FirstOrDefault(r => r.Id == nguoiDungId);
            try
            {
                if (dataBaoGia != null)
                {
                    var hangHoaData = await _hangHoaQuanTamRepository.GetHangHoaQuanTamByBaoGiaId(baoGiaId);

                    string chiTietSanPhamRows = "";
                    int index = 0;
                    double tongTien = 0;
                    foreach (var ct in hangHoaData)
                    {
                        tongTien += (double)ct.TongTien;
                        chiTietSanPhamRows += $@"
                            <tr>
                               <td>{index++}</td>
                               <td>{ct.TenHangHoa}</td>
                               <td>{ct.DonViTinh?.Name}</td>
                               <td>{ct.SoLuong}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.DonGia)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.ThanhTien)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.TienThue)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.TongTien)}</td>
                            </tr>";
                    }
                    var htmlContent = $@"
<html>
  <body style='font-family: Arial, sans-serif; color: #333;'>
    <p>Kính gửi: <strong>{dataBaoGia?.KhachHangMucTieu?.TenKhachHang}</strong>,</p>

    <p>Cảm ơn Quý khách đã quan tâm đến sản phẩm/dịch vụ của chúng tôi. Chúng tôi xin gửi đến Quý khách bảng báo giá như sau:</p>

    <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse; width: 100%; margin: 20px 0;'>
      <thead style='background-color: #f2f2f2;'>
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Đơn vị tính</th>
          <th>Số lượng </th>
          <th>Đơn giá (VNĐ)</th>
          <th>Thành tiền (VNĐ)</th>
          <th>Thuể VAT</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
         {chiTietSanPhamRows}
      </tbody>
    </table>

    <p><strong>Tổng cộng: {string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", tongTien)}</strong></p>

    <p>
      👉 Để tiếp tục vui lòng quý khách nhấn nút xác nhận báo giá hoặc từ chối báo giá thông qua đường link : <a href=' https://crm2024-sand.vercel.app/XemBaoGia/{baoGiaId}'>
        https://crm2024-sand.vercel.app/XemBaoGia/{baoGiaId}
      </a>
    </p>
    <p> </p>
    <p>Trân trọng,</p>
    <p><strong>{dataNguoiDung?.HoVaDem}{dataNguoiDung?.Ten}</strong><br/>
    {dataNguoiDung?.ChucVu?.TenChucVu}<br/>
      <br/>
    📞 {dataNguoiDung?.SoDienThoai}<br/>
    📧 {dataNguoiDung?.Email}</p>
  </body>
</html>";
                    var mail = new MimeMessage();
                    mail.Sender = MailboxAddress.Parse(Email);
                    if (dataBaoGia?.KhachHangMucTieu?.Email != null)
                    {
                        mail.To.Add(MailboxAddress.Parse(dataBaoGia?.KhachHangMucTieu?.Email));
                        mail.Subject = $"Báo giá đơn hàng : {dataBaoGia?.TenBaoGia}";
                        var builder = new BodyBuilder();
                        builder.HtmlBody = htmlContent;
                        mail.Body = builder.ToMessageBody();
                        using var smtp = new MailKit.Net.Smtp.SmtpClient();
                        smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                        smtp.Authenticate(Email, Password);
                        await smtp.SendAsync(mail);
                        smtp.Disconnect(true);

                        await _mucTieuDoanhSoRepository.UpdateMucTieuDoanhSoData(nguoiDungId, phongBanId, 4, 0);
                    }
                    else
                    {

                        new Exception("Mail của khách hàng không tồn tại");
                    }
                }
            }
            catch (Exception ex)
            {
                new Exception(ex.ToString());
            }
        }
    }

}
