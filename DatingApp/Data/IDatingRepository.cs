using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
  public interface IDatingRepository
  {
    void Add<T>(T entity) where T : class; // use generic method,this method will add both the user and the photo
    void Delete<T>(T entity) where T : class; // use generic method/ <T> is the type, (T entity) is the parameters

    Task<bool> SaveAll();

    Task<IEnumerable<User>> GetUsers(); //list all Users

    Task<User> GetUser(int id); //list one user depends on the ID

    Task<Photo> GetPhoto(int id);

    Task<Photo> GetMainPhotoForUser(int userId);

  }
}
