// Scale Line — site interactions (vanilla JS).

// Active nav link (navbar only)
(function () {
    var links = document.querySelectorAll(".navbar ul li a");
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            links.forEach(function (el) { el.classList.remove("active"); });
            this.classList.add("active");
        });
    });
})();

// Navbar shadow on scroll
(function () {
    var nav = document.querySelector(".navbar");
    if (!nav) return;
    var onScroll = function () {
        nav.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();

// Animated counters
(function () {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length || !("IntersectionObserver" in window)) return;
    var animate = function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var start = null;
        var step = function (t) {
            if (!start) start = t;
            var p = Math.min((t - start) / 1200, 1);
            el.textContent = Math.floor(p * target);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                animate(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
})();

// Newsletter (front-end confirmation)
(function () {
    var form = document.getElementById("newsletter-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = form.parentElement.querySelector(".newsletter-msg");
        var input = document.getElementById("newsletter-email");
        if (input && input.checkValidity()) {
            if (msg) msg.textContent = "Thank you! You are subscribed.";
            form.reset();
        } else if (msg) {
            msg.textContent = "Please enter a valid email address.";
        }
    });
})();

// Footer year
(function () {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
})();
