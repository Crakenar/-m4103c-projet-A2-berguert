// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

//si clic sur l'image disk alors ajout chaine au tableau recherches[]
//function ajouter_recherche()
$("#disk").click(function(){
	//recuperer la chaine de carachtere
	//verifier si dans recherches, il y a la meme recherche
	const donneeEntree = $("#zone_saisie").val();
	if(recherches.indexOf(donneeEntree) == -1){
	//	alert($("#zone_saisie").val());
		recherches.push(donneeEntree);
		//ajouter l'element aux recherches stockées
	$("#recherches-stockees").append("<p class="titre-recherche"><label>chaîne de caractères saisie</label><img src="images/croix30.jpg" class="icone-croix"/></p>")
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

