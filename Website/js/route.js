document.addEventListener("click", function(event) {

    console.log("route js found");
    
    if(event.target.matches(".nav_link")) {
        event.preventDefault();

        const page = event.target.getAttribute("data-page");

        if(page) {
            window.location.href = page;
        }
    }

})