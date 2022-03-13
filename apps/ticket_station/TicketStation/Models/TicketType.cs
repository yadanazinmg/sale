using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation.Models
{
    public class TicketType
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("duration_min")]
        public int DurationMin { get; set; }

        [JsonProperty("price")]
        public int Price { get; set; }
    }
}
