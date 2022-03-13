using System;
using System.Drawing;
using System.Drawing.Text;

namespace TicketStation.Printing
{
    public class FontLib
    {
        [System.Runtime.InteropServices.DllImport("gdi32.dll")]
        private static extern IntPtr AddFontMemResourceEx(IntPtr pbFont, uint cbFont,
            IntPtr pdv, [System.Runtime.InteropServices.In] ref uint pcFonts);

        private PrivateFontCollection _fonts = new PrivateFontCollection();

        private static readonly Lazy<FontLib> _lazy = new Lazy<FontLib>(() => new FontLib());
        public static FontLib Instance { get { return _lazy.Value; } }

        private FontLib()
        {
            //2
            byte[] fontData = Properties.Resources.Pyidaungsu_2_5_Regular;
            IntPtr fontPtr = System.Runtime.InteropServices.Marshal.AllocCoTaskMem(fontData.Length);
            System.Runtime.InteropServices.Marshal.Copy(fontData, 0, fontPtr, fontData.Length);
            uint dummy = 0;
            _fonts.AddMemoryFont(fontPtr, Properties.Resources.Pyidaungsu_2_5_Regular.Length);
            AddFontMemResourceEx(fontPtr, (uint)Properties.Resources.Pyidaungsu_2_5_Regular.Length, IntPtr.Zero, ref dummy);
            System.Runtime.InteropServices.Marshal.FreeCoTaskMem(fontPtr);

            //1
            fontData = Properties.Resources.BarlowCondensed_Regular;
            fontPtr = System.Runtime.InteropServices.Marshal.AllocCoTaskMem(fontData.Length);
            System.Runtime.InteropServices.Marshal.Copy(fontData, 0, fontPtr, fontData.Length);
            dummy = 0;
            _fonts.AddMemoryFont(fontPtr, Properties.Resources.BarlowCondensed_Regular.Length);
            AddFontMemResourceEx(fontPtr, (uint)Properties.Resources.BarlowCondensed_Regular.Length, IntPtr.Zero, ref dummy);
            System.Runtime.InteropServices.Marshal.FreeCoTaskMem(fontPtr);

            //0
            fontData = Properties.Resources.Myanmar3_2018;
            fontPtr = System.Runtime.InteropServices.Marshal.AllocCoTaskMem(fontData.Length);
            System.Runtime.InteropServices.Marshal.Copy(fontData, 0, fontPtr, fontData.Length);
            dummy = 0;
            _fonts.AddMemoryFont(fontPtr, Properties.Resources.Myanmar3_2018.Length);
            AddFontMemResourceEx(fontPtr, (uint)Properties.Resources.Myanmar3_2018.Length, IntPtr.Zero, ref dummy);
            System.Runtime.InteropServices.Marshal.FreeCoTaskMem(fontPtr);
        }

        public Font GetPyiHtaungSuFont(float size, FontStyle fontStyle = FontStyle.Regular)
        {
            return new Font(_fonts.Families[2], size, fontStyle);
        }

        public Font GetBarlowCondensedFont(float size, FontStyle fontStyle = FontStyle.Regular)
        {
            return new Font(_fonts.Families[1], size, fontStyle);
        }

        public Font GetMyanmar3Font(float size, FontStyle fontStyle = FontStyle.Regular)
        {
            return new Font(_fonts.Families[0], size, fontStyle);
        }
    }
}
