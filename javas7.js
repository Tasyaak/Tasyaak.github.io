/*jslint browser: true */
/*jslint single: true */
/*jslint unordered: true */
/*global $, jQuery */

window.onload = function () {
    let start = false;
    function slad() {
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        if (start) {
            $('#images').slick('unslick');
        }

        if (vw < vh) {
            $('#images').slick({
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        } else {
            $('#images').slick({
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1
            });
        }
    }
    slad();
    start = true;

    window.addEventListener("resize", function () {
        slad();
    });
};