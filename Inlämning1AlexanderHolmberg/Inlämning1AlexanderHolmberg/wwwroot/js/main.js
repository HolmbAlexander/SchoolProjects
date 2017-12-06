$(function () {

    getAllCustomers();

$("#addForm button").click(function () {
    $.ajax({
        url: '/api/customers/',
        method: 'POST',
        data: {
            "FirstName": $("#addForm [name=FirstName]").val(),
            "LastName": $("#addForm [name=LastName]").val(),
            "Age": $("#addForm [name=Age]").val(),
            "Email": $("#addForm [name=Email]").val(),
            "Gender": $("#addForm [name=Gender]").val(),
        }
    })
        .done(function (result) {
            //alert(`Success! Result = ${result}`)
            console.log("Success!", result)
            getAllCustomers();
            ClearFields();
        })

        .fail(function (xhr, status, error) {
            alert(`Fail! Result = ${result}`)
            console.log("Error", xhr, status, error);
        })
});

$(document).on("click", "#removeCustomer", function () {
    var id = $(this).parent().siblings("#customerId").text();
    console.log(id);
    $.ajax({
        url: '/api/Customers/',
        method: 'DELETE',
        data: {
            id: id
        }

    })
        .done(function (result) {
            console.log("Success!", result)
            getAllCustomers();
        })

        .fail(function (xhr, status, error) {
            console.log("Error", xhr, status, error);
        })
});

$(document).on("click", "#editCustomer", function () {
    var id = $(this).parent().siblings("#customerId").text();
    var row = $(this).parent().parent();
    console.log(id);
    $.ajax({
        url: '/api/Customers/',
        method: 'PUT',
        data: {
            id: id,
            "FirstName": $(".firstName", row).text(),
            "LastName": $(".lastName", row).text(),
            "Age": $(".age", row).html(),
            "Gender": $(".gender", row).text(),
            "Email": $(".email", row).text(),
        }

    })
        .done(function (result) {
            console.log("Success!", result)
            getAllCustomers();
        })

        .fail(function (xhr, status, error) {
            console.log("Error", xhr, status, error);
        })
});
    
});

function getAllCustomers() {
    $.ajax({
        url: 'api/Customers/',
        method: 'GET'
    })
        .done(function (result) {
            var html = "";
            console.log("Success!", result);
            result.forEach(function (item) {
                html += printCustomers(item);
            });
            $("#allCustomers").html(html);

        })
        .fail(function (xhr, status, error) {

            console.log("Fail", xhr);
            $("#allCustomers").text(xhr.responseText)
        });
}

function printCustomers(customer) {
    var html = '<tr>';
    html += '<th id="customerId">' + customer.id + '</th>';
    html += '<td contenteditable="true" class="firstName">' + customer.firstName + '</td>';
    html += '<td contenteditable="true" class="lastName">' + customer.lastName + '</td>';
    html += '<td contenteditable="true" class="age">' + customer.age + '</td>';
    html += '<td contenteditable="true" class="email">' + customer.email + '</td>';
    html += '<td contenteditable="true" class="gender">' + customer.gender + '</td>';
    html += '<th><button id="editCustomer">Save Changes</button></th>';
    html += '<th><button id="removeCustomer">Remove</button></th>';
    html += '</tr>';
    console.log(html);
    return html;
}

function ClearFields() {
    document.getElementById("textfield1").value = "";
    document.getElementById("textfield2").value = "";
    document.getElementById("textfield3").value = "";
    document.getElementById("textfield4").value = "";
    document.getElementById("textfield5").value = "";
}