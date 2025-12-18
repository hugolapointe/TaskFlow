namespace TaskFlow.Domain.Tasks;

using System;
using System.Collections.Generic;

using TaskFlow.Domain.Common;

public static class TaskGuards {

    public const int DescriptionMaxLength = 1024;
    public const int DescriptionMinLength = 1;

    public static void EnsureValidDescription(string? input) {

        var trimmed = DomainGuard.Against.NullOrEmpty(input, nameof(input));
        DomainGuard.Against.InvalidLength(trimmed, nameof(input), DescriptionMaxLength, DescriptionMinLength);
    }

    public static void EnsureTagsNotNull(IEnumerable<string>? input) {

        DomainGuard.Against.Null(input, nameof(input));
    }

    public static void EnsureNotCompleted(TaskStatus status) {

        if (status == TaskStatus.Completed)
            throw new InvalidOperationException("A completed task cannot be marked in progress.");
    }
}
