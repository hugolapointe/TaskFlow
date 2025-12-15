namespace TaskFlow.Application.UseCases.Tasks.CreateTask;

using FluentValidation;

public sealed class CreateTaskValidator : AbstractValidator<CreateTaskCommand>
{
 public CreateTaskValidator()
 {
 RuleFor(x => x.Description).NotEmpty().MaximumLength(TaskFlow.Domain.Tasks.TaskGuards.DescriptionMaxLength);
 }
}
