document.querySelectorAll(".drop-zone__input").forEach(element => {
    const dropZoneElement = element.closest(".drop-zone");

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over")
    });

    dropZoneElement.addEventListener("click", () => {
        element.click();
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, () => {
            dropZoneElement.classList.remove("drop-zone--over")
        })
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();

        if([...e.dataTransfer.files].filter(s => s.type === "application/java-archive").length === 0) {
            alert("Wrong file type. We only support jar file")
            dropZoneElement.classList.remove("drop-zone--over");
            return;
        }
        
        const files = [...e.dataTransfer.files].filter(s => s.type === "application/java-archive");

        element.files[0] = files;
        updateThumbnail(dropZoneElement, files[0]);

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    
    if(dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    if(dropZoneElement.querySelector(".fa-file-upload")) {
        dropZoneElement.querySelector(".fa-file-upload").remove();
    }

    if(!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;
    thumbnailElement.style.backgroundImage = "url(./assets/jar.svg)"

    //Todo: Send http Request
}