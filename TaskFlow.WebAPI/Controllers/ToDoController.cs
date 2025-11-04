using Microsoft.AspNetCore.Mvc;

using TaskFlow.Core.Domain.Repositories;
using TaskFlow.Core.Domain.Services;
using TaskFlow.WebAPI.Mappers;
using TaskFlow.WebAPI.Models.Common;
using TaskFlow.WebAPI.Models.ToDo;

namespace TaskFlow.WebAPI.Controllers;

[ApiController]
[Route("api/todos")]
[Produces("application/json")]
public class ToDoController(ToDoService service, ToDoRepository repository) : ControllerBase {

    [HttpPost]
    [ProducesResponseType(typeof(ToDoDetails), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
    [ProducesResponseType(typeof(ToDoDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToDoDetails>> GetById(int id) {
        var todo = await repository.GetByIdAsync(id);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpGet]
    [ProducesResponseType(typeof(ItemList<ToDoItem>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ItemList<ToDoItem>>> GetAll(
          [FromQuery] ToDoQuery query) {

        var items = await repository.GetAllAsync(
              query.IsPriority,
              query.IsCompleted,
              query.SortBy.AsSortBy()
          );

        var response = items.AsItemList();
        return Ok(response);
    }

    [HttpGet("stats")]
    [ProducesResponseType(typeof(ToDoStats), StatusCodes.Status200OK)]
    public async Task<ActionResult<ToDoStats>> GetStats() {
        var statistics = await repository.GetStatsAsync();
        return Ok(statistics.AsStatsDto());
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(ToDoDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToDoDetails>> Update(
        int id,
        [FromBody] UpdateToDo command) {

        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var todo = await service.UpdateAsync(
            id,
            command.Description,
            command.DueDate,
            command.IsPriority
        );

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpPatch("{id}/toggle-priority")]
    [ProducesResponseType(typeof(ToDoDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToDoDetails>> TogglePriority(int id) {

        var todo = await service.TogglePriorityAsync(id);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpPatch("{id}/mark-as-completed")]
    [ProducesResponseType(typeof(ToDoDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToDoDetails>> MarkAsCompleted(int id) {

        var todo = await service.ToggleCompleteAsync(id);

        if (todo is null) {
            return NotFound();
        }

        return Ok(todo.AsDetails());
    }

    [HttpDelete("{id}/archive")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Archive(int id) {

        var success = await service.ArchiveAsync(id);

        if (!success) {
            return NotFound();
        }

        return NoContent();
    }
}