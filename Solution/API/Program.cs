using API.Data;
using API.GraphQL;
using API.Services;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<T6DbContext>(opt =>
{
    opt.UseLazyLoadingProxies();
    opt.UseSqlServer("Data Source=./;Initial Catalog=T5_FLEXILAST;User Id=T5-SQL-USER;Password=%3jn__!asdei;Persist Security Info=True");
});

builder.Services.AddInMemorySubscriptions();

builder.Services.AddScoped<UpsertArbetsplatsService>();

builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<T6DbContext>()
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