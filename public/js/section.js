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

        // Reinitialize draggable and droppable after appending a new section
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

    // Generate the appropriate HTML based on the field type
    function generateFieldHtml(fieldType, labelText) {
        var fieldHtml = "";

        switch (fieldType) {
            case "single-line":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="single-line">' +
                    (labelText || "Single Line") +
                    '</label>' +
                    '<input readonly type="text" id="single-line" name="single-line" class="form-control cursor-grab" placeholder="Single Line" />' +
                    '</div>';
                break;
        
            case "multi-line":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="multi-line">' +
                    (labelText || "Multi Line") +
                    '</label>' +
                    '<textarea type="textarea" readonly id="multi-line" name="multi-line" class="form-control cursor-grab" rows="2" style="height: 65px;" placeholder="Multi Line">' +
                    '</textarea>' +
                    '</div>';
                break;
        
            case "email":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="email">' +
                    (labelText || "Email") +
                    '</label>' +
                    '<input readonly type="email" id="email" name="email" class="form-control cursor-grab" placeholder="Email" />' +
                    '</div>';
                break;
        
            case "number":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="number">' +
                    (labelText || "Number") +
                    '</label>' +
                    '<input readonly type="number" id="number" name="number" class="form-control cursor-grab" placeholder="Number" />' +
                    '</div>';
                break;
        
            case "pick-list":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="pick-list">' +
                    (labelText || "Pick List") +
                    '</label>' +
                    '<select type="select" disabled id="pick-list" name="pick-list" class="form-control cursor-grab">' +
                    '<option value="Option 1">Option 1</option>' +
                    '<option value="Option 2">Option 2</option>' +
                    '</select>' +
                    '</div>';
                break;
        
            case "multi-select":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="multi-select">' +
                    (labelText || "Multi-Select") +
                    '</label>' +
                    '<select type="select" disabled id="multi-select" name="multi-select" class="form-control cursor-grab" multiple>' +
                    '<option value="Option 1">Option 1</option>' +
                    '<option value="Option 2">Option 2</option>' +
                    '</select>' +
                    '</div>';
                break;
        
            case "date":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="date">' +
                    (labelText || "Date") +
                    '</label>' +
                    '<input readonly type="date" id="date" name="date" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "datetime":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="datetime">' +
                    (labelText || "Date/Time") +
                    '</label>' +
                    '<input readonly type="datetime-local" id="datetime" name="datetime" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "auto-number":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="auto-number">' +
                    (labelText || "Auto-Number") +
                    '</label>' +
                    '<input readonly type="number" id="auto-number" name="auto-number" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "currency":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="currency">' +
                    (labelText || "Currency") +
                    '</label>' +
                    '<input readonly type="text" id="currency" name="currency" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "decimal":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="decimal">' +
                    (labelText || "Decimal") +
                    '</label>' +
                    '<input readonly type="number" step="0.01" id="decimal" name="decimal" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "percentage":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="percentage">' +
                    (labelText || "Percentage") +
                    '</label>' +
                    '<input readonly type="number" step="0.01" id="percentage" name="percentage" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "long-integer":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="long-integer">' +
                    (labelText || "Long Integer") +
                    '</label>' +
                    '<input readonly type="number" id="long-integer" name="long-integer" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "checkbox":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="checkbox">' +
                    (labelText || "Check Box") +
                    '</label>' +
                    '<input readonly type="checkbox" id="checkbox" name="checkbox" class="form-check-input cursor-grab" />' +
                    '</div>';
                break;
        
            case "url":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="url">' +
                    (labelText || "URL") +
                    '</label>' +
                    '<input readonly type="url" id="url" name="url" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "lookup":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="lookup">' +
                    (labelText || "Lookup") +
                    '</label>' +
                    '<input readonly type="text" id="lookup" name="lookup" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "formula":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="formula">' +
                    (labelText || "Formula") +
                    '</label>' +
                    '<input readonly type="text" id="formula" name="formula" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "user":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="user">' +
                    (labelText || "User") +
                    '</label>' +
                    '<input readonly type="text" id="user" name="user" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            case "file-upload":
                fieldHtml =
                    '<div class="col-md-6 dropped-field mb-3">' +
                    '<label class="form-label editable-label" for="file-upload">' +
                    (labelText || "File Upload") +
                    '</label>' +
                    '<input readonly type="file" id="file-upload" name="file-upload" class="form-control cursor-grab" />' +
                    '</div>';
                break;
        
            default:
                fieldHtml = "";
        }

        console.log("Generated Field HTML:", fieldHtml);
        return fieldHtml;
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


// Saving the form and populating it on other page


$(document).ready(function () {
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
        $('#parent-form input, #parent-form textarea, #parent-form select').each(function () {
            const field = $(this);
            const droppedField = field.closest('.dropped-field');
            const label = droppedField.find('label');
            console.log('Label:', label.text());

            // Add an object with field type and label text to the array
            formDataArray.push({
                type: field.attr('type'),
                label: label.length ? label.text() : 'No Label'
            });
        });

        console.log('formDataArray:', formDataArray);

        sessionStorage.setItem('formDataArray', JSON.stringify(formDataArray));

        window.location.href = "/dynamic-form";
    });
});


