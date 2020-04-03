let view = {};


//////////////////////
//Getter Simples on n'en fait pas pour chaque elements du DOM pour pouvoir factoriser les fonctions
//on pourrait sinon faire des fonction du style : 
/*
view.getIDResultat = function(){
  return  $("#resultats");
}
.....
*/
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


/////////A factoriser (mais comme dirait shiffman : ill refrator that later)////////////////////////
view.suppJSPPK = function(elt){
  return $(elt).parent().find("label").text()
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
////////////////////////

view.thisFindText = function(elt,div){
  return $(elt).find(div).text(); 
}






/*////////////////////////////
    AFFICHAGE ELEMENTS 
    CHANGEMENT ELEMENTS 
    dans le html
////////////////////////////*/

view.ajouterRechercheStockee = function(donneeEntree,valeur){

  $("#recherches-stockees").append('<p class="titre-recherche" ><label onclick=controler.selectionner_recherche(this)>'+donneeEntree+'</label><img src="img/croix30.jpg" class="icone-croix " onclick="controler.supprimer_recherche(this)"/><a>'+valeur+'</a></p>');

}


view.affichageRechercheStockees = function(url,titre,date){
  $("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(url)+
  ' target="_blank">'+decodeHtmlEntities(titre)+
  '</a><span class="date_news">'+decodeHtmlEntities(date)+'</span><span class="action_news" onclick="controler.supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>'); 
}


view.affichageResultatsRecherche = function(url, titre, date,fonction,url_image){
  $("#resultats").append('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(url)+
  ' target="_blank">'+decodeHtmlEntities(titre)+
  '</a><span class="date_news">'+decodeHtmlEntities(date)+'</span><span class="action_news"  onclick="'+fonction+'"><img src="'+url_image+'"/></span></p>');
}


view.afficherImageAttenteReponseServeur = function(option){
  //block or none
  $("#wait").css("display",option);
}


view.ChangerImageHTML = function(elt,image){
  $(elt).html('<img src ='+image+' />');
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


//////////////////////////
//RESET DES AFFICHAGES
/////////////////////////
view.setValueHTMLElement = function(id,e){
  $("#"+id).val(e.innerText); 
}

view.resetElementHTML = function(id){
  $("#"+id).html("");
}

view.resetElementValue = function(id){
  $("#"+id).val("");
}

view.resetByClass = function(classe){
  $('.'+classe).remove();
}

view.suppHTMLParent = function(elt){
  $(elt).parent().remove();
}

view.suppHTML = function(balise){
  $('#'+balise).remove();
}

//Init
view.supprimerAideAutoComplete = function(){
  $(".ui-helper-hidden-accessible").remove();
}


////////////////////////////
//CHANGEMENT ATTRIBUTS
////////////////////////////



view.ChangerAttribut = function(elt,attr,fonction){
  $(elt).attr(attr,fonction);
}



view.addAttribut = function(attr,fonction){
  $(elt).attr(attr,fonction);
}

view.changeImage = function(url_image){
  $(elt).html(url_image);
}


////ADD FONCTION X aux elements html
view.sortSearches = function(id){
  $("#"+id).sortable();
}