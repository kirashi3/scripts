jQuery(function ($) {
  var countrycodes = "1";
  var delimiters = "-|\\.|—|–|&nbsp;";
  var phonedef = "\\+?(?:(?:(?:" + countrycodes + ")(?:\\s|" + delimiters + ")?)?\\(?[2-9]\\d{2}\\)?(?:\\s|" + delimiters + ")?[2-9]\\d{2}(?:" + delimiters + ")?[0-9a-z]{4})";
  var spechars = new RegExp("([- \(\)\.:]|\\s|" + delimiters + ")","gi"); //Special characters to be removed from the link
  var phonereg = new RegExp("((^|[^0-9])(href=[\"']tel:)?((?:" + phonedef + ")[\"'][^>]*?>)?(" + phonedef + ")($|[^0-9]))","gi");

  function ReplacePhoneNumbers(oldhtml) {
    //Created by Jon Meck at LunaMetrics.com - Version 1.0
    var newhtml = oldhtml.replace(/href=['"]callto:/gi,'href="tel:');
    newhtml = newhtml.replace(phonereg, function ($0, $1, $2, $3, $4, $5, $6) {
      if ($3) return $1;
      else if ($4) return $2+$4+$5+$6;
      else return $2+"<a href='tel:"+$5.replace(spechars,"")+"'data-role='button' rel='external'>"+$5+"</a>"+$6;
    }); 
    return newhtml;
  }

  $("#phone-link").html(ReplacePhoneNumbers($("#phone-link").html()));

  $("a[href^='tel:']").click(function(event) {
       event.preventDefault(); 

       link  = $(this).attr('href');
       tracklink = link.replace("tel:","");
       tracklink = tracklink.replace(spechars,"");
       if(tracklink.length == 10) tracklink = "1" + tracklink;

       ga('send', 'event', 'Contact', 'Phone', tracklink);
       //_gaq.push(['_trackEvent', 'Contact', 'Phone', tracklink]);

       setTimeout(function() {
          window.location = link;
       },300);
  });
  
});