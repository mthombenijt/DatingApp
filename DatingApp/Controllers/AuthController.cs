using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Data;
using DatingApp.DTos;
using DatingApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController] //Use thsi ApiController if you not gonna use [frombody] attribute and model state
    public class AuthController : ControllerBase
    {
    private readonly IAuthRepository _repo;
    private readonly IConfiguration _config;
    private readonly IMapper _mapper;

    public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
    {
      _repo = repo;
      _config = config;
      _mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      //validate first

      userForRegisterDto.Username = userForRegisterDto.Username.ToLower(); //convert the username to lower case, to avoid duplicates

      if (await _repo.UserExists(userForRegisterDto.Username))
      
        return BadRequest("username already exist");

      var userToCreate = _mapper.Map<User>(userForRegisterDto);
      

      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

      var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser); // return the users data with out a password

      return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id }, userToReturn);


    }

    [HttpPost("ligIn")] // we calling this from our postman
    public async Task<IActionResult> LogIn(UserForLogInDto userForLogInDto)
    {


      var userFromRepo = await _repo.LogIn(userForLogInDto.Username.ToLower(), userForLogInDto.Password);

      if (userFromRepo == null)

        return Unauthorized(); //User Not found

      var claims = new[]
      {
        new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        new Claim(ClaimTypes.Name, userFromRepo.Username),
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); //Token Credentials key

      var tokenDescriptor = new SecurityTokenDescriptor
      {

        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(1), //tell the application when the Token should expire
        SigningCredentials = creds
        
      };

      var tokenHandler = new JwtSecurityTokenHandler(); //create the token using jwt

      var token = tokenHandler.CreateToken(tokenDescriptor);


      var user = _mapper.Map<UserForListDto>(userFromRepo); // mapping the list in Dto and userfrmRepo(user who current login)
      return Ok(new
      {

        token = tokenHandler.WriteToken(token), // write the Token to the responds and send back to the user
        user
      });


    }
    } 
  }

