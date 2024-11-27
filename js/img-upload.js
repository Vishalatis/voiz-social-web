const galleryIcon = document.getElementById("galleryIcon");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");

// Trigger file input when the gallery icon is clicked
galleryIcon.addEventListener("click", () => {
  fileInput.click();
});

// Handle file input changes
fileInput.addEventListener("change", (event) => {
  const files = event.target.files;

  Array.from(files).forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      // Create preview and remove elements
      const previewWrapper = document.createElement("div");
      previewWrapper.classList.add("image-preview");

      const imgElement = document.createElement("img");
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-icon");
      removeButton.textContent = "×";

      // Append elements to preview
      previewWrapper.appendChild(imgElement);
      previewWrapper.appendChild(removeButton);
      previewContainer.appendChild(previewWrapper);

      // Remove preview on button click
      removeButton.addEventListener("click", () => {
        previewContainer.removeChild(previewWrapper);
      });

      // Load and display the image
      reader.onload = (e) => {
        imgElement.src = e.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload only image files.");
    }
  });

  // Clear input to allow re-uploading the same files if needed
  fileInput.value = "";
});
