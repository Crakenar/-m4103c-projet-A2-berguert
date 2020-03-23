// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

/*class Paragraphe{
	constructor(id,value){
		this.id = id;
		this.value = value;
	}
}*/


/*1.1 */	
//si clic sur l'image disk alors ajout chaine au tableau recherches[]
//function ajouter_recherche()
function ajouter_recherche(){
	//recuperer la chaine de carachtere
	//verifier si dans recherches, il y a la meme recherche
	const donneeEntree = $("#zone_saisie").val();
	if(recherches.indexOf(donneeEntree) == -1){
		recherches.push(donneeEntree);
		//ajouter l'element aux recherches stockées
		$("#recherches-stockees").prepend('<p class="titre-recherche" ><label onclick=selectionner_recherche(this)>'+donneeEntree+'</label><img src="images/croix30.jpg" class="icone-croix " onclick="supprimer_recherche(this)"/></p>');
		//sauvegarde dans sessionStorage(plus de place que cookie) pour conserver les recherches deja effectuées
		localStorage.setItem("recherches",JSON.stringify(recherches));
	}
	//si clic sur le label => selectionner_recherche(this)
	//si clic sur croix => supprimer_recherche(this)
}


function supprimer_recherche(elt) {
	//supprimer l'element p dans recherches-stockees
	$(elt).parent().remove();

	
	//	localStorage.clear(); == localStorage.removeItem("recherches");
	//supprimer la recherche du tableau recherches[]
	const indexSupprimer = recherches.indexOf($(elt).parent().parent().val());
	recherches.splice(indexSupprimer);
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

	//variable globale recherche_courante_news => cookie
	//localstorage.getItem => recuperer le "cookie" === nom de la recherche
	recherche_courante_news = JSON.parse(localStorage.getItem($("#zone_saisie").val()));
	//affichage des recherche sauvegardées dans la zone resultats
	$.each(recherche_courante_news,function(index,value){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+
		' target="_blank">'+decodeHtmlEntities(value.titre)+
		'</a><span class="date_news">'+decodeHtmlEntities(value.date)+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>'); 
	});
	
}



//model
function init() {
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
	

}

//model
function rechercher_nouvelles() {
	//faire une requeste get ? !!!pas secure!!! avec les données de recherche_courante ? ou direct avec value ?
	//on nettoye la zone de resultat pour eviter d'afficher encore et encore
	$("#resultats").empty();
		$("#wait").css("display","block");
		const data = $("#zone_saisie").val();
		//.get est asynchrone
		$.get("https://carl-vincent.fr/search-internships.php?data="+data,maj_resultats);
	//vider recherche_couraznt_news sinon tout les cookies se superposeront ( 1: coucou ..... 2 : coucou, salut)
	recherche_courante_news = []; //argh c moche
	//et on la remplis avec le contenu du localstorage de la recherche en question
	//on ne peut pas utiliser $("#zone_saisie").val() car si l'utilisateur change la recherche mais veut quand m
	//même faire l'action alors ça marchera pas => exemple impossible d'acceder à l'element car non existant
	//il faudrait récuperer le label sur la recherche_saved sur laquelle on clic
	//recherche_courante_news = JSON.parse(localStorage.getItem());

//besoin du clic sur ok ou Entree pour afficher
let text;
	$("#recherches-stockees").click(function(event){
		var x = event.target; // event.target has the exact element clicked
		console.log($(x).text()); // the text of the clicked element
		text = $(x).text();
	});

	//recherche_courante_news = JSON.parse(localStorage.getItem(text));
	console.log(recherche_courante_news);
	

}


//function callback => si jamais la requete ajax get reussis alors on fait celle ci
//view
function maj_resultats(res) {
	$("#wait").css("display","none");

	//res est un objet de plusieurs offres, on veut toute les afficher dans la case resultat
	$(res).each(function(index,value){
		$("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+
		' target="_blank">'+decodeHtmlEntities(value.titre)+
		'</a><span class="date_news">'+decodeHtmlEntities(value.date)+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>'); 
	});
	
	
}

//manque : creer un objet à envoyer 
//delete dans recherche_courante_news	

function sauver_nouvelle(elt) {
	//parentElement => titre
	let obj = {
		"titre" : $(elt).parent().find("a").text(),
		"date" : $(elt).parent().find(".date_news").text(),
		"url" : $(elt).parent().find("a").attr('href')
	}
	//$(elt).firstChild.attr("src","");
	//$(elt).attr("src","img/disk15.jpg");
	$(elt).html("<img src = img/disk15.jpg />");
	$(elt).attr("onclick","supprimer_nouvelle(this)");
	//creer l'objet il faut
	if(indexOfResultat(recherche_courante_news,obj) == -1){
		recherche_courante_news.push(obj);
		localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
	//on a donc 1 cookie par recherche, faire des verif pour pas pouvoir mettre le même plusieurs fois ??
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
	$(elt).attr("onclick","sauver_nouvelle(this)");
	if(indexOfResultat(recherche_courante_news,obj) != -1){
		recherche_courante_news.splice(indexOfResultat(obj,recherche_courante_news));
		localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
		localStorage.setItem($("#zone_saisie").val(),JSON.stringify(recherche_courante_news));

	}
}



//Autocompletion
//A chaque Entrée de clavier => keyup, verifier si le mot n'a pas une ressemblance dans le localstorage (recherches sauvegardées)
//Apparement Jquery UI le fait tres bien

//Model et view
var test = ['Grenoble','Lyon','Paris'];
$("#zone_saisie").autocomplete({
	source : recherches,
	focus : true
}).keypress(function(event){
	if(event.keyCode === 13){
		rechercher_nouvelles();
	}
});