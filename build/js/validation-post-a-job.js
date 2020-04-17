//    FOR POST-A-JOB.HTML


  //////////////
  // Wait for the DOM to be ready
  $(function () {
      // Initialize form validation on the registration form.
      // It has the name attribute "registration"
      $("form").validate({
          // Specify validation rules
        //   ignore: [],
          debug: false,
          rules: {
              // The key name on the left side is the name attribute
              // of an input field. Validation rules are defined
              // on the right side

              post_companyName: {
                  required: true,

              },
              post_yourName: {
                  required: true,

              },
              post_phoneNumber: {
                  required: true,
                  minlength: 8
              },
              post_jobTitle: {
                  required: true,

              },
              post_location: {
                  required: true,

              },
              post_constSalary: {
                  required: true,

              },
              post_minSalary: {
                  required: true,

              },
              post_maxSalary: {
                  required: true,

              },
              post_changeLanguage: {
                  required: true,
              },
              'jobTypeCheckboxes[]': {
                  required: true,

                  minlength: 1,
              },
         
            //   post_editor: {
            //       required: true,

            //       minlength: 10
            //   }







          },
          groups: {
              'qualification__list__input': "jobTypeCheckboxes[]"
          },
          // Specify validation error messages
          messages: {

              post_yourName: {
                  required: "Please enter your name",
              },
              post_companyName: "Please enter your company name",
              post_phoneNumber: {
                  required: "Please enter your phone number",
                  minlength: "Your phone number must be at least 8 characters long"
              },
              post_jobTitle: "Please enter job title",
              post_location: "Please enter job location",
              post_constSalary: "Please enter salary",
              post_minSalary: "Please enter salary",
              post_maxSalary: "Please enter salary",
              post_changeLanguage: "Please enter language",
              "jobTypeCheckboxes[]": {
                  required: 'Please enter at least 1 checkbox'
              },

            //   post_editor: {
            //       required: "Please enter Text",
            //       minlength: "Please enter 10 characters"


            //   }


          },

          //   errorPlacement: function (error, element) {
          //       if (element.attr("name") == "post_editor") {
          //           error.insertBefore("textarea#post_editor");
          //       } else {
          //           error.insertBefore(element);
          //       }
          //   },

          errorPlacement: function (error, element) {
              if (element.attr("name") == "jobTypeCheckboxes[]") {
                  error.insertAfter("#subject_error");
              } else {
                  error.insertAfter(element);
              }


          },

          // Make sure the form is submitted to the destination defined
          // in the "action" attribute of the form when valid
          submitHandler: function (form) {
              form.submit();
            //   alert('successful submit');

              //   alert('valid form');
              //   return false;
          }
      });
  });

//   //deal with copying the ckeditor text into the actual textarea
//   CKEDITOR.on('instanceReady', function () {
//       $.each(CKEDITOR.instances, function (instance) {
//           CKEDITOR.instances.post_editor.document.on("keyup", CK_jQ);
//           CKEDITOR.instances.post_editor.document.on("paste", CK_jQ);
//           CKEDITOR.instances.post_editor.document.on("keypress", CK_jQ);
//           CKEDITOR.instances.post_editor.document.on("blur", CK_jQ);
//           CKEDITOR.instances.post_editor.document.on("change", CK_jQ);
//       });
//   });

// function CK_jQ() {
  //     for (instance in CKEDITOR.instances) {
  //         CKEDITOR.instances.post_editor.updateElement();
  //     }
  // }