using System.ComponentModel.DataAnnotations;

namespace TaskFlow.WebAPI.Models.ToDo;

public record CreateToDo(
    [Required]
    [Length(3, 200)]
    string Description,

    DateTime? DueDate = null,
    bool IsPriority = false
);

public record UpdateToDo(
    [Required]
    [Length(3, 200)]
    string Description,

    DateTime? DueDate = null,
    bool IsPriority = false,
    bool IsCompleted = false
);