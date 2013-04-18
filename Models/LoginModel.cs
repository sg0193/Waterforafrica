using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaterForAfrica;
using FluentValidation.Attributes;
using WaterForAfrica.Validator;


namespace Events.Models
{
    [Validator(typeof(LoginModelValidator))]
    public class LoginModel
    {
        [Display(Name = "UserName")]
        [AllowHtml]
        public string UserName { get; set; }
        
        [AllowHtml]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm Password")]
        //public string cnfmPassword { get; set; }
        
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
        
        public bool IsValid(string UserName, string Password,out string Message)
        {
            bool isValid = false;
            Message = string.Empty;
            using (EventsDbEntities eventsContext = new EventsDbEntities())
            {
                var User = eventsContext.T_LOGIN.Where(login => login.UserName.Equals(UserName)).ToList();
                if (User.Count == 1)
                {
                    if (User[0].UserName == UserName && User[0].Password == Password)
                    {
                        isValid = true;
                    }
                    else
                    {
                        Message = "Username and Password combination is not valid";

                    }
                }
                else
                {
                    Message = "Not a valid Username";
                }
                 
            }
            return isValid;
        }
    }
}