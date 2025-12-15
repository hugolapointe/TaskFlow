namespace TaskFlow.Application.UseCases.Auth.SignUp;

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskFlow.Application.Common.Interfaces;

public sealed class SignUpHandler(IAuthService auth) : IRequestHandler<SignUpCommand, Guid>
{
 public async Task<Guid> Handle(SignUpCommand request, CancellationToken cancellationToken)
 {
 return await auth.SignUpAsync(request.Email, request.Name, request.Password, cancellationToken);
 }
}
