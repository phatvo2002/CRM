using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace CRM.Repositories.Menus
{
    public class MenuRepository : IMenuRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;

        public MenuRepository(CrmDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ResultModal> AddMenu(MenuModel modal)
        {

            var db = _context.Menus.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db != null)
                {
                    return new ResultModal() { Message = "Menu đã tồn tại trong hệ thống", Status = 202, Success = false };
                }
                else
                {
                    Menu menu = new Menu();
                    menu.Id = Guid.NewGuid();
                    menu.Name = modal.Name;
                    menu.Url = modal.Url;
                    menu.Icon = modal.Icon;
                    menu.OrderNumber = modal.OrderNumber;
                    menu.IsActive = modal.IsActive;
                    menu.ParentId = modal.ParentId; 
                    _context.Menus.Add(menu);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Message = "Tạo menu thành công", Status = 200, Success = true };
                }

            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.Message, Status = 500, Success = false };
            }
        }

        public async Task<ResultModal> DeleteMenu(Guid id)
        {

            var db = _context.Menus.Where(e => e.Id == id).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    _context.Menus.Remove(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Message = "xóa thành công", Status = 200, Success = false };
                }
                else
                {
                    return new ResultModal() { Message = "Không tìm thấy dữ liệu", Status = 200, Success = false };

                }
            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.Message, Status = 500, Success = false };
            }

        }

        public async Task<List<MenuDTO>> GetAllMenu(Guid groupId)
        {
            var data = await _context.Menus.AsNoTracking()
                                                         .Include(r=> r.MenuChildrent)
                                                         .Include(r=> r.MenuRoles
                                                         .Where(m => m.GroupId == groupId))
                                                         .OrderBy(r => r.OrderNumber).ToListAsync();
            return _mapper.Map<List<MenuDTO>>(data);
        }

        public async Task<List<MenuDTO>> GetAllMenuParent()
        {
            var data = await _context.Menus.AsNoTracking()
                                           .Where(r => r.ParentId == null)
                                           .OrderBy(r => r.OrderNumber)
                                           .ToArrayAsync();
            return _mapper.Map<List<MenuDTO>>(data);
        }

        public async Task<List<MenuRoleDTO>> GetAllMenuRole(Guid Id)
        {
            var result = await _context.MenuRoles.Where(r => r.GroupId == Id)
                                                 .AsNoTracking()
                                                 .Include(r => r.Menu)
                                                 .OrderBy(p => p.Menu.OrderNumber)
                                                 .ToListAsync();
            return _mapper.Map<List<MenuRoleDTO>>(result);
        }

        public Task<MenuDTO> GetMenuById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ResultModal> UpdateGroup(GroupModel model)
        {
            var data = _context.ChucVus.AsNoTracking().FirstOrDefault(r => r.Id == model.Oid);
            var menugroup = await _context.MenuRoles.Where(r => r.GroupId == model.Oid).ToListAsync();
            try {
                if (data != null)
                {
                    _context.MenuRoles.RemoveRange(menugroup);
                    await _context.SaveChangesAsync();
                    foreach (var item in model.Menu)
                    {
                        var tracked = _context.ChangeTracker.Entries<MenuRole>()
                            .FirstOrDefault(e => e.Entity.MenuId == item.Menu && e.Entity.GroupId == model.Oid);

                        if (tracked != null)
                        {
                            _context.Entry(tracked.Entity).State = EntityState.Detached;
                        }

                        _context.MenuRoles.Add(new MenuRole
                        {
                            GroupId = model.Oid,
                            MenuId = item.Menu,
                            Xem = item.Xem,
                            Them = item.Them,
                            Sua = item.Sua,
                            Xoa = item.Xoa
                        });
                    }
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Lỗi", Success = false };
            } catch(Exception ex) {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
           
        }

        public async Task<ResultModal> UpdateMenu(MenuModel model)
        {
            var data = _context.Menus.FirstOrDefault(r => r.Id == model.Id);
            try
            {
                if (data != null)
                {
                    data.Name = model.Name;
                    data.OrderNumber = model.OrderNumber;
                    data.Url = model.Url;
                    data.Icon = model.Icon;
                    data.IsActive = model.IsActive;
                    data.ParentId = model.ParentId;
                    _context.Menus.Update(data);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 202, Message = ex.Message, Success = false };
            }

        }
    }
}
