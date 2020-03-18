/**
 * Fonction utilitaire qui décode une chaine sous forme d'entités HTML
 * en une chaine "lisible" (en UTF-8)
 * (Exemple : decodeHtmlEntities("Bienvenue &agrave; toi &#33;") 
 *  => "Bienvenue à toi !")
*/
function decodeHtmlEntities(encodedString){
	var textArea = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}

/**
 * Fonction utilitaire qui transforme un nombre entier en
 * une chaine sur 2 caractères (ajoute un '0' devant si nécessaire)
 * (Exemples :
 *   - twoDigits(9) => "09"
 *   - twoDigits(12) => "12" )
*/
function twoDigits(v){
	return (v > 9) ? ''+v : '0'+v;;
}

/**
 * Fonction utilitaire qui formatte une date sous 
 * la forme "dd/mm hh'h'mm"
*/
function formatDate(cdate){
	var date = new Date(cdate);
	var day = twoDigits(date.getDate());
	var month = twoDigits(date.getMonth() + 1);
	var year = date.getFullYear();
	var hours = twoDigits(date.getHours());
	var minutes = twoDigits(date.getMinutes());
	return " "+day+"/"+month+" "+hours+"h"+minutes;
}

/**
 * Fonction utilitaire qui cherche si l'objet résultat (o) est bien
 * présent dans dans le tableau des résultats (t)
 * => Si un résultat a exactement le même titre et la même date, 
 *     la fonction retourne l'index de celui-ci dans le tableau
 * => Sinon, la fonction retourne -1
*/
function indexOfResultat(t, o){
	var limit = t.length;
	var trouve = false;
	var i = 0;
	while( (!trouve) && (i<limit) ){
		var c = t[i];
		if ((c.titre == o.titre) && (c.date == o.date)){
			trouve = true;
		}
		i++;
	}
	if (trouve) { return (i-1); }
	else { return -1; }
}

/**
 * Fonction utilitaire qui retourne le contenu (sa valeur) du cookie 
 * passé en paramètre (OU retourne "" s'il n'existe pas de cookie avec ce nom)
*/
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0 ; i<ca.length ; i++){
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

/**
 * Fonction utilitaire qui définit un nouveau cookie
 * à partir des paramètres : nom, valeur et nombre de jours avant expiration
*/
function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
