namespace TaskFlow.Domain.Tasks;

using System.Text.RegularExpressions;
using TaskFlow.Domain.Common;

public static class TagGuards {

    public const int TagNameMaxLength = 64;
    public const int TagNameMinLength = 1;
    public const string LettersOnlyPattern = "^[A-Za-z]+$";

    public static void EnsureValidName(string? input) {
        var trimmed = DomainGuard.Against.NullOrEmpty(input, nameof(input));
        DomainGuard.Against.InvalidLength(trimmed, nameof(input), TagNameMaxLength, TagNameMinLength);
        DomainGuard.Against.NotLetters(trimmed, nameof(input), LettersOnlyPattern);
    }
}
