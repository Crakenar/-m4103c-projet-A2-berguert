let model ={};

  model.recherche_courante ="";
  model_recherches = [];
  model.recherche_courante_news = [];

  model.rechercher_nouvelles = function(){
    $("#resultats").empty();
    $("#wait").css("display","block");
    const data = $("#zone_saisie").val();
    $.get("https://carl-vincent.fr/search-internships.php?data="+data,maj_resultats);
  }


  model.maj_resultats = function(res) {
    $("#wait").css("display","none");
    console.log(res);
    //res est un objet de plusieurs offres, on vezut toute les afficher dans la case resultat
    $(res).each(function(index,value){
      $("#resultats").prepend('<p class="titre_result"><a class="titre_news" href='+decodeHtmlEntities(value.url)+' target="_blank">'+decodeHtmlEntities(value.titre)+'</a><span class="date_news"> '+decodeHtmlEntities(value.date)+'</span><span class="action_news" ><img src="img/horloge15.jpg" onclick="sauvez_nouvelle(this)"/></span></p>');  
    });
  }