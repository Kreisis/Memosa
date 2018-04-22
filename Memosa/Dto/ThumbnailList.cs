using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto
{
    public class ThumbnailList
    {
        public List<Thumbnail> thumbnails { get; set; }
        public ThumbnailList()
        {
            thumbnails = new List<Thumbnail>();
        }
        
    }
}
