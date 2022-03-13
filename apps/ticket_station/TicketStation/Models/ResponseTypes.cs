using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation.Models
{
    public class GetUserResponseType
    {
        public List<User> Users { get; set; }
    }

    public class SignInResponseType
    {
        public SignIn? SignIn { get; set; }
    }

    public class TicketTypeResponseType
    {
        public List<TicketType> TicketTypes { get; set; }
    }

    public class CreateTicketResponseType
    {
        public int Count { get; set; }
    }

    public class TicketRecordQueryResponseType
    {
        public List<TicketRecord> TicketRecords { get; set; }
    }
}
