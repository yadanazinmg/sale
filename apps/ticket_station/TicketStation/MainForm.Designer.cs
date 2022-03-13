namespace TicketStation
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.labelTitle3 = new System.Windows.Forms.Label();
            this.labelTitle2 = new System.Windows.Forms.Label();
            this.labelTitle1 = new System.Windows.Forms.Label();
            this.labelTitle4 = new System.Windows.Forms.Label();
            this.ticketCountControl = new TicketStation.TicketCountControl();
            this.buttonPrintLastPurchase = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // labelTitle3
            // 
            this.labelTitle3.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.labelTitle3.AutoSize = true;
            this.labelTitle3.BackColor = System.Drawing.Color.Transparent;
            this.labelTitle3.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelTitle3.Location = new System.Drawing.Point(250, 149);
            this.labelTitle3.Name = "labelTitle3";
            this.labelTitle3.Size = new System.Drawing.Size(809, 65);
            this.labelTitle3.TabIndex = 13;
            this.labelTitle3.Text = "မှန်တံတား ဖြတ်သန်းခွင့် လက်မှတ် အရောင်းကောင်တာ";
            // 
            // labelTitle2
            // 
            this.labelTitle2.AutoSize = true;
            this.labelTitle2.Font = new System.Drawing.Font("Segoe UI", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelTitle2.Location = new System.Drawing.Point(344, 67);
            this.labelTitle2.Name = "labelTitle2";
            this.labelTitle2.Size = new System.Drawing.Size(526, 65);
            this.labelTitle2.TabIndex = 11;
            this.labelTitle2.Text = "ပွဲကောက်ရေတံခွန် အပန်းဖြေစခန်း";
            // 
            // labelTitle1
            // 
            this.labelTitle1.AutoSize = true;
            this.labelTitle1.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelTitle1.Location = new System.Drawing.Point(495, 9);
            this.labelTitle1.Name = "labelTitle1";
            this.labelTitle1.Size = new System.Drawing.Size(213, 48);
            this.labelTitle1.TabIndex = 10;
            this.labelTitle1.Text = "BE Fall Park";
            // 
            // labelTitle4
            // 
            this.labelTitle4.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.labelTitle4.AutoSize = true;
            this.labelTitle4.BackColor = System.Drawing.Color.Transparent;
            this.labelTitle4.Font = new System.Drawing.Font("Segoe UI", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelTitle4.Location = new System.Drawing.Point(178, 162);
            this.labelTitle4.Name = "labelTitle4";
            this.labelTitle4.Size = new System.Drawing.Size(84, 48);
            this.labelTitle4.TabIndex = 17;
            this.labelTitle4.Text = "LED";
            this.labelTitle4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // ticketCountControl
            // 
            this.ticketCountControl.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.ticketCountControl.Location = new System.Drawing.Point(155, 271);
            this.ticketCountControl.MaxCount = 99;
            this.ticketCountControl.Name = "ticketCountControl";
            this.ticketCountControl.Size = new System.Drawing.Size(962, 284);
            this.ticketCountControl.TabIndex = 18;
            // 
            // buttonPrintLastPurchase
            // 
            this.buttonPrintLastPurchase.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonPrintLastPurchase.BackColor = System.Drawing.Color.LightPink;
            this.buttonPrintLastPurchase.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.buttonPrintLastPurchase.Location = new System.Drawing.Point(1027, 12);
            this.buttonPrintLastPurchase.Name = "buttonPrintLastPurchase";
            this.buttonPrintLastPurchase.Size = new System.Drawing.Size(219, 124);
            this.buttonPrintLastPurchase.TabIndex = 19;
            this.buttonPrintLastPurchase.Text = "Print Last Purchase";
            this.buttonPrintLastPurchase.UseVisualStyleBackColor = false;
            this.buttonPrintLastPurchase.Click += new System.EventHandler(this.buttonPrintLastPurchase_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 25F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1258, 968);
            this.Controls.Add(this.buttonPrintLastPurchase);
            this.Controls.Add(this.ticketCountControl);
            this.Controls.Add(this.labelTitle3);
            this.Controls.Add(this.labelTitle4);
            this.Controls.Add(this.labelTitle2);
            this.Controls.Add(this.labelTitle1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "MainForm";
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "LED Glass Bridge Ticket Station";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label labelTitle3;
        private Label labelTitle2;
        private Label labelTitle1;
        private Label labelTitle4;
        private TicketCountControl ticketCountControl;
        private Button buttonPrintLastPurchase;
    }
}