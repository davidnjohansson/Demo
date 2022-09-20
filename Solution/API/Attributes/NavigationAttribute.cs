namespace API.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class NavigationAttribute : Attribute
    {
        public string Name { get; set; }

        public NavigationAttribute(string name)
        {
            Name = name.StartsWith("FK") ? "_" + name : name;
        }
    }
}
