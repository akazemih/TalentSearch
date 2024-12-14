document.addEventListener("DOMContentLoaded", (function() {
    let t, e, n, o, c, i;

    // Function to toggle menu
    function a() {
        e.classList.toggle("active");
        t.classList.toggle("active");
        const o = e.classList.contains("active");
        t.setAttribute("aria-expanded", o);
        n.style.overflow = o ? "hidden" : "";
    }

    // Function to close the menu
    function s() {
        if (e.classList.contains("active")) {
            e.classList.remove("active");
            t.classList.remove("active");
            n.style.overflow = "";
            t.setAttribute("aria-expanded", "false");
        }
    }

    // Function to close the menu when clicking outside
    function r(n) {
        if (!e.contains(n.target) && !t.contains(n.target)) {
            s();
        }
    }

    // Close the menu if Escape key is pressed
    function l(t) {
        if ("Escape" === t.key) s();
    }

    // Show "scroll to top" button when scrolled down
    function d() {
        const t = window.scrollY || document.documentElement.scrollTop;
        c.classList.toggle("show", t > window.innerHeight / 2);
    }

    // Scroll to the top
    function u() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        o.setAttribute("tabindex", "-1");
        o.focus();
    }

    // Update the document title based on visibility
    function m() {
        if (document.hidden) {
            document.title = "منتظر بازگشت شما هستیم!";
        } else {
            document.title = i;
        }
    }

    // Fetch articles JSON and display them
    async function f() {
        const t = document.querySelector("#categories .category-list"),
            e = document.querySelector("#articles .article-list"),
            n = document.getElementById("loader"),
            o = document.getElementById("error-message"),
            c = document.getElementById("selected-category-title");

        if (t && e) {
            try {
                const o = await fetch("articles.json");
                if (!o.ok) throw new Error(`خطای HTTP! وضعیت: ${o.status} (${o.statusText})`);
                const i = await o.json();
                if (!Array.isArray(i)) throw new Error("ساختار نامعتبر JSON: آرایه مقالات یافت نشد.");
                const a = function(t) {
                    const e = new Set;
                    t.forEach((t => {
                        t.categories && t.categories.length > 0 ? t.categories.forEach((t => {
                            e.add(JSON.stringify(t));
                        })) : e.add(JSON.stringify({ id: 0, title: "بدون دسته‌بندی", url: "#" }));
                    }));
                    const n = Array.from(e).map((t => JSON.parse(t)));
                    return n.sort(((t, e) => t.title.localeCompare(e.title, "fa"))), n;
                }(i);
                !function(t, e, n, o, c) {
                    t.forEach((t => {
                        const i = document.createElement("li");
                        i.className = "category-item";
                        const a = document.createElement("button");
                        a.className = "category-button";
                        a.textContent = t.title;
                        a.setAttribute("data-category-id", t.id);
                        a.addEventListener("click", (() => {
                            o.innerHTML = "";
                            c.textContent = `دسته‌بندی: ${t.title}`;
                            function(t, e, n) {
                                const o = e.filter((e => !(0 !== t || e.categories && 0 !== e.categories.length) || !!e.categories && e.categories.some((e => e.id === t))));
                                if (0 === o.length) return void (n.innerHTML = "<p>هیچ مقاله‌ای در این دسته‌بندی وجود ندارد.</p>");
                                o.forEach((t => {
                                    const e = document.createElement("li");
                                    e.className = "article-item";
                                    const o = document.createElement("a");
                                    o.href = t.url;
                                    o.textContent = t.title;
                                    o.classList.add("article-title-link");
                                    o.setAttribute("aria-label", t.title);
                                    const c = document.createElement("div");
                                    c.classList.add("article-meta");
                                    const i = document.createElement("span");
                                    i.classList.add("article-author");
                                    i.textContent = `نویسنده: ${t.author.name}`;
                                    const a = document.createElement("span");
                                    a.classList.add("article-date");
                                    a.textContent = `تاریخ: ${function(t) {
                                        const [e, n, o] = t.split("/");
                                        return `${o} ${c = n, { "01": "فروردین", "02": "اردیبهشت", "03": "خرداد", "04": "تیر", "05": "مرداد", "06": "شهریور", "07": "مهر", "08": "آبان", "09": "آذر", 10: "دی", 11: "بهمن", 12: "اسفند" }[c.padStart(2, "0")] || c} ${e}`;
                                        var c
                                    }(t.published.date)}`;
                                    c.append(i, " | ", a);
                                    e.append(o, c);
                                    n.appendChild(e);
                                }));
                            }(t.id, n, o);
                        }));
                        i.appendChild(a);
                        e.appendChild(i);
                    }));
                }(a, t, i, e, c);
                n.style.display = "none";
            } catch (t) {
                console.error("خطا در دریافت یا پردازش JSON برای مقالات:", t);
                o.textContent = `یک خطا رخ داده است: ${t.message}`;
                n.style.display = "none";
            }
        }
    }

    // Load the header and footer dynamically
    async function loadHeaderFooter() {
        try {
            const headerResponse = await fetch('header.html');
            if (headerResponse.ok) {
                const headerContent = await headerResponse.text();
                document.querySelector(".header").innerHTML = headerContent;
            } else {
                console.error("Failed to load header.html");
            }

            const footerResponse = await fetch('footer.html');
            if (footerResponse.ok) {
                const footerContent = await footerResponse.text();
                document.querySelector(".footer").innerHTML = footerContent;
            } else {
                console.error("Failed to load footer.html");
            }
        } catch (error) {
            console.error("Error loading header and footer:", error);
        }
    }

    // Initialize the DOM elements
    n = document.body;
    o = document.querySelector(".header");
    t = o.querySelector(".menu-toggle");
    e = o.querySelector(".nav-links");
    i = document.title;
    c = document.createElement("button");
    
    // Load header and footer
    loadHeaderFooter();

    // Event listeners
    if (t) t.addEventListener("click", a);
    document.addEventListener("click", r);
    document.addEventListener("keydown", l);
    window.addEventListener("scroll", d);
    c.addEventListener("click", u);
    document.addEventListener("visibilitychange", m);
    
    f();
    window.addEventListener("load", function() {
        if (typeof injectChatbot === "function") injectChatbot();
    });

}));
