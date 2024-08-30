$(document).ready(function () {
    $("#section-draggable").on("click", function () {
        var sectionType = $(this).data("type");
        var fieldHtml = "";

        switch (sectionType) {
            case "section":
                fieldHtml =
                    '<div class="form-builder mb-4 p-4 row">' +
                    '<h5 class="fw-semibold editable-heading">Untitled Section</h5>' +
                    "</div>";
                break;
        }

        var $fieldElement = $(fieldHtml);
        $("#parent-form").append($fieldElement);

        // Reinitialize draggable and droppable after appending a neww sections
        initializeDraggable();
        initializeDroppable();
    });

    // Initialize draggable elements
    function initializeDraggable() {
        $(".draggable").draggable({
            helper: "clone",
        });
    }

    // Initialize droppable areas
    function initializeDroppable() {
        $(".form-builder").droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                var fieldType = ui.helper.data("type");
                var fieldLabel = ui.helper.data("label");

                var fieldHtml = generateFieldHtml(fieldType, fieldLabel);

                var $fieldElement = $(fieldHtml);

                // Append the field to the form builder area
                $(this).append($fieldElement);

                // Enable label editing
                enableLabelEditing($fieldElement);
            },
        });
    }



    // Enable label editing

    $("#parent-form").on("click", ".editable-heading", function () {
        var $heading = $(this);
        var currentText = $heading.text();
        // Replace heading with an input field to edit the text
        var $input = $('<input type="text" />').val(currentText);
        $heading.replaceWith($input);
        // When input loses focus or enter is pressed, update the heading
        $input
            .on("blur keyup", function (e) {
                if (
                    e.type === "blur" ||
                    (e.type === "keyup" && e.key === "Enter")
                ) {
                    var newText = $input.val();
                    var $newHeading = $(
                        '<h5 class="fw-semibold editable-heading"></h5>'
                    ).text(newText);
                    $input.replaceWith($newHeading);
                }
            })
            .focus();
    });

    function enableLabelEditing($fieldElement) {
        $fieldElement.find(".editable-label").one("click", function () {
            var $label = $(this);
            var currentText = $label.text();
            var $input = $(
                '<input type="text" class="label-edit-input" value="' +
                    currentText +
                    '" />'
            );

            // Replace label with input for editing
            $label.replaceWith($input);

            // Handle focus out or enter key to finalize the edit
            $input.focus().on("blur keyup", function (e) {
                if (
                    e.type === "blur" ||
                    (e.type === "keyup" && e.key === "Enter")
                ) {
                    var newText = $input.val() || currentText; // Retain original text if input is empty
                    $input.replaceWith(
                        '<label class="form-label editable-label">' +
                            newText +
                            "</label>"
                    );

                    // Re-enable label editing after finalizing the edit
                    enableLabelEditing($fieldElement);
                }
            });
        });
    }

    // Initialize all components
    initializeDraggable();
    initializeDroppable();
});

// Section Adding more option
$(document).on('click', '.add-option', function () {
    const selectElement = $(this).closest('.dropped-field').find('select');
    // Show a popup/modal to enter a new option
    const newOption = prompt("Enter the name of the new option:");
    if (newOption) {
        // Add the new option to the select element
        selectElement.append(`<option value="${newOption}">${newOption}</option>`);
    }
});
$(document).on('click', '.remove-selected-option', function () {
    const selectElement = $(this).closest('.dropped-field').find('select');
    // Remove the selected option from the select list
    selectElement.find('option:selected').remove();
});





$(document).ready(function () {
    // Initialize Draggable elements and droppable areas
    initializeDraggable();
    initializeDroppable();

    // Save button click event to save the form structure
    $('#btnSave').on('click', function () {
        // Initialize an array to store form data
        let formDataArray = [];

        // Handle the dynamic headings first
        $('#parent-form .form-builder').each(function () {
            const heading = $(this).find('.editable-heading');
            if (heading.length) {
                formDataArray.push({
                    type: 'heading',
                    label: heading.text()
                });
            }
        });

        // Handle the form fields next
        $('#parent-form .dropped-field').each(function () {
            const field = $(this).find('input, textarea, select');
            const label = $(this).find('label').text().trim();

            if (field.is('select')) {
                // Store options for 'select' fields
                const options = [];
                field.find('option').each(function () {
                    options.push($(this).text());
                });
                formDataArray.push({
                    type: 'select',
                    label: label,
                    options: options
                });
            } else {
                // Add an object with field type and label text to the array
                formDataArray.push({
                    type: field.attr('type'),
                    label: label.length ? label : 'No Label'
                });
            }
        });

        console.log('formDataArray:', formDataArray);

        // Save the form data array to session storage
        sessionStorage.setItem('formDataArray', JSON.stringify(formDataArray));

        // Redirect to another page
        window.location.href = "/section";
    });

    // Enable label editing functionality
    function enableLabelEditing($fieldElement) {
        $fieldElement.find(".editable-label").one("click", function () {
            var $label = $(this);
            var currentText = $label.text();
            var $input = $('<input type="text" class="label-edit-input" value="' + currentText + '" />');

            // Replace label with input for editing
            $label.replaceWith($input);

            // Handle focus out or enter key to finalize the edit
            $input.focus().on("blur keyup", function (e) {
                if (e.type === "blur" || (e.type === "keyup" && e.key === "Enter")) {
                    var newText = $input.val() || currentText; // Retain original text if input is empty
                    $input.replaceWith('<label class="form-label editable-label">' + newText + "</label>");

                    // Re-enable label editing after finalizing the edit
                    enableLabelEditing($fieldElement);
                }
            });
        });
    }

    // Populate form on section.blade.php
    populateFormOnSectionPage();
});

// Function to initialize draggable elements
function initializeDraggable() {
    $(".draggable").draggable({
        helper: "clone",
    });
}

// Function to initialize droppable areas
function initializeDroppable() {
    $(".form-builder").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            var fieldType = ui.helper.data("type");
            var fieldLabel = ui.helper.data("label");

            var fieldHtml = generateFieldHtml(fieldType, fieldLabel);

            var $fieldElement = $(fieldHtml);

            // Append the field to the form builder area
            $(this).append($fieldElement);

            // Enable label editing
            enableLabelEditing($fieldElement);
        },
    });
}

// Function to generate the appropriate HTML based on the field type
function generateFieldHtml(fieldType, labelText) {
    var fieldHtml = "";

    switch (fieldType) {
        case "single-line":
            fieldHtml = '<div class="col-md-6 dropped-field mb-3">' +
                '<label class="form-label editable-label" for="single-line">' +
                (labelText || "Single Line") +
                '</label>' +
                '<input readonly type="text" id="single-line" name="single-line" class="form-control cursor-grab" placeholder="Single Line" />' +
                '</div>';
            break;

        case "multi-line":
            fieldHtml = '<div class="col-md-6 dropped-field mb-3">' +
                '<label class="form-label editable-label" for="multi-line">' +
                (labelText || "Multi Line") +
                '</label>' +
                '<textarea readonly id="multi-line" name="multi-line" class="form-control cursor-grab" rows="2" style="height: 65px;" placeholder="Multi Line"></textarea>' +
                '</div>';
            break;

        case "email":
            fieldHtml = '<div class="col-md-6 dropped-field mb-3">' +
                '<label class="form-label editable-label" for="email">' +
                (labelText || "Email") +
                '</label>' +
                '<input readonly type="email" id="email" name="email" class="form-control cursor-grab" placeholder="Email" />' +
                '</div>';
            break;

        case "number":
            fieldHtml = '<div class="col-md-6 dropped-field mb-3">' +
                '<label class="form-label editable-label" for="number">' +
                (labelText || "Number") +
                '</label>' +
                '<input readonly type="number" id="number" name="number" class="form-control cursor-grab" placeholder="Number" />' +
                '</div>';
            break;

        case "pick-list":
        case "multi-select":
            var multipleAttribute = fieldType === "multi-select" ? "multiple" : "";
            fieldHtml = '<div class="col-md-6 dropped-field mb-3">' +
                '<label class="form-label editable-label" for="' + fieldType + '">' +
                (labelText || (fieldType === "pick-list" ? "Pick List" : "Multi-Select")) +
                '</label>' +
                '<select ' + multipleAttribute + ' id="' + fieldType + '" name="' + fieldType + '" class="form-control cursor-grab"></select>' +
                '<button type="button" class="btn btn-primary mt-2 add-option" data-target="#optionModal">+</button>' + // Button to add more options
                '<button type="button" class="btn btn-danger mx-2 mt-2 remove-selected-option">-</button>' + // Button to remove options
                '</div>';
            break;

        default:
            fieldHtml = "";
    }

    console.log("Generated Field HTML:", fieldHtml);
    return fieldHtml;
}

// Function to populate form on section page
function populateFormOnSectionPage() {
    const formDataArray = JSON.parse(sessionStorage.getItem('formDataArray'));
    const formContainer = $('#generated-parent-form');

    if (Array.isArray(formDataArray)) {
        formDataArray.forEach(fieldData => {
            let formGroup = $('<div></div>');

            if (fieldData.type === 'heading') {
                formGroup.addClass('heading-group my-3 w-100');
                let heading = $('<h5></h5>');
                heading.addClass('fw-semibold w-100');
                heading.text(fieldData.label);
                formGroup.append(heading);
            } else {
                formGroup.addClass('form-group my-3 col-md-6');
                let label = $('<label></label>');
                label.text(fieldData.label);
                let input;

                if (fieldData.type === 'select') {
                    input = $('<select></select>').attr('type', 'select');

                    // Dynamically add saved options
                    fieldData.options.forEach(optionText => {
                        const option = $('<option></option>').val(optionText).text(optionText);
                        input.append(option);
                    });

                } else {
                    switch (fieldData.type) {
                        case 'text':
                            input = $('<input>').attr('type', 'text');
                            break;
                        case 'textarea':
                            input = $('<textarea></textarea>').attr('type', 'textarea');
                            break;
                        default:
                            input = $('<input>').attr('type', fieldData.type);
                    }
                }

                input.addClass('form-control');
                formGroup.append(label);
                formGroup.append(input);
            }
            formContainer.append(formGroup);
        });
    }
}