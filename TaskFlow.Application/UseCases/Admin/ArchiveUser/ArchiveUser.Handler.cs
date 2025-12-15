namespace TaskFlow.Application.UseCases.Admin.ArchiveUser;

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Exceptions;

public sealed class ArchiveUserHandler(IUserRepository users) : IRequestHandler<ArchiveUserCommand>
{
 public async Task<Unit> Handle(ArchiveUserCommand request, CancellationToken cancellationToken)
 {
 var user = await users.GetByIdAsync(request.UserId, cancellationToken) ?? throw new NotFoundException("User", request.UserId);
 user.Archive();
 await users.UpdateAsync(user, cancellationToken);
 return Unit.Value;
 }
}
