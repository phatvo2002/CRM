using CRM.Entities;
using CRM.Entities.StoreProcedure;
using CRM.Filters;
using CRM.Repositories.ChucVus;
using CRM.Repositories.CuocGois;
using CRM.Repositories.DonViTinhs;
using CRM.Repositories.GetDatas;
using CRM.Repositories.HangHoaQuanTams;
using CRM.Repositories.HangHoas;
using CRM.Repositories.KhachHangTiemNangs;
using CRM.Repositories.LichHens;
using CRM.Repositories.LienHes;
using CRM.Repositories.LoaiHangHoas;
using CRM.Repositories.Menus;
using CRM.Repositories.NguoiDungs;
using CRM.Repositories.NhiemVus;
using CRM.Repositories.PhongBans;
using CRM.Repositories.TinhTrangs;
using CRM.Services.ChucVus;
using CRM.Services.CuocGois;
using CRM.Services.DonViTinhs;
using CRM.Services.GetDatas;
using CRM.Services.HangHoaQuanTams;
using CRM.Services.HangHoas;
using CRM.Services.KhahHangTiemNangs;
using CRM.Services.LichHens;
using CRM.Services.LienHes;
using CRM.Services.LoaiHangHoas;
using CRM.Services.Menus;
using CRM.Services.NguoiDungs;
using CRM.Services.NhiemVus;
using CRM.Services.PhongBans;
using CRM.Services.TinhTrangs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.MSSqlServer;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);


var settings = builder.Configuration
                .GetRequiredSection("ConnectionStrings");

builder.Services.AddDbContext<CrmDbContext>(options =>
        options.UseSqlServer(settings["DefaultConnection"]));

builder.Services.AddDbContext<AppCrmContext>(options =>
        options.UseSqlServer(settings["DefaultConnection"]));

var logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.MSSqlServer(
        connectionString: settings["DefaultConnection"],
        sinkOptions: new MSSqlServerSinkOptions
        {
            TableName = "Logs",
            AutoCreateSqlTable = true
        })
    .CreateLogger();

builder.Host.UseSerilog(logger);
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

builder.Services.AddScoped<ILienHeServices, LienHeService>();
builder.Services.AddScoped<JwtAuthorizeFilter>();

builder.Services.AddScoped<IHangHoaQuanTamRepository, HangHoaQuanTamRepository>();
builder.Services.AddScoped<IHangHoaQuanTamServices, HangHoaQuanTamServices>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<JwtAuthorizeFilter>();

builder.Services.AddHttpContextAccessor();
// Đăng ký dịch vụ phân quyền
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});
builder.Services.AddCors(options => options.AddPolicy("Cors", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));



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
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"));
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
