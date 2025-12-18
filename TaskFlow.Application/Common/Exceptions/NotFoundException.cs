namespace TaskFlow.Application.Common.Exceptions;

using System;

public sealed class NotFoundException : Exception {

    public NotFoundException(string name, object key) : 
        base($"{name} ({key}) was not found.") {
    }
}
