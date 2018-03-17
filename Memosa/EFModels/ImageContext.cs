using System.Data.Entity;


namespace EFModels
{
    public class ImageContext : DbContext
    {
        public ImageContext() : base("Data Source = (LocalDB)\\MSSQLLocalDB; AttachDbFilename=~\\..\\Memosa\\App_Data\\Images.mdf;Integrated Security = True")
        {

        }
        public DbSet<Image> Images { get; set; }
    }
}
