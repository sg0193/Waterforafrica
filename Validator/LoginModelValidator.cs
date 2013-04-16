using Events.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WaterForAfrica.Validator
{
    public class LoginModelValidator : AbstractValidator<LoginModel>
    {
        public LoginModelValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("UserName cannot be empty");
            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password cannot be empty");
        }
    }
}