namespace TaskFlow.Application.Common.Behaviors;

using System.Threading;
using System.Threading.Tasks;

using MediatR;

using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Application.Common.Interfaces;

public sealed class AuthorizationBehavior<TRequest, TResponse>(
    ICurrentUserService currentUser
) : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull {

    public async Task<TResponse> Handle(
    TRequest request,
    RequestHandlerDelegate<TResponse> next,
    CancellationToken cancellationToken) {

        if (!currentUser.IsAuthenticated) throw new ForbiddenAccessException();
        return await next();
    }
}
