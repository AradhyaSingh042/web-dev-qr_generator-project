let formatButton = document.getElementById("format-icon");
let sizeButton = document.getElementById("size-icon");
let generatebtn = document.querySelector(".generate-btn");
let downloadbtn = document.querySelector(".download-btn");
let formatOptions = document.querySelectorAll(".format-span");
let sizeOptions = document.querySelectorAll(".size-span");
let formatOptionsMenu = document.querySelector(".format-container-menu");
let sizeOptionsMenu = document.querySelector(".size-container-menu");
let selectedFormatText = document.querySelector("#selected-format-text");
let selectedSizeText = document.querySelector("#selected-size-text");
let flag = 0;

let formatObj = {
  png: "png",
  jpg: "jpg",
  jpeg: "jpeg",
  svg: "svg",
};

let sizeObj = {
  "100x100": "100x100",
  "200x200": "200x200",
  "300x300": "300x300",
  "400x400": "400x400",
};

formatButton.addEventListener("click", () => {
  if (flag == 0) {
    formatOptionsMenu.style.display = "flex";
    flag = 1;
  } else if (flag == 1) {
    formatOptionsMenu.style.display = "none";
    flag = 0;
  }
});

sizeButton.addEventListener("click", () => {
  if (flag == 0) {
    sizeOptionsMenu.style.display = "flex";
    flag = 1;
  } else if (flag == 1) {
    sizeOptionsMenu.style.display = "none";
    flag = 0;
  }
});

formatOptions.forEach((formatOption) => {
  formatOption.addEventListener("click", () => {
    formatOptionsMenu.style.display = "none";
    selectedFormatText.textContent = formatObj[formatOption.textContent];
  });
});

sizeOptions.forEach((sizeOption) => {
  sizeOption.addEventListener("click", () => {
    sizeOptionsMenu.style.display = "none";
    selectedSizeText.textContent = sizeObj[sizeOption.textContent];
  });
});

async function generateQR() {
  let urlField = document.querySelector("#url-field");
  let data = urlField.value;
  let url = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&format=${selectedFormatText.textContent}&size=${selectedSizeText.textContent}`;

  let resp = await fetch(url);

  let blob = await resp.blob();

  let imgUrl = URL.createObjectURL(blob);
  let img = document.createElement("img");
  img.src = imgUrl;
  img.id = "generated-img";
  img.style.width = "150px";
  img.style.height = "150px";
  document.body.children[1].appendChild(img);
  if (innerWidth < 640) {
    document.body.children[1].style.marginTop = "180px";
  } else {
    document.body.children[1].style.marginTop = "1rem";
  }
  downloadbtn.addEventListener("click", function () {
    // Create download link
    let downloadLink = document.createElement("a");
    downloadLink.style.position = "absolute";
    downloadLink.href = imgUrl;
    downloadLink.download = "qrcode." + selectedFormatText.textContent;
    document.body.appendChild(downloadLink);
    // Simulate click on the download link
    downloadLink.click();
    // Remove the download link from the DOM
    document.body.removeChild(downloadLink);
  });
}

generatebtn.addEventListener("click", generateQR);
