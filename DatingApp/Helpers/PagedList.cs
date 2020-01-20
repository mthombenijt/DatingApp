using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helpers
{
  public class PagedList<T>: List<T>
  {

    public int CurrentPage { get; set; }

    public int TotalPages { get; set; }

    public int PageSize { get; set; }

    public int TotalCount { get; set; }

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {

      TotalCount = count;
      PageSize = pageSize;
      CurrentPage = pageNumber;
      // count total number of users, pageSize is the number of users you want to see on a page
      // counting the number of pages,Ceiling represents the smalles number
      TotalPages = (int)Math.Ceiling(count / (double)pageSize); 
      this.AddRange(items);

    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source,
           int pageNumber, int pageSize)
    {
      var count = await source.CountAsync();
      // if you want to skip the page to the next page you should use this fomula (pagenumber-1) * pageSize
      var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
      return new PagedList<T>(items, count, pageNumber,pageSize);

    }


  }
}
