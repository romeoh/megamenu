/**********************************************************************
 MPTween.js
 모피어스 프레임웍의 모션 에니메이션 구현 스크립트
 Author : 백국경 (romeoh@uracle.co.kr)
 Copyright (c) 2001-2011 Uracle Co., Ltd.
 166 Samseong-dong, Gangnam-gu, Seoul, 135-090, Korea All Rights Reserved.
 모피어스 프레임웍의 모션 에니메이션 구현을 위한 스크립스 함수들을 정의한다.
 ************************************************************************/

function MPTween(obj, param){
	MPTween.aTop 			= param.top;
	MPTween.aLeft 			= param.left;
	MPTween.aRight 			= param.right;
	MPTween.aBottom 		= param.bottom;
	MPTween.aWidth			= param.width;
	MPTween.aHeight			= param.height;
	MPTween.aRotation		= param.rotation;
	MPTween.aScale			= param.scale;
	MPTween.aSkew			= param.skew;
	MPTween.aOpacity		= param.opacity;
	
	MPTween.aBorderColor	= param.borderColor;
	MPTween.aBgColor		= param.bgColor;
	
	MPTween.aDropShadow		= param.dropShadow;
	
	MPTween.aTime 			= param.time;
	MPTween.aDelay 			= param.delay;
	MPTween.aTransition 	= param.transition;		//ease, ease-in, ease-out, ease-in-out, linear, cubic-bezier(1, 0, 0, 0)
	
	if(param.onFinish) MPTween.aFinish = param.onFinish;
	else MPTween.aFinish = undefined;
	MPTween.aFinishParam 	= param.onFinishParam;
	
	MPTween.rotationText	= "";
	MPTween.scaleText		= "";
	MPTween.skewText		= "";
	MPTween.styleText		= "";
	
	//기본값 설정
	if(!MPTween.aTime) MPTween.aTime = 1;
	if(!MPTween.aTransition) MPTween.aTransition = "easeIn";
	if(!MPTween.aDelay) MPTween.aDelay = 0;
	if(document.defaultView.getComputedStyle(obj, null).position == "static") obj.style.position += "relative";
	
	//transition설정
	MPTween.styleText += "-webkit-transition-delay:" + MPTween.aDelay + "s; ";
	MPTween.styleText += "-webkit-transition-duration:" + MPTween.aTime + "s; ";
	MPTween.styleText += "-webkit-transition-property:all; ";
	MPTween.styleText += "-webkit-transition-timing-function:" + MPTween.aTransition + "; ";
	MPTween.styleText += "-moz-transition-delay:" + MPTween.aDelay + "s; ";
	MPTween.styleText += "-moz-transition-duration:" + MPTween.aTime + "s; ";
	MPTween.styleText += "-moz-transition-property:all; ";
	MPTween.styleText += "-moz-transition-timing-function:" + MPTween.aTransition + "; ";
	MPTween.styleText += "-o-transition-delay:" + MPTween.aDelay + "s; ";
	MPTween.styleText += "-o-transition-duration:" + MPTween.aTime + "s; ";
	MPTween.styleText += "-o-transition-property:all; ";
	MPTween.styleText += "-o-transition-timing-function:" + MPTween.aTransition + "; ";
	MPTween.styleText += "-ms-transition-delay:" + MPTween.aDelay + "s; ";
	MPTween.styleText += "-ms-transition-duration:" + MPTween.aTime + "s; ";
	MPTween.styleText += "-ms-transition-property:all; ";
	MPTween.styleText += "-ms-transition-timing-function:" + MPTween.aTransition + "; ";
	MPTween.styleText += "transition-delay:" + MPTween.aDelay + "s; ";
	MPTween.styleText += "transition-duration:" + MPTween.aTime + "s; ";
	MPTween.styleText += "transition-property:all; ";
	MPTween.styleText += "transition-timing-function:" + MPTween.aTransition + "; ";
	
	//기본속성설정 
	if(MPTween.aTop != undefined) 			MPTween.styleText += "top:" + MPTween.aTop + "px; ";
	if(MPTween.aLeft != undefined) 			MPTween.styleText += "left:" + MPTween.aLeft + "px; ";
	if(MPTween.aRight != undefined) 		MPTween.styleText += "right:" + MPTween.aRight + "px; ";
	if(MPTween.aBottom != undefined) 		MPTween.styleText += "bottom:" + MPTween.aBottom + "px; ";
	if(MPTween.aWidth != undefined) 		MPTween.styleText += "width:" + MPTween.aWidth + "px; ";
	if(MPTween.aHeight != undefined) 		MPTween.styleText += "height:" + MPTween.aHeight + "px; ";
	if(MPTween.aOpacity != undefined) 		MPTween.styleText += "opacity:" + MPTween.aOpacity + "; ";
	if(MPTween.aBorderColor != undefined)	MPTween.styleText += "border-color:" + MPTween.aBorderColor + "; ";
	
	//rotation, scale, skew
	if(MPTween.aRotation != undefined) 		MPTween.rotationText = "rotate(" + MPTween.aRotation + "deg) ";
	if(MPTween.aScale != undefined) 		MPTween.scaleText = "scale(" + MPTween.aScale + ") ";
	if(MPTween.aSkew != undefined) 			MPTween.scaleText = "skew(" + MPTween.aSkew + "deg) ";
	MPTween.styleText += "-webkit-transform:" + MPTween.rotationText + MPTween.scaleText + "; ";
	MPTween.styleText += "-moz-transform:" + MPTween.rotationText + MPTween.scaleText + "; ";
	MPTween.styleText += "-o-transform:" + MPTween.rotationText + MPTween.scaleText + "; ";
	MPTween.styleText += "-ms-transform:" + MPTween.rotationText + MPTween.scaleText + "; ";
	MPTween.styleText += "transform:" + MPTween.rotationText + MPTween.scaleText + "; ";
	
	//bgColor, dropShadow
	this.bgImage = document.defaultView.getComputedStyle(obj, null).backgroundImage;
	this.bgImageRepeat = document.defaultView.getComputedStyle(obj, null).backgroundRepeat;
	this.bgImagePositionX = document.defaultView.getComputedStyle(obj, null).backgroundPositionX;
	this.bgImagePositionY = document.defaultView.getComputedStyle(obj, null).backgroundPositionY;
	this.originalBackgroundImage = this.bgImage + " " + this.bgImageRepeat + " " + this.bgImagePositionX + " " + this.bgImagePositionY
	if(MPTween.aBgColor != undefined) MPTween.styleText += "background:" + MPTween.aBgColor + " " + originalBackgroundImage + "; ";
	if(MPTween.aDropShadow != undefined) {
		MPTween.styleText += "-webkit-box-shadow:" + MPTween.aDropShadow + "; ";
		MPTween.styleText += "-moz-box-shadow:" + MPTween.aDropShadow + "; ";
		MPTween.styleText += "-o-box-shadow:" + MPTween.aDropShadow + "; ";
		MPTween.styleText += "-ms-box-shadow:" + MPTween.aDropShadow + "; ";
		MPTween.styleText += "box-shadow:" + MPTween.aDropShadow + "; ";
	}
	obj.style.cssText += MPTween.styleText;
	
	//CallBack함수
	function CBData(){
		this.callbackFunction = [];
		this.callbackParam = [];
	}
	CBData.prototype.setCallback = function(cb){
		this.callbackFunction = cb;
	}
	CBData.prototype.getCallback = function(){
		return this.callbackFunction;
	}
	CBData.prototype.setParam = function(pam){
		this.callbackParam = pam;
	}
	CBData.prototype.getParam = function(){
		return this.callbackParam;
	}
	CBData.prototype.cb = function(e){
		var callCb = cbCall.getCallback();
		var callParam = cbCall.getParam();
		
		if(callParam) callbackParam = callParam;
		else callbackParam = "";
		
		if(typeof callCb == "function") callCb(callbackParam);
		else if(typeof callCb == "string") eval(callCb)(callbackParam);
		
		e.target.removeEventListener("webkitTransitionEnd", cbCall.cb, false);
		resetMotion(e.target);
	}
	
	var cbCall = new CBData();
	if(MPTween.aFinish) cbCall.setCallback(MPTween.aFinish);
	if(MPTween.aFinishParam) cbCall.setParam(MPTween.aFinishParam);
	
	obj.addEventListener("webkitTransitionEnd", cbCall.cb, false);
	
	function resetMotion(_obj){
		with(_obj){
			style['-webkit-transition-delay'] = "";
			style['-webkit-transition-duration'] = "";
			style['-webkit-transition-property'] = "";
			style['-webkit-transition-timing-function'] = "";
			style['-moz-transition-delay'] = "";
			style['-moz-transition-duration'] = "";
			style['-moz-transition-property'] = "";
			style['-moz-transition-timing-function'] = "";
			style['-o-transition-delay'] = "";
			style['-o-transition-duration'] = "";
			style['-o-transition-property'] = "";
			style['-o-transition-timing-function'] = "";
			style['-ms-transition-delay'] = "";
			style['-ms-transition-duration'] = "";
			style['-ms-transition-property'] = "";
			style['-ms-transition-timing-function'] = "";
			style['transition-delay'] = "";
			style['transition-duration'] = "";
			style['transition-property'] = "";
			style['transition-timing-function'] = "";
		}
	}
}