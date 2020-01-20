using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helpers
{
  public static class Extensions
  {
    public static void AddApplicationError(this HttpResponse response, string message)
    {
      //Add responds headers
      response.Headers.Add("Application-Error", message);
      response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
      response.Headers.Add("Access-Control-Allow-Origin", "*");
      
    }

    public static void AddPagination(this HttpResponse response,
      int currentPage, int itemsPerPage, int totalItems, int totalPages)
    {

      var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
      var camelCaseFormatter = new  JsonSerializerSettings();  // convert the capital letters to lower case
      camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
      response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
      response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

    }

    public static int CalculateAge(this DateTime theDateTime) // calculating age from the date of birth
    {
      var age = DateTime.Today.Year - theDateTime.Year;
      if (theDateTime.AddYears(age) > DateTime.Today)
        age--;

      return age;

    }
  }
}
