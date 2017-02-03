
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(document).on('click','#remove_this',function(){
  var i = 1;
  var num = $(this).attr('data-num');
  $('.possible-friend-cart[data-num='+num+']').remove();
  $.ajax({
        url: './?task=ajax_action&action=getpossiblefriends',             
        dataType : "json",  
        success: function (data) {
		
			if(data.item[i].status_user == 'online')
				var status_user = 'online';
			else
				var status_user = '';
		
			var makeup = '';
			makeup += '<div class="col-xs-6 possible-friend-cart" data-num="' + data.item[i].id_user + '">';
			makeup += '<a class="possible-avatar" href="./?task=profile&id_user=' + data.item[i].id_user + '"><img src="' + data.item[i].avatar + '" alt=""></a>';
			makeup += '<a href="./?task=profile&id_user=' + data.item[i].id_user + '"><h5><strong>' + data.item[i].firstname + '<span class="status_user ' + status_user + '" data-num="' + data.item[i].id_user + '"></span> <br />' + data.item[i].lastname + '</strong></h5></a>';        
			if(data.item[i].city != '' && data.item[i].city != null) makeup += '<p>' + data.item[i].city + '</p>';        
			makeup += '';             
			makeup += '<div class="control">';
			makeup += '<span><a onclick="add_as_friend(' + data.item[i].id_user + ');" data-tooltip="Добавить в друзья"><img src="./templates/images/icon-ok.png" alt=""/></a></span>';
			makeup += '<span><img src="./templates/images/icon-krest.png" alt="" id="remove_this" data-num="' + data.item[i].id_user + '"  data-tooltip="Больше не показывать"/></span>';
			makeup += '</div></div>';
      
			$('#possible-friend').append(makeup);	
		}
	})

})
$(document).on( "click", "#show-possible_friends", function() {

    $.ajax({
        url: './?task=ajax_action&action=getpossiblefriends',             
        dataType : "json",  
        success: function (data) {
			var makeup = '';	
							
			for(var i=0; i < data.item.length; i++) {
			
				if(data.item[i].status_user == 'online')
					var status_user = 'online';
				else
					var status_user = '';			
			
				makeup += '<div class="col-xs-6 possible-friend-cart" data-num="' + data.item[i].id_user + '">';
				makeup += '<a class="possible-avatar" href="./?task=profile&id_user=' + data.item[i].id_user + '"><img src="' + data.item[i].avatar + '" alt=""></a>';
				makeup += '<a href="./?task=profile&id_user=' + data.item[i].id_user + '"><h5><strong>' + data.item[i].firstname + '<span class="status_user ' + status_user + '" data-num="' + data.item[i].id_user + '"></span> <br />' + data.item[i].lastname + '</strong></h5></a>';				
				if(data.item[i].city != '' && data.item[i].city != null) makeup += '<p>' + data.item[i].city + '</p>';				
				makeup += '';             
				makeup += '<div class="control">';
				makeup += '<span><a onclick="add_as_friend(' + data.item[i].id_user + ');"  data-tooltip="Добавить в друзья"><img src="./templates/images/icon-ok.png" alt=""/></a></span>';
				makeup += '<span><img src="./templates/images/icon-krest.png" alt="" id="remove_this" data-num="' + data.item[i].id_user + '"  data-tooltip="Больше не показывать"/></span>';
				makeup += '</div></div>';
			}
			
			$('#possible-friend').html(makeup);

        }
    });
});