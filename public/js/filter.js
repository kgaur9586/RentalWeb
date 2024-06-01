document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll(".filter");

    function applyStyles(selectedFilter) {
        filters.forEach(filter => filter.classList.remove("selectedFilter"));
        const selectedElement = document.querySelector("." + selectedFilter);
        if (window.location.pathname === "/listings") {
            filters[0].classList.add("selectedFilter");
            return;
        }
        if (selectedElement) {
            selectedElement.classList.add("selectedFilter");
        }
    }

    filters.forEach(filter => {
        filter.addEventListener("click", function () {
            const element = this.classList[1];
            localStorage.setItem("selectedFilter", element);
            applyStyles(element);
        });
    });

    const storedFilter = localStorage.getItem("selectedFilter");
    if (storedFilter) {
        applyStyles(storedFilter);
    } else if (window.location.pathname === "/listings") {
        filters[0].classList.add("selectedFilter");
    }
});




