using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using TicketStation.Models;

namespace TicketStation
{
    public partial class LoginForm : Form
    {
        public User? LoginUser { get; private set; }

        public LoginForm()
        {
            InitializeComponent();

            var version = Assembly.GetExecutingAssembly().GetName().Version;
            if (version != null)
            {
                var versionString = $" v{version.Major}.{version.Minor}";
                this.Text += versionString;
            }
        }

        private async void buttonLogin_Click(object sender, EventArgs e)
        {
            await Login();
        }

        private void buttonCancel_Click(object sender, EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
            this.Close();
        }

        private async void LoginForm_Load(object sender, EventArgs e)
        {
            var users = await GraphQLHelpers.GetUsers();
            foreach (var user in users)
            {
                comboBoxUser.Items.Add(user);
            }

            if (users.Count > 0)
                comboBoxUser.SelectedIndex = 0;
        }

        private void textBoxPassword_TextChanged(object sender, EventArgs e)
        {
            labelError.Visible = false;
        }

        private async void textBoxPassword_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Return)
            {
                await Login();
            }
        }

        private async Task Login()
        {
            var currentUser = comboBoxUser.SelectedItem as User;
            if (currentUser != null)
            {
                var user = await GraphQLHelpers.Login(currentUser.Name, textBoxPassword.Text);
                if (user != null)
                {
                    this.DialogResult = DialogResult.OK;
                    LoginUser = user;
                    this.Close();
                }
                else
                {
                    textBoxPassword.Text = "";
                    labelError.Visible = true;
                }
            }
        }
    }
}
