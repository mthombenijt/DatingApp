using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;                   //we put the under score because is declare private
        public ValuesController(DataContext context)             //injecting a controller with data context
        {

            _context = context;

        }
        // GET api/values
        [HttpGet]
        //We use Async for not blocking any request while we waiting the results,lot of people can make request
        public async Task<IActionResult> GetValues()            //Get values from  database as list
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);  //Return Values
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult>  GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value); //Return 1 Value
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
