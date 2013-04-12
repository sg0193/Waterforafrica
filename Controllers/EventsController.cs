using Events.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.EntityModel;
using System.Data.Entity;
using System.Web.Security;
using WaterForAfrica;

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
        [Authorize]
        public ActionResult UserActions()
        {
            return View();
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            // clear authentication cookie
            HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            cookie1.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie1);

            // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            HttpCookie cookie2 = new HttpCookie("ASP.NET_SessionId", "");
            cookie2.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie2);

            //FormsAuthentication.RedirectToLoginPage();
            return RedirectToAction("Home","Events");
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Login(string button, LoginModel model)
        {
            if (button == "Signin")
            {

                if (ModelState.IsValid)
                {
                    if (model.IsValid(model.UserName, model.Password))
                    {
                        FormsAuthentication.SetAuthCookie(model.UserName, true);
                        return RedirectToAction("UserActions", "Events");
                    }

                    else
                    {
                        ModelState.AddModelError("", "The user name or password provided is incorrect.");
                    }
                }
                return View(model);
            }
            else
            {
                return RedirectToAction("ProfileCreate");
            }
        }

       
        [HttpPost]
        public ActionResult ProfileCreate(ProfileModel ProfileModel)
        {
            if (ModelState.IsValid)
            {
               string regStats =  ProfileModel.CreateProfile(ProfileModel);
               if (regStats == "Success")
               {
                   return RedirectToAction("ThankYou");
               }
               else
               {
                   return View();
               }
            }
            else
            {
                return View();
            }
                       
        }
    }
}
