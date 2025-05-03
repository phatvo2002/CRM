using System.Xml.Serialization;

namespace CRM.DTO
{
    public class NguoiDungDTO
    {
        public Guid Id { get; set; }

        public string? HoVaDem { get; set; }
        public string? Ten { get; set; }
        public string? DiaChi { get; set; }
        public string? TaiKhoan { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        [XmlIgnore]
        public byte[]? HinhAnh { get; set; }
    }
}
