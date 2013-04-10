using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using FluentValidation.Mvc;

namespace Events.Models
{
     //[Validator(typeof(RegisterValidator))]
    public class ProfileModel
    {
         [AllowHtml]
        public string FirstName { get; set; }
         [AllowHtml]
        public string LastName { get; set; }
        [AllowHtml]
        public LoginModel Login { get; set; }
    }
}