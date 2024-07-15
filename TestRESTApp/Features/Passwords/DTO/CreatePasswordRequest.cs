using System.ComponentModel.DataAnnotations;
using TestRESTApp.Entities;

namespace TestRESTApp.Features.Passwords.DTO;

public class CreatePasswordRequest
{
    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public string Value { get; set; } = null!;

    [Required]
    public PasswordPurposeType Purpose { get; set; }
}
