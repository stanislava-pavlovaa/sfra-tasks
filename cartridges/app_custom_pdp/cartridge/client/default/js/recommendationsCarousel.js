$(document).ready(function() {
    $('.carousel .carousel-item').each(function () {
        let minItemsPerSlide = 4;
        let next = $(this).next();

        if (!next.length) {
            next = $(this).siblings(':first'); // select the first sibling and assign it to the next variable.
        }
        next.children(':first-child').clone().appendTo($(this));

        for (let i = 0; i < minItemsPerSlide; i++) {
            next = next.next();

            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }
    });
});