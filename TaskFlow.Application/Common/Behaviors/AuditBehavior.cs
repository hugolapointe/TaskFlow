namespace TaskFlow.Application.Common.Behaviors;

using System.Threading;
using System.Threading.Tasks;

using MediatR;

using TaskFlow.Application.Common.Interfaces;

public sealed class AuditBehavior<TRequest, TResponse>(ICurrentUserService currentUser)
 : IPipelineBehavior<TRequest, TResponse>
 where TRequest : notnull
{
 public async Task<TResponse> Handle(
 TRequest request,
 RequestHandlerDelegate<TResponse> next,
 CancellationToken cancellationToken)
 {
 var response = await next();
 return response;
 }
}
