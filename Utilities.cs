using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace WaterForAfrica.Utilities
{
    public class Utilities
    {
        public static void SendEmail(string to, string emailType)
        {
            MailMessage mailMsg = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.live.com",587);
            mailMsg.To.Add(to);
                      
            mailMsg.From = new MailAddress("nethra275@live.com");

            // Subject and Body
            mailMsg.Subject = "test";
            mailMsg.Body = "body";
                               
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("nethra275@live.com", "Shravann22");
            SmtpServer.EnableSsl = true;
            
            try
            {
                SmtpServer.Send(mailMsg);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}