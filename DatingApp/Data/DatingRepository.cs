using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

    public async Task<IEnumerable<User>> GetUsers()
    {
      var user = await _context.Users.Include(p => p.Photos).ToListAsync();

      return user;
    }

    public async Task<bool> SaveAll()
    {

      return await _context.SaveChangesAsync() > 0;
    }
  }
}
