$(function () {
	//setting
	const config = {
		ACCESS_TOKEN : '3175701600.c9fdd34.bd927a583d6941168e08692ca0b3ec5c' //set your instagram api 
	}

	searchData();
	function searchData(a){
		$.ajax({
			url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+config.ACCESS_TOKEN,
			type: "GET",
			crossDomain: true,
			dataType: "jsonp",
			success: function(res){
				var data = res['data'];
				var columns = document.getElementById('columns');
				function makeDom(i){
					var div = document.createElement('div');
					div.className = 'pin';

					var a = document.createElement('a');
					a.href= data[i].images.standard_resolution.url;

					var img = document.createElement('img');
					img.src = data[i].images.low_resolution.url;
					var p = document.createElement('p');
					p.innerHTML = data[i].caption.text;

					a.appendChild(img);
					div.appendChild(a);
					div.appendChild(p);
					columns.appendChild(div);
				}
				if(!data){
					var d = document.createElement('div');
					d.innerHTML = "your request matched 0 results";
					columns.appendChild(d);
				}else{
	      			for(var i=0;i<data.length;i++){
			      		//serch check
			      		if(a){
				      		if(data[i].caption.text.indexOf(a) != -1)makeDom(i);
			      		}else{
			      			makeDom(i);
						}
		    		}
		    	}

		    //magnific popup
				$('.parent-container').magnificPopup({
					delegate: 'a', 
					type: 'image',
					closeBtnInside: false,
					gallery: {
						enabled:true
					}
				});
			}
		});
	}


	var search_el = document.getElementById('search');
	search_el.onkeyup = function(){
		var char = event.which || event.keyCode;
		if(char == 13){
			document.getElementById("columns").innerHTML = '';
			searchData(this.value);
		}
	}

	var el = document.getElementById('wrapper');
	var el_height = el.offsetHeight;
	el.onscroll = function(){
		var scrollHeight = el.scrollHeight;
		var scrollTop = el.scrollTop;
		var scrollPosition = el_height + scrollTop;
	}


	/*------ count.php onload count @FIXME------*/
	// $.ajax({
	// 	type: 'POST',
	// 	url: 'http://test.com/count.php',
	// 	dataType: 'json',
	// 	beforeSend: function(jqXHR) {
	// 		return true;
	// 	},
	// }).done(function(response, textStatus, jqXHR) {
	// 	// success
	// 	// $('*[data-like="like_1"]')[0].innerHTML = response.count;

	// }).fail(function(jqXHR, textStatus, errorThrown ) {
	// 	//failed
	// }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
	// });

	$('#heart-click').click(function(){
		var $_data = $(this).find('[data-like]').data('like');
		var $_number = parseInt($(this).find('[data-like="' + $_data +'"]').text());
		if (localStoreSupport()){
			var $_clickAble = localStorage.getItem($_data)
		}else{
			var $_clickAble = getCookie($_data);
		}
		if($_clickAble == null || $_clickAble =='') $_clickAble = true;

		if($_clickAble==true){
			animationLike(this, $_data, $_number);
			$(this).addClass('active');
			var img = document.getElementById('heart-click').childNodes[3];
			img.src = 'assets/img/heart-02.svg';

			/*------ update.php count likes @FIXME------*/
			// var phpimg = document.createElement('img');
			// phpimg.src = "http://test.com/update.php";
			// phpimg.style.position = 'absolute';
			// phpimg.style.left = '0';
			// phpimg.style.top = '0';
			// phpimg.style.zIndex = '-100';
			// document.body.appendChild(phpimg);
		}

	});
});

function animationLike(item, data, number){
	$("[data-like='" + data +"']")
	.prop('number', number)
	.animateNumber({
		number: number + 1
	});


	var $_delay = 0;

	if (localStoreSupport()){
		var $_clickAble = localStorage.getItem(data)
	}else{
		var $_clickAble = getCookie(data);
	}

	if($_clickAble == null) $_clickAble = true;
	if($_clickAble == true){
		$_delay = 800;
	}else{
		$_delay = 0;
	}	

	if (localStoreSupport()){
        localStorage.setItem(data, false);
    }else{
			setCookie(data,false,1);
    }

}
function localStoreSupport (){
    var testKey = 'test', storage = window.sessionStorage;
    try{
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    }catch (error){
        return false;
    }
}
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}