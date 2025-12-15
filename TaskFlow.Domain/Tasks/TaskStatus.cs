namespace TaskFlow.Domain.Tasks;

public enum TaskStatus {

    Pending, //........ Backlog
    Scheduled, //...... Planned for a specific date
    InProgress, //..... Blocked or currently being worked on
    Completed //....... Done
}
