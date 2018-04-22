using Dto;
using EFModels;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace Bussiness
{
    public class ContentManager
    {

        public ContentManager()
        {
        }

        public Img GetImageFromDB(int ID)
        {
            using(ImageContext db = new ImageContext())
            {
                Image image = db.Images.Find(ID);
                if(image == null)
                {
                    return null;
                }
                return new Img()
                {
                    ID = image.ID,
                    Modern = false,
                    Title = image.Title,
                    Path = image.Path
                };
            }
        }
    }
}
