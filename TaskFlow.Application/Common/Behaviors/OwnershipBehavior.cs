namespace TaskFlow.Application.Common.Behaviors;

using System.Threading;
using System.Threading.Tasks;

using MediatR;

using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;

public sealed class OwnershipBehavior<TRequest, TResponse>(
    ICurrentUserService currentUser
) : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull {

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken) {

        if (request is IRequireTaskOwnership owns) {
            var userId = currentUser.UserId
                ?? throw new ForbiddenAccessException();

            if (owns.OwnerId != userId)
                throw new ForbiddenAccessException();
        }

        return await next();
    }
}
