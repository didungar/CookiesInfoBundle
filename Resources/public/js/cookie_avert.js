$(document).ready(function(){
    // Notifications pour les cookies
    var cookie_avert   = readCookie("cookie_avert"),
        g_analytics_id = "xxxxxx-x", // Id unique google analytics 
        domain_name    = "www.domain-name.fr"; // nom de domaine du site

    if(cookie_avert === null) { // si le cookie n'existe pas
        banner_text = 'En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies à des fins de mesure d\'audience. <button class="btn btn-success btn-gradient btn-sm" id="accept-cookie">J\'accepte</button> <button class="btn btn-danger btn-gradient btn-sm" id="deny-cookie">Je refuse</button>';
        $("body").prepend('<div id="cookies-banner" class="alert alert-warning text-center">' + banner_text + '</div>');
        $("body").css({"top" : $("#cookies-banner").outerHeight() + "px", "position" : "relative"});
        
        // si on accepte, le cookie avec la valeur 'set' est créée, sinon, la valeur 'not'
        $("#accept-cookie, #deny-cookie").click(function(){
            id_button     = $(this).attr("id");
            action_button = (id_button == "accept-cookie")? 'set' : 'not';
        
            createCookie("cookie_avert", action_button, 365);
    	    $("#cookies-banner").slideUp(350).remove();
		    $("body").css({"top" : "0", "position" : ""});
        
            if(action_button == "set"){ // le cookie avec la valeur 'set' est créée (accept)
                // on charge Google analytics
                $.ga.load(g_analytics_id, function(pageTracker) {
    	    		pageTracker._setDomainName(host);
				});
            }
        });
    
        // si aucune action au bout de 10 secondes (implicite)
        setTimeout(function(){
            $("#cookies-banner").slideUp(350).remove();
            $("body").css({"top" : "0", "position" : ""});
            
            // on charge Google analytics
            $.ga.load(g_analytics_id, function(pageTracker) {
    	    	pageTracker._setDomainName(host);
			});
        }, 10000); // 10 sec
        
    }else if(cookie_avert == "set"){ // si le cookie existe avec la valeur 'set'
        // on charge google analytics
        $.ga.load(g_analytics_id, function(pageTracker) {
    	    pageTracker._setDomainName(host);
		});
    }
});
