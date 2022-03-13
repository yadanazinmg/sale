using Microsoft.Extensions.Configuration;

namespace TicketStation
{
    internal static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            ApplicationConfiguration.Initialize();

            //Application.Run(new MainForm(null));
            var login = new LoginForm();
            var result = login.ShowDialog();
            if (result == DialogResult.OK && login.LoginUser != null)
            {
                Application.Run(new MainForm(login.LoginUser));
            }
        }
    }
}