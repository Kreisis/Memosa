using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto
{
    public class Img
    {
        public Img()
        {

        }

        public int ID { get; set; }
        public string Title { get; set; }
        public bool Modern { get; set; }
        public string Path { get; set; }
    }
}
