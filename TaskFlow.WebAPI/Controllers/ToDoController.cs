using Microsoft.AspNetCore.Mvc;

using TaskFlow.Core.Domain.Repositories;
using TaskFlow.Core.Domain.Services;
using TaskFlow.WebAPI.Mappers;
using TaskFlow.WebAPI.Models.Common;
using TaskFlow.WebAPI.Models.ToDo;

namespace TaskFlow.WebAPI.Controllers;

[ApiController]
[Route("api/todos")]
public class ToDoController(ToDoService service, ToDoRepository repository) : ControllerBase {
    
    [HttpPost]
    public async Task<ActionResult<ToDoDetails>> Create(
        [FromBody] CreateToDo command) {

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var todo = await service.CreateAsync(
            command.Description,
            command.DueDate,
            command.IsPriority
        );

        return CreatedAtAction(
            nameof(GetById),
            new { id = todo.Id },
            todo.AsDetails()
        );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ToDoDetails>> GetById(int id) {
        var todo = await repository.GetByIdAsync(id);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpGet]
    public async Task<ActionResult<PagedResponse<ToDoItem>>> GetAll(
        [FromQuery] ToDoQuery query) {

        var (items, totalCount) = await repository.GetAllAsync(
            query.IsPriority,
            query.IsCompleted,
            query.SortBy.AsSortBy(),
            query.Skip,
            query.Take
        );

        var response = items.AsPagedResponse(query.Page, query.PageSize, totalCount);
        return Ok(response);
    }

    [HttpPut("{id}/description")]
    public async Task<ActionResult<ToDoDetails>> UpdateDescription(
        int id, [FromBody] UpdateToDo.Description command) {

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var todo = await service.UpdateDescriptionAsync(id, command.Value);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpPut("{id}/due-date")]
    public async Task<ActionResult<ToDoDetails>> UpdateDueDate(
        int id, [FromBody] UpdateToDo.DueDate command) {

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var todo = await service.UpdateDueDateAsync(id, command.Value);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpPatch("{id}/toggle-priority")]
    public async Task<ActionResult<ToDoDetails>> TogglePriority(int id) {
        var todo = await service.TogglePriorityAsync(id);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpPatch("{id}/toggle-complete")]
    public async Task<ActionResult<ToDoDetails>> ToggleComplete(int id) {
        var todo = await service.ToggleCompleteAsync(id);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Archive(int id) {
        var success = await service.ArchiveAsync(id);

        if (!success) {
            return NotFound();
        }

        return NoContent();
    }
}