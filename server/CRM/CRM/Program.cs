using CRM;
using CRM.Entities;
using CRM.Entities.StoreProcedure;
using CRM.Filters;
using CRM.Helper;
using CRM.Modal;
using CRM.Repositories.BaoCaos;
using CRM.Repositories.BaoGias;
using CRM.Repositories.ChiNhanhs;
using CRM.Repositories.ChucVus;
using CRM.Repositories.CoHois;
using CRM.Repositories.CuocGois;
using CRM.Repositories.DonHangs;
using CRM.Repositories.DonViTinhs;
using CRM.Repositories.GetDatas;
using CRM.Repositories.GiaiDoans;
using CRM.Repositories.HangHoaQuanTams;
using CRM.Repositories.HangHoas;
using CRM.Repositories.KhachhangMucTieus;
using CRM.Repositories.KhachHangTiemNangs;
using CRM.Repositories.Khaosats;
using CRM.Repositories.KPINhanViens;
using CRM.Repositories.LichHens;
using CRM.Repositories.LienHes;
using CRM.Repositories.LoaiDuBaos;
using CRM.Repositories.LoaiHangHoas;
using CRM.Repositories.MailDaGuis;
using CRM.Repositories.Mails;
using CRM.Repositories.Menus;
using CRM.Repositories.MucTieuDoanhSos;
using CRM.Repositories.NguoiDungs;
using CRM.Repositories.NhiemVus;
using CRM.Repositories.PhanLoaiDuBaos;
using CRM.Repositories.PhongBans;
using CRM.Repositories.ThongBaos;
using CRM.Repositories.TinhTrangs;
using CRM.Repositories.XepLoais;
using CRM.Services.Automations;
using CRM.Services.BaoCaos;
using CRM.Services.BaoGias;
using CRM.Services.ChiNhanhs;
using CRM.Services.ChucVus;
using CRM.Services.CoHois;
using CRM.Services.CuocGois;
using CRM.Services.DonHangs;
using CRM.Services.DonViTinhs;
using CRM.Services.GetDatas;
using CRM.Services.GIaiDoans;
using CRM.Services.HangHoaQuanTams;
using CRM.Services.HangHoas;
using CRM.Services.KhachHangMucTieus;
using CRM.Services.KhahHangTiemNangs;
using CRM.Services.KhaoSats;
using CRM.Services.KPINhanViens;
using CRM.Services.LichHens;
using CRM.Services.LienHes;
using CRM.Services.LoaiDuBaos;
using CRM.Services.LoaiHangHoas;
using CRM.Services.MailDaGuis;
using CRM.Services.Mails;
using CRM.Services.Menus;
using CRM.Services.MucTieuDoanhSos;
using CRM.Services.NguoiDungs;
using CRM.Services.NhiemVus;
using CRM.Services.PhanLoaiDuBaos;
using CRM.Services.PhongBans;
using CRM.Services.ThongBaos;
using CRM.Services.TinhTrangs;
using CRM.Services.XepLoais;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);


var settings = builder.Configuration
                .GetRequiredSection("ConnectionStrings");

builder.Services.AddDbContext<CrmDbContext>(options =>
        options.UseSqlServer(settings["DefaultConnection"]));

builder.Services.AddDbContext<AppCrmContext>(options =>
        options.UseSqlServer(settings["DefaultConnection"]));
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Error()
    .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Host.UseSerilog();

builder.Services.AddControllers()
       .AddJsonOptions(options =>
       {
           options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
       });
builder.Services.AddControllers();
// Add services to the container.
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserServices, UserServices>();

builder.Services.AddScoped<IChucVuRepository, ChucVuRepository>();
builder.Services.AddScoped<IChucVuServices, ChucVuServices>();


builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IMenuServices, MenuServices>();

builder.Services.AddScoped<ITinhTrangRepository, TinhTrangRepository>();
builder.Services.AddScoped<ITinhTrangServices, TinhTrangServices>();

builder.Services.AddScoped<IPhongBanRepository, PhongBanRepository>();
builder.Services.AddScoped<IPhongBanServices, PhongBanServices>();

builder.Services.AddScoped<IGetDataRepository, GetDataRepository>();
builder.Services.AddScoped<IGetDataServices, GetDataServices>();

builder.Services.AddScoped<IKhachHangTiemNangRepository, KhachHangTiemNangRepository>();
builder.Services.AddScoped<IKhachHangTiemNangServices, KhachHangTiemNangServices>();

builder.Services.AddScoped<ILichHenRepository, LichHenRepository>();
builder.Services.AddScoped<ILichHenServices, LichHenServices>();

builder.Services.AddScoped<INhiemVuRepository, NhiemVuRepository>();
builder.Services.AddScoped<INhiemVuServices, NhiemVuServices>();

builder.Services.AddScoped<ICuocGoiRepository, CuocGoiRepository>();
builder.Services.AddScoped<ICuocGoiServices, CuocGoiServices>();

builder.Services.AddScoped<ILoaiHangHoaRepository, LoaiHangHoaRepository>();
builder.Services.AddScoped<ILoaiHangHoaServices, LoaiHangHoaServices>();

builder.Services.AddScoped<IDonViTinhRepository, DonViTinhRepository>();
builder.Services.AddScoped<IDonViTinhServices, DonViTinhServices>();

builder.Services.AddScoped<IHangHoaRepository, HangHoaRepository>();
builder.Services.AddScoped<IHangHoaServices, HangHoaServices>();
builder.Services.AddScoped<ILienHeRepository, LienHeRepository>();
builder.Services.AddScoped<ILienHeServices, LienHeService>();

builder.Services.AddScoped<IKhachHangMucTieuRepository, KhachHangMucTieuRepository>();
builder.Services.AddScoped<IKhacHangMucTieuServices, KhachHangMucTieuServices>();

builder.Services.AddScoped<IHangHoaQuanTamRepository, HangHoaQuanTamRepository>();
builder.Services.AddScoped<IHangHoaQuanTamServices, HangHoaQuanTamServices>();


builder.Services.AddScoped<IGiaiDoanBanhangRepository, GiaiDoanBanHangRepository>();
builder.Services.AddScoped<IGiaiDoanBanHangServices, GiaiDoanBanHangServices>();

builder.Services.AddScoped<IThongBaoRepository, ThongBaoRepository>();
builder.Services.AddScoped<IThongBaoServices, ThongBaoServices>();

builder.Services.AddScoped<ILoaiDuBaoRepository, LoaiDuBaoRepository>();
builder.Services.AddScoped<ILoaiDuBaoServices, LoaiDuBaoServices>();

builder.Services.AddScoped<IPhanLoaiDuBaoRepository, PhanLoaiDuBaoRepository>();
builder.Services.AddScoped<IPhanLoaiDuBaoServices, PhanLoaiDuBaoServices>();

builder.Services.AddScoped<ILienHeServices, LienHeService>();

builder.Services.AddScoped<IMailRepository, MailRepository>();
builder.Services.AddScoped<IMailServices, MailServices>();

builder.Services.AddScoped<ICoHoiRepository, CoHoiRepository>();
builder.Services.AddScoped<ICoHoiServices, CoHoiServices>();

builder.Services.AddScoped<IBaoGiaRepository, BaoGiaRepository>();
builder.Services.AddScoped<IBaoGiaServices, BaoGiaServices>();

builder.Services.AddScoped<IDonHangRepository, DonHangRepository>();
builder.Services.AddScoped<IDonHangServices, DonHangServices>();

builder.Services.AddScoped<IMucTieuDoanhSoRepository, MucTieuDoanhSoRepository>();
builder.Services.AddScoped<IMucTieuDoanhSoServices, MucTieuDoanhSoServices>();

builder.Services.AddScoped<IKPINhanVienRepository, KPINhanVienRepository>();
builder.Services.AddScoped<IKPIServices, KPINhanVienServices>();

builder.Services.AddScoped<IXepLoaiRepository, XepLoaiRepository>();
builder.Services.AddScoped<IXepLoaiServices, XepLoaiServices>();

builder.Services.AddScoped<IMailDaGuiRepository, MailDaGuiRepository>();
builder.Services.AddScoped<IMailDaGuiServices, MailDaGuiServices>();

builder.Services.AddScoped<IBaoCaoRepository, BaoCaoRepository>();
builder.Services.AddScoped<IBaoCaoServices, BaoCaoServices>();

builder.Services.AddScoped<IKhaoSatRepository, KhaoSatRepository>();
builder.Services.AddScoped<IKhaoSatServices, KhaoSatServices>();

builder.Services.AddScoped<IChiNhanhRepository, ChiNhanhRepository>();
builder.Services.AddScoped<IChiNhanhServices, ChiNhanhServices>();

builder.Services.AddScoped<JwtAuthorizeFilter>();

builder.Services.AddHostedService<AutomationServices>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<JwtAuthorizeFilter>();


//builder.Services.AddAuthorization();
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

//});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.ASCII.GetBytes(AppSettingsProvider.Get("JWT:IssuerSigningKey") ?? "");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };

        // Đảm bảo SignalR lấy token từ query string cho WebSocket
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/notificationHub"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });


//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowSpecificOrigin", builder =>
//    {
//        builder
//            .WithOrigins("https://crm2024-sand.vercel.app")
//            .AllowAnyHeader()
//            .AllowAnyMethod()
//            .AllowCredentials();
//    });
//});
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowSpecificOrigin", builder =>
//    {
//        builder
//            .WithOrigins("*")
//            .AllowAnyHeader()
//            .AllowAnyMethod()
//            .AllowCredentials();
//    });
//});
builder.Services.AddSignalR();
builder.Services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();


builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "Phần mềm quản lý mối quan hệ khách hàng CRM APIs", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });

});
var app = builder.Build();



// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{


//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"));
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

// đăng ký dịch vụ signal R
app.MapHub<NotificationHub>("/notificationHub");

app.MapControllers();

app.Run();
