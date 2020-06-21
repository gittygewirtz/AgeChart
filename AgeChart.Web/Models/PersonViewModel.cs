using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgeChart.Web.Models
{
    public class PersonViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
    }
}
