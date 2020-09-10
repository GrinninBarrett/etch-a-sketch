// Make text in "Rainbow" button actual rainbow colors
window.addEventListener("load", function() {
    let rainbowButton = document.getElementsByClassName("rainbow");
    for (let i = 0; i < rainbowButton.length; i++) {
      generateRainbowText(rainbowButton[i]);
    }
});
  
function generateRainbowText(element) {
    let text = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      let charElem = document.createElement("span");
      charElem.style.color = "hsl(" + (360 * i / text.length) + ",100%,40%)";
      charElem.innerHTML = text[i];
      element.appendChild(charElem);
    }
}