using API.Services;
using Microsoft.AspNetCore.Mvc;
using T5.API.Types;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkplaceController : ControllerBase
    {
        private readonly UpsertWorkplaceService _upsertWorkplaceService;

        public WorkplaceController(UpsertWorkplaceService upsertWorkplaceService)
        {
            _upsertWorkplaceService = upsertWorkplaceService;
        }

        [HttpPost(nameof(WorkplaceController.UpsertWorkplace))]
        public async Task<ActionResult<MutationOutput>> UpsertWorkplace(UpsertWorkplaceInput input)
        {
            var output = await _upsertWorkplaceService.ValidateAsync(input);

            if (output.ValidationErrors.Any()) return new BadRequestObjectResult(output);

            if (input.OnlyValidate == true) return new OkObjectResult(output);

            var id = await _upsertWorkplaceService.ExecuteAsync(input);

            return new OkObjectResult(new MutationOutput(id));
        }
    }
}
