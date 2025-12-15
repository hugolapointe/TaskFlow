namespace TaskFlow.Domain.Tasks;

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using TaskFlow.Domain.Common;

public sealed class Tag : ValueObject {

    public string Name { get; private set; } = string.Empty;

    private Tag() { }

    private Tag(string name) {

        TagGuards.EnsureValidName(name);

        Name = name!.Trim().ToLowerInvariant();
    }

    public static Tag Create(string name) {

        return new Tag(name);
    }

    protected override IEnumerable<object?> Components() {

        yield return Name;
    }
}
