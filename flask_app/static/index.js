
function onSubmit(e) {
  e.preventDefault();
  var customMessage = document.getElementById('message');
  if(validateForm(customMessage)) {
    uploadImage(customMessage);
  }
}

function validateForm(customMessage) {
  const uploadedFile = document.getElementById('image-upload').elements[0].files[0];
  if(!uploadedFile) {
    customMessage.innerHTML = "Please select an image";
    return false;
  }
  const fileLimit = 2097152;
  if(uploadedFile.size > fileLimit) {
    customMessage.innerHTML = "Maximum video size allowed: 2MB";
    return false;
  }
  return true;
}

function uploadImage(customMessage) {
  document.getElementById("submit").disabled = true;
  customMessage.innerHTML = 'Uploading image...'
  var formElement = document.getElementById("image-upload");
  var request = new XMLHttpRequest();
  request.open("POST", "api/v1/detect_face", true);
  request.onload = onComplete;
  request.upload.onprogress = fileUploadPercentage;
  const data = new FormData(formElement);
  request.send(data);
}

function onComplete(event) {
  var customMessage = document.getElementById('message');
  const response = JSON.parse(event.currentTarget.response);
  if(response.success) {
//    document.getElementById('main-div').style.display = 'none';
    customMessage.style.color = '#9C27B0';
    customMessage.innerHTML = response.face_count + ' faces detected';
    renderDetectedFaces(response.image_id)
  } else {
    customMessage.innerHTML = "Something went wrong";
    customMessage.style.color = 'red';
  }
  document.getElementById("submit").disabled = false;
}

function renderDetectedFaces(image_id){
    detected_face_image_tag = document.getElementById('output_image')
    detected_face_image_tag.src = '/'+image_id+'?'+new Date().getTime();
    document.getElementById("input_image").value = ''
    detected_face_image_tag.style.display = 'inline'
}

function fileUploadPercentage(e) {
  if (e.lengthComputable) {
    var customMessage = document.getElementById('message');
    var percentage = (e.loaded / e.total) * 100;
    customMessage.innerHTML = 'Uploading Image: ' + percentage + ' %';
  }
};
