using CRM.Entities;
using CRM.Helper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace CRM.Services.Automations
{
    public class AutomationServices : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IHubContext<NotificationHub> _hubContext;

        public AutomationServices(IServiceScopeFactory scopeFactory, IHubContext<NotificationHub> hubContext)
        {
            _scopeFactory = scopeFactory;
            _hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    AutomationSendMailTask();
                    AutoMationUpdateTask();
                    AutoMationSendBirthDay();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Đã có lỗi xảy ra: {ex.Message}");
                }
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
        private async void AutomationSendMailTask()
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                TimeZoneInfo vnTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime vnNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vnTimeZone);
                var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
                // Tìm các nhiệm vụ đang trong trạng thái đang thực hiện
                var nhiemVus = dbContext.NhiemVus
                .AsNoTracking()
                 .Where(r =>
                (r.TrangThaiThucHienId == Guid.Parse("DC08A44C-6A39-426F-89C2-C6068C248573") || r.TrangThaiThucHienId == Guid.Parse("9027DBA4-EDE1-4701-BE0D-95B9820B2A4B")) &&
                r.HanHoanThanh.HasValue &&
                vnNow >= r.HanHoanThanh.Value.AddMinutes(-10) &&
                vnNow < r.HanHoanThanh.Value && r.IsGuiMail == false
                    )
            .Include(r => r.Nguoidung).ToList();
                var dbAdmin = await dbContext.Nguoidungs.FirstOrDefaultAsync(r => r.Id == Guid.Parse("0E7FDE09-09F3-48F2-9205-E9E5201ACB0B"));
                foreach (var r in nhiemVus)
                {
                    // Gửi mail cho những nhiệm vụ sắp hết hạn
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
                        r.IsGuiMail = true;
                        dbContext.NhiemVus.Update(r);
                        await dbContext.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                    }
                }



            }

        }

        private async void AutoMationUpdateTask()
        {
            TimeZoneInfo vnTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            DateTime vnNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vnTimeZone);
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
                // tìm các nhiệm vụ mà đang ở trạng thái đang thực hiện mà chưa hoàn thành;
                var nhiemVuData = dbContext.NhiemVus.Where(r => r.TrangThaiThucHienId == Guid.Parse("DC08A44C-6A39-426F-89C2-C6068C248573") || r.TrangThaiThucHienId == Guid.Parse("9027DBA4-EDE1-4701-BE0D-95B9820B2A4B"))
                                .Include(r => r.Nguoidung).ToList();

                foreach (var r in nhiemVuData)
                {
                    // cập nhật trạng thái khi hết hạn nhiệm vụ
                    if (r.HanHoanThanh <= vnNow)
                    {
                        r.TrangThaiThucHienId = Guid.Parse("37C9945B-2397-411A-A426-6E3A174BC271");
                        dbContext.NhiemVus.Update(r);
                        await _hubContext.Clients.User(r.Nguoidung?.Id.ToString())
                        .SendAsync("ReceiveNotification", $"Nhiệm vụ {r.TieuDe} đã hết hạn");
                    }
                }
                await dbContext.SaveChangesAsync();

            }
        }

        private async void AutoMationSendBirthDay()
        {
            TimeZoneInfo vnTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            DateTime vnNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vnTimeZone);
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
                var dbKhachHang = await dbContext.KhachHangMucTieus
                 .Where(r => r.NgayThanhLap.HasValue && r.NgayThanhLap.Value.Day == vnNow.Day && r.NgayThanhLap.Value.Month == vnNow.Month && (r.NamGuiMailSinhNhat == null || r.NamGuiMailSinhNhat < vnNow.Year))
                 .ToListAsync();
                var dbAdmin = await dbContext.Nguoidungs.FirstOrDefaultAsync(r => r.Id == Guid.Parse("0E7FDE09-09F3-48F2-9205-E9E5201ACB0B"));
                foreach (var r in dbKhachHang)
                {
                    // Gửi mail cho những nhiệm vụ sắp hết hạn
                    var htmlContent = $@"
                   <html>
                     <head>
                       <meta charset=""UTF-8"">
                        <title>Chúc mừng sinh nhật</title>
                    </head>
                       <body style=""font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 0; margin: 0;"">
                       <table align=""center"" width=""100%"" style=""max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);"">
                      <tr>
                       <td style=""background-color: #FF6B6B; color: white; text-align: center; padding: 20px 0;"">
                        <h1 style=""margin: 0;"">🎉 Chúc Mừng Sinh Nhật Bạn {r.TenKhachHang} ! 🎉</h1>
                   </td>
                     </tr>
                        <tr>
                          <td style=""padding: 30px;"">
                          <p style=""font-size: 16px;"">Xin chào <strong>{r.TenKhachHang}</strong>,</p>
                          <p style=""font-size: 16px;"">
                                 Nhân dịp sinh nhật của bạn, chúng tôi xin gửi đến bạn những lời chúc tốt đẹp nhất. Chúc bạn có một ngày thật vui vẻ, hạnh phúc và tràn đầy năng lượng tích cực!
                          </p>
                         <p style=""font-size: 16px;"">
                       Cảm ơn bạn đã đồng hành cùng chúng tôi trong suốt thời gian qua.
                     </p>
                   <div style=""text-align: center; margin: 30px 0;"">
                   <img src=""https://cdn.pixabay.com/photo/2021/01/16/07/15/birthday-5921281_960_720.png"" alt=""Happy Birthday"" style=""max-width: 100%; height: auto; border-radius: 8px;"">
                          </div>
                                    <p style=""font-size: 16px; text-align: center;"">🎂 Chúc mừng sinh nhật! 🎁</p>
                               <p style=""font-size: 16px;"">Trân trọng,<br><strong>Đội ngũ Công ty LP</strong></p>
                                 </td>
                               </tr>
                           <tr>
                             <td style=""background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #666;"">
                                   © 2025 Công ty LP. Mọi quyền được bảo lưu.
                              </td>
                             </tr>
                           </table>
                         </body>
                  </html>";
                    try
                    {

                        var mailMessage = new MailMessage();
                        mailMessage.From = new MailAddress(dbAdmin.Email);
                        mailMessage.To.Add(r?.Email);
                        mailMessage.Subject = $"Thư chúc mừng sinh nhật từ công ty LP ";
                        mailMessage.Body = htmlContent;
                        mailMessage.IsBodyHtml = true;
                        using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                        {
                            smtpClient.EnableSsl = true;
                            smtpClient.Credentials = new NetworkCredential(dbAdmin.Email, dbAdmin.Password);
                            await smtpClient.SendMailAsync(mailMessage);
                        }

                        r.NamGuiMailSinhNhat = vnNow.Year;
                        dbContext.KhachHangMucTieus.Update(r);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Lỗi khi gửi email: {ex.Message}");
                    }
                }
                await dbContext.SaveChangesAsync();
            }
        }




    }
}
