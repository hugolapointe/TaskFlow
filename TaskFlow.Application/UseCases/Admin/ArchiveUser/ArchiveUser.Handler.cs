namespace TaskFlow.Application.UseCases.Admin.ArchiveUser;

using MediatR;

using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;

public sealed class ArchiveUserHandler(IUserRepository users) : IRequestHandler<ArchiveUserCommand> {

    public async Task Handle(ArchiveUserCommand request, CancellationToken cancellationToken) {

        var user = await users.GetByIdAsync(request.UserId, cancellationToken) ?? 
            throw new NotFoundException("User", request.UserId);

        user.Archive();
        await users.UpdateAsync(user, cancellationToken);
    }
}
