//FOR REGISTER.HTML
  //////////////
 // Wait for the DOM to be ready
 $(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form").validate({
      // Specify validation rules
     
      rules: {
      
      
        companyRolesEmail: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        },
      
      },
      // Specify validation error messages
      messages: {
      
        companyRolesEmail: "Please enter a valid email address"
      },

      errorPlacement: function (error, element) {
        if (element.attr("name") == "companyRolesEmail") {
            error.insertAfter(".company-roles__assign");
           
        } else {
            error.insertAfter(element);
        }


    },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });
  });