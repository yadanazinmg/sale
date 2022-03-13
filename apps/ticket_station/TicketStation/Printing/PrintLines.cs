using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation.Printing
{
    public class PrintLine
    {
        public string LeftSideText { get; }
        public string RightSideText { get; }
        public string Separator { get; }
        public FontType FontType { get; }
        public int FontSize { get; }
        public bool IsBold { get; }
        public PrintLineType PrintLineType { get; }

        public PrintLine()
        {
            PrintLineType = PrintLineType.Line;
        }

        public PrintLine(string leftSideText) : this(leftSideText, "")
        {
        }

        public PrintLine(string leftSideText, string rightSideText, string separator = " :", FontType fontType = FontType.BarlowCondensed)
        {
            LeftSideText = leftSideText;
            RightSideText = rightSideText ?? "";
            FontType = fontType;

            FontSize = FontType == FontType.BarlowCondensed ? 11 : 10;
            IsBold = FontType == FontType.PyiHtaungSu || FontType == FontType.Myanmar3;

            PrintLineType = PrintLineType.Text;
            Separator = separator;
        }
    }

    public enum PrintLineType
    {
        Text,
        Line,
    }
}
