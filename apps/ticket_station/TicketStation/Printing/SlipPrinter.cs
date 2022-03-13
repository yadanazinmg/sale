using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketStation.Printing
{
        public class SlipPrinter
        {
            private readonly StringFormat _centerFormat = new StringFormat { Alignment = StringAlignment.Center, LineAlignment = StringAlignment.Center };
            private readonly StringFormat _leftAlignFormat = new StringFormat { Alignment = StringAlignment.Near, LineAlignment = StringAlignment.Center };
            private readonly StringFormat _rightAlignFormat = new StringFormat { Alignment = StringAlignment.Far, LineAlignment = StringAlignment.Center };
            private readonly Brush _textBrush = Brushes.Black;

            private const float _paperWidth = 280.0F;


            private readonly Font _phs10B = FontLib.Instance.GetPyiHtaungSuFont(12, FontStyle.Bold);
            private readonly Font _m310B = FontLib.Instance.GetMyanmar3Font(10, FontStyle.Bold);
            private readonly Font _blc11 = FontLib.Instance.GetBarlowCondensedFont(11);
            private readonly Font _courier10 = new Font("Courier New", 10);
            private readonly Font[] _fonts;

            private const string _line = "--------------------------------";

            private readonly List<PrintLine> _printLines;
            private readonly string _qrText;
            private readonly Bitmap _logo;

            private float _currentY = 0;
            private Graphics _graphics;

            public SlipPrinter(List<PrintLine> printLines, Bitmap logo = null)
            {
                _printLines = printLines;
                _logo = logo;

                var qrTextLine = _printLines.Find(pl => pl.LeftSideText == "_QR_");
                if (qrTextLine != null)
                {
                    _qrText = qrTextLine.RightSideText;

                    _printLines.Remove(qrTextLine);
                }

                _fonts = new[] { _phs10B, _blc11, _courier10, _m310B };
            }

            public void PrintAsync()
            {
                Task.Run(() => Print());
            }

            public void Print()
            {
                try
                {
                    var doc = new PrintDocument();
                    doc.PrintPage += (o, args) => PrintSlip(args);
                    doc.Print();
                }
                catch (Exception ex)
                {
                    //Log.Error(ex, ex.Message);
                }
            }

            private void PrintSlip(PrintPageEventArgs args)
            {
                try
                {

                    _graphics = args.Graphics;
                    foreach (var printLine in _printLines)
                    {

                        if (printLine.PrintLineType == PrintLineType.Text)
                        {
                            var font = _fonts[(int)printLine.FontType];
                            if (string.IsNullOrWhiteSpace(printLine.LeftSideText) && string.IsNullOrWhiteSpace(printLine.RightSideText))
                            {
                                DrawString(font, "");
                            }
                            else if (string.IsNullOrWhiteSpace(printLine.LeftSideText) && !string.IsNullOrWhiteSpace(printLine.RightSideText))
                            {
                                var lines = printLine.RightSideText.Split(Environment.NewLine);
                                foreach (var line in lines)
                                {
                                    DrawString(font, line);
                                }
                            }
                            else if (!string.IsNullOrWhiteSpace(printLine.LeftSideText) && string.IsNullOrWhiteSpace(printLine.RightSideText))
                            {
                                var lines = printLine.LeftSideText.Split(Environment.NewLine);
                                foreach (var line in lines)
                                {
                                    DrawString(font, line);
                                }
                            }
                            else
                            {
                                DrawString(font, printLine.LeftSideText, printLine.RightSideText, printLine.Separator);
                            }
                        }
                        else if (printLine.PrintLineType == PrintLineType.Line)
                        {
                            DrawLine();
                        }
                    }
                    //DrawLine();

                    if (!string.IsNullOrWhiteSpace(_qrText))
                        DrawQRCode(_qrText, _logo);

                    DrawString(_blc11, "\"Welcome\"");
                }
                catch (Exception ex)
                {

                }
                finally
                {
                    _graphics = null;
                    _currentY = 0;
                }
            }

            private void DrawString(Font font, string text)
            {
                var lineHeight = font.GetHeight();
                var textRect = new RectangleF(0, _currentY, _paperWidth, lineHeight);
                _graphics.DrawString(text, font, _textBrush, textRect, _centerFormat);
                _currentY += lineHeight;
            }

            private void DrawString(Font font, string text1, string text2, string separator = " :")
            {
                var lineHeight = font.GetHeight();
                var middle = _paperWidth / 2;

                var textRect = new RectangleF(0, _currentY, middle, lineHeight);
                _graphics.DrawString($"{text1}{separator}", font, _textBrush, textRect, _leftAlignFormat);

                textRect = new RectangleF(middle, _currentY, middle, lineHeight);
                _graphics.DrawString($"{text2}", font, _textBrush, textRect, _rightAlignFormat);

                _currentY += lineHeight;
            }

            private void DrawLine()
            {
                var lineHeight = _courier10.GetHeight() / 2;
                var textRect = new RectangleF(0, _currentY, _paperWidth, lineHeight);
                _graphics.DrawString(_line, _courier10, _textBrush, textRect, _centerFormat);
                _currentY += lineHeight;
            }

            private void DrawQRCode(string qrText, Bitmap logo = null)
            {
                var qrCodeImage = QRCodeCreator.GetQRCode(qrText, logo);
                _graphics.DrawImage(qrCodeImage, 75, _currentY, 120, 120);
                _currentY += 96;
            }
        }
    }

