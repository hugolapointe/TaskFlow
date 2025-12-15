namespace TaskFlow.Domain.Common;

using System;

public interface IOwnedBy {

    Guid OwnerId { get; }
}
