document.addEventListener("DOMContentLoaded", function () {
    const formElements = document.querySelectorAll("select, input, textarea");

    // Function for generating the link and sending an email
    function generateLink(templateID, sendToAdmin = true) {
        const params = new URLSearchParams();

        formElements.forEach(el => {
            if ((el.type === "radio" || el.type === "checkbox") && !el.checked) return;
            params.append(el.id || el.name, el.value);
        });

        const url = window.location.origin + window.location.pathname + "?" + params.toString();
        
        // Prompt for user's name and email
        const userName = prompt("Please enter your name:");
        const userEmail = prompt("Please enter your email:");

        if (userName && userEmail) {
            // Initialize EmailJS
            emailjs.init('usoRnw5-DmZysNLeO'); 

            // Prepare email data for the user
            const emailParams = {
                to_name: userName,
                to_email: userEmail,  
                message: `${url}`
            };

            // Send email to the user first
            emailjs.send('service_vepchmn', templateID, emailParams)
                .then(function() {
                    alert(`Link has been sent to ${userEmail}.`);

                    if (sendToAdmin) {
                        // Prepare email data for the admin (only if sendToAdmin is true)
                        const emailParamsAdmin = {
                            to_name: userName,
                            user_email: userEmail,  
                            message: `${url}`
                        };

                        // Send email to admin only once
                        return emailjs.send('service_vepchmn', 'template_dfl9m9l', emailParamsAdmin);
                    }
                })
                .then(function() {
                    if (sendToAdmin) {
                        console.log("Admin email sent successfully.");
                    }
                })
                .catch(function(error) {
                    console.error("Email send failed:", error);
                    alert("Failed to send email: " + (error.text || error.message || "Unknown error"));
                });

        } else {
            alert("Name and email are required to send the link.");
        }
    }

    // Function to populate form from URL params
    function populateForm() {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            let elements = document.querySelectorAll(`[id="${key}"], [name="${key}"]`);
            
            elements.forEach(el => {
                if (el.type === "radio" || el.type === "checkbox") {
                    el.checked = el.value === value;
                } else {
                    el.value = value;
                }
            });
        });

        // **Trigger the model update after populating form**
        const headstockSelect = document.getElementById("hsShapeSelect");
        if (headstockSelect) {
            headstockSelect.dispatchEvent(new Event("change"));
        }
    }

    // Populate the form on page load
    populateForm();

    // Button to generate link with first template (user + admin)
    document.getElementById("generateLinkButton").addEventListener("click", function() {
        generateLink('template_dfl9m9l');
    });

    // Button to generate link with second template (user only, no admin)
    document.getElementById("saveDesignButton").addEventListener("click", function() {
        generateLink('template_oao78lt', false); // 'false' for not sending to admin
    });
});
