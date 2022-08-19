﻿namespace API.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class PropertyAttribute : Attribute
    {
        public string Name { get; set; }

        public PropertyAttribute(string name)
        {
            Name = "_" + name;
        }
    }
}
