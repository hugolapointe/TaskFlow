namespace TaskFlow.Domain.Common;

using System;

public interface IAuditable {

    DateTime CreatedAt { get; }
    Guid CreatedBy { get; }

    DateTime LastUpdatedAt { get; }
    Guid LastUpdatedBy { get; }
}
