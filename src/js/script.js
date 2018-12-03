$(function(){

    const imgPath = "./src/img/akiha_{0}.png";
    const frameCount = 35;

    for (let i = 0; i <= frameCount; i++) {
        var id = ('000' + i).slice( -3 );
        var img = $("<img />").attr({
            "id": id,
            "src": imgPath.replace("{0}", id)
        });
        $("#view").append(img);
    }

    var $images = $("#view").children();
    $images.hide();
    $images.eq(0).show();

    $("#range").on("input", ()=>{
        var val = $("#range").val();
        var id = ('000' + val).slice( -3 );
        $images.hide();
        $images.filter("#" + id).show();
    });
});