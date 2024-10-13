$(document).ready(function() {
    $('#productForm').on('submit', function(e) {
        e.preventDefault();

        let formData = new FormData(this);

        $.ajax({
            url: 'insert_product.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert(response);
            },
            error: function(xhr, status, error) {
                console.log(error);
                alert("Error occurred. Please try again.");
            }
        });
    });
});
