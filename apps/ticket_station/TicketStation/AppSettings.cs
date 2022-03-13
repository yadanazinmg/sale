using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation
{
    internal class AppSettings
    {
        static AppSettings()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json").Build();


            var section = config.GetSection("DataAPIURL");
            DataAPIURL = section.Get<string>();

            section = config.GetSection("TicketStationId");
            TicketStationId = section.Get<string>();
        }
        public static string DataAPIURL { get; }
        public static string TicketStationId { get; }
    }
}
