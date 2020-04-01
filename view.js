let view = {};


//////////////////////
//Getter Simples
//////////////////////
view.zoneSaisieUtilisateur = function(){
  return $("#zone_saisie");
}

view.getSaisieUtilisateur = function(){
  return  $("#zone_saisie").val();
}

view.getElementByID = function(elem){
  return $("#"+elem);
}

////////////////////////
//ajouter_recherche()
////////////////////////

view.ajouterRechercheStockee = function(donneeEntree,valeur){

  $("#recherches-stockees").prepend('<p class="titre-recherche" ><label onclick=controler.selectionner_recherche(this)>'+donneeEntree+'</label><img src="images/croix30.jpg" class="icone-croix " onclick="controler.supprimer_recherche(this)"/><a>'+valeur+'</a></p>');
}

view.affichageRechercheStockees = function(url,titre,date){
  $("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(url)+
  ' target="_blank">'+decodeHtmlEntities(titre)+
  '</a><span class="date_news">'+decodeHtmlEntities(date)+'</span><span class="action_news" onclick="controler.supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>'); 
}

///////////////////////////
//supprimer_recherche()
///////////////////////////
view.suppHTMLParent = function(elt){
  $(elt).parent().remove();
}

view.suppJSPPK = function(elt){
  return $(elt).parent().find("label").text()
}
view.suppHTML = function(balise){
  $('#'+balise).remove();
}

//Init
view.supprimerAideAutoComplete = function(){
  $(".ui-helper-hidden-accessible").remove();
}

/////////////////////////
//rechercher_nouvelles
/////////////////////////
view.afficherImageAttenteReponseServeur = function(option){
  //block or none
  $("#wait").css("display",option);
}

//reset de l'affichage de id sinon ça s'additionne
view.setValueHTMLElement = function(id,e){
  $("#"+id).val(e.innerText); 
}

view.resetElementHTML = function(id){
  $("#"+id).html("");
}

view.resetElementValue = function(id){
  $("#"+id).val("");
}


///////////////////////////
//maj_resultats(res) fonction callback affichage element requetes
//////////////////////////

view.affichageResultatsRecherche = function(url, titre, date,fonction,url_image){
  $("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(url)+
  ' target="_blank">'+decodeHtmlEntities(titre)+
  '</a><span class="date_news">'+decodeHtmlEntities(date)+'</span><span class="action_news"  onclick="'+fonction+'"><img src="'+url_image+'"/></span></p>');
}


////////////////////////////
//Sauver_nouvelle(elt) ___ Supprimer_nouvelle(elt)
////////////////////////////

view.ChangerImageHTML = function(elt,image){
  $(elt).html('<img src ='+image+' />');
}

view.ChangerAttribut = function(elt,attr,fonction){
  $(elt).attr(attr,fonction);
}

view.findTitreNouvelle = function(x){
  return $(x).parent().find("a").text()
}


view.findDateNouvelle = function(x){
  return $(x).parent().find(".date_news").text();
}

view.findUrlNouvelle = function(x){
  return $(x).parent().find("a").attr('href');
}

//strings
view.addAttribut = function(attr,fonction){
  $(elt).attr(attr,fonction);
}

view.changeImage = function(url_image){
  $(elt).html(url_image);
}


//affichage de la disquette si clic sur ok 
let affichageDiskette = true;
view.affichageEnregistrementNouvelleRecherche = function(){
  if(affichageDiskette){
		$("#nouvelle-recherche").append('<img id="disk" class="icone-disk" src="img/disk30.jpg" onclick="controler.ajouter_recherche()" />');
	}
	affichageDiskette = false;
}



view.afficherNombreResultatParNouvelleRecherche = function(id,nombre){
	$("#"+id).html("");
	$("#"+id).text("Résultats : " + nombre);
}

view.sortSearches = function(id){
  $("#"+id).sortable();
}