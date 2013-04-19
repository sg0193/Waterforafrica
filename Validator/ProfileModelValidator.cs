using Events.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WaterForAfrica.Validator
{
    public class ProfileModelValidator : AbstractValidator<ProfileModel>
    {
        public ProfileModelValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.UserName)
               .EmailAddress()
               .WithMessage("should be a valid Email address");
            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.cnfmPassword)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.cnfmPassword)
                .Equal(x => x.Password)
                .WithMessage("Passwords doesnt match");
        }
    }
}