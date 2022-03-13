using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation.Printing
{
    public static class QRCodeCreator
    {
        public static Bitmap GetQRCode(string text, Bitmap logo)
        {
            try
            {
                QRCodeGenerator qrGenerator = new QRCodeGenerator();
                QRCodeData qrCodeData = qrGenerator.CreateQrCode(text, QRCodeGenerator.ECCLevel.H, true);
                QRCode qrCode = new QRCode(qrCodeData);
                Bitmap qrCodeImage = logo == null ? qrCode.GetGraphic(5, Color.Black, Color.White, false) : qrCode.GetGraphic(5, Color.Black, Color.White, logo, 35, 2, false);
                return qrCodeImage;
            }
            catch (Exception ex)
            {

            }

            return null;
        }
    }
}
