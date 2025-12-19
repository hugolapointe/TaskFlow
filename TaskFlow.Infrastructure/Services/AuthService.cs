namespace TaskFlow.Infrastructure.Services;

using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Application.Common.Exceptions;
using TaskFlow.Domain.Users;
using System.IdentityModel.Tokens.Jwt;

public class AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) : IAuthService {

    public async Task<Guid> SignUpAsync(string email, string name, string password, CancellationToken ct) {
        var user = new ApplicationUser { UserName = email, Email = email, Name = name };
        var result = await userManager.CreateAsync(user, password);

        if (!result.Succeeded) {
            throw new InvalidOperationException($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        await signInManager.SignInAsync(user, isPersistent: false);

        return user.Id;
    }

    public async Task<string> LogInAsync(string email, string password, CancellationToken ct) {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null) {
            throw new NotFoundException("User", email);
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: false);

        if (!result.Succeeded) {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        // At this point, the user is authenticated.
        // We need to generate a JWT token. This will require a separate service or configuration.
        // For now, returning a placeholder.
        // This is a placeholder and needs proper JWT generation.
        return await GenerateJwtToken(user);
    }

    public async Task LogOutAsync(CancellationToken ct) {
        await signInManager.SignOutAsync();
    }

    private async Task<string> GenerateJwtToken(ApplicationUser user) {
        // This is a placeholder. Real JWT generation involves:
        // 1. Defining claims (e.g., UserId, Email, Roles)
        // 2. Creating SymmetricSecurityKey
        // 3. Creating SigningCredentials
        // 4. Creating JwtSecurityToken
        // 5. Writing the token

        if (user.Email is null) {
            throw new InvalidOperationException("User email is null.");
        }
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        // For simplicity and to avoid adding all JWT packages now,
        // we'll return a dummy token.
        // Proper implementation will use Microsoft.IdentityModel.Tokens and System.IdentityModel.Tokens.Jwt
        return "dummy_jwt_token_needs_real_implementation";
    }
}
