using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Inlämning1AlexanderHolmberg.Entities;

namespace Inlämning1AlexanderHolmberg.Controllers
{
    [Route("api/customers")]
    public class CustomerController : Controller
    {
        private DatabaseContext databaseContext;

        public CustomerController(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
            databaseContext.Database.EnsureCreated();
        }

        [HttpPost]
        public IActionResult AddCustomer(Customer customer)
        {

            databaseContext.Add(customer);
            databaseContext.SaveChanges();

            return Ok(customer.Id);
        }

        [HttpGet]
        public IActionResult GetCustomer()
        {

            return Ok(databaseContext.Customers);
        }

        [HttpDelete]
        public IActionResult DeleteCustomer(Customer customer)
        {
            databaseContext.Remove(customer);
            databaseContext.SaveChanges();
            return Ok(customer.Id);
        }

        [HttpPut]
        public IActionResult UpdateCustomer(Customer customer)
        {
            databaseContext.Update(customer);
            databaseContext.SaveChanges();
            return Ok(customer.Id);
        }
    }
}