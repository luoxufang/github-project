var adImgBanner = (function(){
	return function initBanner(id,imgArry){
    //传入参数: 图片数量
    /*1.图片路径
     *2.dom元素
     *3.姓名：小明
     *4.时间：2016年9月3日 
    */
        var nowImgNum = 0;
        var html = '<div id="adImgBannerTitle" class="adImgBannerTitle">1/'+imgArry.length+'</div>'
                    +'<div id="imgMoveBox" class="imgMoveBox">'
                    +'<img id="img" class="img js-img"  src='+imgArry[nowImgNum]+'>'      
                +'<img id="subImg" class="img js-img subImg"  src=" ">'+'</div>'
            +'<div id="preMoveBtn" class="js-moveBtn moveBtn" data-type="-1">&lt;</div>'
            +'<div id="nextMoveBtn" class="js-moveBtn moveBtn moveBtn-right" data-type="1">&gt;</div>';
        $("#"+id).html(html);
        //添加元素
        var $imgBox = $("#imgBox");
        // $imgBox.fun =  function(){};
        var speed =  800;
        
        var imgLength = imgArry.length;
        var btnCanClick = true;
        var step = +$("#img").css("width").split("px")[0];
        var $imgMoveBox = $("#imgMoveBox");
        var $img = $("#img");
        var $subImg = $("#subImg");

        $(".js-moveBtn").bind("click",function(evt){
            if(btnCanClick){
                btnCanClick = false;
                move($(this).data("type"));
            }               
        })

        function move(type){
            //左移动为 -1 ，右移动为 1
            //调整subImg移动之前的位置
                $subImg.css("left","+=" + (-type*step) + "px");
                //调整subImg的图片
                nowImgNum = getImgNum(nowImgNum,-type);
                // $subImg.attr("src", "images/" + nowImgNum + ".jpg"); 
                $subImg.attr("src",imgArry[nowImgNum]);
                console.log();

                var move = "+=" + (step*type) + "px";
                $imgMoveBox.animate({
                    left : move
                },speed,function(){

                    $imgMoveBox.css("left","-"+step+"px");
                    // $img.attr("src", "images/" + nowImgNum + ".jpg");
                    $img.attr("src",imgArry[nowImgNum]);
                    $img.css("left", step + "px");
                    $subImg.css("left", step+"px");
                    // $("#adImgBannerTitle").text((nowImgNum+1)+"/"+imgLength);
                    btnCanClick  = true ;
                    // $imgBox.fun() ;
                })
        }

        function getImgNum(num,type){
            //num是当前图片编号
            //acv是
            // num += type;
            // return num>=imgLength ? 0 : num < 0 ? imgLength-1 :num;
            num += type;
            if(num >= imgLength){
                    num = 0;
            }
            if(num < 0){
                    num = imgLength-1;
            }
            $("#adImgBannerTitle").text((num+1)+"/"+imgLength);
            return num;
        }
    }
})();