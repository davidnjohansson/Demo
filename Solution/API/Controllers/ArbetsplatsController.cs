using API.Services;
using Microsoft.AspNetCore.Mvc;
using T5.API.Types;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArbetsplatsController : ControllerBase
    {
        private readonly UpsertArbetsplatsService _upsertArbetsplatsService;

        public ArbetsplatsController(UpsertArbetsplatsService upsertArbetsplatsService)
        {
            _upsertArbetsplatsService = upsertArbetsplatsService;
        }

        [HttpPost(nameof(ArbetsplatsController.UpsertArbetsplats))]
        public async Task<ActionResult<MutationOutput>> UpsertArbetsplats(UpsertArbetsplatsInput input)
        {
            var output = await _upsertArbetsplatsService.ValidateAsync(input);

            if (output.ValidationErrors.Any()) return new BadRequestObjectResult(output);

            if (input.OnlyValidate == true) return new OkObjectResult(output);

            var pk = await _upsertArbetsplatsService.ExecuteAsync(input);

            return new OkObjectResult(new MutationOutput(pk));
        }
    }
}
