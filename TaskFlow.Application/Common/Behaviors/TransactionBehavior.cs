namespace TaskFlow.Application.Common.Behaviors;

using System.Threading;
using System.Threading.Tasks;

using MediatR;

using TaskFlow.Application.Common.Interfaces;

public sealed class TransactionBehavior<TRequest, TResponse>(
    IUnitOfWork unitOfWork
) : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull {

    public async Task<TResponse> Handle(
    TRequest request,
    RequestHandlerDelegate<TResponse> next,
    CancellationToken cancellationToken) {

        var response = await next();
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return response;
    }
}
