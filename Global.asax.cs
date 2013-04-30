using FluentValidation.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace WaterForAfrica
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //ModelValidatorProviders.Providers.Add(new FluentValidationModelValidatorProvider(new WaterforAfricaValidatorFactory()));
            FluentValidation.Mvc.FluentValidationModelValidatorProvider.Configure();
            AuthConfig.RegisterAuth();

        }

        void Application_BeginRequest(Object sender, EventArgs e)
        {
            string originalPath = HttpContext.Current.Request.Path.ToLower();
            if (originalPath == "/") //Or whatever is equal to the blank path
                Context.RewritePath("/Events/Home");
        } 
    }
}