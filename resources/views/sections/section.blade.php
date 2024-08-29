@extends('layout.layout')
@section('title', 'Section Page')
@section('content')

<div>
    <!-- Navbar Section -->
    <nav class="navbar bg-white top-0 position-sticky"  style="z-index: 100;">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <!-- Page Title -->
                <a class="navbar-brand text-black fw-bold fs-4">Create Account</a>
                <!-- Edit Page Layout Link -->
                <a href="" class="ms-3 text-decoration-underline">Edit Page Layout</a>
            </div>
            <!-- Action Buttons -->
            <form class="d-flex gap-2 my-3" action="javascript:void(0)">
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Cancel</button>
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Save and New</button>
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Save</button>
            </form>
        </div>
    </nav>    


    <div class="row">
        <div class="container col-lg-10 p-4 mx-auto">
            <!-- Container where the dynamic form will be created -->
            <div id="dynamicFormContainer"></div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                // Retrieve the form data array from session storage
                const formDataArray = JSON.parse(sessionStorage.getItem('formDataArray'));
                // Get the container where the dynamic form will be generated
                const formContainer = document.getElementById('dynamicFormContainer');
                // Create a form element
                const dynamicForm = document.createElement('form');
                dynamicForm.setAttribute('method', 'POST');
    
                // Loop through the formDataArray to create dynamic fields
                for (let i = 0; i < formDataArray.length; i += 2) {
                    // Create a row for every two form groups
                    const row = document.createElement('div');
                    row.classList.add('row', 'gx-4', 'gy-4');
    
                    // Create the first form group
                    const formGroup1 = createFormGroup(formDataArray[i]);
                    row.appendChild(formGroup1);
    
                    // Create the second form group if there is a next element
                    if (formDataArray[i + 1]) {
                        const formGroup2 = createFormGroup(formDataArray[i + 1]);
                        row.appendChild(formGroup2);
                    }
    
                    // Append the row to the dynamic form
                    dynamicForm.appendChild(row);
                }
    
                // Append the dynamic form to the container
                formContainer.appendChild(dynamicForm);
    
                // Function to create a form group element
                function createFormGroup(fieldData) {
                    const formGroup = document.createElement('div');
                    formGroup.classList.add('form-group', 'my-3', 'col-md-6'); // Use col-md-6 for two columns per row
    
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
                            break;
                        case 'select':
                            input = document.createElement('select');
                            // Add options if needed
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
    
                    return formGroup;
                }
            });
        </script>
    </div>
</div> <!-- End of outer div -->
@endsection