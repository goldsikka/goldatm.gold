<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Bootstrap Carousel with Navbar</title>

    <!-- Latest Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <link rel="stylesheet" href="css/style.css">
    <!-- Latest Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="img/fav.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!-- responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.5/dist/sweetalert2.min.css">
</head>

<body>

    <!-- Navbar on top of Carousel -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <a class="navbar-brand" href="#"><img src="img/logo.png" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#About">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Services">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Innovative">Innovative</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Progressive">Progressive</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Contact-Us">Contact Us</a>
                    </li>
                    <!-- Add more nav items as needed -->
                </ul>
            </div>
        </div>
    </nav>
    <script>
        $(document).ready(function() {
            // Check scroll position on page load
            if ($(window).scrollTop() > 30) {
                $('.navbar').addClass('scrolled');
            }

            // Add scroll event listener
            $(window).scroll(function() {
                if ($(this).scrollTop() > 0) {
                    $('.navbar').addClass('scrolled');
                } else {
                    $('.navbar').removeClass('scrolled');
                }
            });
        });
    </script>