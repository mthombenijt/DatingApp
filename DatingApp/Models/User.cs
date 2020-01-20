using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Models
{
  public class User
  {
   
    public int Id { get; set; }

    public string Username { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public string Gender { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int MyProperty { get; set; }

    public string KnownAs { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime LastActive { get; set; }

    public string Introduction { get; set; }

    public string LookingFor { get; set; }

    public string Interests { get; set; }

    public string City { get; set; }

    public string Country { get; set; }

    public ICollection<Photo> Photos { get; set; } // one to many relationship

    public ICollection<Like> Likers { get; set; } // many to many relationship(many users can like one user)

    public ICollection<Like> Likees { get; set; } // many to many relationship(many users can be like by one user)







  }
}
