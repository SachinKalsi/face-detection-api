
function onSubmit(e) {
  e.preventDefault();
  var customMessage = document.getElementById('message');
  if(validateForm(customMessage)) {
    uploadImage(customMessage);
  }
}

function get_image_upload_id(){
    return document.getElementById('image-upload');
}

function get_image_url(){
    return document.getElementById('image_url')
}

function validateForm(customMessage) {
  const uploadedFile = get_image_upload_id().elements[0].files[0] || get_image_url().value
  if(!uploadedFile) {
    customMessage.innerHTML = "Please select an image";
    return false;
  }
  if(typeof(uploadedFile) == 'string'){
    return true;
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
    if(get_image_upload_id().elements[0].files[0]){
        customMessage.innerHTML = 'Uploading image...'
        return post_request()
    }
    return get_request()
}

function post_request(){
    var formElement = get_image_upload_id();
    var request = new XMLHttpRequest();
    request.open("POST", "api/v1/detect_face", true);
    request.onload = onComplete;
    request.upload.onprogress = fileUploadPercentage;
    const data = new FormData(formElement);
    request.send(data);
}

function get_request(){
    var request = new XMLHttpRequest();
    var url = 'api/v1/detect_face?image_url=' + get_image_url().value
    request.onload = onComplete;
    request.open("GET", url, true);
    request.send();
}

function onComplete(event) {
  var customMessage = document.getElementById('message');
  const response = JSON.parse(event.currentTarget.response);
  if(response.success) {
    customMessage.style.color = '#9C27B0';
    customMessage.innerHTML = response.face_count + ' faces detected';
    renderDetectedFaces(response.image_id)
  } else {
    customMessage.innerHTML = "Something went wrong. Cann't identify image file";
    customMessage.style.color = 'red';
  }
  document.getElementById("submit").disabled = false;
}

function renderDetectedFaces(image_id){
    detected_face_image_tag = document.getElementById('output_image')
    detected_face_image_tag.src = '/'+image_id+'?'+new Date().getTime();
    document.getElementById("input_image").value = ''
    get_image_url().value = ''
    detected_face_image_tag.style.display = 'inline'
}

function fileUploadPercentage(e) {
  if (e.lengthComputable) {
    var customMessage = document.getElementById('message');
    var percentage = (e.loaded / e.total) * 100;
    customMessage.innerHTML = 'Uploading Image: ' + percentage + ' %';
  }
};
