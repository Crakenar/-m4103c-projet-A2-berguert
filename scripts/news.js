// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

//si clic sur l'image disk alors ajout chaine au tableau recherches[]
//on vide la zone d'affichage
$("#disk").click(function ajouter_recherche() {
	//recuperer la chaine de carachtere
	//verifier si dans recherches, il y a la meme recherche
	if(recherches.indexOf($("#zone_saisie").val()) == -1){
		alert($("#zone_saisie").val());
		recherches.push($("#zone_saisie").val());
	}else{
		alert("deja prsent");
	}
	
});


function supprimer_recherche(elt) {
	//TODO ...
}


function selectionner_recherche(elt) {
	//TODO ...
}


function init() {
	//TODO ...
}


function rechercher_nouvelles() {
	//TODO ...
}


function maj_resultats(res) {
	//TODO ...
}


function sauver_nouvelle(elt) {
	//TODO ...
}


function supprimer_nouvelle(elt) {
	//TODO ...
}

