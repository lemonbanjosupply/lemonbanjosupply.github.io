document.addEventListener("DOMContentLoaded", function () {
    const detailsElements = document.querySelectorAll("details");

    detailsElements.forEach(details => {
        details.addEventListener("click", function () {
            // Close all other details elements
            detailsElements.forEach(otherDetails => {
                if (otherDetails !== details) {
                    otherDetails.removeAttribute("open");
                }
            });
        });
    });
});
