$(document).ready(function(){
    var onAuthorize = function() {
        updateLoggedIn();
        $("#output").empty();

  	    var $lists = $("<div>")
            .attr("id", "lists")
            .text("loading lists...")
            .appendTo("#tablero");


        // lists
        Trello.get("boards/"+config.myBoard+"/lists").then(function(lists){
            $lists.empty();

            $.each(lists, function(index, list){
  	            var first_level = $("<span>").addClass("level-1").text("* ");

    	          var $item_list = $("<div>")
                    .attr("id", list.id)
                    .addClass("type-list")
   	                .prepend(first_level)
                    .appendTo($lists);

                var title = $("<span>")
                    .addClass("list-name")
                    .text(list.name);

                $item_list.append(title);
            });
        });

        Trello.get("boards/"+config.myBoard+"/cards").then(function(cards){

            $.each(cards, function(index, card){
                var second_level = $("<span>").addClass("level-2").text("** ");

    	          var $item_card = $("<div>")
                    .attr("id", card.id)
                    .addClass("type-card")
                    .prepend(second_level)
                    .appendTo("#lists div[id='"+card.idList+"']");

                var title = $("<span>")
                    .addClass("card-name")
                    .text(card.name);

                var description_format = card.desc.replace(/\n/g, "<br />");
                var description_with_third_level = description_format.replace(/\##/g, "*** ");

                var description = $("<p>")
                    .addClass("type-card-description")
                    .html(description_with_third_level);

                $item_card
                    .append(title)
                    .append(description);
            });
        });
    };

    //
    // LOGIN
    //
    var updateLoggedIn = function() {
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);
    };

    var logout = function() {
        Trello.deauthorize();
        updateLoggedIn();
    };

    //
    // CONFIG
    //
    Trello.authorize({
        name: "Trello to OrgMode",
        interactive: true,
        success: onAuthorize
    });

    $("#connectLink").click(function(){
        Trello.authorize({
            name: "Trello to OrgMode",
            type: "popup",
            success: onAuthorize,
            scope: { write: true, read: true }
        })
    });

    $("#disconnect").click(logout);
});
