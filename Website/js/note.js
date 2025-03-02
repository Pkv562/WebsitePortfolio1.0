if (!window.notesScriptLoaded) {
  window.notesScriptLoaded = true; 
  console.log("Note-taking script loaded!");

  const notesContainer = document.querySelector(".notes-container");
  const creatBtn = document.querySelector(".btn");
  let notes = document.querySelectorAll(".input-box");

  function showNotes() {
      notesContainer.innerHTML = localStorage.getItem("notes") || "";
  }

  function updateStorage() {
      localStorage.setItem("notes", notesContainer.innerHTML);
  }

  creatBtn.addEventListener("click", () => {
      let inputBox = document.createElement("p");
      let img = document.createElement("img");
      inputBox.className = "input-box";
      inputBox.setAttribute("contenteditable", "true");
      img.src = "/assets/trash.png"; 
      notesContainer.appendChild(inputBox).appendChild(img);
  });

  notesContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "IMG") {
          e.target.parentElement.remove();
          updateStorage();
      } else if (e.target.tagName === "P") {
          notes = document.querySelectorAll(".input-box");
          notes.forEach((nt) => {
              nt.onkeyup = function () {
                  updateStorage();
              };
          });
      }
  });

  showNotes(); 
}
