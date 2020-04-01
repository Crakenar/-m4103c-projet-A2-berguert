let model ={};

  model.recherche_courante ="";
  model.recherches = [];
  model.recherche_courante_news = [];
  model.recherches_Utilisateur = [];



  ////////////////////////
  //Creation objet (nouvelles)
  ///////////////////////
  model.createObjetNouvelle = function(titre,date,url){
    let objet = {
      "titre" : titre,
      "date" : date,
      "url" : url
    }

    return objet;
  }

