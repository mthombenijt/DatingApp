using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.DTos
{
  public class PhotoForCreationDto
  {

    public string Url { get; set; }

    public IFormFile File { get; set; } // the photo  i am uploading

    public string Description { get; set; }

    public DateTime DateAdded { get; set; }

    public string PublicId { get; set; } // ID that we gonna get back from cloudinary

    public PhotoForCreationDto()
    {

      DateAdded = DateTime.Now;

    }
  }
}
