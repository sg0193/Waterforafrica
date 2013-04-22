
namespace System.Web.Mvc.Html
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString MenuItemCheveron(this HtmlHelper htmlHelper,
                                                     string text, string action, string controller,
                                                     string cheveronText, string area = null)
        {
            var li = new TagBuilder("li");
            var routeData = htmlHelper.ViewContext.RouteData;

            var currentAction = routeData.GetRequiredString("action");
            var currentController = routeData.GetRequiredString("controller");
            var currentArea = routeData.DataTokens["area"] as string;
            var urlHelper = new UrlHelper(htmlHelper.ViewContext.RequestContext, htmlHelper.RouteCollection);

            if (string.Equals(currentAction, action, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(currentController, controller, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(currentArea, area, StringComparison.OrdinalIgnoreCase))
            {
                li.AddCssClass("active");
            }
            var linkBuilder = new TagBuilder("a");
            linkBuilder.MergeAttribute("href", urlHelper.Action(action, controller));

            var htmlText = li.ToString(TagRenderMode.StartTag);
            htmlText += linkBuilder.ToString(TagRenderMode.StartTag);
            htmlText += text;
            htmlText += linkBuilder.ToString(TagRenderMode.EndTag);
            htmlText += li.ToString(TagRenderMode.EndTag);
            return MvcHtmlString.Create(htmlText.ToString());
        }
    }
}