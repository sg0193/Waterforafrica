﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WaterForAfrica;

namespace Events.Models
{
    public class EventModel 
    {
        [Display(Name = "Start Date")]
        [AllowHtml]
        public DateTime StartDate { get; set; }

        [Display(Name = "End Date")]
        [AllowHtml]
        public DateTime EndDate { get; set; }

        [Display(Name = "City")]
        [AllowHtml]
        public string City { get; set; }

        [Display(Name = "State")]
        [AllowHtml]
        public string State { get; set; }

        [Display(Name = "Event Description")]
        [AllowHtml]
        public string EventDescription { get; set; }

        public int AddEvent(string EventDescription, DateTime StartDate, DateTime EndDate,string City, string State, string UserName)
        {
            int  eventId = 0;
            using (EventsDbEntities eventsContext = new EventsDbEntities())
            {
                T_EVENTS newEvent = new T_EVENTS();
                newEvent.EventDescription = EventDescription;
                newEvent.StartDate = StartDate;
                newEvent.EndDate = EndDate;
                newEvent.City = City;
                newEvent.State = State;
                var login = eventsContext.T_LOGIN.Where(i => i.UserName == UserName).FirstOrDefault();
                newEvent.LoginId = login.LoginId;
                eventsContext.T_EVENTS.Add(newEvent);
                eventsContext.SaveChanges();
                eventId = newEvent.EventId;
            }
            return eventId;
        }

    }
}
