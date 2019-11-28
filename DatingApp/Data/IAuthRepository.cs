using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
  interface IAuthRepository
  {

    Task<User> Register(User user, string password);

    Task<User> LogIn(string username, string password);

    Task<bool> UserExists(string username);
  }
}
