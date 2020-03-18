// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

//si clic sur le bouton ok alors nouvelle recherche
//on vide la zone d'affichage
$("bouton_recherche").click(function ajouter_recherche() {
	$("#resultats").val("");

	//recuperer la valeur de la recherche et l'envoyer en parametre du lien pour le php
	$.get("https://carl-vincent.fr/search-internships.php?data=",$("#resultat".val()));
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

