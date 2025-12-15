namespace TaskFlow.Application.UseCases.Tasks.UpdateTask;

using FluentValidation;

public sealed class UpdateTaskValidator : AbstractValidator<UpdateTaskCommand>
{
 public UpdateTaskValidator()
 {
 RuleFor(x => x.Description).NotEmpty().MaximumLength(TaskFlow.Domain.Tasks.TaskGuards.DescriptionMaxLength);
 }
}
