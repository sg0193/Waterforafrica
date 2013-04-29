using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WaterForAfrica
{
    public class CalendarItem
    {
        public int Id { get; set; }
        public string title {get;set;}
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        
    }


    public class MVCEvent
    {
        public int id { get; set; }
        public string title { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public bool allDay { get; set; }
        public string url { get; set; }
        //public int LoginId { get; set; }
    }
}