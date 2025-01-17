const fromLargeTablet = window.matchMedia('(min-width: 1024px)');
const tocSticky = document.querySelector("#toc .sticky")
if (fromLargeTablet && tocSticky) {
    if (document.referrer.includes(window.location.origin) && !window.location.hash) {
        window.scrollTo(0, 81)
    }

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            tocSticky.style.top = "20px";
            tocSticky.style.bottom = "65px";
        } else {
            tocSticky.style.top = null;
            tocSticky.style.bottom = null;
        }
    });
}

if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function () {
        const links = document.querySelectorAll('#TableOfContents a');
        let activeLink = null;
        const linksById = {};

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (activeLink) {
                        activeLink.classList.remove('active');
                    }

                    activeLink = linksById[entry.target.id];
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {rootMargin: `0% 0% -80% 0%`});

        links.forEach(link => {
            const id = link.getAttribute('href') ? link.getAttribute('href').slice(1) : null; // Checking if href exists before slicing #
            if (id) {
                const target = document.getElementById(id);
                if (target) {
                    linksById[id] = link;
                    observer.observe(target);
                }
            }
        });
    });
}
