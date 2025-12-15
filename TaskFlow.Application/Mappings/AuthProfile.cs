namespace TaskFlow.Application.Mappings;

using AutoMapper;
using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Users;

public sealed class AuthProfile : Profile
{
 public AuthProfile()
 {
 CreateMap<ApplicationUser, UserProfile>()
 .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Email))
 .ForMember(d => d.Roles, opt => opt.Ignore());
 }
}
