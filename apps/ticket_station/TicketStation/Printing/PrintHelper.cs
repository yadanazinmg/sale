using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketStation.Models;

namespace TicketStation.Printing
{
    public static class PrintHelper
    {
        private static List<PrintLine> GetSlipHeader()
        {
            var printlines = new List<PrintLine>();
            printlines.Add(new PrintLine(null, "BE Fall Park"));
            printlines.Add(new PrintLine(null, "ပွဲကောက်ရေတံခွန် အပန်းဖြေစခန်း", ":", FontType.PyiHtaungSu));
            printlines.Add(new PrintLine(null, "LEDမှန်တံတား ဖြတ်သန်းခွင့်လက်မှတ်", ":", FontType.PyiHtaungSu));

            return printlines;
        }

        public static void PrintTicket(TicketRecord ticket)
        {
            var timestr = DateTime.Now.ToString("dd/MM/yyyy hh:mm tt");
            var qrstr = $"{ticket.Code}|{timestr}";

            var printlines = GetSlipHeader();
            printlines.Add(new PrintLine("_QR_", qrstr));
            printlines.Add(new PrintLine($"Ticket No : {ticket.Code}"));
            printlines.Add(new PrintLine(timestr));
            printlines.Add(new PrintLine($"Duration : {ticket.DurationMin} minutes"));

            var slipPrinter = new SlipPrinter(printlines);
            slipPrinter.Print();
        }


    }
}
