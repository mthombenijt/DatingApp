using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Models
{
  public class Like
  {

    public int LikerId { get; set; } // a LikerId of a user which like others users

    public int LikeeId { get; set; } // a LikeeId of a user which has been liked by other users

    public User Liker { get; set; } // user which like other users

    public User Likee { get; set; } // user which has been liked by other users


  }
}
