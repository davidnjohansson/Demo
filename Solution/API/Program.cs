using API.Data.Export;
using API.GraphQL;
using API.HelperServices;
using API.Interfaces;
using API.Services.UpsertWorkplace;
using API.Types;
using HotChocolate.Types.Pagination;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

#region Set secret
string fileName = ".secret.json";
string path = $"{Directory.GetCurrentDirectory()}\\{fileName}";

if (File.Exists(path) == false)
{
    File.WriteAllText(path, JsonSerializer.Serialize(new Secret()));
}

var json = File.ReadAllText(fileName);
var secret = JsonSerializer.Deserialize<Secret>(json)!;

foreach (var property in secret.GetType().GetProperties())
{
    if (property.Name == nameof(secret.ConnectionString))
    {
        if (string.IsNullOrEmpty(secret.ConnectionString))
        {
            Console.Write($"{property.Name}: ");
            secret.ConnectionString = Console.ReadLine() ?? string.Empty;
        }
        builder.Configuration[property.Name] = secret.ConnectionString;
    }
}

var newJson = JsonSerializer.Serialize(secret);
File.WriteAllText(path, newJson);
#endregion

// Add services to the container.
builder.Services.AddDbContext<DemoDbContext>();

builder.Services.AddInMemorySubscriptions();

builder.Services.AddScoped<ValidationService>();

builder.Services.AddScoped<UpsertWorkplaceService>();

builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<DemoDbContext>()
    .SetPagingOptions(new PagingOptions
    {
        AllowBackwardPagination = true,
        DefaultPageSize = 100,
        IncludeTotalCount = true,
        MaxPageSize = 1000
    })
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddType<IEntity>()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>()
    .AddSubscriptionType<Subscription>();

builder.Services.AddCors(opt =>
{
    if (builder.Environment.IsDevelopment())
    {
        opt.AddPolicy(name: "Development", builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });
    }
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("Development");
}

app.UseWebSockets();
app.MapControllers();
app.MapGraphQL();
app.Run();
