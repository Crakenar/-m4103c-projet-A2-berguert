var controller = {};

model = new model();
vieuw = new view();



controller.selectionner_recherche = function(elt){
  $("#zone_saisie").val("");
	//jquery ??????
	$("#zone_saisie").val(elt.innerText); 
	model.recherche_courante = elt.innerText;
}