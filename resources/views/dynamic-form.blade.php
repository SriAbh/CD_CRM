@extends('layout.layout')
@section('title', 'Dynamic Form Page')
@section('content')
<div class="container">
    <h2>Generated Form</h2>
    <!-- Container where the dynamic form will be created -->
    <div id="dynamicFormContainer">
        <form class="generated-parent-form row" id="generated-parent-form"
        style="border: 2px dashed #ccc;">

        </form>
    </div>
</div>
<script>
   document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the form data array from session storage
    const formDataArray = JSON.parse(sessionStorage.getItem('formDataArray'));
    // Get the container where the dynamic form will be generated
    const formContainer = document.getElementById('generated-parent-form');

    // Check if formDataArray exists and is an array
    if (Array.isArray(formDataArray)) {
        formDataArray.forEach(fieldData => {
            // Create a div for each form group
            const formGroup = document.createElement('div');

            if (fieldData.type === 'heading') {
                // Assign a specific class for heading div
                formGroup.classList.add('heading-group', 'my-3', 'w-100');

                // Create the heading element
                const heading = document.createElement('h5');
                heading.classList.add('fw-semibold', 'w-100');
                heading.innerText = fieldData.label;

                // Append heading to the form group
                formGroup.appendChild(heading);
            } else {
                // Assign a different class for other form fields
                formGroup.classList.add('form-group', 'my-3', 'col-md-6');

                // Create the label element
                const label = document.createElement('label');
                label.innerText = fieldData.label;

                // Create the input element based on the field type
                let input;
                switch (fieldData.type) {
                    case 'text':
                        input = document.createElement('input');
                        input.setAttribute('type', 'text');
                        break;
                    case 'textarea':
                        input = document.createElement('textarea');
                        input.setAttribute('type', 'textarea');
                        break;
                    case 'select':
                        input = document.createElement('select');
                        // Add options if needed
                        // Example option:
                        // const option = document.createElement('option');
                        // option.value = 'Option 1';
                        // option.textContent = 'Option 1';
                        // input.appendChild(option);
                        break;
                    default:
                        input = document.createElement('input');
                        input.setAttribute('type', fieldData.type);
                }
                // Add classes and attributes to the input element
                input.classList.add('form-control');

                // Append label and input to the form group
                formGroup.appendChild(label);
                formGroup.appendChild(input);
            }
            // Append the form group to the dynamic form
            formContainer.appendChild(formGroup);
        });
    }
});
</script>
@endsection