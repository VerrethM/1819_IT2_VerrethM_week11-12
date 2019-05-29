// Danskonijn
let danskonijnKnop = document.querySelector(".dansen");
let danskonijn = document.querySelector(".danskonijn");
let danskonijnen = document.querySelectorAll(".danskonijn div");
var audio = new Audio('bunnyparty.mp3');

danskonijnKnop.addEventListener("click",function(e) {
	e.preventDefault();
	danskonijn.classList.toggle('actief');
	if(danskonijn.classList.contains('actief')) {
        document.body.style.overflowY = "hidden";
        audio.play();
	} else {
		document.body.style.overflowY = "visible";
        audio.pause();
	}
});

window.addEventListener("keydown", function(e) {
    e = e || window.event;
    let i = 0;
    while(i < danskonijnen.length) {
    	danskonijnen[i].classList.remove('actief');
    	i++;
	}
    if (e.keyCode == '38') {
        danskonijnen[0].classList.add('actief');
        console.log('omhoog');
    }
    else if (e.keyCode == '40') {
        danskonijnen[1].classList.add('actief');
        console.log('omlaag');
    }
    else if (e.keyCode == '37') {
        danskonijnen[2].classList.add('actief');
        console.log('links');
    }
    else if (e.keyCode == '39') {
        danskonijnen[3].classList.add('actief');
        console.log('rechts');
    } else if (e.keyCode == '32') {
        audio.pause();
        danskonijn.classList.remove('actief');
        document.body.style.overflowY = "visible";
	}
});

// Hamburger menu
let menuKnop = document.querySelector(".menu");
let navMenu = document.querySelector("nav");
function toonMenu() {
	if (navMenu.style.display === "flex") {
		navMenu.style.display = "none";
		document.body.style.overflow = "visible";
	} else {
		navMenu.style.display = "flex";
        document.body.style.overflow = "hidden";
	}
}
menuKnop.addEventListener("click",toonMenu);

// Pinkify
let schakelaar = document.querySelector(".schakelaar");
let logo = document.querySelector(".logo img");
let hamburger = document.querySelector(".menu img");

// Pinkify opslaan in Cookies
let pinkifyValue = getCookie("pinkifyValue");
if (pinkifyValue != "") {
    console.log('Er was reeds een cookie geset, dus ik ga uit van de waarde van de cookie...');
    if(pinkifyValue == "aan") {
    	console.log('Pinkify aan volgens cookie...');
        schakelaar.classList.add('aan');
        document.body.classList.add('pinkified');
        logo.setAttribute("src","werk/logo-white.svg");
        hamburger.setAttribute("src","werk/hamburger-white.svg");
    } else {
        console.log('Pinkify uit volgens cookie...');
        schakelaar.classList.remove('aan');
        document.body.classList.remove('pinkified');
        logo.setAttribute("src","werk/logo.svg");
        hamburger.setAttribute("src","werk/hamburger.svg");
    }
}

schakelaar.addEventListener("click",function(e) {
    schakelaar.classList.toggle('aan');
    document.body.classList.toggle('pinkified');
    if(document.body.classList.contains("pinkified")) {
        logo.setAttribute("src","werk/logo-white.svg");
        hamburger.setAttribute("src","werk/hamburger-white.svg");
        setCookie("pinkifyValue","aan");
    } else {
        logo.setAttribute("src","werk/logo.svg");
        hamburger.setAttribute("src","werk/hamburger.svg");
        setCookie("pinkifyValue","uit");
    }
});

// Tabbladen
let actiefTabblad = document.querySelector(".tabbladen li a.actief");
if(actiefTabblad) {
	let actieveCategorie = actiefTabblad.getAttribute("data-toon");
	toon(actieveCategorie);
}

let tabbladen = document.querySelectorAll(".tabbladen li a");
let i = 0;
while (i < tabbladen.length) {
	tabbladen[i].addEventListener("click", function(e) {
		e.preventDefault();
		let actiefElement = document.querySelector(".tabbladen li a.actief");
		actiefElement.classList.remove("actief");
		this.classList.toggle("actief");
		let categorie = this.getAttribute("data-toon");
		console.log(categorie);
		toon(categorie);
	});
	i++;
}

// De functie die de elementen toont/verbergt op basis van de actieve categorie
function toon(categorie) {
	let alles = document.querySelectorAll(".kolomweergave a");
	let i = 0;
	while(i < alles.length) {
		alles[i].classList.add("verborgen");
		if(alles[i].classList.contains(categorie)) {
			alles[i].classList.remove("verborgen");
		}
		i++;
	}
}

// Formulier
let verzendknop = document.querySelector(".verzendknop");
let intro = document.querySelector(".intro");
let introZin = document.querySelector(".intro p");

if(verzendknop) {
	let formulier = document.querySelector("form");
	verzendknop.addEventListener("click", function(e) {
		e.preventDefault();
		formulier.classList.add("verborgen");
		introZin.classList.add("verborgen");
		let paragraaf = document.createElement("p");
		paragraaf.classList.add("resultaat");
		intro.appendChild(paragraaf);
		let voornaam = document.querySelector(".voornaam");
		let achternaam = document.querySelector(".achternaam");

		paragraaf.innerHTML = "Hello " + voornaam.value + ", <br /><br />Thanks for your message! We'll be in touch shortly.";
	});
}

// Kijken of er een cookie ingesteld was
// Code overgenomen van: https://www.w3schools.com/Js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
