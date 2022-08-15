using API.Data;
using API.GraphQL;
using API.Services;
using HotChocolate.Types.Pagination;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DemoDbContext>();

builder.Services.AddInMemorySubscriptions();

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