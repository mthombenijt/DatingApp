using AutoMapper;
using DatingApp.DTos;
using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Helpers
{
  public class AutoMapperProfiles: Profile
  {

    public AutoMapperProfiles()
    {
      CreateMap<User, UserForListDto>() // mapping the user model to the UserFoListDTo
      .ForMember(dest => dest.PhotoUrl, opt =>
      {
        opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url); // getting photo url
      })
      .ForMember(dest => dest.Age, opt =>
      {
        opt.ResolveUsing(d => d.DateOfBirth.CalculateAge()); // displaying date of birth age
        
      });


      CreateMap<User, UserForDetailedDto>() // mapping the user model to the UserForDetailsDTo
       .ForMember(dest => dest.PhotoUrl, opt =>
         {
           opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url); // getting photo url
         })
        .ForMember(dest => dest.Age, opt =>
          {
            opt.ResolveUsing(d => d.DateOfBirth.CalculateAge()); // displaying date of birth age

          });


      CreateMap<Photo, PhotosForDetailedDto>();

    }
  }
}
