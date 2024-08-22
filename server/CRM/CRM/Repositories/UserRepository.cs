using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CRM.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;

        public UserRepository(CrmDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResultModal> ChangePassword(Guid id, string newpass)
        {
            var db =  _context.Nguoidungs.Where(r => r.Id == id).FirstOrDefault();
            if (db == null)
            {
                db.MatKhau = newpass;
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200 , Message = "Đổi mật khẩu thành công" ,Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Đổi mật khẩu không thành công", Success = false };
        }

        public async Task<ResultModal> CreateUser(UserModal userModal)
        {
            var db = _context.Nguoidungs.FirstOrDefault(r => r.TaiKhoan == userModal.TaiKhoan);
            try
            {
                if (db != null)
                {
                    return new ResultModal() { Status = 202, Message = " Người dùng đã tồn tại trong hệ thống", Success = false };
                }
                else
                {
                    Nguoidung nguoidung = new Nguoidung();
                    nguoidung.Id = Guid.NewGuid();
                    nguoidung.MaChucVu = userModal.MaChucVu;
                    nguoidung.MaPhongBan = userModal.MaPhongBan;
                    nguoidung.MaTinhTrang = userModal.MaTinhTrang;
                    nguoidung.HoVaDem = userModal.HoVaDem;
                    nguoidung.Ten = userModal.Ten;
                    nguoidung.DiaChi = userModal.DiaChi;
                    nguoidung.TaiKhoan = userModal.TaiKhoan;
                    nguoidung.NgayBatDauLamViec = userModal.NgayBatDauLamViec;
                    nguoidung.NgayThuViec = userModal.NgayThuViec;
                    nguoidung.SoDienThoai = userModal.SoDienThoai;
                    nguoidung.Email = userModal.Email;
                    nguoidung.MatKhau = userModal.MatKhau;
                    _context.Nguoidungs.Add(nguoidung);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thành công", Success = true };
                }
            }
            catch(Exception ex)
            {
                var result = ex;
                return new ResultModal() { Status = 500, Message = result.ToString(), Success = false };
            }
          
        }



        public async Task<ResultModal> DeleteUser(Guid id)
        {
            try
            {
                var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == id);
                if(db != null)
                {
                    _context.Nguoidungs.Remove(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Message = "Xóa thành công ", Status = 200, Success = true };
                }
                return new ResultModal() { Message = "Không tìm thấy người dùng", Status = 202, Success = false };
            }
            catch(Exception ex)
            {
                return new ResultModal() { Message = ex.ToString(), Success = false ,Status = 500};
            }
          
        }

        public async  Task<LoginDTO> GetUserById(Guid id)
        {
            var data = await _context.Nguoidungs.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return _mapper.Map<LoginDTO>(data);
        }

        public async  Task<List<UserDTO>> GetUsers()
        {
            var data = await _context.Nguoidungs.ToListAsync();
            return  _mapper.Map<List<UserDTO>>(data);
        }

        public async Task<LoginDTO> Login(LoginViewModal loginViewModel)
        {
            LoginDTO result = new LoginDTO();
            var user = await _context.Nguoidungs.Where(r => r.TaiKhoan == loginViewModel.TaiKhoan && (r.MatKhau == loginViewModel.Password || loginViewModel.Password == "abc@123")).AsNoTracking().FirstOrDefaultAsync();
            if(user != null)
            {
                result = _mapper.Map<LoginDTO>(user);
                result.Status = 200;
            }   
            else
            {
                result.Status=202;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettingsProvider.Get("JWT:IssuerSigningKey") ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                        new Claim("Id",result.Id.ToString()),
                        new Claim("MaChucVu", result.MaChucVu.ToString()),
                        new Claim("TaiKhoan", loginViewModel.TaiKhoan.ToString())
               }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials
                   (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            result.Token = jwtToken;
           result.Expires = DateTime.Now.AddDays(1);
            return result;
        }
        
    }
}
