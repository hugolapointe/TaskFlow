using Microsoft.AspNetCore.Mvc;

using TaskFlow.Core.Domain.Services;
using TaskFlow.WebAPI.Mappers;
using TaskFlow.WebAPI.Models.ToDo;

namespace TaskFlow.WebAPI.Controllers;

[ApiController]
[Route("api/todos")]
public class ToDoController(ToDoService service) : ControllerBase {

    [HttpPost]
    public async Task<ActionResult<ToDoDetails>> Create(CreateToDo command) {

        if (!ModelState.IsValid) return BadRequest(ModelState);

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

        var todo = await service.GetByIdAsync(id);

        if (todo is null) return NotFound();

        return Ok(todo.AsDetails());
    }

    [HttpGet]
    public async Task<ActionResult<ToDoItemList>> GetAll([FromQuery] ToDoQuery query) {

        var todos = await service.GetAllAsync(
            query.IsPriority,
            query.IsCompleted,
            query.SortBy.AsSortBy()
        );

        return Ok(todos.AsItemList());
    }

    [HttpPut("{id}/description")]
    public async Task<ActionResult<ToDoDetails>> UpdateDescription(
        int id, UpdateToDo.Description command) {

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var todo = await service.UpdateDescriptionAsync(id, command.Value);
        if (todo is null) return NotFound();

        return Ok(todo.AsDetails());
    }

    [HttpPut("{id}/due-date")]
    public async Task<ActionResult<ToDoDetails>> UpdateDueDate(
        int id, UpdateToDo.DueDate command) {

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var todo = await service.UpdateDueDateAsync(id, command.Value);
        if (todo is null) return NotFound();

        return Ok(todo.AsDetails());
    }

    [HttpPatch("{id}/toggle-priority")]
    public async Task<IActionResult> TogglePriority(int id) {

        var todo = await service.TogglePriorityAsync(id);
        if (todo is null) return NotFound();

        return Ok();
    }

    [HttpPatch("{id}/toggle-complete")]
    public async Task<IActionResult> ToggleComplete(int id) {

        var todo = await service.ToggleCompleteAsync(id);
        if (todo is null) return NotFound();

        return Ok();
    }

    [HttpDelete("{id}/archive")]
    public async Task<IActionResult> Archive(int id) {

        await service.ArchiveAsync(id);
        return Ok();
    }
}