using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using TestRESTApp.Features.Passwords.CQRS;
using TestRESTApp.Features.Passwords.DTO;

namespace TestRESTApp.Features.Passwords;

[Route("[controller]")]
[ApiController]
[TranslateResultToActionResult]
public class PasswordsController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<Result<PasswordDto[]>> GetAll()
    {
        return await sender.Send(CQRS.GetAll.Query.Instance);
    }

    [HttpPost]
    public async Task<Result> Create(CreatePasswordRequest request)
    {
        var command = new Create.Command(request.Name, request.Value, request.Purpose);

        return await sender.Send(command);
    }

    [HttpDelete("{passwordName}")]
    public async Task<Result> Delete(string passwordName)
    {
        var command = new Delete.Command(passwordName);

        return await sender.Send(command);
    }
}
