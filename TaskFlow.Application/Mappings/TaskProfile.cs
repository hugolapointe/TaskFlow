namespace TaskFlow.Application.Mappings;

using AutoMapper;

using TaskFlow.Application.Common.Models;
using TaskFlow.Domain.Tasks;

public sealed class TaskProfile : Profile {

    public TaskProfile() {

        CreateMap<TaskAggregate, TaskItem>()
        .ForMember(d => d.Tags, opt => opt.MapFrom(s => s.Tags.Select(t => t.Name).ToArray()))
        .ForMember(d => d.IsPending, opt => opt.MapFrom(s => s.IsPending))
        .ForMember(d => d.IsScheduled, opt => opt.MapFrom(s => s.IsScheduled))
        .ForMember(d => d.IsInProgress, opt => opt.MapFrom(s => s.IsInProgress))
        .ForMember(d => d.IsCompleted, opt => opt.MapFrom(s => s.IsCompleted));

        CreateMap<TaskAggregate, TaskDetails>()
        .ForMember(d => d.Tags, opt => opt.MapFrom(s => s.Tags.Select(t => t.Name).ToArray()))
        .ForMember(d => d.IsPending, opt => opt.MapFrom(s => s.IsPending))
        .ForMember(d => d.IsScheduled, opt => opt.MapFrom(s => s.IsScheduled))
        .ForMember(d => d.IsInProgress, opt => opt.MapFrom(s => s.IsInProgress))
        .ForMember(d => d.IsCompleted, opt => opt.MapFrom(s => s.IsCompleted));
    }
}
