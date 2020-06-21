using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AgeChart.Data;
using AgeChart.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AgeChart.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(PersonViewModel vm)
        {
            var person = new Person
            {
                FirstName = vm.FirstName,
                LastName = vm.LastName,
                Age = (DateTime.Now - vm.Birthday).Days / 365
            };

            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addrandompeople")]
        public void AddRandomPeople(RandomViewModel vm)
        {
            var ppl = GetRandomPeople(vm);
            var repo = new PeopleRepository(_connectionString);
            foreach (var p in ppl)
            {
                repo.AddPerson(p);
            }
        }

        public IEnumerable<Person> GetRandomPeople(RandomViewModel vm)
        {
            List<Person> result = new List<Person>();

            for (int i = 1; i <= vm.Amount; i++)
            {
                result.Add(new Person
                {
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    Age = Faker.RandomNumber.Next(vm.Min, vm.Max)
                });
            }

            return result;
        }
    }
}