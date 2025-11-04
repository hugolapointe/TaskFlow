namespace TaskFlow.Core.Domain.ValueObjects;

public sealed class ToDoStatistics(int total, int priority, int nonPriority, int completed) : ValueObject {
    public int Total { get; init; } = total;
    public int Priority { get; init; } = priority;
    public int NonPriority { get; init; } = nonPriority;
    public int Completed { get; init; } = completed;

    public static ToDoStatistics Empty => new(0, 0, 0, 0);

    protected override IEnumerable<object?> GetEqualityComponents() {
        yield return Total;
        yield return Priority;
        yield return NonPriority;
        yield return Completed;
    }
}
