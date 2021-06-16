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

    //WIP
    sendRequest(file);
}

function sendRequest(mod) {
    const file = File.valueOf(mod);
    console.log(file)
    const formdata = new FormData();
    formdata.set(file.name, file);

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://minemobs.galaxyfight.fr:8001/upload", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
