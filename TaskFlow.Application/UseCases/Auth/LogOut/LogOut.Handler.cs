namespace TaskFlow.Application.UseCases.Auth.LogOut;

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskFlow.Application.Common.Interfaces;

public sealed class LogOutHandler(IAuthService auth) : IRequestHandler<LogOutCommand> {
    public async Task Handle(LogOutCommand request, CancellationToken cancellationToken) {
        await auth.LogOutAsync(cancellationToken);
    }
}
