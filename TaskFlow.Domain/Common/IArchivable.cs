namespace TaskFlow.Domain.Common;

public interface IArchivable {

    bool IsArchived { get; }

    void Archive();
}
