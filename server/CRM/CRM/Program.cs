using CRM;
using CRM.Entities;
using CRM.Entities.StoreProcedure;
using CRM.Filters;
using CRM.Helper;
using CRM.Repositories;
using CRM.Repositories.Interfaces;
using CRM.Services;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog.Events;
using Serilog.Sinks.MSSqlServer;
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
builder.Services.AddScoped<IUserServices ,UserServices>();

builder.Services.AddScoped<IChucVuRepository, ChucVuRepository>();
builder.Services.AddScoped<IChucVuServices ,ChucVuServices>();


builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IMenuServices, MenuServices>();

builder.Services.AddScoped<ITinhTrangRepository, TinhTrangRepository>();
builder.Services.AddScoped<ITinhTrangServices, TinhTrangServices>();

builder.Services.AddScoped<IPhongBanRepository, PhongBanRepository>();
builder.Services.AddScoped<IPhongBanServices, PhongBanServices>();


builder.Services.AddScoped<JwtAuthorizeFilter>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<JwtAuthorizeFilter>();

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
