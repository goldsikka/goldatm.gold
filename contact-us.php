<form class="row g-3" action="contact-mail.php" name="contact-form" method="post" id="contactForm" enctype="multipart/form-data" onsubmit="showLoader()">

<p>Want to learn more? Send us a message and we'll be in touch.</p>
<div class="col-md-12">
    <div class="form-group">
        <input type="text" class="form-control" id="validationDefault01" name="name" onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" minlength="4" maxlength="20" placeholder="Name *">
    </div>
</div>
<div class="col-md-6">
    <div class="form-group">
        <input type="email" class="form-control" id="validationDefault02" name="email" placeholder="Email *" required>
    </div>
</div>

<div class="col-md-6">
    <div class="form-group">
        <input type="text" id="validationDefault03" class="form-control" name="phone" pattern="[0-9]{10}" title="Please enter a 10-digit phone number" placeholder="Number *" required>
    </div>
</div>
<div class="col-md-6">
    <input type="text" class="form-control" id="validationDefault04" placeholder="City *" name="city" onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" minlength="4" maxlength="20" required>
</div>
<div class="col-md-6">
    <input type="text" class="form-control" id="validationDefault05" placeholder="State *" name="state" onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" minlength="4" maxlength="20" required>
</div>
<div class="col-md-12">
    <div class="form-group">
        <textarea class="form-control" rows="3" name="description" id="description" placeholder="Enter Description"></textarea>
        <input type="hidden" name="type" value="1">
        <span class="text-danger"></span>
    </div>
</div>
<div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
</div>
  <!-- Loader -->
    
<div class="loader-container" id="overlay"></div>
<div class="loader" id="loader"></div>

</form>
<!-- JavaScript to show/hide loader -->
<script>
    function showLoader() {
        document.getElementById("loader").style.display = "block"; // Show loader
        return true; // Allow form submission to continue
    }
</script>
<style>

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
    position: fixed;
    top: 50%;
    display:none;
    left: 50%;
    margin-top: -40px;
    margin-left: -40px;
    z-index: 1001; /* Set a higher z-index than the overlay */
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>

