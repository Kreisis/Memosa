using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bussiness;
using EFModels;

namespace Memosa.Controllers
{
    public class HomeController : BaseController
    {
        HomeManager _homeManager;
        public HomeController()
        {
            _homeManager = new HomeManager();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
        public ActionResult Browse()
        {
            return View();
        }
        public ActionResult Search()
        {
            return View();
        }
        [AjaxOnly]
        public ActionResult GetBrowseThumbnailData(int page)
        {
            Dto.ThumbnailList Model = _homeManager.GetThumbnailsFromDB(page);
            return PartialView("BrowsePartial", Model);
        }

        //[AjaxOnly]
        public ActionResult GetSearchResults(int page, string query)
        {
            query = HttpUtility.UrlDecode(query);
            Dto.ThumbnailList Model = _homeManager.SearchThumbnailsFromDB(query, page);
            return View("SearchPartial", Model);
        }

    }
}