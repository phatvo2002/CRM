using CRM.Entities;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace CRM.Services.Automations
{
    public class AutomationServices : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public AutomationServices(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    AutomationSendMailTask();
                    AutoMationUpdateTask();
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
                r.TrangThaiThucHienId == Guid.Parse("DC08A44C-6A39-426F-89C2-C6068C248573") &&
                r.HanHoanThanh.HasValue &&
                vnNow >= r.HanHoanThanh.Value.AddMinutes(-30) &&
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
                var nhiemVuData = dbContext.NhiemVus.Where(r => r.TrangThaiThucHienId == Guid.Parse("DC08A44C-6A39-426F-89C2-C6068C248573")).ToList();

                foreach (var r in nhiemVuData)
                {
                    // cập nhật trạng thái khi hết hạn nhiệm vụ
                    if (r.HanHoanThanh == vnNow || r.HanHoanThanh <= vnNow)
                    {
                        r.TrangThaiThucHienId = Guid.Parse("06B2047E-4009-4080-81EF-928ECD061836");
                        dbContext.NhiemVus.Update(r);
                        await dbContext.SaveChangesAsync();
                    }
                }

            }
        }


    }
}
