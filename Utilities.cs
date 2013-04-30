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
           
                               
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("nethra275@live.com", "Shravann22");
            SmtpServer.EnableSsl = true;

            switch (emailType)
            {
                case "ForgotPassword":
                     mailMsg.Subject = "Your Password for A Rise For Water";
                     mailMsg.Body = "body";
                    break;
                default:
                    break;
            }
            
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