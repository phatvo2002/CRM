using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.HangHoaQuanTams;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;

namespace CRM.Repositories.Mails
{
    public class MailRepository : IMailRepository
    {
        private readonly MailSettings _mailSettings;
        private readonly CrmDbContext _context;
        private readonly IHangHoaQuanTamRepository _hangHoaQuanTamRepository;
        public MailRepository(IOptions<MailSettings> mailSettings, CrmDbContext context, IHangHoaQuanTamRepository hangHoaQuanTamRepository)
        {
            _mailSettings = mailSettings.Value;
            _context = context;
            _hangHoaQuanTamRepository = hangHoaQuanTamRepository;
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
                               <td>{ct.SoLuong}</td>
                               <td>{ct.DonGia}đ</td>
                               <td>{ct.ThanhTien}đ</td>
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
                             .button {{ display: inline-block; padding: 10px 20px; background: #28a745; color: #fff; text-decoration: none; border-radius: 5px; }}
                        </style>
                       </head>
                   <body>
                        <div class='container'>
                           <div class='header'>
                              <h2>Từ LPCRM</h2>
                       </div>
                      <div class='content'>
                          <p>Đơn hàng số : {db.MaQuanLy}</p>
                          <p>Giá trị đơn hàng : {db.GiaTriDonHang}</p>
                          <p style={{text-align : center}}>Cảm ơn bạn đã đặt hàng thông qua hệ thống của chúng tôi</p>
                          <p style={{text-align : center}}>Xin chào {(db.KhachHangMucTieu.TenKhachHang != "" ? db.KhachHangMucTieu.TenKhachHang : "")}, đơn đặt hàng của bạn đã sẵn sàng để vận chuyển , chúng tôi sẽ cho bạn biết ngay khi nó dii chuyển đến vị trí của bạn</p>
                          <p>{request.Body}</p>
                          <p>Bấm vào nút dưới đây để xem chi tiết đơn đặt hàng:</p>
                          <a href='http://localhost:3000/donhang/chitietdonhang' class='button'>Xem chi tiết đơn hàng</a>
                     </div>
                       <div> 
                     <table>
                       <tr style={{margin-top:10px}}>
                       <th style={{margin-left:5px}}>Tên sản phầm</th>
                       <th style={{margin-left:5px}}>Số lượng</th>
                       <th style={{margin-left:5px}}>Đơn giá</th>
                       <th style={{margin-left:5px}}>Thành tiền</th>
                    </tr>
                      {chiTietSanPhamRows}
                     
                      </table>
                 </div>
                 <div>
                     <p>Thông tin giao hàng : {db.ThongTinHoaDon}</p>
                     <p>Địa chỉ giao hàng : {db.ThongTinGiaoHang}</p>
                 </div>
             <div class='footer'>
                <p>&copy; {DateTime.Now.Year} LPCRM. Mọi quyền được bảo lưu.</p>
            </div>
                  </div>
                </body>
                  </html>";
                    var mail = new MimeMessage();
                    mail.Sender = MailboxAddress.Parse(Email);
                    mail.To.Add(MailboxAddress.Parse(request.ToMail));
                    mail.Subject = $"Báo giá đơn hàng : {db.TenDonHang}";
                    var builder = new BodyBuilder();

                    builder.HtmlBody = htmlContent;
                    mail.Body = builder.ToMessageBody();
                    using var smtp = new MailKit.Net.Smtp.SmtpClient();
                    smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                    smtp.Authenticate(Email, Password);
                    await smtp.SendAsync(mail);
                    smtp.Disconnect(true);
                }

            }
            catch (Exception ex)
            {
                new Exception(ex.ToString());
            }
        }
    }
}
