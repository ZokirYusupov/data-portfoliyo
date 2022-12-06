
    const passwordInput = document.querySelector("#password")
const eye = document.querySelector("#eye")
let inputFile = document.getElementById("image");
let imageName = document.getElementById("imageName")
eye.addEventListener("click", function(){
  this.classList.toggle("la-eye-slash")
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  passwordInput.setAttribute("type", type)
})

// file input


inputFile.addEventListener("change", ()=>{
    let inputImage = document.querySelector("input[type=file]").files[0];

    imageName.innerText = inputImage.name;
})