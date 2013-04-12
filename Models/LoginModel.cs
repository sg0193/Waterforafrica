using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaterForAfrica;

namespace Events.Models
{
    public class LoginModel
    {
        [Required]
        [Display(Name = "UserName")]
        [AllowHtml]
        public string UserName { get; set; }
        [Required]
        [AllowHtml]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm Password")]
        //public string cnfmPassword { get; set; }
        
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
        
        public bool IsValid(string UserName, string Password)
        {
            bool isValid = true;
            using (EventsDbEntities eventsContext = new EventsDbEntities())
            {
                var User = eventsContext.T_LOGIN.Select(login => login.UserName.Equals(UserName)).ToList();
                 
            }
            return isValid;
        }
    }
}