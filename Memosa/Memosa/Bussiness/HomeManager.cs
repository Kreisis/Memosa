using Dto;
using EFModels;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace Bussiness
{
    public class HomeManager
    {
        private int _defaultThumbnailsInPage;

        public HomeManager()
        {
            _defaultThumbnailsInPage = int.Parse(ConfigurationManager.AppSettings["ThumbnailsInPage"]);
        }

        public ThumbnailList GetThumbnailsFromDB(int page)
        {
            ThumbnailList tList = new ThumbnailList();

            int startingIndex = 1 + (page - 1) * _defaultThumbnailsInPage;
            int endIndex = startingIndex + (_defaultThumbnailsInPage - 1);
            using(ImageContext dbContext = new ImageContext())
            {
                if(startingIndex > dbContext.Images.Count())
                {
                    return tList;
                }

                IQueryable<Image> images = dbContext.Images.Where(t => t.ID >= startingIndex && t.ID <= endIndex);
                foreach(Image img in images)
                {
                    Thumbnail tb = new Thumbnail();
                    tb.ID = img.ID;
                    tb.Title = img.Title;
                    tb.ImagePath = img.Path;
                    tList.thumbnails.Add(tb);
                }
            }
            return tList;
        }

        public ThumbnailList SearchThumbnailsFromDB(string query, int page)
        {
            ThumbnailList tList = new ThumbnailList();

            query.Trim();

            if(query.Length < 2)
            {
                return tList;
            }
            if(page < 1)
            {
                return tList;
            }

            int startingIndex = 1 + (page - 1) * _defaultThumbnailsInPage;
            int endIndex = startingIndex + (_defaultThumbnailsInPage - 1);

            using (ImageContext dbContext = new ImageContext())
            {

                IQueryable<Image> images = dbContext.Images.Where(t => t.Title.Contains(query)).OrderByDescending(t => t.ID);

                if(startingIndex > images.Count())
                {
                    return tList;
                }

                for(int i = startingIndex; i <= endIndex && i<= images.Count(); i++)
                {
                    Image img = images.ToList<Image>().ElementAt(i - 1);
                    Thumbnail tb = new Thumbnail();
                    tb.ID = img.ID;
                    tb.Title = img.Title;
                    tb.ImagePath = img.Path;
                    tList.thumbnails.Add(tb);
                }
            }

            return tList;
        }
    }
}
