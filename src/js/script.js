$(function(){

    $("#waiting").css({
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "text-align": "center",
        "background-color": "#ffffff"
    });

    const imgPath = "./src/img/akiha_{0}.png";
    const frameCount = 35;
    var loadCounter = 0;

    for (let i = 0; i <= frameCount; i++) {
        var id = ('000' + i).slice( -3 );
        var img = $("<img />").attr({
            "id": id,
            "src": imgPath.replace("{0}", id)
        }).one("load",()=>{
            loadCounter += 1;
            $("#count").text(Math.round(loadCounter / 36 * 100) + "%");
        }).appendTo("#view");
    }

    var $images = $("#view").children();
    $images.hide();
    $images.eq(0).show();

    var itv = setInterval(()=>{
        if (frameCount < loadCounter) {
            clearInterval(itv);
            $("#waiting").hide();
        }
    }, 10);

    $("#range").on("input", ()=>{
        var val = $("#range").val();
        var id = ('000' + val).slice( -3 );
        $images.hide();
        $images.filter("#" + id).show();
    });
});