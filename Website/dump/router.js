const route = (event) => {
    event.preventDefault(); 

    const targetUrl = event.target.getAttribute("data-href");

    if (targetUrl) {
        window.history.pushState({}, "", targetUrl);
        console.log(`Navigated to ${targetUrl}`);
        handleLocation();
    }
};

const routes = {
    "home": "/pages/home/index.html",
    "/": "/pages/home/index.html",
    "/calculator": "/pages/calculator/main.html",
    "/note": "/pages/note/note.html",
    "/resume": "/pages/resume/portfolio.html",
    404: "/pages/error/404.html"
};

const scripts = {
    "/calculator": "/js/calculator.js",
    "/note": "/js/note.js",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];

    try {
        const html = await fetch(route).then((data) => data.text());

        document.querySelectorAll("script.dynamic-script").forEach(script => script.remove());

        const contentDiv = document.getElementById("content");

        if (path === "/") {
            contentDiv.innerHTML = "";
        } else {
            contentDiv.innerHTML = html;
        }

        if(scripts[path]) {
            const script = document.createElement("script");
            script.src = scripts[path];
            script.classList.add("dynamic-script");
            script.defer = true;
            document.body.appendChild(script);
            console.log(`Loaded script: ${scripts[path]}`);
        }

        attachEventListeners(); 
    } catch (error) {
        console.error("Error loading page:", error);
    }
};

const attachEventListeners = () => {
    document.querySelectorAll("button").forEach(button => {
        button.removeEventListener("click", route); 
        button.addEventListener("click", route);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    attachEventListeners();
    handleLocation(); 
});

window.onpopstate = handleLocation;
