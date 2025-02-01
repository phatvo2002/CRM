namespace CRM.Entities
{
    public class CoHoi : BaseNguoiDung
    {
        public string? Id { get; set; }
        public string? TenCoHoi { get; set; }
        public decimal? SoTien { get; set; }
        public int? TiLeThanhCong {  get; set; }
        public decimal? DoanhSoKyVong { get; set; }
        public DateTime? NgayKyVongKetThuc { get; set; }
        public string? MaKhachHang { get; set; }
        public string? MaLienHe {  get; set; }
        public int? MaLoaiHangHoa { get; set; }
        public int? MaLoaiCoHoi { get; set; }
        public Guid? MaGiaiDoanBanHang { get; set; }
        public int? MaNguonGocKhachHang { get; set; }
        public string? DiaChi {  get; set; }
        public DateTime? DeleteAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public virtual LoaiCoHoi? LoaiCoHoi { get; set; }
        public virtual LoaiHangHoa? LoaiHangHoa { get; set; }
        public virtual KhachHangMucTieu? KhachHangMucTieu { get; set; }
        public virtual LienHe? LienHe{ get; set; }
        public virtual GiaiDoanBanHang? GiaiDoanBanHang { get; set; }
        public virtual NguonGocKhachHang? NguonGocKhachHang { get; set; }
        public virtual ChiTietKetQua? ChiTietKetQua { get; set; }

        public virtual ICollection<BaoGia> BaoGias { get; set; } = new List<BaoGia>();
    }
}
