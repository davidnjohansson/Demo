using API.Services;
using T5.API.Types;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<MutationOutput> UpsertArbetsplats([Service] UpsertArbetsplatsService service, UpsertArbetsplatsInput input)
        {
            var output = await service.ValidateAsync(input);

            if (input.OnlyValidate == true || output.ValidationErrors.Any()) return output;

            var pk = await service.ExecuteAsync(input);

            return new MutationOutput(pk);
        }
    }
}
