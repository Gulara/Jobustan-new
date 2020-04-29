


//FOR REGISTER.HTML
  //////////////
 // Wait for the DOM to be ready
 $(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
    
      resumeFirstName: {
          required: true,

      },
      resumeLastName: {
          required: true,

      },
      resumePhoneNumber: {
          required: true,
          minlength: 8
      },
     resumeCity: {
          required: true,

      }
    },
    // Specify validation error messages
    messages: {
    
      resumeLastName: {
          required: "Please enter your last name",
      },
      resumeFirstName: "Please enter your first name",
      resumePhoneNumber: {
          required: "Please enter your phone number",
          minlength: "Your phone number must be at least 8 characters long"
      },
     resumeCity: "Please enter city",
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});

