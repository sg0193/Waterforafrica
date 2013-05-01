using Events.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace WaterForAfrica.Utilities
{
    public class Utilities
    {
        public static void SendEmail(string to, string emailType, out string message)
        {
            MailMessage mailMsg = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.live.com",587);
            mailMsg.To.Add(to);
                      
            mailMsg.From = new MailAddress("nethra275@live.com");

            // Subject and Body
           
                               
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("nethra275@live.com", "Shravann22");
            SmtpServer.EnableSsl = true;
            message="";
            switch (emailType)
            {
                case "ForgotPassword":
                    LoginModel model = new LoginModel();
                    string password = model.GetPassword(to, out message);
                     mailMsg.Subject = "Your Password for A Rise For Water";
                     mailMsg.Body = "Your Password for the rise for water is:" + password;
                    break;
                default:
                    break;
            }
            
            try
            {
                if (string.IsNullOrEmpty(message))
                    SmtpServer.Send(mailMsg);
                else
                    message = "Couldnot find the User";
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}