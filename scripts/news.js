// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

//Permet de stocker l'ensemble des recherches de l'utilisateur si clic sur Ok ou appuye sur Entree
var recherches_Utilisateur = [];

//Permet de comptabiliser le nombre de résultat par recherche

var nbr_resultatsParNouvelle = 0;

//Permet de comptabiliser le nombre de resultats enregistrés pour chaque recherches stockées
var nombreResRechStockees = 0;
var nbr_resultatsParNouvelleStockees = [] //new Array();

/*1.1 */	
//si clic sur l'image disk alors ajout chaine au tableau recherches[]
//function ajouter_recherche()
function ajouter_recherche(){
	//nbr_resultatsParNouvelle = 0;
//	console.log(recherche_courante_news); ici null
	recherche_courante_news = [];

	//recuperer la chaine de carachtere
	//verifier si dans recherches, il y a la meme recherche
	const donneeEntree = $("#zone_saisie").val();
	if(recherches.indexOf(donneeEntree) == -1 && donneeEntree != ""){
		recherches.push(donneeEntree);
		/*for(let i = 0; i < recherches.length; i++){
			nbr_resultatsParNouvelleStockees[i] = new Array();
		}*/
		//ajouter l'element aux recherches stockées
		$("#recherches-stockees").prepend('<p class="titre-recherche" ><label onclick=selectionner_recherche(this)>'+donneeEntree+'</label><img src="images/croix30.jpg" class="icone-croix " onclick="supprimer_recherche(this)"/></p>');
		//sauvegarde dans sessionStorage(plus de place que cookie) pour conserver les recherches deja effectuées
		localStorage.setItem("recherches",JSON.stringify(recherches));

	}

	//si clic sur le label => selectionner_recherche(this)
	//si clic sur croix => supprimer_recherche(this)
}


function supprimer_recherche(elt) {

	//supprimer le local storage too 

	//supprimer l'element p dans recherches-stockees
	$(elt).parent().remove();
	const indexSupprimer = recherches.indexOf($(elt).parent().find("label").text());
	recherches.splice(indexSupprimer,1);
	//supprimer dans localstorage aussi
	//localStorage.removeItem(this);
	//c'est moche A REFAIRE
	localStorage.setItem("recherches",JSON.stringify(recherches));
}

//controller
function selectionner_recherche(elt) {
	$("#zone_saisie").val("");
	$("#resultats").empty();
	//jquery ??????
	$("#zone_saisie").val(elt.innerText); 
	recherche_courante = elt.innerText;
	recherche_courante_news =[];
	//variable globale recherche_courante_news => cookie
	//localstorage.getItem => recuperer le "cookie" === nom de la recherche
	//$("#zone_saisie").val() ou function e.target.text

	//console.log(localStorage.getItem($("#zone_saisie").val()));
	
	recherche_courante_news2 = JSON.parse(localStorage.getItem($("#zone_saisie").val()));
	//affichage des recherche sauvegardées dans la zone resultats
	$.each(recherche_courante_news2,function(index,value){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+
		' target="_blank">'+decodeHtmlEntities(value.titre)+
		'</a><span class="date_news">'+decodeHtmlEntities(value.date)+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>'); 
	
		//recherche_courante_news[index] = value;
	});

	localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news2));
	recherche_courante_news = JSON.parse(localStorage.getItem("recherches_courante_news"));
	
}



//model
function init() {
//	localStorage.setItem("recherches_courante_news",JSON.stringify(""));
	//recuperer les données du stockage local
	let obj_json = localStorage.getItem("recherches");
	let obj = JSON.parse(obj_json);
	if(obj != ""){
		$(obj).each(function(index,value){
			recherches.push(value);
			$("#recherches-stockees").prepend('<p class="titre-recherche" ><label onclick=selectionner_recherche(this)>'+value +'</label><img src="images/croix30.jpg" class="icone-croix " onclick="supprimer_recherche(this)"/></p>');
		});
	}
	//on remplit la partie recherches-stockées de ces données
	
 //Supprimer la div de JSUI pour l'autocompletion
 $(".ui-helper-hidden-accessible").remove();
}

//model
var maRecherche;
function rechercher_nouvelles() {
	recherches_Utilisateur.push($("#zone_saisie").val());
	console.log(recherches_Utilisateur);
	console.log("yes")
	localStorage.setItem("Recherches_Utilisateur",JSON.stringify(recherches_Utilisateur));
	nbr_resultatsParNouvelle = 0;
	//faire une requeste get ? !!!pas secure!!! avec les données de recherche_courante ? ou direct avec value ?
	//on nettoye la zone de resultat pour eviter d'afficher encore et encore
		$("#wait").css("display","block");
		const data = $("#zone_saisie").val();
		//.get est asynchrone
		$.get("https://carl-vincent.fr/search-internships.php?data="+data,maj_resultats);
	//vider recherche_couraznt_news sinon tout les cookies se superposeront ( 1: coucou ..... 2 : coucou, salut)
	//recherche_courante_news = []; //argh c moche
	//et on la remplis avec le contenu du localstorage de la recherche en question
	//on ne peut pas utiliser $("#zone_saisie").val() car si l'utilisateur change la recherche mais veut quand m
	//même faire l'action alors ça marchera pas => exemple impossible d'acceder à l'element car non existant
	//il faudrait récuperer le label sur la recherche_saved sur laquelle on clic
	//recherche_courante_news = JSON.parse(localStorage.getItem());
	$("#resultats").html("");
//besoin du clic sur ok ou Entree pour afficher

	$("#recherches-stockees").click(function(event){
		var x = event.target; // event.target has the exact element clicked
		//console.log($(x).text()); // the text of the clicked element
		maRecherche = $(x).text();
	});

	if(localStorage.getItem(maRecherche)){		
		//alert("buien joue");
		//!!!!!!! change le type de recherche_courante_news en string !!!! pas normal
		recherche_courante_news = localStorage.getItem("maRecherche");
	}else{
		//alert("pas de cookie pour toi")
	}
}


//function callback => si jamais la requete ajax get reussis alors on fait celle ci
//view
function maj_resultats(res) {
	$("#wait").css("display","none");
	//res est un objet de plusieurs offres, on veut toute les afficher dans la case resultat
	recherche_courante_news = JSON.parse(localStorage.getItem("recherches_courante_news"));
	//console.log(recherche_courante_news);
	$(res).each(function(index,value){
	//	console.log(res[index]);
	if(recherche_courante_news == null){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+
		' target="_blank">'+decodeHtmlEntities(value.titre)+
		'</a><span class="date_news">'+decodeHtmlEntities(value.date)+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>');
	}else{
		if(indexOfResultat(recherche_courante_news,res[index]) == -1){//n'existe pas
		console.log(indexOfResultat(recherche_courante_news,res[index]));
		
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+
			' target="_blank">'+decodeHtmlEntities(value.titre)+
			'</a><span class="date_news">'+decodeHtmlEntities(value.date)+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>');
			}else{
			$("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+
			' target="_blank">'+decodeHtmlEntities(value.titre)+
			'</a><span class="date_news">'+decodeHtmlEntities(value.date)+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>');
		}
	}
		nbr_resultatsParNouvelle = nbr_resultatsParNouvelle +1;
	});
	
	afficherNombreResultatParNouvelleRecherche(nbr_resultatsParNouvelle);
}

//manque : creer un objet à envoyer 
//delete dans recherche_courante_news	

function sauver_nouvelle(elt) {
	nombreResRechStockees = 0;
	//parentElement => titre
	//recherche_courante_news = [];
	let obj = {
		"titre" : $(elt).parent().find("a").text(),
		"date" : $(elt).parent().find(".date_news").text(),
		"url" : $(elt).parent().find("a").attr('href')
	}
	$(elt).html("<img src = img/disk15.jpg />");
	$(elt).attr("");
	$(elt).attr("onclick","supprimer_nouvelle(this)");
	//creer l'objet il faut
	 /*obj_son = JSON.parse(localStorage.getItem("recherches_courante_news"));
	 if(recherche_courante_news == null){
			recherche_courante_news.push(obj);
			localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
			//on a donc 1 cookie par recherche, faire des verif pour pas pouvoir mettre le même plusieurs fois ??
			localStorage.setItem( $("#zone_saisie").val(),JSON.stringify(recherche_courante_news));
	 	}else{
			recherche_courante_news = obj_son;
			recherche_courante_news.push(obj);
			localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
			//on a donc 1 cookie par recherche, faire des verif pour pas pouvoir mettre le même plusieurs fois ??
			localStorage.setItem( $("#zone_saisie").val(),JSON.stringify(recherche_courante_news));
		}*/
		/*if(indexOfResultat(recherche_courante_news, obj) == -1){
      if(localStorage.getItem($("#zone_saisie").val())){
      	recherche_courante_news.push(obj);
    }else{
      recherche_courante_news =[];
      recherche_courante_news.push(obj);
    }
  
    //localStorage.setItem("recherche_courante_news",JSON.stringify(recherche_courante_news));
    localStorage.setItem( $("#zone_saisie").val(),JSON.stringify(recherche_courante_news)); 
	}*/
	
	if(indexOfResultat(recherche_courante_news, obj) == -1){
		if(localStorage.getItem($("#zone_saisie").val())){
		recherche_courante_news.push(obj);
		nombreResRechStockees = nombreResRechStockees +1;
	}else{
		recherche_courante_news =[];
		recherche_courante_news.push(obj);
		nombreResRechStockees = nombreResRechStockees +1;
	}
	$("#recherches-stockees").find("label").find("p").each(
		function(index, value){
			console.log($("#recherches-stockees").find("label").find("p").text());
			if($("#recherches-stockees").find("label").text() == recherche_courante_news[index]){
				$("#recherches-stockees").find("label").find("p").text(recherche_courante_news[index] + "(" + Object(recherche_courante_news).length);
			}
		});
	//localStorage.setItem("recherche_courante_news",JSON.stringify(recherche_courante_news));
	localStorage.setItem( $("#zone_saisie").val(),JSON.stringify(recherche_courante_news)); 
}


	}
	


function supprimer_nouvelle(elt) {
	let obj = {
		"titre" : $(elt).parent().find("a").text(),
		"date" : $(elt).parent().find(".date_news").text(),
		"url" : $(elt).parent().find("a").attr('href')
	}
	//$(elt).attr("src","");
	//$(elt).attr("src","img/horloge15.jpg");
	$(elt).html("<img src = img/horloge15.jpg />");
	$(elt).attr("");
	$(elt).attr("onclick","sauver_nouvelle(this)");
	if(indexOfResultat(recherche_courante_news,obj) != -1){
		let x = (indexOfResultat(recherche_courante_news,obj));
		recherche_courante_news.splice(x,1);		
		console.log(recherche_courante_news);
		localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
		localStorage.setItem($("#zone_saisie").val(),JSON.stringify(recherche_courante_news));
	}

	//On met à jour l'affichage
/*	$.each(recherche_courante_news,function(index,value){
		$("#resultats").find(this).remove();
	});
	let p = [];
	p = JSON.parse(localStorage.getItem("recherches_courante_news"));
	if(p.length == 0){
		alert("vide");
		$("#maRecherche").remove();
	}*/
}
function Les_recherches_Utilisateur(elt){
	recherches_Utilisateur = [];
	recherches_Utilisateur = JSON.parse(localStorage.getItem("Recherches_Utilisateur"));
	if(recherches_Utilisateur == null){
		recherches_Utilisateur.push(elt);
	}else if (recherches_Utilisateur.includes(elt) == false ){
		recherches_Utilisateur.push(elt);
	}
	
}

//view
let affichageDiskette = true;
function affichageEnregistrementNouvelleRecherche(){ //Ameliorer en mettant une fenetre pour demander si l'on veut sauvegarder ????
	if(affichageDiskette){
		$("#nouvelle-recherche").append('<img id="disk" class="icone-disk" src="img/disk30.jpg" onclick="ajouter_recherche()" />');
	}
	affichageDiskette = false;
}



//view()

function afficherNombreResultatParNouvelleRecherche(nombre){
	$("#resultatTitre").html("");
	$("#resultatTitre").text("résultat : " + nombre);
}
//Autocompletion
//A chaque Entrée de clavier => keyup, verifier si le mot n'a pas une ressemblance dans le localstorage (recherches sauvegardées)
//Apparement Jquery UI le fait tres bien

//Model et view
//recherches_Utilisateur = JSON.parse(localStorage.getItem("Recherches_Utilisateur"));
$("#zone_saisie").autocomplete({
	source : recherches_Utilisateur,
	autoFocus : true,
	
}).keyup(function(event){
	if(event.keyCode === 13){ //touche entrée
		//nbr_resultatsParNouvelle = 0;
		Les_recherches_Utilisateur($("#zone_saisie").val());
		localStorage.setItem("Recherches_Utilisateur",JSON.stringify(recherches_Utilisateur));
		rechercher_nouvelles();
	}
// pour recherche dynamique !!! bcp de requetes !!!
rechercher_nouvelles();
});





/*



Faire MVC 

Combien de resultats par nom de nouvelles enregistrées

Combien de résultat par nouvelle recherche

Ameliorer l'affichage ? 

Enlever les $("#zone_saisie").val() ??? risque de bug si l'on ecrit dans la zone alors qu'on cherche autre chose ?!


*/



