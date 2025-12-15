namespace TaskFlow.Application.UseCases.Admin.ArchiveUser;

using System;
using MediatR;

public sealed record ArchiveUserCommand(Guid UserId) : IRequest;
