$(document).ready(function(){
    $("#featured").tabs({fx:[{opacity: "toggle", duration: 'normal'}, {opacity: "toggle", duration: 'normal'}],
        show: function(event, ui){
            $('#featured .ui-tabs-panel .info').hide();
            var infoheight=$('.info', ui.panel).height();
            $('.info', ui.panel).css('height', '0px').animate({ 'height': infoheight }, 500);
        }
    });

    let current = 0;
    setInterval(() => { 
        current = (current + 1) % 4; 
        // console.log("nav-fragment-" + current);
        document.querySelector("#nav-fragment-" + current+" a.ui-tabs-anchor").click();
    }, 5000);
});