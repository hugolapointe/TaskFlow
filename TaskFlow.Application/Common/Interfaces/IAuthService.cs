namespace TaskFlow.Application.Common.Interfaces;

using System;
using System.Threading;
using System.Threading.Tasks;

public interface IAuthService {

    Task<Guid> SignUpAsync(string email, string name, string password, CancellationToken ct);
    Task<string> LogInAsync(string email, string password, CancellationToken ct);
    Task LogOutAsync(CancellationToken ct);
}
