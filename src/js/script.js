$(function(){

    $("<div id='waiting'>" +
        "<p>loading... <span id='count'></span></p>" +
    "</div>").css({
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "text-align": "center",
        "background-color": "#ffffff"
    }).appendTo("body");

    const imgPath = "./src/img/akiha_{0}.png";
    const frameCount = 49;
    var loadCounter = 0;

    for (let i = 0; i <= frameCount; i++) {
        var id = ('000' + i).slice( -3 );
        var img = $("<img />").attr({
            "id": id,
            "src": imgPath.replace("{0}", id)
        }).one("load",()=>{
            loadCounter += 1;
            $("#count").text(Math.round(loadCounter / (frameCount + 1) * 100) + "%");
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

    var obniz = new Obniz("4288-2312");
    obniz.onconnect = async ()=> {
        // embed parts
        obniz.display.print("hello!");
        obniz.switch.onchange = function(state) {
          $('body').css({
            "background-color" : (state == "push") ? "#F00" : "#FFF"
            });
        }
    
        var $range = $("#range");
        const buffer = 60;
        var sensor = obniz.wired("GP2Y0A21YK0F", {vcc:0, gnd:1, signal:2})
        sensor.start(async (distance)=>{

            await obniz.wait(1);

            if((frameCount + 1) * 2 + buffer < distance) {
                return;
            }

            var val = frameCount - Math.round(((distance - buffer) / 2) - 1);
            if (val < 0) val = 0;
            $range.val(val).trigger("input");
            $("#val").text("distance:" + distance + ",val:" + val);

        })
    }

    $("#range").on("input", ()=>{
        var val = $("#range").val();
        var id = ('000' + val).slice( -3 );
        $images.hide();
        $images.filter("#" + id).show();
    }).hide();
});