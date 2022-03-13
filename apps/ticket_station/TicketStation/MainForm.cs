using System.Reflection;
using TicketStation.Models;
using TicketStation.Printing;

namespace TicketStation
{
    public partial class MainForm : Form
    {
        private User _loginUser;
        private const int _maxTicketCount = 50;
        public MainForm(User loginUser)
        {
            InitializeComponent();

            _loginUser = loginUser;

            var version = Assembly.GetExecutingAssembly().GetName().Version;
            if (version != null)
            {
                var versionString = $" v{version.Major}.{version.Minor}";
                this.Text += versionString;
            }

        }

        private void HorizontalCenterControlInParent(Control ctrlToCenter)
        {
            ctrlToCenter.Left = (ctrlToCenter.Parent.Width - ctrlToCenter.Width) / 2;
        }

        private void HorizontalCenterControlsInParent(int gap, params Control[] ctrlsToCenter)
        {

            var totalWidth = ctrlsToCenter.Sum(c => c.Width) + ((ctrlsToCenter.Length - 1) * gap);
            var left = (this.Width - totalWidth) / 2;
            foreach (var ctrl in ctrlsToCenter)
            {
                ctrl.Left = left;
                left += ctrl.Width + gap;
            }
        }

        private async void MainForm_Load(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Maximized;
            //var rect = Screen.PrimaryScreen.WorkingArea;

            ticketCountControl.MaxCount = _maxTicketCount;

            HorizontalCenterControlInParent(labelTitle1);
            HorizontalCenterControlInParent(labelTitle2);
            HorizontalCenterControlInParent(labelTitle3);
            

            var title4Width = labelTitle4.Width + 60;
            labelTitle3.Left = labelTitle3.Left + (title4Width / 2);
            labelTitle4.Left = labelTitle3.Left - (title4Width / 2);

            HorizontalCenterControlInParent(ticketCountControl);

            var tickets = await GraphQLHelpers.GetTicketTypes();
            var btnWidth = 400;
            var btnHeight = 180;
            var btnHSpace = 60;
            var btnVSpace = 40;

            var btnCount = Math.Min(tickets.Count, 6);
            var btnCols = 1;
            var btnRow = 1;
            if (btnCount == 1)
            {
                btnRow = 1; btnCols = 1;
            }
            else if (btnCount == 2)
            {
                btnRow = 1; btnCols = 2;
            }
            else if (btnCount == 3 || btnCount == 4)
            {
                btnRow = 2; btnCols = 2;
            }
            else if (btnCount == 5 || btnCount == 6)
            {
                btnRow = 2; btnCols = 3;
            }

            //var availableHeight = this.Height - (ticketCountControl.Height + btnHSpace);

            var totalBtnsWidth = (btnWidth * btnCols) + (btnHSpace * (btnCols - 1));
            var totalBtnsHeight = (btnHeight * btnRow) + (btnVSpace * (btnRow - 1));

            var orgX = (int)((this.Width - totalBtnsWidth) / 2);
            var orgY = (int)(ticketCountControl.Bottom + btnHSpace);

            int idx = 0;
            int x = orgX;
            int y = orgY;

            this.SuspendLayout();
            foreach (var ticket in tickets)
            {
                var button = new Button();
                button.Font = new Font("Segoe UI", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
                button.Location = new Point(x, y);
                button.Name = $"button{ticket.Id}";
                button.Size = new Size(btnWidth, btnHeight);
                button.Tag = ticket;
                button.Text = ticket.Name;
                button.UseVisualStyleBackColor = true;
                button.Click += TicketButton_Click;
                this.Controls.Add(button);


                idx++;
                var c = (idx % btnCols);
                var r = (idx / btnCols);
                x = orgX + (c * (btnWidth + btnHSpace));
                y = orgY + (r * (btnHeight + btnVSpace));
            }
            this.ResumeLayout(false);
            this.PerformLayout();
        }

        private async void TicketButton_Click(object? sender, EventArgs e)
        {
            var btn = sender as Button;
            if(btn != null)
            {
                var ticketType = btn.Tag as TicketType;
                if(ticketType != null)
                {
                    var ticketCount = (int)ticketCountControl.TicketCount;
                    if (ticketCount > 0 && ticketCount <= 50)
                    {
                        var tickets = await SaveTicket(ticketType, ticketCount);
                        PrintTickets(tickets);
                    }
                    ticketCountControl.ClearNumber();
                }
            }
        }

        private async Task<List<TicketRecord>> SaveTicket(TicketType ticketType, int ticketCount)
        {
            var ticketRecords = new List<TicketRecord>();
            string? groupTicketcode = (ticketCount > 0) ? Guid.NewGuid().ToString() : null;

            for (int i = 0; i < ticketCount; i++)
            {
                var ticketRecord = new TicketRecord
                {
                    Code = Utils.RandomString(6),
                    TicketTypeId = ticketType.Id,
                    TicketStationId = AppSettings.TicketStationId,
                    DurationMin = ticketType.DurationMin,
                    TicketPrice = ticketType.Price,
                    TotalPrice = ticketType.Price,
                    EntryOperatorId = _loginUser.Id,
                    EntryOperatorName = _loginUser.Name,
                    GroupTicketCode = groupTicketcode,
                };
                ticketRecords.Add(ticketRecord);
            }

            var count = await GraphQLHelpers.SaveTicket(ticketRecords);
            return ticketRecords;
        }

        private void PrintTickets(List<TicketRecord> tickets)
        {
            foreach (var ticket in tickets)
            {
                PrintHelper.PrintTicket(ticket);
            }
        }

        private async void buttonPrintLastPurchase_Click(object sender, EventArgs e)
        {
            var ticket= await GraphQLHelpers.GetLastPurchasedTicket();
            if (ticket != null && ticket.GroupTicketCode != null)
            {
                var tickets = await GraphQLHelpers.GetLastPurchasedTicketGroup(ticket.GroupTicketCode);
                PrintTickets(tickets);
            }
        }
    }
}