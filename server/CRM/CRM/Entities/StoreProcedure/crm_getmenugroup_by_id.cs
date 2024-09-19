using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRM.Entities.StoreProcedure
{
    public class crm_getmenugroup_by_id
    {
        [Key]
        [Column("MenuId")]
        public Guid GroupId { get; set; }
        public Guid MenuId { get; set; }
        public bool Xem {  get; set; }
        public bool Them { get; set; }
        public bool Sua { get; set; }
        public bool Xoa { get; set; }
    }
}
