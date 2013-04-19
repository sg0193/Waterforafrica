using Events.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WaterForAfrica.Validator
{
    public class EventModelValidator : AbstractValidator<EventModel>
    {
        public EventModelValidator()
        {
            RuleFor(x => x.EventDescription)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("cannot be empty");
            RuleFor(x => x.StartDate)
                .LessThanOrEqualTo(x => x.EndDate)
                .WithMessage("cannot be after To");
            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage("cannot be empty");
        }
    }
}