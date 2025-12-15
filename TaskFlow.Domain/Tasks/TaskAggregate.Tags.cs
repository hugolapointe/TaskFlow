namespace TaskFlow.Domain.Tasks;

using System.Collections.Generic;
using System.Linq;

public partial class TaskAggregate {

    private readonly HashSet<Tag> tags = [];
    public IReadOnlyCollection<Tag> Tags => tags.ToList().AsReadOnly();

    public bool HasTag(string name) {

        TagGuards.EnsureValidName(name);

        return tags.Contains(Tag.Create(name));
    }

    public void AddTag(string name) {

        TagGuards.EnsureValidName(name);

        tags.Add(Tag.Create(name));
    }

    public void RemoveTag(string name) {

        TagGuards.EnsureValidName(name);

        tags.Remove(Tag.Create(name));
    }
}
