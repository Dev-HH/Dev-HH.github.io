document.querySelector("hy-push-state").addEventListener("load", () => {
  let tocElement = document.getElementById("markdown-toc");

  if (tocElement) {
    let affixedDiv = document.createElement("div");
    affixedDiv.style.position = "relative";
    affixedDiv.style.top = "-1rem";
    tocElement.parentNode.insertBefore(affixedDiv, tocElement);

    let headerList = document.getElementsByClassName("permalink");
    let prevElement;
    window.addEventListener("scroll", () => {
      let hurdleTop = affixedDiv.getBoundingClientRect().top;
      if (hurdleTop <= 0) tocElement.classList.add("affix");
      else tocElement.classList.remove("affix");

      for (let i = 0; i < headerList.length; i++) {
        if (headerList[i].getBoundingClientRect().top >= 0) {
          prevElement?.style.removeProperty("font-weight");
          let tocId = "markdown-toc-" + headerList[i].parentNode.id;
          prevElement = document.getElementById(tocId);
          prevElement.style.fontWeight = "bold";

          break;
        }
      }
    });
  }
});
