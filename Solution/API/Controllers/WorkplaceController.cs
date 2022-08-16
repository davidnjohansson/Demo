using API.Services;
using Microsoft.AspNetCore.Mvc;
using T5.API.Types;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkplaceController : ControllerBase
    {
        [HttpPost(nameof(WorkplaceController.UpsertWorkplace))]
        public async Task<ActionResult<MutationOutput>> UpsertWorkplace([FromServices] UpsertWorkplaceService service, UpsertWorkplaceInput input)
        {
            var output = await service.ValidateAsync(input);

            if (input.OnlyValidate == true || output.ValidationErrors.Any()) return output;

            return await service.ExecuteAsync(input);
        }
    }
}
