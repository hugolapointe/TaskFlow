namespace TaskFlow.Application.Mappings;

using AutoMapper;

using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Users;

public sealed class AdminProfile : Profile {
    public AdminProfile() {
        CreateMap<ApplicationUser, UserProfile>()
        .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Email))
        .ForMember(d => d.Roles, opt => opt.Ignore());
    }
}
