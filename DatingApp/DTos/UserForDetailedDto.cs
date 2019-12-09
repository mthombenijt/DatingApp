using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.DTos
{
  public class UserForDetailedDto
  {
    // To mapp the user model class and the Dto, I use the AutoMapper
    public int Id { get; set; }

    public string Username { get; set; }

    public string Gender { get; set; }

    public int Age { get; set; }

    public string KnownAs { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime LastActive { get; set; }

    public string Introduction { get; set; }

    public string LookingFor { get; set; }

    public string Interests { get; set; }

    public string City { get; set; }

    public string Country { get; set; }

    public string PhotoUrl { get; set; }

    public ICollection<PhotosForDetailedDto>Photos{ get; set; }


  }
}
