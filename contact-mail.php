<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Autoload PHPMailer

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$city = $_POST['city'];
$state = $_POST['state'];
$description = $_POST['description'];

$message = "Name = " . $name . "\r\nEmail = " . $email . "\r\nPhone = " . $phone . "\r\nCity = " . $city . "\r\nState = " . $state . "\r\nDescription = " . $description;

$subject = "Contact Us";
$fromname = "Gold ATM";
$fromemail = $email;  // Change this to your email address

$mailto = 'nithyanand.xyug.in@gmail.com';  // Replace with the recipient's email

// a random hash will be necessary to send mixed content
$separator = md5(time());
// carriage return type (RFC)
$eol = "\r\n";

// main header (multipart mandatory)
$headers = "From: " . $fromname . " <" . $fromemail . ">" . $eol;
$headers .= "MIME-Version: 1.0" . $eol;
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;
$headers .= "Content-Transfer-Encoding: 7bit" . $eol;
$headers .= "This is a MIME encoded message." . $eol;

// message
$body = "--" . $separator . $eol;
$body .= "Content-Type: text/plain; charset=\"iso-8859-1\"" . $eol;
$body .= "Content-Transfer-Encoding: 8bit" . $eol;
$body .= $message . $eol;

// SEND Mail
if (mail($mailto, $subject, $body, $headers)) {
    echo '<script>';
    echo '   document.addEventListener("DOMContentLoaded", function() {';
    echo '       var script = document.createElement("script");';
    echo '       script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@10.16.5/dist/sweetalert2.all.min.js";';
    echo '       script.onload = function() {';
    echo '           Swal.fire({';
    echo '               icon: "success",';
    echo '               title: "Success",';
    echo '               text: "Thank you for registering with us! We will contact you soon.",';
    echo '               showConfirmButton: false,';
    echo '               timer: 3000';
    echo '           }).then(function() {';
    echo '               window.location.href = "https://goldatm.gold/";';
    echo '           });';
    echo '       };';
    echo '       document.head.appendChild(script);';
    echo '   });';
    echo '</script>';
} else {
    echo '<script>';
    echo '   Swal.fire({';
    echo '       icon: "error",';
    echo '       title: "Error",';
    echo '       text: "Mail send... ERROR!",';
    echo '       showConfirmButton: true';
    echo '   });';
    echo '</script>';
    print_r(error_get_last());

    echo '<script>';
    echo '   document.getElementById("loader").style.display = "none";'; // Hide loader
    echo '   Swal.fire({';
    echo '       icon: "error",';
    echo '       title: "Error",';
    echo '       text: "Mail send... ERROR!",';
    echo '       showConfirmButton: true';
    echo '   });';
    echo '</script>';
}

echo '<script>';
echo '   document.getElementById("loader").style.display = "none";'; // Hide loader
echo '   Swal.fire({';
echo '       icon: "success",';
echo '       title: "Success",';
echo '       text: "Thank you for registering with us! We will contact you soon.",';
echo '       showConfirmButton: false,';
echo '       timer: 3000'; // Redirect after 3 seconds
echo '   }).then(function() {';
echo '       window.location.href = "https://goldatm.gold/";';
echo '   });';
echo '</script>';

?>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Thank you for registering with us! We will contact you soon.",
            showCancelButton: false, // Hide the cancel button
            showConfirmButton: true, // Show the confirm button
            confirmButtonText: "OK", // Customize the button text
        }).then(function(result) {
            // Handle the button click
            if (result.isConfirmed) {
                window.location.href = "https://goldatm.gold/";
            }
        });
    });
</script>


