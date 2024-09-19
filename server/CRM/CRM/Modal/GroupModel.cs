namespace CRM.Modal
{
    public class GroupModel
    {
        public Guid Oid { get; set; }
        public List<Guid>? Menu { get; set; }
        public bool Xem { get; set; } = true;
        public bool Them { get; set; } = true;
        public bool Sua { get; set; } = true;
        public bool Xoa { get; set; } = true;

    }
}
