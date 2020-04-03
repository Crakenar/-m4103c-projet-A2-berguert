let model ={};

  model.recherche_courante ="";
  model.recherches = [];
  model.recherche_courante_news = [];
  model.recherches_Utilisateur = [];



  ////////////////////////
  //Creation objet (nouvelles) => pour save avec json
  ///////////////////////
  model.createObjetNouvelle = function(titre,date,url){
    let objet = {
      "titre" : titre,
      "date" : date,
      "url" : url
    }

    return objet;
  }



  //////////////
  //Reset Des Tableaux
  ///////////////////
  
model.resetRecherches = function(){
  model.recherches = [];
}

model.resetRecherche_Courante_News = function(){
  model.recherche_courante_news = [];
}

model.resetRecherches_Utilisateur = function(){
  model.recherches_Utilisateur = [];
}


/////////////
//Push dans tableaux
/////////////////
model.pushRecherches = function(element){
  model.recherches.push(element);
}

model.pushRecherches_Courantes_News = function(element){
  model.recherche_courante_news.push(element);
}

model.pushRecherches_Utilisateur = function(element){
  model.recherches_Utilisateur.push(element);
}



/////////////////
//LocalStorage
///////////////

model.setLocalStorage = function(key,tableau){
  localStorage.setItem(key,JSON.stringify(tableau));
}

model.getLocalStorage = function(key){
  return JSON.parse(localStorage.getItem(key));
}

model.LocalStorageClear = function(key){
  localStorage.removeItem(key);
}
