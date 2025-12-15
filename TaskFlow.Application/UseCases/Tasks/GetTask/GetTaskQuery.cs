namespace TaskFlow.Application.UseCases.Tasks.GetTask;

using System;
using MediatR;
using TaskFlow.Application.Common.Models;

public sealed record GetTaskQuery(Guid TaskId) : IRequest<TaskDetails>;
