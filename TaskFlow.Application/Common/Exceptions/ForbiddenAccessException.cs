namespace TaskFlow.Application.Common.Exceptions;

using System;

public sealed class ForbiddenAccessException : Exception {

    public ForbiddenAccessException(string? message = null) : 
        base(message ?? "You do not have access to this resource.") {
    }
}
