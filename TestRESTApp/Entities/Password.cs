namespace TestRESTApp.Entities;

public class Password
{
    public required string Name { get; set; }

    public required string Value { get; set; }

    public DateTime CreationDate { get; set; }

    public PasswordPurposeType Purpose { get; set; }
}
