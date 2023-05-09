var htmlForm = document.getElementById("htmlForm");
var formButton = document.getElementById("formButton");
var parameters = {
    anrede: "",
    titel: "",
    vorname: "",
    nachname: "",
    email: "",
    strasse: "",
    hausnummer: "",
    adresszusatz: "",
    plz: "",
    ort: "",
    land: "",
    telefon: "",
    geburtsdatum: "",
    sportarten: "",
};
var tag = "";
var monat = "";
var jahr = "";
var geschlecht = "";
var optin = "";
var sportartCheckboxes = "";
var sportartenSelected = "";

htmlForm.addEventListener("input", () => {
    if (htmlForm.checkValidity()) {
      formButton.disabled = false;
    } else {
      formButton.disabled = true;
    }
  });

function sendMail () {
    event.preventDefault();

    ////////////////////////////////////////////
    // Parameter und Variablen definieren
    ////////////////////////////////////////////
    sportartCheckboxes = document.getElementsByClassName("sportart-checkbox");
    for (var i = 0; i < sportartCheckboxes.length; i++) {
        if (sportartCheckboxes[i].checked == true){
            sportartenSelected += sportartCheckboxes[i].id + " ";
        }
    }

    parameters = {
        anrede: document.getElementById("anrede").value,
        titel: document.getElementById("titel").value,
        vorname: document.getElementById("vorname").value,
        nachname: document.getElementById("nachname").value,
        email: document.getElementById("email").value,
        strasse: document.getElementById("strasse").value,
        hausnummer: document.getElementById("hausnummer").value,
        adresszusatz: document.getElementById("adresszusatz").value,
        plz: document.getElementById("plz").value,
        ort: document.getElementById("ort").value,
        land: document.getElementById("land").value,
        telefon: document.getElementById("telefon").value,
        geburtsdatum: document.getElementById("geburtstag").value,
        sportarten: sportartenSelected,
    };
    var geburtsdatumSplit = parameters.geburtsdatum.split("-");
    jahr = geburtsdatumSplit[0];
    monat = geburtsdatumSplit[1];
    tag = geburtsdatumSplit[2];

    switch (parameters.anrede) {
        case "Herr": geschlecht = "männlich";
            break;
        case "Frau": geschlecht = "weiblich";
            break;
        case "divers": geschlecht = "divers";
            break;
        case "Familie": geschlecht = "Familie";
            break;
        case "Firma": geschlecht = "Firma";
            break;
        case "Verein": geschlecht = "Verein";
            break;
        default: geschlecht = "";
    }

    console.log(parameters);
    console.log(geschlecht);
    optin = document.getElementById("optin");
    console.log("Opt-In:" + optin.checked);

    ////////////////////////////////////////////
    // EmailJS trigger
    ////////////////////////////////////////////
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

    ////////////////////////////////////////////
    // Bei Opt-in CleverReach Funktion ausführen 
    ////////////////////////////////////////////
    if (optin.checked) {
        console.log("Post CleverReach");
        sendCleverReachData();
    };

    ///////////////////////////
    // Leeren der Input-Felder 
    ///////////////////////////
    document.getElementById("anrede").value = "";
    document.getElementById("titel").value = "";
    document.getElementById("vorname").value = "";
    document.getElementById("nachname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("optin").checked = false;
    document.getElementById("strasse").value = "";
    document.getElementById("hausnummer").value = "";
    document.getElementById("adresszusatz").value = "";
    document.getElementById("plz").value = "";
    document.getElementById("ort").value = "";
    document.getElementById("land").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("geburtstag").value = "";
    for (var i = 0; i < sportartCheckboxes.length; i++) {
        sportartCheckboxes[i].checked = false;
    }
    sportartenSelected = "";
    document.getElementById("consent").checked = false;

    ////////////////////////////////////////
    // Öffnen der Success Page nach Absenden
    ////////////////////////////////////////
    var newWindow = window.open("", "_blank");
    newWindow.location.href = "success.html";
};

/////////////////////////////////////////////
// Funktion: Daten an CleverReach übermitteln
/////////////////////////////////////////////
function sendCleverReachData() {  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Antwort des Servers erfolgreich empfangen
        console.log(this.responseText);
    }
    };
    xhttp.open("POST", "https://eu.cleverreach.com/f/34217-168874/wcs/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var email = document.getElementById("email").value;
    var data = "email=" + email + "&250470=" + parameters.vorname + "&250471=" + parameters.nachname + "&264138=" + parameters.anrede + "&250768=" + geschlecht + "&264139=" + parameters.titel + "&258000=" + parameters.plz
        + "&258001=" + parameters.ort + "&258002=" + parameters.land + "&250767[day]=" + tag + "&250767[month]=" + monat + "&250767[year]=" + jahr + "&258005=" + sportartenSelected + "&258004=" + "Online-Anmeldung";
    xhttp.send(data);
    console.log(data);
  }
  