namespace TaskFlow.Application.Common.Interfaces;

using System;

public interface IRequireTaskOwnership {
    Guid OwnerId { get; }
}
