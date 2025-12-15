namespace TaskFlow.Domain.Common;

using System;
using System.Collections.Generic;
using System.Linq;

public abstract class ValueObject {

    protected abstract IEnumerable<object?> Components();

    public override bool Equals(object? obj) {

        if (obj is null || obj.GetType() != GetType()) return false;
        var other = (ValueObject)obj;

        return Components().SequenceEqual(other.Components());
    }

    public override int GetHashCode() {

        return Components().Aggregate(0, (hash, obj) => {
            unchecked {
                return hash * 31 + (obj?.GetHashCode() ?? 0);
            }
        });
    }
}
