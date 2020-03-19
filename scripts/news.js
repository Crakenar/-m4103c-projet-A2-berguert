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
	//jquery ??????
	$("#zone_saisie").val(elt.innerText); 
	recherche_courante = elt.innerText;
}

/*1.2 */


function toJSON(){
	let obj = { 
	"recherches":[],
	"recherches-stockees":$("#zone_saisie").val()};
	//pour tout les labels de recherches-stockees
	$("#recherches-stockees").each(function()
	{
		obj.recherches.push(
			{"id": $(this).attr('id'), "val":$(this).val() });
		
	});
	return JSON.stringify(obj);
}


//model
function init() {
	//recuperer les données du stockage local
	let obj_json = localStorage.getItem("recherches");
	let obj = JSON.parse(obj_json);
	console.log(obj);
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
		console.log(data);
		//.get est asynchrone
		$.get("https://carl-vincent.fr/search-internships.php?data="+data,maj_resultats);
	
}


//function callback => si jamais la requete ajax get reussis alors on fait celle ci
//view
function maj_resultats(res) {
	$("#wait").css("display","none");
	console.log(res);
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
	console.log($(elt).parent());
	let ojb = {
		"titre" : $(elt).parent().html,
		"date" : $(elt).parent().$(".date_news"),
		"url" : $(elt).parent().attr('href')
	}
		console.log(obj);
	//$(elt).firstChild.attr("src","");
	//$(elt).attr("src","img/disk15.jpg");
	$(elt).html("<img src = img/disk15.jpg />");
	$(elt).attr("onclick","supprimer_nouvelle(this)");
	//creer l'objet il faut
	if(indexOfResultat(elt,recherche_courante_news) == -1){
		recherche_courante_news.push(elt);
		localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
	}
	
}


function supprimer_nouvelle(elt) {
	//$(elt).attr("src","");
	//$(elt).attr("src","img/horloge15.jpg");
	$(elt).html("<img src = img/horloge15.jpg />");
	$(elt).attr("onclick","sauver_nouvelle(this)");
	if(indexOfResultat(elt,recherche_courante_news) != -1){
		console.log("on enleve");
		recherche_courante_news.splice(indexOfResultat(elt,recherche_courante_news));
		localStorage.setItem("recherches_courante_news",JSON.stringify(recherche_courante_news));
	}
}

