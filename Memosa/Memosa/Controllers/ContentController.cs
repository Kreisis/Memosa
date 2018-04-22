using Dto;
using Bussiness;
using System.Web.Mvc;

namespace Memosa.Controllers
{
    public class ContentController : BaseController
    {
        private ContentManager _contentManager;

        public ContentController()
        {
            _contentManager = new ContentManager();
        }

        public ActionResult Meme(int? ID)
        {
            if (ID.HasValue)
            {
                Img img = _contentManager.GetImageFromDB(ID.Value);
                if (img == null)
                {
                    return HttpNotFound();
                }
                return View(img);
            }
            return HttpNotFound();
        }
    }
}