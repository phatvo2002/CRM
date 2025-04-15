using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.HangHoaQuanTams;
using CRM.Repositories.MucTieuDoanhSos;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Globalization;
using System.Net;
using System.Net.Mail;

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
                               <td>{ct.SoLuong}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.DonGia)}</td>
                               <td>{string.Format(new CultureInfo("vi-VN"), "{0:N0} đ", ct.ThanhTien)}</td>
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
                          <p>Giá trị đơn hàng : {db.GiaTriDonHang.ToString("N0", new CultureInfo("vi-VN")) + " đ"}</p>
                          <p style={{text-align : center}}>Cảm ơn bạn đã đặt hàng thông qua hệ thống của chúng tôi</p>
                          <p style={{text-align : center}}>Xin chào {(db.KhachHangMucTieu.TenKhachHang != "" ? db.KhachHangMucTieu.TenKhachHang : "")}
                                    , Bạn vui lòng kiểm tra thông tin chi tiết đơn hàng và nhấn nút xác nhận để xác nhận nếu bạn đồng ý với mức giá của chúng tôi.</p>
                          <p>{request.Body}</p>
                          <p>Bấm vào nút dưới đây để xem chi tiết đơn đặt hàng:</p>
                          <a href='http://localhost:3000/donhang/chitietdonhang/{donHangId}' class='button'>Xem chi tiết đơn hàng</a>
                     </div>
                       <div> 
                     <table>
                       <tr style={{margin-top:10px}}>
                       <th style={{margin-left:15px}}>Tên sản phầm</th>
                       <th style={{margin-left:15px}}>Số lượng</th>
                       <th style={{margin-left:15px}}>Đơn giá</th>
                       <th style={{margin-left:15px}}>Thành tiền</th>
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
                    if (db.KhachHangMucTieu.Email != null || db.KhachHangMucTieu.Email != "")
                    {
                        mail.To.Add(MailboxAddress.Parse(db.KhachHangMucTieu.Email));
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

        public Task SendMailBaoGiaAsync(MailRequest request, string Email, string Password, Guid baoGiaId, Guid nguoiDungId, Guid phongBanId)
        {
            throw new NotImplementedException();
        }
    }

    public class SendMailAutoMation : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public SendMailAutoMation(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            TimeZoneInfo vnTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            DateTime vnNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vnTimeZone);
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _scopeFactory.CreateScope())
                    {
                        var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
                        var dbAdmin = await dbContext.Nguoidungs.FirstOrDefaultAsync(r => r.Id == Guid.Parse("0E7FDE09-09F3-48F2-9205-E9E5201ACB0B"));
                        var nhiemVus = dbContext.NhiemVus
                    .AsNoTracking()
                    .Where(r =>
                        r.TrangThaiThucHienId == Guid.Parse("DC08A44C-6A39-426F-89C2-C6068C248573") &&
                        r.HanHoanThanh.HasValue &&
                        vnNow >= r.HanHoanThanh.Value.AddMinutes(-30) &&
                        vnNow < r.HanHoanThanh.Value
                    )
                    .Include(r => r.Nguoidung).ToList();

                        foreach (var r in nhiemVus)
                        {
                            try
                            {
                                var mailMessage = new MailMessage();
                                mailMessage.From = new MailAddress(dbAdmin.Email);
                                mailMessage.To.Add(r.Nguoidung.Email);
                                mailMessage.Subject = "Cảnh báo nhiệm vụ sắp hết hạn";
                                mailMessage.Body = $"Nhiệm vụ \"{r.TieuDe}\" sẽ hết hạn lúc {r.HanHoanThanh.Value:HH:mm dd/MM/yyyy}. Vui lòng kiểm tra.";
                                using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                                {
                                    smtpClient.EnableSsl = true;
                                    smtpClient.Credentials = new NetworkCredential(dbAdmin.Email, dbAdmin.Password);

                                    await smtpClient.SendMailAsync(mailMessage);
                                }
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                }
                await Task.Delay(TimeSpan.FromMinutes(30), stoppingToken);
            }
        }
    }

}
