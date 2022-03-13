using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation.Models
{
    [JsonObject("TicketRecordCreateManyInput")]
    public class TicketRecord
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("ticket_type_id")]
        public string TicketTypeId { get; set; }

        [JsonProperty("ticket_station_id")]
        public string TicketStationId { get; set; }

        [JsonProperty("duration_min")]
        public int DurationMin { get; set; }

        [JsonProperty("ticket_price")]
        public int TicketPrice { get; set; }

        [JsonProperty("total_price")]
        public int TotalPrice { get; set; }

        //
        [JsonProperty("entry_operator_id")]
        public string EntryOperatorId { get; set; }

        [JsonProperty("entry_operator_name")]
        public string EntryOperatorName { get; set; }

        [JsonProperty("group_ticket_code")]
        public string? GroupTicketCode { get; set; }
    }
}
