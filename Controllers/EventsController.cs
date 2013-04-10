using Events.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.EntityModel;
using System.Data.Entity;

namespace Events.Controllers
{
    
    public class EventsController : Controller
    {
        //
        // GET: /Events/
        
        public ActionResult Home()
        {
            return View();
        }

        public ActionResult AboutUs()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Calendar()
        {
            return View();
        }
        public ActionResult ContactUs()
        {
            return View();
        }
        public ActionResult EventDetails()
        {
            return View();

        }
        //public ActionResult Login()
        //{
        //    return View();
        //}
        public ActionResult ProfileCreate()
        {
            return View();
        }
        public ActionResult Projects()
        {
            return View();
        }
        public ActionResult Donate()
        {
            return View();
        }
        public ActionResult ThankYou()
        {
            return View();
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Login(string button, LoginModel loginModel)
        {
            if (button == "Signin")
            {

                return RedirectToAction("EventDetails");
            }
            else
            {

                return RedirectToAction("ProfileCreate");

            }



        }
        //Post
        [HttpPost]
        public ActionResult ProfileCreate(ProfileModel ProfileModel)
        {
            //try
            //{
            //    using (Events.Entities EventContext = new Entities())
            //    {
            //        T_LOGIN loginEntity = new T_LOGIN();
            //        loginEntity.UserName = ProfileModel.Login.UserName;
            //        loginEntity.Password = ProfileModel.Login.Password;
            //        EventContext.T_LOGIN.Add(loginEntity);
            //        EventContext.SaveChanges();
                   
            //        T_PROFILE_DETAILS profilesEntity = new T_PROFILE_DETAILS();
            //        profilesEntity.FirstName = ProfileModel.FirstName;
            //        profilesEntity.LastName = ProfileModel.LastName;
            //        profilesEntity.LoginId = loginEntity.LoginId;
            //        EventContext.T_PROFILE_DETAILS.Add(profilesEntity);
            //        EventContext.SaveChanges();
                                        
            //    }

            //}
            //catch
            //{

            //    return View();
            //}

            return RedirectToAction("ThankYou");
        }
    }
}
