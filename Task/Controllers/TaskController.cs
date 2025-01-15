using Microsoft.AspNetCore.Mvc;
 
namespace Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private static readonly List<Domain.Task> tasks = new();

        // Obtener todas las tareas
        [HttpGet("")]
        public ActionResult<IEnumerable<Domain.Task>> GetTasks()
        {
            return Ok(tasks);
        }

        // Crear una nueva tarea
        [HttpPost("")]
        public ActionResult<Domain.Task> CreateTask(Domain.Task task)
        {
            task.Id = task.Id = new Random().Next(1, int.MaxValue);
            tasks.Add(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

       
    }
}
