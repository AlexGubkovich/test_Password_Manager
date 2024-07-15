namespace TestRESTApp.Entities;

public class Password
{
    public required string Name { get; set; }

    public required string Value { get; set; }

    public DateTime CreationTime { get; set; }

    public PasswordPurposeType Purpose { get; set; }
}
