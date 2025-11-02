using System.ComponentModel.DataAnnotations;

namespace TaskFlow.WebAPI.Models.ToDo;

public record CreateToDo(
    [Required]
    [StringLength(200, MinimumLength = 3)]
    string Description,

    DateTime? DueDate = null,
    bool IsPriority = false
);

public static class UpdateToDo {

    public record Description(
        [Required]
        [StringLength(200, MinimumLength = 3)]
        string Value
    );

    public record DueDate(DateTime? Value);
}