namespace TaskFlow.Application.UseCases.Auth.LogIn;

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskFlow.Application.Common.Interfaces;

public sealed class LogInHandler(IAuthService auth) : IRequestHandler<LogInCommand, string>
{
 public async Task<string> Handle(LogInCommand request, CancellationToken cancellationToken)
 {
 return await auth.LogInAsync(request.Email, request.Password, cancellationToken);
 }
}
