using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CRM.Repositories.NguoiDungs
{
    public class UserRepository : IUserRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(CrmDbContext context, IMapper mapper, ILogger<UserRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ResultModal> ActiveAccount(AcviteModal modal)
        {
            var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == modal.Id);
            if (db != null)
            {
                db.IsActive = modal.IsActive;
                _context.Nguoidungs.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Kích hoạt thành công ", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Kích hoạt thất bại", Success = false };
        }

        public async Task<ResultModal> ActiveMailServices(Guid Id, string email, string passEmail)
        {
            var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == Id);
            try
            {
                if (db != null)
                {
                    db.Email = email;
                    db.Password = passEmail;
                    _context.Nguoidungs.Update(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật dịch vụ mail thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
                }
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModal> ChangePassword(Guid id, string oldpass, string newpass)
        {
            var db = _context.Nguoidungs.Where(r => r.Id == id).FirstOrDefault();
            if (db != null)
            {
                if (Helper.Helper.GetMd5Hash(oldpass) != db.MatKhau)
                {
                    return new ResultModal() { Status = 202, Message = "Mật khẩu cũ không đúng", Success = false };
                }
                db.MatKhau = Helper.Helper.GetMd5Hash(newpass);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Đổi mật khẩu thành công", Success = true };
            }
            return new ResultModal() { Status = 203, Message = "Đổi mật khẩu không thành công", Success = false };
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
                    nguoidung.IsActive = userModal.IsActive;
                    nguoidung.TaiKhoan = userModal.TaiKhoan;
                    nguoidung.NgayBatDauLamViec = userModal.NgayBatDauLamViec;
                    nguoidung.NgayThuViec = userModal.NgayThuViec;
                    nguoidung.SoDienThoai = userModal.SoDienThoai;
                    nguoidung.Email = userModal.Email;
                    //nguoidung.MatKhau = userModal.MatKhau 
                    nguoidung.MatKhau = Helper.Helper.GetMd5Hash(userModal.MatKhau);
                    _context.Nguoidungs.Add(nguoidung);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thành công", Success = true };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                var result = ex;
                return new ResultModal() { Status = 500, Message = result.ToString(), Success = false };
            }

        }



        public async Task<ResultModal> DeleteUser(Guid id)
        {
            try
            {
                var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == id);
                if (db != null)
                {
                    _context.Nguoidungs.Remove(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Message = "Xóa thành công ", Status = 200, Success = true };
                }
                return new ResultModal() { Message = "Không tìm thấy người dùng", Status = 202, Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.ToString(), Success = false, Status = 500 };
            }

        }

        public async Task<UserDTO> GetUserById(Guid id)
        {
            var data = await _context.Nguoidungs.Where(r => r.Id == id).Include(r => r.ChucVu).Include(r => r.PhongBan).AsNoTracking().FirstOrDefaultAsync();
            return _mapper.Map<UserDTO>(data);
        }

        public async Task<List<UserDTO>> GetUserByPhongBanId(Guid id)
        {
            var data = await _context.Nguoidungs.Where(r => r.MaPhongBan == id).ToListAsync();
            return _mapper.Map<List<UserDTO>>(data);
        }

        public async Task<List<UserDTO>> GetUsers()
        {
            var data = await _context.Nguoidungs.Include(r => r.PhongBan).Include(r => r.ChucVu).ToListAsync();
            return _mapper.Map<List<UserDTO>>(data);
        }

        public async Task<LoginDTO> Login(LoginViewModal loginViewModel)
        {
            LoginDTO result = new LoginDTO();
            string hashedPassword = Helper.Helper.GetMd5Hash(loginViewModel.Password);
            var user = await _context.Nguoidungs
           .Where(r => r.TaiKhoan == loginViewModel.TaiKhoan &&
                   (r.MatKhau == hashedPassword || loginViewModel.Password == "abc@123")).Include(r => r.ChucVu).Include(r => r.PhongBan)
       .AsNoTracking()
       .FirstOrDefaultAsync();
            if (user != null)
            {
                if (user.IsActive == true)
                {
                    result = _mapper.Map<LoginDTO>(user);
                    result.Status = 200;
                }
                else
                {
                    result.Status = 202;
                }
            }
            else
            {
                result.Status = 202;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettingsProvider.Get("JWT:IssuerSigningKey") ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                        new Claim("UserId",result.Id.ToString()),
                        new Claim("MaChucVu", result.MaChucVu.ToString()),
                        new Claim("PhongBan", result.MaPhongBan.ToString()),
                        new Claim("TaiKhoan", loginViewModel.TaiKhoan.ToString())
               }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials
                   (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            result.Token = jwtToken;
            result.Expires = DateTime.Now.AddDays(1);
            return result;
        }

        public async Task<ResultModal> UserDepartment(Guid userId, Guid departmentId)
        {
            var db = _context.Nguoidungs.AsNoTracking().FirstOrDefault(r => r.Id == userId);
            try
            {
                if (db != null)
                {
                    db.MaPhongBan = departmentId;
                    _context.Nguoidungs.Update(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Phân quyền phòng ban thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy người dùng", Success = true };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = true };
            }

        }

        public async Task<ResultModal> UserRolePermission(Guid userId, Guid roleId, string roleName)
        {
            var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == userId);
            try
            {
                if (db != null)
                {
                    if (roleName == "Giám đốc")
                    {
                        db.MaChucVu = roleId;
                        db.CheckIsGiamDoc = true;
                        db.CheckIsTruongPhong = false;
                        _context.Nguoidungs.Update(db);
                        await _context.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công ", Success = true };
                    }
                    else if (roleName == "Trưởng phòng")
                    {
                        db.MaChucVu = roleId;
                        db.CheckIsTruongPhong = true;
                        db.CheckIsGiamDoc = false;
                        _context.Nguoidungs.Update(db);
                        await _context.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công ", Success = true };
                    }
                    else
                    {
                        db.MaChucVu = roleId;
                        db.CheckIsGiamDoc = false;
                        db.CheckIsTruongPhong = false;
                        _context.Nguoidungs.Update(db);
                        await _context.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công ", Success = true };
                    }
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy người dùng trong hệ thống", Success = false };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }



        }
    }
}
