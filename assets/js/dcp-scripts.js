$(document).ready(function() {


    $('.nav-link').click(function() {
        $('.nav-link.active').removeClass('active'); // Just remove class from all nav-link
        $(this).addClass('active'); // add onto current
    })


    if (window.matchMedia("(max-width: 767px)").matches) {
        $('.navbar-toggler').on('click', function() {
            $('.mob-nav-hamburguer').toggleClass('open');
            $(this).closest('#navbar-vivia').toggleClass('open-nav-mobile').closest('body').toggleClass('navigation-open');
        });

        $(".dropdown-item").on('click', function() {
            $('.mob-nav-hamburguer').removeClass('open');
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').addClass('collapsed');
            $('#navbar-vivia').removeClass('open-nav-mobile')
            $('body').removeClass('navigation-open');
        });

    } else {

        $(".dropdown-toggle, .dropdown-menu").mouseover(function() {
            $(this).closest('.nav-item').find('.nav-link').addClass('open-nav')
        });

        $(".dropdown-toggle, .dropdown-menu").mouseout(function() {
            $(this).closest('.nav-item').find('.nav-link').removeClass('open-nav')
        });
    }

    $('#our-alliances-carousel').carousel();

    $('#our-infra-carousel, #commercial-area-carousel').carousel();

    var galleryModal = new bootstrap.Modal(document.getElementById('modal-gallery'), {
        keyboard: false
    });
    $('.thumbnail').click(function(e) {
        $('.modal-body').empty();
        $($(this).parents('div').html()).appendTo('.modal-body');
        //$('#modal-gallery').modal({ show: true });
        galleryModal.show()
        event.preventDefault(e)
    });

    $('#modal-gallery').on('show.bs.modal-gallery', function() {
        $('.col-6,.row .thumbnail').addClass('blur');
    })

    $('#modal').on('hide.bs.modal', function() {
        $('.col-6,.row .thumbnail').removeClass('blur');
    })



});


document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
})