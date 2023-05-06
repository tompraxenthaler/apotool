var htmlForm = document.getElementById("htmlForm");
var formButton = document.getElementById("formButton");

htmlForm.addEventListener("input", () => {
    if (htmlForm.checkValidity()) {
      formButton.disabled = false;
    } else {
      formButton.disabled = true;
    }
  });

function sendMail () {
    event.preventDefault();

    var parameters = {
        vorname: document.getElementById("vorname").value,
        nachname: document.getElementById("nachname").value,
        email: document.getElementById("email").value,
    };
        console.log(parameters);
    var optIn = document.getElementById("optin");
        console.log("OptIn:" + optIn.checked);
    
    const serviceId = "service_vawz19v";
    const templateId = "template_cjv4nfe";
    const publicKey = "shonANTuR2xK5mQ0Q";

    emailjs.send(serviceId, templateId, parameters)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            // document.getElementById("vorname").value = "";
            // document.getElementById("nachname").value = "";
            // document.getElementById("email").value = "";
            // console.log(res);
            // alert("message sent successfully");
        },
        function (error) {
            console.log("Failed", error);
        }
        );

        if (optIn.checked) {
            sendCleverReachData();
        };
};

function sendCleverReachData() {  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Antwort des Servers erfolgreich empfangen
        console.log(this.responseText);
    }
    };
    xhttp.open("POST", "https://eu.cleverreach.com/f/34217-167874/wcs/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var email = document.getElementById("email").value;
    var data = "email=" + email;
    xhttp.send(data);
    console.log(data);
  }
  