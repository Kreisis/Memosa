using System;
using System.Data.Entity;
using EFModels;

namespace Testing
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Pass 1");

            ImageContext db = new ImageContext();

            db.Images.Add(new Image {
                Title = "test",
                Path = "sd"
            });
            db.SaveChanges();

            Console.WriteLine("Pass 2");
            
            Console.ReadKey();
        }
    }
}
