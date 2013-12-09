var i18n = {
	translation	: 	null,
	__init__:	function(){
		console.log("i18n init");
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "assets/lang/"+window.navigator.language+".json", true);
		xmlhttp.onreadystatechange = function () {
		  if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			console.log("i18n file loaded");
			i18n.translation=JSON.parse(xmlhttp.responseText);
			setTimeout(function(){ console.log("i18n delay end");i18n.translate()},250);
		  }
		};
		xmlhttp.send(null);
	},
	get		:	function(e){
		var t=i18n.translation[e];
		for( var i=1; i < arguments.length; i++ ) {
			t =  t.replace( /%s/, arguments[i] );
		}
  		return t!=null?t:e;
	},
	translate : function(){
		$("*[data-i18n]").each(function(){
			if($(this).attr("data-translate")!="true"){
				$(this).html(lang.get($(this).attr("data-i18n"))).attr("data-translate","true");	
			}
		});
		l = /i18n\((.*?)\)/gim;
		b = $("body").html().toString();
		$("body").find("*").each(function(){
			var title = $(this).attr("title");
			if(title!=""&&typeof title!="undefined")
				$(this).attr("title",$(this).attr("title").replace(l,function(a, b){
					return i18n.get(b);
				}));
			var alt = $(this).attr("alt");
			if(alt!=""&&typeof alt!="undefined")
				$(this).attr("alt",$(this).attr("alt").replace(l,function(a, b){
					return i18n.get(b);
				}));
			$(this).html($(this).html().replace(l,function(a, b){
				return i18n.get(b);
			}));
		});
		$.event.trigger({
			type: "translationcomplete",
			message: "Translation complete !",
			time: new Date()
		});
	}
