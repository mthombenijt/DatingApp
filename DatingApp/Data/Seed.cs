using DatingApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
  public class Seed
  {
    private readonly DataContext _context;

    public Seed(DataContext context)
    {
      _context = context;
    }

    public void SeedUsers(){

      var userData = System.IO.File.ReadAllText("Data/userSeedData.json");
      var users = JsonConvert.DeserializeObject<List<User>>(userData); //serialize this into object

      foreach (var user in users)
      {
        byte[] passwordHash, passwordSalt;
        createPasswordHash("password", out passwordHash, out passwordSalt);

        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        user.Username = user.Username.ToLower();

        _context.Users.Add(user);
      }

       _context.SaveChanges();
    }

    private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) // create passwordHash
    {

      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

      }
    }


  }
}
