using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WaterForAfrica;

namespace Events.Models
{
    public class CalendarModel
    {

        public List<CalendarItem> GetEvents()
        {
            List<CalendarItem> calItems = new List<CalendarItem>();
           
            using (EventsDbEntities eventsContext = new EventsDbEntities())
            {
                var events = eventsContext.T_EVENTS.ToList();
                
                foreach (var eve in events)
                {
                    CalendarItem calItem = new CalendarItem();
                    //calItem.LoginId = eve.LoginId;
                    calItem.Id = eve.EventId;
                    calItem.Start = eve.StartDate;
                    calItem.End = eve.EndDate;
                    calItem.title = eve.EventDescription;
                    calItems.Add(calItem);
                }

            }
            return calItems;
        }

       

    }
}