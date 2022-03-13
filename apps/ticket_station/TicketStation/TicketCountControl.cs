using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TicketStation
{
    public partial class TicketCountControl : UserControl
    {
        public int TicketCount
        {
            get
            {
                if (int.TryParse(textBoxCount.Text, out int count))
                    return count;
                return 1;
            }
        }

        private int _maxCount = 1;
        public int MaxCount { 
            get { 
                return _maxCount;
            } 
            
            set {
                if (value < 1)
                    _maxCount = 1;

                _maxCount = value;
            }
        }
        public TicketCountControl()
        {
            InitializeComponent();
            MaxCount = 99;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var btn = sender as Button;
            if(btn != null)
            {
                var number = btn.Tag as string;
                var newCount = textBoxCount.Text + number;

                if(int.TryParse(newCount, out int count))
                {
                    if (count < 0)
                        count = 0;
                    if (count > MaxCount)
                        count = MaxCount;

                    textBoxCount.Text = count.ToString();
                }
            }
        }

        private void buttonClear_Click(object sender, EventArgs e)
        {
            ClearNumber();
        }

        public void ClearNumber()
        {
            if (this.InvokeRequired)
                this.Invoke(() =>
                {
                    textBoxCount.Text = "";
                });
            else
                textBoxCount.Text = "";

        }
    }
}
