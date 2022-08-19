using System.Collections;

namespace API.Extensions
{
    public static class BFExtensions
    {
        public static bool EqualsAny<T>(this T value, params T[] values)
        {
            if (value != null && values != null)
            {
                foreach (T item in values)
                {
                    if (value.Equals(item))
                        return true;
                }
                return false;
            }
            else
                return false;
        }
    }
}
