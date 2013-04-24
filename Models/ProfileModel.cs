using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FluentValidation.Attributes;
using WaterForAfrica.Validator;
using WaterForAfrica;

namespace Events.Models
{
     [Validator(typeof(ProfileModelValidator))]
    public class ProfileModel
    {
        [AllowHtml]
        public string UserName { get; set; }
        [AllowHtml]
        public string Password { get; set; }
        [AllowHtml]
        public string cnfmPassword { get; set; }
         [AllowHtml]
        public string FirstName { get; set; }
         [AllowHtml]
        public string LastName { get; set; }

         public string CreateProfile(ProfileModel ProfileModel)
         {
             string regStatus = "";
             try
             {
                 using (EventsDbEntities eventsContext = new EventsDbEntities())
                 {
                     T_LOGIN loginEntity = new T_LOGIN();
                     loginEntity.UserName = ProfileModel.UserName;
                     loginEntity.Password = ProfileModel.Password;
                     loginEntity.CreatedBy = "System";
                     loginEntity.CreatedOn = DateTime.Now;
                     eventsContext.T_LOGIN.Add(loginEntity);

                     T_PROFILE_DETAILS profilesEntity = new T_PROFILE_DETAILS();
                     profilesEntity.FirstName = ProfileModel.FirstName;
                     profilesEntity.LastName = ProfileModel.LastName;
                     profilesEntity.LoginId = loginEntity.LoginId;
                     eventsContext.T_PROFILE_DETAILS.Add(profilesEntity);
                     eventsContext.SaveChanges();

                 }
                 regStatus = "Success";

             }
             catch (Exception ex)
             {
                 throw ex;
                 regStatus = "Error occured";
             }
             return regStatus;
         }
    }
}