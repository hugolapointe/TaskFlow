namespace TaskFlow.Domain.Common;

using System;
using System.Collections.Generic;

public abstract class BaseEntity {

    public Guid Id { get; protected set; }

    private readonly List<DomainEvent> events = new();
    public IReadOnlyCollection<DomainEvent> Events => events.AsReadOnly();

    protected void AddEvent(DomainEvent @event) {

        events.Add(@event);
    }

    public void ClearEvents() {

        events.Clear();
    }
}
