document.addEventListener("DOMContentLoaded", function() {
    let t, e, n, o, c, i;

    // Toggles the active state of elements and updates the aria-expanded attribute and overflow style
    function a() {
        e.classList.toggle("active");
        t.classList.toggle("active");
        const o = e.classList.contains("active");
        t.setAttribute("aria-expanded", o);
        n.style.overflow = o ? "hidden" : "";
    }

    // Removes the active state from elements and resets the aria-expanded attribute and overflow style
    function s() {
        if (e.classList.contains("active")) {
            e.classList.remove("active");
            t.classList.remove("active");
            n.style.overflow = "";
            t.setAttribute("aria-expanded", "false");
        }
    }

    // Toggles the visibility of the scroll-to-top button based on scroll position
    function d() {
        const t = window.scrollY || document.documentElement.scrollTop;
        c.classList.toggle("show", t > window.innerHeight / 2);
    }

    // Smoothly scrolls to the top of the page and sets focus to an element
    function u() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        o.setAttribute("tabindex", "-1");
        o.focus();
    }

    // Changes the document title based on visibility state
    function m() {
        document.hidden
            ? (document.title = "منتظر بازگشت شما هستیم!")
            : (document.title = i);
    }

    // Event listeners for scroll-to-top button
    c = document.createElement("button");
    c.classList.add("scroll-to-top");
    c.setAttribute("aria-label", "بازگشت به بالا");
    c.innerHTML = "↑";
    document.body.appendChild(c);
    window.addEventListener("scroll", d);
    c.addEventListener("click", u);
    document.addEventListener("visibilitychange", m);
});
