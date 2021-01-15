$(document).ready(function() {
    //Phone number mask (Auto-format: XXX-XXX-XXXX)
    $("#phone").keydown(function(e) {
        var key = e.which || e.charCode || e.keyCode || 0;
        $phone = $(this);

        // Auto-format- do not expose the mask as the user begins to type
        if (key !== 8 && key !== 9) {
            if ($phone.val().length === 3) {
                $phone.val($phone.val() + '-');
            }

            if ($phone.val().length === 7) {
                $phone.val($phone.val() + '-');
            }
        }
        // Allow numeric (and tab, backspace, delete) keys only
        return (key == 8 ||
            key == 9 ||
            key == 46 ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    })

    .bind('focus click', function() {
        $phone = $(this);

        if ($phone.val().length === 0) {
            $phone.val('');
        } else {
            var val = $phone.val();
            $phone.val('').val(val); // Ensure cursor remains at the end
        }
    })

    .blur(function() {
        $phone = $(this);

        if ($phone.val() === ' ') {
            $phone.val('');
        }
    });

});

//removes whitespaces from both sides of the username value
function Trim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

function CheckEmail(obj) {
    var userEmail = Trim(obj.value);

    //check duplicate
    $.ajax({
        url: '/data/CheckEmail/',
        type: "post",
        datatype: 'json',
        data: { id: obj.value },
        async: false,
        success: function(data) {


            if (data.length > 0) {
                $('#error-icon').removeClass('activate');
                $('#checkmark-icon').removeClass('activate');
                $('#error-icon').addClass('error-icon activate');
                $('#message-val').addClass('activate');
                $('#message-val').text('This username is taken, please choose another.');

                setTimeout(function() {
                    obj.value = "";
                    if ((obj.value).length === 0) {
                        $('#error-icon').removeClass('activate');
                        $('#checkmark-icon').removeClass('activate');
                        $('#message-val').removeClass('activate');
                    }
                }, 2500);

            }

            if (data !== 'duplicate') {
                $('#checkmark-icon').removeClass('activate');
                $('#error-icon').removeClass('activate');
                $('#checkmark-icon').addClass('checkmark-icon activate');
                $('#message-val').addClass('activate');
                $('#message-val').text('This username is available.');

                if ((obj.value).length === 0) {
                    $('#error-icon').removeClass('activate');
                    $('#checkmark-icon').removeClass('activate');
                    $('#message-val').removeClass('activate');
                }
            }

            if ((userEmail).length === 0) {
                obj.value = "";
                $('#error-icon').removeClass('activate');
                $('#checkmark-icon').removeClass('activate');
                $('#message-val').removeClass('activate');
            }
        }
    });
}

function VerifyEmail(obj) {
    //check duplicate
    $.ajax({
        url: '/data/VerifyEmail/',
        type: "post",
        datatype: 'json',
        data: { email: obj.value },
        async: false,
        success: function(data) {
            if (data.length > 0) {
                obj.value = "";
                document.getElementById("email").value = '';
                alert("This email has been registered.");
            }
        }
    });
}

function validateForm() {
    var pwd = document.getElementById("password").value;

    if (!pwd.match(/[a-z]/)) {
        alert('Password needs at least one lowercase character.');
        reset();
        return false;
    }
    if (!pwd.match(/[A-Z]/)) {
        alert('Password needs at least one uppercase character.');
        reset();
        return false;
    }

    if (!pwd.match(/[0-9]/)) {
        alert('Password needs at least one number.');
        reset();
        return false;
    }

}

function GetZipCityState(zip) {
    // alert(zipcode);
    $.ajax({
        url: '/data/GetZipCityState/',
        type: "post",
        datatype: 'json',
        data: { id: zip },
        async: false,
        success: function(data) {
            if (data.length > 0) {
                $.each(data, function(i, statecity) {
                    $("#state").val(statecity.StateName).change();
                    $("#city").val(statecity.CityName);
                });
            } else {
                $("#state").val('');
                $("#city").val('');
            }

        }
    });
}