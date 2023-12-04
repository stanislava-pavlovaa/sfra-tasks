$(document).ready(function() {
    var quantitySelect = $("#quantity");
    var prevButton = $("#decrease");
    var nextButton = $("#increase");

    // Set initial quantity value
    var currentQuantity = parseInt(quantitySelect.val());

    prevButton.click(function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            updateQuantity();
        }
    });

    nextButton.click(function() {
        if (currentQuantity < 10) {
            currentQuantity++;
            updateQuantity();
        }
    });

    function updateQuantity() {
        quantitySelect.val(currentQuantity);
    }
});