using API.Services;
using T5.API.Types;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<MutationOutput> UpsertWorkplace([Service] UpsertWorkplaceService service, UpsertWorkplaceInput input)
        {
            var output = await service.ValidateAsync(input);

            if (input.OnlyValidate == true || output.ValidationErrors.Any()) return output;

            return await service.ExecuteAsync(input);
        }
    }
}
