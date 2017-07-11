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
					d.innerHTML = "該当するデータがありません";
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

});