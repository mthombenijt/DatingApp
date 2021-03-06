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
      CreateMap<User,UserForListDto>() // mapping the user model to the UserFoListDTo
      .ForMember(dest => dest.PhotoUrl, opt => // dest = destination, opt = option
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

      CreateMap<UserForUpdateDto, User>(); // mapping for the update dto NB
   
      CreateMap<Photo, PhotoForReturnDto>(); // mapping the photoReturn to the Photo class

      CreateMap<PhotoForCreationDto, Photo>();

      CreateMap<UserForRegisterDto, User>();


    }
  }
}
