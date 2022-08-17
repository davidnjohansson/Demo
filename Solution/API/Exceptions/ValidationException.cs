using Microsoft.EntityFrameworkCore;
using T5.API.Types;

namespace API.Exceptions
{
    public class ValidationException : DbUpdateException
    {
        public List<ValidationError> ValidationErrors { get; set; }

        public ValidationException(List<ValidationError>? validationErrors = null)
        {
            ValidationErrors = validationErrors ?? new List<ValidationError>();
        }
    }
}
