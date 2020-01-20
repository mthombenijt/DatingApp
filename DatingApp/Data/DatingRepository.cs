using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Helpers;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
  public class DatingRepository : IDatingRepository
  {
    private readonly DataContext _context;

    public DatingRepository(DataContext context)
    {
      _context = context;
    }

    public void Add<T>(T entity) where T : class // here we not using a Async because we saving to a local storage not in a database
    {
      _context.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

    public async Task<Photo> GetMainPhotoForUser(int userId)
    {
      return await _context.Photos.Where(u => u.UserId == userId)
             .FirstOrDefaultAsync(p => p.IsMain);

    }

    public async Task<Photo> GetPhoto(int id)
    {
      var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

      return photo;
    }

    public async Task<User> GetUser(int id) // we using async because we getting a value from a database
    {
      var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id); // get user by ID,it will include the photo as well (include generic method from user class) 

      return user;
     
    }

    public async Task<PagedList<User>> GetUsers(UserParams userParams) // change Inumeric to PagedList so that you can add User to PagedList
    {
      var users = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();
      // display all users besides the user who logged in
      users = users.Where(u => u.Id != userParams.UserId);
      // //dispaly gender which is different from a user who logged in
      users = users.Where(u => u.Gender == userParams.Gender);

      if (userParams.MinAge != 18 || userParams.MinAge != 99)
      {

        // formula to get the minimum date of birth
        var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);

        // formula to get the maximum date of birth
        var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

        // comparing the date of birth the user entered whith the min and max age 
        users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

      }
      // create a switch to order the users in descending order, arcoding to the last active user
      if (!string.IsNullOrEmpty(userParams.OrderBy))
      {
        switch (userParams.OrderBy)
        {
          case "created":
            users = users.OrderByDescending(u => u.DateCreated);
            break;
          default:
            users = users.OrderByDescending(u => u.LastActive);
            break;
        }

      }



      return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<bool> SaveAll()
    {

      return await _context.SaveChangesAsync() > 0;
    }
  }
}
