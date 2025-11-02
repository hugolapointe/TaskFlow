using System.ComponentModel.DataAnnotations;

namespace TaskFlow.Core.Domain.Entities;

public class ToDo {

    public int Id { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }

    // Status fields
    public bool IsPriority { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsArchived { get; set; }

    // Audit fields
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // EF Core requires a parameterless constructor
    private ToDo() { }

    public ToDo(string description) {
        Description = description;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = CreatedAt;
    }
}