using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Data;
using DatingApp.DTos;
using DatingApp.Helpers;
using DatingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Controllers
{

  [ServiceFilter(typeof(LogUserActivity))] // add the service filter that will track the user activity 
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly IDatingRepository _repo;
    private readonly IMapper _mapper;

    public UsersController(IDatingRepository repo, IMapper mapper)
    {
      _repo = repo;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams) // set fromQuery to tell the api where to get the data
    {
      // get user who loged in
      var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

      var userFromRepo = await _repo.GetUser(currentUserId);

      userParams.UserId = currentUserId; // compare the id of the user who logged in and the id of the user in a database

      if (string.IsNullOrEmpty(userParams.Gender))
      {
        // compare if the user who loged in is the male or female
        userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";

      }

      var users = await _repo.GetUsers(userParams);

      var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

      Response.AddPagination(users.CurrentPage, users.PageSize, // add paggination headers in a controller
        users.TotalCount, users.TotalPages);

      return Ok(usersToReturn);
    }

    [HttpGet("{id}", Name = "GetUser")]  // give the end point a name so that you can use it
    public async Task<IActionResult> GetUser(int id)
    {
      var user = await _repo.GetUser(id);

      var userToReturn = _mapper.Map<UserForDetailedDto>(user); // using Auto mapper and DTo to return the specific properties from the user 

      return Ok(userToReturn);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
    {
      if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // the method to check if the person who wanna update is the person who loggedin
        return Unauthorized();

      var userFromRepo = await _repo.GetUser(id);

      _mapper.Map(userForUpdateDto, userFromRepo); // map the userforUpdateDto and userFromRepo

      if (await _repo.SaveAll())
        return NoContent();

      throw new Exception($"updating user {id} failed on save");

    }

    [HttpPost("{id}/like/{recipientId}")]
    public async Task<IActionResult> LikeUser(int id, int recipientId) {
      if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // the method to check if the person who wanna update is the person who loggedin
        return Unauthorized();

      var like = await _repo.GetLike(id, recipientId); // to check if like does exist by calling the getlike method from the repository

      if (like != null) // check if you have already like the user
        return BadRequest("You already like this user");

      if (await _repo.GetUser(recipientId) == null) // check if the recepient of the like exist
        return NotFound();

      like = new Like   // create a new like
      {
        LikerId = id,
        LikeeId = recipientId,
      };

      _repo.Add<Like>(like); // add a new like in a _repo 

      if (await _repo.SaveAll()) // save a new _repo to a data base
        return Ok();

     return BadRequest("Failed to save user"); // if did not save succesfully we send bad request


    }







  }
}
