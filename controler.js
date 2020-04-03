var controler = {};

let fonctionSupprimer = "controler.supprimer_nouvelle(this)";
let fonctionSauver = "controler.sauver_nouvelle(this)";
let imageDisque = "img/disk15.jpg";
let imageHorloge = "../img/horloge15.jpg";
let url_serveur = "https://carl-vincent.fr/search-internships.php?data=";
var nombreResRechStockees = 0;


/*
A AMELIORER : 
On se base sur la saisie en cours de l'utilisateur...et si l'utilisateur efface le tout ? 
Factoriser les fonctions ? 
Options : Trier par Date

*/



/*
Cette fonction permet lors du clic sur l'image de la disquette d'ajouter
à la div html "recherches-stockees" la recherches de l'utilisateur
Ces recherches sont enregistrées dans le localstorage
*/
controler.ajouter_recherche = function(){
	const donneeEntree = view.getSaisieUtilisateur();
	const rch = model.recherches;
	if(rch.indexOf(donneeEntree) == -1 && donneeEntree !=""){
		model.pushRecherches(donneeEntree);
		view.resetByClass("titre-recherche");
			//Afficher le nombre de résultats pour chaque recherches stockées
			$.each(model.recherches,function(index, value){
				let x = model.getLocalStorage(value);
				let nbr_recherches =0;
				if(x != null){
					nbr_recherches = x.length;
				}
				console.log(value);
				console.log(nbr_recherches);
				view.ajouterRechercheStockee(value,nbr_recherches);
			})
		model.setLocalStorage("recherches",model.recherches);
	}else{
		console.log("Recherche déjà présente");
	}
}

/*
Fonction permettant d'enlever des recherches dans la div html #resultats-stockees
L'index où se trouve l'elemet cliqué est enlevé de model.recherches
Le localstorage de la recherche en question est aussi supprimée.
On nettoie tout
*/
controler.supprimer_recherche = function(elt){

	view.suppHTMLParent(elt);
	let x = model.recherches;
	let y = view.suppJSPPK(elt);
	model.recherches.splice(x.indexOf(y),1);
	model.setLocalStorage("recherches",model.recherches);
	model.LocalStorageClear(y);
}


/*
Fonction appelée à chaque refresh de page (on pourrait avoir une fonction anonyme = same)
Refresh du DOM puis acceder aux localstorage pour retrouver les recherches-stockées ainsi que leurs nouvelles
Et remplir la page des élements.
*/
controler.init = function(){

	model.recherches = model.getLocalStorage("recherches");
	view.suppHTML("recherche-stockees");
	if(model.recherches != null){		
		$().each(model.recherches,function(index, value){
			view.ajouterRechercheStockee(value);
		});
	}else{
			model.resetRecherches();
	}
	view.supprimerAideAutoComplete();
	view.sortSearches("resultats");
	view.sortSearches("recherches-stockees");
	//Afficher le nombre de résultats pour chaque recherches stockées
	view.resetByClass("titre-recherche");
	$.each(model.recherches,function(index, value){
		let x = model.getLocalStorage(value);
		let nbr_recherches =0;
		if(x != null){
			nbr_recherches = x.length;
		}
		view.ajouterRechercheStockee(value,nbr_recherches);
	})
}


/*
Fonction lancée lorsque l'on clique sur OK ou tape sur entrée (ou encore à chaque touche du clavier pour une recherche dynamique)
On accede au serveur de carl-vincent qui contient un ensemble de recherches et des fonctions php permettant
de trouver les nouvelles en fonction de ce que l'utilisateur entre.
Attention : methode Get => faille ??

*/
var maRecherche;
controler.rechercher_nouvelles = function(){
	//on récupere la valeur de la zone saisie
	let valueSaisie = view.getSaisieUtilisateur();
	//on verifie si elle existe dans les zone stockées donc dans le localstorage
		let verifSiExisteDeja = model.getLocalStorage(valueSaisie);
	//si n'existe pas (null)
	if(verifSiExisteDeja == null){
		let x = [];
		model.setLocalStorage("recherches_courante_news",x);
	}else{
		//sinon rien
	}
	console.log(model.recherches_Utilisateur);
	nombreResRechStockees = 0;
	let saisieUtilisateur = view.getSaisieUtilisateur();
	view.afficherImageAttenteReponseServeur("block");
 	$.get("https://carl-vincent.fr/search-internships.php?data="+saisieUtilisateur,controler.maj_resultats);
	view.resetElementHTML("resultats");
	//Permet de récuperer l'item sur lequel on clic 
	//Lourd si plusieurs centaines de recherches stockées ????
	view.getElementByID("recherches-stockees").click(function(event){
		var x = event.target; // event.target à l'exact élement sur lequel on clic 
		maRecherche = $(x).text();
	});
	if(model.getLocalStorage(maRecherche)){		
		model.recherche_courante_news = model.getLocalStorage(maRecherche)
	}else{
		//alert("pas de cookie pour toi")
	}

}


/*
Fonction callback apres appel au serveur pour obtenir les recherches
On fera l'affichage des nouvelles pour la recherches ainsi qu'une verification pour savoir
si elles sont déjà enregistrées (changer image et fonction add => fonction supp)
*/
controler.maj_resultats = function(res){
	resSorted = res.sort(function(n1,n2){
		return new Date(n1.date) - new Date(n2.date)
	});


	view.afficherImageAttenteReponseServeur("none");
	model.recherche_courante_news = model.getLocalStorage("recherches_courante_news");
	$(resSorted).each(function(index,value){
		if(model.recherche_courante_news == null){
			view.affichageResultatsRecherche(value.url,value.titre,value.date,fonctionSauver,imageHorloge);
		}else{
				if(indexOfResultat(model.recherche_courante_news,res[index]) == -1){ //n'existe pas
					view.affichageResultatsRecherche(value.url,value.titre,value.date,fonctionSauver,imageHorloge);
				}else{
					view.affichageResultatsRecherche(value.url,value.titre,value.date,fonctionSupprimer,imageDisque);
				}
		}
		nombreResRechStockees = nombreResRechStockees +1;
	});
	view.afficherNombreResultatParNouvelleRecherche("resultatTitre",nombreResRechStockees);
}

/*Simple affichage de la diquette si clique sur ok 
Nul : marche que pour le premier ok 

Edit : en fait sert surement à rien
*/
controler.affichageDisquette = function(){
	view.affichageEnregistrementNouvelleRecherche();
}


/*
Fonction permettant d'afficher les résultats enregistré dans le localstorage de chaque recherche
(si on clique dessus) enregistrées par l'utilisateur.
Le localStorage de recherchecourante est mis à jour ici 
*/
controler.selectionner_recherche = function(elt){
	let saisieUtilisateur = view.getSaisieUtilisateur();
	//reset du dom pour eviter d'additionner encore et encore
	view.resetElementHTML("zone_saisie");
	view.setValueHTMLElement("zone_saisie",elt)
	view.resetElementHTML("resultats");
	view.setValueHTMLElement(saisieUtilisateur,elt);
	model.resetRecherche_Courante_News();
	//affichage de chaque element pour la recherches en cours
	let recherche_courante_news2 =model.getLocalStorage(view.getSaisieUtilisateur()); 
	$.each(recherche_courante_news2, function(index, value){
		view.affichageResultatsRecherche(value.url,value.titre,value.date,fonctionSupprimer,imageDisque);
	});

	model.setLocalStorage("recherches_courante_news",recherche_courante_news2);
	model.recherche_courante_news = model.getLocalStorage("recherches_courante_news");
}

/*
Fonction appelée lorsqu'une nouvelle n'est pas encore enregistrée (image horloge)
Elle permet ensuite de changer des attributs et donc de donner en parametre :
- une image
- une nouvelle fonction si l'on clique dessus (fonction supprimer)

Lorsque l'on clique sur l'image horloge, un objet est crée afin de le stocker dans le localstorage
JSON prend des objets
*/
controler.sauver_nouvelle = function(elt){
	nombreResRechStockees = 0;
	let titre = view.findTitreNouvelle(elt);
	let url = view.findUrlNouvelle(elt);
	let date = view.findDateNouvelle(elt);
	let obj = 	model.createObjetNouvelle(titre,date,url);
	console.log(obj);
	
	//changement des attributs
	view.ChangerImageHTML(elt,imageDisque);
	view.ChangerAttribut(elt,"onclick",fonctionSupprimer);
	model.recherche_courante_news = model.getLocalStorage("recherches_courante_news");
	if(model.recherche_courante_news == null){
		model.resetRecherche_Courante_News();
	}else{ // inutile ?
		model.recherche_courante_news = model.getLocalStorage("recherches_courante_news");
	}

	model.pushRecherches_Courantes_News(obj);
	model.setLocalStorage("recherches_courante_news",model.recherche_courante_news)
	model.setLocalStorage(view.getSaisieUtilisateur(),model.recherche_courante_news)
	nombreResRechStockees = nombreResRechStockees +1;
}

/*
Fonction appelée lorsqu'une nouvelle n'est pas encore enregistrée (image horloge)
Elle permet ensuite de changer des attributs et donc de donner en parametre :
- une image
- une nouvelle fonction si l'on clique dessus (fonction supprimer)
Lorsque l'on clique sur l'image horloge, un objet est crée afin de le déstocker dans le localstorage
JSON prend des objets
*/
controler.supprimer_nouvelle = function(elt){
	let titre = view.findTitreNouvelle(elt);
	let url = view.findUrlNouvelle(elt);
	let date = view.findDateNouvelle(elt);
	let obj = 	model.createObjetNouvelle(titre,date,url);

	//changement des attributs
	view.ChangerImageHTML(elt,imageHorloge);
	view.ChangerAttribut(elt,"onclick",fonctionSauver);
	model.recherche_courante_news = model.getLocalStorage("recherches_courante_news");
	if(indexOfResultat(model.recherche_courante_news,obj) != -1){
		let x = indexOfResultat(model.recherche_courante_news,obj);
		console.log(x);
		model.recherche_courante_news.splice(x,1);
		model.setLocalStorage("recherches_courante_news",model.recherche_courante_news);
		model.setLocalStorage(view.getSaisieUtilisateur(),model.recherche_courante_news);
	}
}


/*
Fonctions utilisées pour permettre le fonctionnement de l'autocomplete (jqueryUI)
On ajoute simplement chaque recherche de l'utilisateurs dans un autre localstorage
car si l'on prenait model.recherches celui-ci ne garde pas à jamais les recherches de
l'utilisateur vu qu'on peut supprimer des recherches
CF => supprimer_nouvelles()
*/
controler.recherche_utilisateurs = function(elt){
	model.resetRecherches_Utilisateur();
	model.recherches_Utilisateur = model.getLocalStorage("Recherches_Utilisateur");
	if(model.recherches_Utilisateur == null){
		model.resetRecherches_Utilisateur();
		model.pushRecherches_Utilisateur(elt);
	}else if (model.recherches_Utilisateur.includes(elt) == false ){
		model.pushRecherches_Utilisateur(elt);
	}
	model.setLocalStorage("Recherches_Utilisateur",model.recherches_Utilisateur);
	view.zoneSaisieUtilisateur().autocomplete({source : model.recherches_Utilisateur});
}

controler.ajouteMoiCa = function(){
	model.recherches_Utilisateur = model.getLocalStorage("Recherches_Utilisateur");
	if(model.recherches_Utilisateur == null){
		model.resetRecherches_Utilisateur();
	}
	controler.recherche_utilisateurs(view.getSaisieUtilisateur());
	model.setLocalStorage("Recherches_Utilisateur",model.recherches_Utilisateur);
	model.recherches_Utilisateur = model.getLocalStorage("Recherches_Utilisateur");
}

/*
Fonction anonyme permettant l'appel de l'autocomplete ainsi que l'ajout de la fonctionnalité
permettant d'effectuer une recherche lors d'une touche entrée ou à chaque touche clavier

Apres ajout des recherches de l'utilisateur dans le localestorage, on choisis de récuperer le tout
L'autocompletion se basera alors sur ça.
*/
$(function(){
	//Autocompletion
	model.recherches_Utilisateur = model.getLocalStorage("Recherches_Utilisateur");
	if(model.recherches_Utilisateur == null){
		model.resetRecherches_Utilisateur();
	}
	view.zoneSaisieUtilisateur().autocomplete({
		source : model.recherches_Utilisateur,
		autoFocus : false,
	}).keyup(function(event){
		if(event.keyCode === 13){
			controler.recherche_utilisateurs(view.getSaisieUtilisateur());
			model.setLocalStorage("Recherches_Utilisateur",model.recherches_Utilisateur);
		}
		controler.rechercher_nouvelles();
	})
	view.supprimerAideAutoComplete();
});

/*
Bout de code permettant de changer la dispositions des recherches-stockées et de 
sauvegarder ce changement

HELP : A mettre dans la fonction anonyme ? 
*/
view.getElementByID("recherches-stockees").sortable({
	update : function(){
		model.recherches = [];
		//on parcourt les elements du DOM pour créer une nouvelle array avec ces nouveaux emplacements
			view.getElementByID("recherches-stockees > p").each(function(index,value){
			let x = view.thisFindText(this,"label");
			model.pushRecherches(x);
		})
			model.setLocalStorage("recherches",model.recherches);
	}
})

//filter
/*
Fonction permettant de trier les dates 

Option = pour clique sur le bouton Trier par Date
Idée : retourner un boolean pour ensuite verifier dans maj_resultats comment afficher
*/
controler.TrierParDate = function(){
	controler.rechercher_nouvelles();
		view.getElementByID("resultats").sort(function (n1,n2){
		return new Date(n2.date) - new Date(n1.date)
	});
}

