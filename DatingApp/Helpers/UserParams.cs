using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helpers
{
  public class UserParams
  {

    private const int MaxPageSize = 50;

    public int PageNumber { get; set; } = 1; // Default PageNumber


    private int pageSize = 5; // Default PageSize

    public int PageSize 
    {
      get { return pageSize; }
      // if value the user enter is greater than the maxPageSize, we will dispaly the default maxpagesize,other wise dispaly value
      set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }

    public int UserId { get; set; }

    public string Gender { get; set; }

    public int MinAge { get; set; } = 18;

    public int MaxAge { get; set; } = 99;

    public string OrderBy { get; set; }








  }
}
