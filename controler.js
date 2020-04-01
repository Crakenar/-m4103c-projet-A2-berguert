var controler = {};

let fonctionSupprimer = "controler.supprimer_nouvelle(this)";
let fonctionSauver = "controler.sauver_nouvelle(this)";
let imageDisque = "img/disk15.jpg";
let imageHorloge = "../img/horloge15.jpg";
let url_serveur = "https://carl-vincent.fr/search-internships.php?data=";
var nombreResRechStockees = 0;
//let fonctionSupprimer = supprimer_nouvelle(this);


controler.ajouter_recherche = function(){
	const donneeEntree = view.getSaisieUtilisateur();
	const rch = model.recherches;
	if(rch.indexOf(donneeEntree) == -1 && donneeEntree !=""){
		model.recherches.push(donneeEntree);
			//Afficher le nombre de résultats pour chaque recherches stockéesv
			$('.titre-recherche').remove();
			$.each(model.recherches,function(index, value){
				let x = JSON.parse(localStorage.getItem(value));
				let nbr_recherches =0;
				if(x != null){
					nbr_recherches = x.length;
				}
				console.log(value);
				console.log(nbr_recherches);
				view.ajouterRechercheStockee(value,nbr_recherches);
			})
		localStorage.setItem("recherches",JSON.stringify(model.recherches));
	}else{
		console.log("Recherche déjà présente");
	}
}

controler.supprimer_recherche = function(elt){
	view.suppHTMLParent(elt);
	let x = model.recherches;
	let y = view.suppJSPPK(elt);
	model.recherches.splice(x.indexOf(y),1);
	localStorage.setItem("recherches",JSON.stringify(model.recherches));
}



controler.init = function(){
	//console.log(model.recherches_Utilisateur);
	let obj_json = localStorage.getItem("recherches");
	model.recherches = JSON.parse(obj_json);
	console.log(model.recherches);
	view.suppHTML("recherche-stockees");
	if(model.recherches != null){		
		$().each(model.recherches,function(index, value){
			//model.recherches.push(value);
			view.ajouterRechercheStockee(value);
		});
	}else{
		model.recherches = [];
	}
	view.supprimerAideAutoComplete();
	view.sortSearches("resultats");
	view.sortSearches("recherches-stockees");
	//Afficher le nombre de résultats pour chaque recherches stockées
	$('.titre-recherche').remove();
	$.each(model.recherches,function(index, value){
		let x = JSON.parse(localStorage.getItem(value));
		let nbr_recherches =0;
		if(x != null){
			nbr_recherches = x.length;
		}
		view.ajouterRechercheStockee(value,nbr_recherches);
	})
}

var maRecherche;
controler.rechercher_nouvelles = function(){
	//on récupere la valeur de la zone saisie
	let valueSaisie = view.getSaisieUtilisateur();
	//on verifie si elle existe dans les zone stockées donc dans le localstorage
	let verifSiExisteDeja = JSON.parse(localStorage.getItem(valueSaisie));
	//si n'existe pas (null)
	if(verifSiExisteDeja == null){
		let x = [];
		localStorage.setItem("recherches_courante_news",JSON.stringify(x));
	}else{
		//sinon rien
	}
	
	console.log(model.recherches_Utilisateur);
	
	nombreResRechStockees = 0;
	let saisieUtilisateur = view.getSaisieUtilisateur();
	
	//model.recherches_Utilisateur.push(saisieUtilisateur);
	view.afficherImageAttenteReponseServeur("block");
 	$.get("https://carl-vincent.fr/search-internships.php?data="+saisieUtilisateur,controler.maj_resultats);
	view.resetElementHTML("resultats");

	//Permet de récuperer l'item sur lequel on clic 
	//Lourd si plusieurs centaines de recherches stockées ????
	$("#recherches-stockees").click(function(event){
		var x = event.target; // event.target à l'exact élement sur lequel on clic 
		maRecherche = $(x).text();
	});

	if(localStorage.getItem(maRecherche)){		
		//alert("existe en localstorage");
		model.recherche_courante_news = localStorage.getItem("maRecherche");
	}else{
		//alert("pas de cookie pour toi")
	}

}



controler.maj_resultats = function(res){
	resSorted = res.sort(function(n1,n2){
		return new Date(n1.date) - new Date(n2.date)
	});


	view.afficherImageAttenteReponseServeur("none");
	model.recherche_courante_news = JSON.parse(localStorage.getItem("recherches_courante_news"));
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


controler.affichageDisquette = function(){
	view.affichageEnregistrementNouvelleRecherche();
}


controler.selectionner_recherche = function(elt){
	let saisieUtilisateur = view.getSaisieUtilisateur();
	view.resetElementHTML("zone_saisie");
	view.setValueHTMLElement("zone_saisie",elt)
	view.resetElementHTML("resultats");
	view.setValueHTMLElement(saisieUtilisateur,elt);
	model.recherche_courante_news = [];
	let recherche_courante_news2 =JSON.parse(localStorage.getItem(view.getSaisieUtilisateur())); ;
	$.each(recherche_courante_news2, function(index, value){
		view.affichageResultatsRecherche(value.url,value.titre,value.date,fonctionSupprimer,imageDisque);
	});

	localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news2));
	model.recherche_courante_news = localStorage.getItem("recherches_courante_news");
}


controler.sauver_nouvelle = function(elt){
	nombreResRechStockees = 0;
	let titre = view.findTitreNouvelle(elt);
	let url = view.findUrlNouvelle(elt);
	let date = view.findDateNouvelle(elt);
	let obj = 	model.createObjetNouvelle(titre,date,url);
	console.log(obj);
	
	view.ChangerImageHTML(elt,imageDisque);
	view.ChangerAttribut(elt,"onclick",fonctionSupprimer);
	
	model.recherche_courante_news = JSON.parse(localStorage.getItem("recherches_courante_news"));
	if(model.recherche_courante_news == null){
		model.recherche_courante_news =[];
	}else{ // inutile ?
		model.recherche_courante_news = JSON.parse(localStorage.getItem("recherches_courante_news"));
	}

	model.recherche_courante_news.push(obj);
	localStorage.setItem("recherches_courante_news",JSON.stringify(model.recherche_courante_news));
	localStorage.setItem(view.getSaisieUtilisateur(),JSON.stringify(model.recherche_courante_news));
	nombreResRechStockees = nombreResRechStockees +1;
}

controler.supprimer_nouvelle = function(elt){
	let titre = view.findTitreNouvelle(elt);
	let url = view.findUrlNouvelle(elt);
	let date = view.findDateNouvelle(elt);
	let obj = 	model.createObjetNouvelle(titre,date,url);

	view.ChangerImageHTML(elt,imageHorloge);
	view.ChangerAttribut(elt,"onclick",fonctionSauver);
	model.recherche_courante_news = JSON.parse(localStorage.getItem("recherches_courante_news"));
	if(indexOfResultat(model.recherche_courante_news,obj) != -1){
		let x = indexOfResultat(model.recherche_courante_news,obj);
		console.log(x);
		
		model.recherche_courante_news.splice(x,1);
		localStorage.setItem("recherches_courante_news",JSON.stringify(model.recherche_courante_news));
		localStorage.setItem(view.getSaisieUtilisateur(),JSON.stringify(model.recherche_courante_news));
	}
}



controler.recherche_utilisateurs = function(elt){
	model.recherches_Utilisateur = [];
	model.recherches_Utilisateur = JSON.parse(localStorage.getItem("Recherches_Utilisateur"));
	//console.log(model.recherches_Utilisateur);
	if(model.recherches_Utilisateur == null){
		model.recherches_Utilisateur = [];
		model.recherches_Utilisateur.push(elt);
	}else if (model.recherches_Utilisateur.includes(elt) == false ){
		model.recherches_Utilisateur.push(elt);
	}
	localStorage.setItem("Recherches_Utilisateur",JSON.stringify(model.recherches_Utilisateur));
	view.zoneSaisieUtilisateur().autocomplete({source : model.recherches_Utilisateur});
}

controler.ajouteMoiCa = function(){
	model.recherches_Utilisateur = JSON.parse(localStorage.getItem("Recherches_Utilisateur"));
	if(model.recherches_Utilisateur == null){
		model.recherches_Utilisateur = [];
	}
	controler.recherche_utilisateurs(view.getSaisieUtilisateur());
	localStorage.setItem("Recherches_Utilisateur",JSON.stringify(model.recherches_Utilisateur));
	model.recherches_Utilisateur = JSON.parse(localStorage.getItem("Recherches_Utilisateur"));
}

$(function(){

	//Autocompletion
model.recherches_Utilisateur = JSON.parse(localStorage.getItem("Recherches_Utilisateur"));
if(model.recherches_Utilisateur == null){
	model.recherches_Utilisateur = [];
}
view.zoneSaisieUtilisateur().autocomplete({
	source : model.recherches_Utilisateur,
	autoFocus : false,
}).keyup(function(event){
	if(event.keyCode === 13){
		controler.recherche_utilisateurs(view.getSaisieUtilisateur());
		localStorage.setItem("Recherches_Utilisateur",JSON.stringify(model.recherches_Utilisateur));
		//console.log( model.recherches_Utilisateur);
		
		//controler.rechercher_nouvelles();
	}
	controler.rechercher_nouvelles();
})
view.supprimerAideAutoComplete();
});

$("#recherches-stockees").sortable({
	update : function(){
		model.recherches = [];
		//console.log("order changed");
		//on parcourt les elements du DOM pour créer une nouvelle array avec ces nouveaux emplacements
		$("#recherches-stockees > p").each(function(index,value){
		//	console.log(value);
		//	console.log($(this).find("label").text());
			let x  = $(this).find("label").text();
			model.recherches.push(x);
		})
		localStorage.setItem("recherches",JSON.stringify(model.recherches));
	//	model.recherches = JSON.parse(localStorage.getItem("recherches"));
	}
})

//filter

controler.TrierParDate = function(){
	controler.rechercher_nouvelles();
	$("#resultats").sort(function (n1,n2){
		return new Date(n2.date) - new Date(n1.date)
	});
}

