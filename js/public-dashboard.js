(function() {
    var tableroTrello = "https://api.trello.com/1/board/"
        + config.myBoard
        + "?key="+config.appKey
        + "&cards=open&lists=open&checklists=all";

  $.getJSON(tableroTrello, {
  	format: "json"
  })
  .done(function(data){
  	$("<div>").attr("id", "lists").appendTo("#tablero");

		// lists
    $.each(data.lists, function(index, list){
    	var item_list = $("<div>").attr("id", list.id);
      var title = $("<span>")
      .addClass("list-name")
      .text(list.name);

      item_list.addClass("type-list");
      item_list.appendTo("#lists");

      $("#lists div[id='"+list.id+"']").append(title);
    })

    // cards
    $.each(data.cards, function(index, card){
    	var item_card = $("<div>").attr("id", card.id);
      var title = $("<span>")
      .addClass("card-name")
      .text(card.name);

      var description_format = card.desc.replace(/\n/g, "<br />");

      var description = $("<p>")
      .addClass("type-card-description")
      .html(description_format);

      item_card.addClass("type-card");
      item_card.appendTo("#lists div[id='"+card.idList+"']");

      $("div[id='"+card.id+"']")
      .append(title)
      .append(description);
    })
  })
  .always(function(){
  	var first_level = $("<span>").addClass("level-1").text("* ");
    var second_level = $("<span>").addClass("level-2").text("** ");
    //var third_level = $("<span>").addClass("level-2").text("*** ");

    $(".type-card-description").each(function(){
    	var content = $(this).html();
      var content_with_third_level = content.replace(/\##/g, "*** ");
      $(this).html(content_with_third_level);
    	//$(this).prepend(third_level);
    });

  	$(".list-name").prepend(first_level);
    $(".card-name").prepend(second_level);

  });


})();
