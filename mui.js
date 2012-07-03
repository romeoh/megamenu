(function(w, d){
var megaYPos, touchMarginY, touchEndY,
	windowWidth = w.innerWidth,
	windowHeight = w.innerHeight,
	closeY = windowHeight - 270,
	openY = windowHeight - 30;

w.addEventListener("load", onInit, false);
w.addEventListener("resize", onResize, false);

$ = function(i){
	if(typeof i == "object"){
		return i;
	}else if(typeof i == "string"){
		return d.querySelector(i);
	}
}
function onInit(){
	d.body.style.height = w.innerHeight + "px";
	$("#handler p").style.left = windowWidth/2 - 15 + "px";
	$("#megamenu").style.top = closeY + "px";
	MPTween($("#megamenu"), {top:openY, delay:.5, time:.5, onFinish:function(){
		$("#handler").addEventListener("mousedown", initMega, false);
		$("#handler").addEventListener("touchstart", initMega, false);
		$("#megamenu").setAttribute("data-isOpen", "false");
	}})
}
function onResize(){
	windowWidth = w.innerWidth;
	windowHeight = w.innerHeight;
	d.body.style.height = w.innerHeight + "px";
	$("#handler p").style.left = windowWidth/2 - 15 + "px";
	closeY = windowHeight - 270,
	openY = windowHeight - 30;
	if($("#megamenu").getAttribute("data-isOpen") == "true"){
		$("#megamenu").style.top = closeY + "px";
	}else{
		$("#megamenu").style.top = openY + "px";
	}
}

function initMega(_e){
	switch(_e.type){
		case "mousedown":
			onTouchStart(_e);
			d.addEventListener("mousemove", initMega, false);
			d.addEventListener("mouseup", initMega, false);
		break;
		case "touchstart":
			onTouchStart(_e);
			$("#handler").addEventListener("touchmove", initMega, false);
			$("#handler").addEventListener("touchend", initMega, false);
		break;
		
		case "mousemove":
			onTouchMove(_e);
		break;
		case "touchmove":
			onTouchMove(_e);
		break;
		
		case "mouseup":
			onTouchEnd(_e);
			d.removeEventListener("mousemove", initMega, false);
			d.removeEventListener("mouseup", initMega, false);
		break;
		case "touchend":
			onTouchEnd(_e);
			$("#handler").removeEventListener("touchmove", initMega, false);
			$("#handler").removeEventListener("touchend", initMega, false);
		break;
	}
}

function onTouchStart(_e){
	try{
		touchStartY = _e.touches[0].pageY;
		touchEndY = _e.touches[0].pageY;
	}catch(e){
		touchStartY = _e.pageY;
		touchEndY = _e.pageY;
	}
	touchMarginY = touchStartY - parseInt($("#megamenu").style.top);
}
function onTouchMove(_e){
	_e.preventDefault();
	try{
		moveY = _e.touches[0].pageY - touchMarginY;
		touchEndY = _e.touches[0].pageY;
	}catch(e){
		moveY = _e.pageY - touchMarginY;
		touchEndY = _e.pageY;
	}
	
	if(moveY > openY || moveY < closeY){
	}else{
		$("#megamenu").style.top = moveY + "px";
	}
}
function onTouchEnd(_e){
	if(touchStartY == touchEndY){
		if($("#megamenu").getAttribute("data-isOpen") == "true"){
			megaYPos = openY;
		}else{
			megaYPos = closeY;	
		}
	}else{
		if(touchStartY > touchEndY){
			megaYPos = closeY;
		}else{
			megaYPos = openY;
		}
	}
	if(megaYPos == openY){
		isOpen = "false";
	}else{
		isOpen = "true";
	}
	MPTween($("#megamenu"), {top:megaYPos, time:.5, onFinish:function(){
		$("#megamenu").setAttribute("data-isOpen", isOpen);
	}});
}

})(window, document);