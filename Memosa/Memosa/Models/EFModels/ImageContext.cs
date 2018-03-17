using System.Data.Entity;


namespace EFModels
{
    public class ImageContext : DbContext
    {     
        public ImageContext() : base("name=ImageContext")
        {

        }

        public DbSet<Image> Images { get; set; }
    }
}
