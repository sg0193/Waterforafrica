﻿using Events.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.EntityModel;
using System.Data.Entity;
using System.Web.Security;
using WaterForAfrica;
using System.Web.Script.Serialization;

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

        public JsonResult GetEvents()
        {

            CalendarModel model = new CalendarModel();
            List<CalendarItem> events = model.GetEvents();
            var opEvents = new List<MVCEvent>();
            DateTime Started;
            DateTime Ended;
            var eventItems = from eventIts in events
                             select eventIts;
            foreach (CalendarItem eve in eventItems)
            {
                Started = Convert.ToDateTime(eve.Start);
                Ended = Convert.ToDateTime(eve.End);
                 opEvents.Add(new MVCEvent()
                {
                    id = eve.Id,
                title = eve.title,
                start = eve.Start.ToString("s"),
                end = eve.End.ToString("s"),
                allDay = false,
                url=""

                });
            }
           // CalendarItem[] eventArray = events.ToArray();
          //  return Json(new {EventId = events[0].Id,title = events[0].title, Start = events[0].Start, End = events[0].End}, JsonRequestBehavior.AllowGet);
            return Json(opEvents.ToArray(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Calendar()
        {
           
            return View();
        }
        public ActionResult ContactUs()
        {
            return View();
        }

        [Authorize]
        public ActionResult EventDetails()
        {
            return View();

        }
        
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
            string Message = "";
            if (button == "Signin")
            {

                
                if (ModelState.IsValid)
                {
                    if (model.IsValid(model.UserName, model.Password, out Message ))
                    {
                        FormsAuthentication.SetAuthCookie(model.UserName, true);
                        return RedirectToAction("UserActions", "Events");
                    }

                    else
                    {
                        ModelState.AddModelError("MessageError", Message);
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

        [HttpPost]
        public ActionResult EventDetails(EventModel model)
        {
            if (ModelState.IsValid)
            {
                int eventId = model.AddEvent(model.EventDescription, model.StartDate, model.EndDate, model.City, model.State, User.Identity.Name);
                return RedirectToAction("Calendar");
            }
            else
            {
                return View();
            }
        }
    }
}
