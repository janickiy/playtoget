function show_time_end(){
	var time_end = $('#time_end');
	$('.button_time').hide();
	time_end.toggleClass('hiden');
	
}
function parseGetParams() { 
   var $_GET = {}; 
   var __GET = window.location.search.substring(1).split("&"); 
   for(var i=0; i<__GET.length; i++) { 
      var getVar = __GET[i].split("=");
      if (typeof(getVar[1])=="undefined") 
      	$_GET['none'] = 'none';
      else
      	$_GET[getVar[0]] = getVar[1];
   } 
   return $_GET; 
} 

function delParams(par) {
	var str = window.location.toString(); 
	str = str.split('?'+par)[0];
	str = str.split('&'+par)[0];
	window.history.pushState(null, null, str);
	return str;
}


function selectAction(){
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option:selected').text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        var par = $(this).hasClass('active');
        $('div.select-styled.active').each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        if (!par)
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        if (uploader)
        	uploader.settings.multipart_params.categorie = $(this).attr('rel');

    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});
}

function getPosition(e) {
  var posx = 0;
  var posy = 0;
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }
  return {
    x: posx,
    y: posy
  }
}

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function remove_black_list(id){
	$.confirm({
				'title'		: 'Подтверждение',
				'message'	: 'Вы действительно хотите удалить пользователя из черного списка?',
				'buttons'	: {
					'Да'	: {
						'class'	: 'blue',
						'action': function(){
							$.ajax({
								type:'POST',
								url:'./?task=ajax_action&action=unblock_user',
								data:'id_user='+id,
								success:function(msg){
									if (msg.status=='success')
									{
										$('.possible-friend-cart[data-num='+id+']').remove();
									}
								}
								});
						}
					},
					'Нет'	: {
						'class'	: 'gray',
						'action': function(){}	
					}
				}
			});
}

var settMore = { 
			number  : 5,
			offset  : 5,
		}

function showMore(id,type){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=get_communities_list',
		data:{
			number:settMore.number,
			offset:settMore.offset,
			id_user:id,
			type:type,
		},
		success:function(data){
			//console.log(data);
			if (data.status==1&&data.html!='')
			{
				$('#my-event').before(data.html);
				settMore.offset+=settMore.number;
			}
			else
			{
				$('#my-event').hide();
			}
		}
	})
}
var settPopMore = { 
			number  : 5,
			offset  : 5,
		}

function showPopMore(type){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=get_pop_communities_list',
		data:{
			number:settPopMore.number,
			offset:settPopMore.offset,
			type:type,
		},
		success:function(data){
			//console.log(data);
			if (data.status==1&&data.html!='')
			{
				$('#my-event-pop').before(data.html);
				settPopMore.offset+=settPopMore.number;
			}
			else
			{
				$('#my-event-pop').hide();
			}
		}
	})
}
var settMoreEvent = { 
			number  : 5,
			offset  : 5,
		}

function showMoreEvent(id,type){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=get_events_list',
		data:{
			number:settMore.number,
			offset:settMore.offset,
			id_member:id,
			eventable_type:type,
		},
		success:function(data){
			//console.log(data);
			if (data.status==1&&data.html!='')
			{
				$('#my-event').before(data.html);
				settMore.offset+=settMore.number;
			}
			else
			{
				$('#my-event').hide();
			}
		}
	})
}
var settMorePopEvent = { 
			number  : 5,
			offset  : 5,
		}
function showMorePopEvent(){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=get_pop_events_list',
		data:{
			number:settMorePopEvent.number,
			offset:settMorePopEvent.offset,
		},
		success:function(data){
			///console.log(data);
			if (data.status==1&&data.html!='')
			{
				$('#my-event-pop').before(data.html);
				settMorePopEvent.offset+=settMorePopEvent.number;
			}
			else
			{
				$('#my-event-pop').hide();
			}
		}
	})
}
var settMorePhotos = { 
			number  : 6,
			offset  : 6,
		}
function showMorePhotos(id,type){
	//alert(id+' '+type);
	//alert(settMorePhotos.number);
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=get_photos_list',
		data:{
			number:settMorePhotos.number,
			offset:settMorePhotos.offset,
			id_owner:id,
			type:type,
		},
		success:function(data){
			//console.log(data);
			if (data.status==1&&data.html!='')
			{
				$('#my-event').before(data.html);
				settMorePhotos.offset+=settMorePhotos.number;
			}
			else
			{
				$('#my-event').hide();
			}

		}
	})
}
var settMoreVideos = { 
			number  : 6,
			offset  : 6,
		}
function showMoreVideos(id,type){
	//alert(id+' '+type);
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=get_videos_list',
		data:{
			number:settMoreVideos.number,
			offset:settMoreVideos.offset,
			id_owner:id,
			type:type,
		},
		success:function(data){
			//console.log(data);
			if (data.status==1&&data.html!='')
			{
				$('#my-event').before(data.html);
				settMoreVideos.offset+=settMoreVideos.number;
			}
			else
			{
				$('#my-event').hide();
			}
		}
	})
}

var settMoreFriend = { 
			number  : 10,
			offset  : 10,
		}
function showMoreFriend(id_user){
	//alert(id+' '+type);
	$.ajax({
		type:'POST',
		url:'./?task=ajax_action&action=get_friends_list',
		data:{
			number:settMoreFriend.number,
			offset:settMoreFriend.offset,
			id_user: id_user,
		},
		success:function(data){
			if (data.item!=null)
			{
				for (var i=0; i<data.item.length; i++)
				{
					console.log(data.item[i])
					html = '';
					html+= '<div class="col-xs-6 possible-friend-cart">'; 
              		html+= '<a class="possible-avatar" href="./?task=profile&id_user='+data.item[i]['id_user']+'">'; 
                	html+= '<img src="'+data.item[i]['avatar']+'" alt=""> </a> <a href="./?task=profile&id_user='+data.item[i]['id_user']+'">';
                	html+= '<h5><strong>'+data.item[i]['firstname']+'<span class="status_user';
                	if (data.item[i]['status_user'] == 'online')  html += 'online'; 
                	html+= '" data-num="'+data.item[i]['id_user']+'"></span><br />'+data.item[i]['lastname']+'</strong></h5></a><br>';
                	if (data.item[i]['city'] != null) html+= '<p>'+data.item[i]['city']+'</p>';
              		html+= '<a href="./?task=profile&q=messages&sel='+data.item[i]['id_user']+'" data-tooltip="Написать сообщение"><b></b></a>';
			    	html+= '</div>';

					$('#friends').append(html);
				}
				settMoreFriend.offset+=settMoreFriend.number;
			}
			else
			{
				$('#show_more_friends').hide();
			}
			
		}
	})
}

function community_leave(type,id){
	var message = '';
	switch (type)
		{
			case 'owner':	
				message = 'Вы – владелец сообщества. Покинув её, Вы лишитесь административных прав. Выйти из сообщества?';
			break;

			case 'admin':	
				message = 'Вы – администратор сообщества. Покинув её, Вы лишитесь административных прав. Выйти из сообщества?';
			break;

			case 'member':
				message = 'Вы действительно хотите выйти из сообщества?';
			break;

			case 'invited':
				message = 'Вы действительно хотите отказаться от приглашения?';
			break;
		}
	$.confirm({
					'title'		: 'Подтверждение',
					'message'	: message,
					'buttons'	: {
						'Да'	: {
							'class'	: 'blue',
							'action': function(){
								$.ajax({
									    type:'POST',
									    url:'/?task=ajax_action&action=changememberstatus',
									    data:{
									    	id:id,
									    	status:0,
									    },
									    success:function(data){
									      //console.log(data);
									      if (data.result=='success')
									      {
									      	
											$('.groups_button_leave').removeClass('red');
											$('.groups_button').removeClass('leave_fr').html('Присоединиться');
											$('.groups_button').attr('onclick','community('+id+',1,"");');
											$('.groups_button_leave').addClass('hide');
										      	
									      }
									      
									    }
									  })
							}
						},
						'Нет'	: {
							'class'	: 'gray',
							'action': function(){}	
						}
					}
				});
}

function community_add(id){
	$.ajax({
	    type:'POST',
	    url:'/?task=ajax_action&action=changememberstatus',
	    data:{
	    	id:id,
	    	status:1,
	    },
	    success:function(data){
	      console.log(data);
	      if (data.result=='success')
	      {
		    $('.groups_button').addClass('leave_fr').html('Пригласить друзей');
			$('.groups_button_leave').removeClass('hide');
			$('.groups_button_leave').attr('onclick','community('+id+',0,"member");');
			$('.groups_button').attr('onclick','commun_fr('+id+');');
			$('.groups_button_leave').removeClass('red');
	      }
	      
	    }
	  })
}
function community(id,status,type){
 
	//console.log(type);
	if (status==0)
		community_leave(type,id);
	else
		community_add(id);
}

function commun_fr(id){
  $.ajax({
  	type:'POST',
  	url:'/?task=ajax_action&action=send_community_invitation',
  	data:'id_community='+id,
  	success:function(data){
  		if (data.result=='success')
  		{
  			$('body').append('<div id="ok_com_fr" class="save_window_ok hiden">Приглашения вашим друзьям отправлены!</div>');
  			setTimeout(function(){
  			$('#ok_com_fr').removeClass('hiden');
  			},100);
  			setTimeout(function(){
  				$('#ok_com_fr').addClass('hiden');
  			},1100)
  			setTimeout(function(){
  				$('#ok_com_fr').remove();
  			},1500)
				
  		}
  	}
  })
}

function add_admin(id_user,id_community){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=add_community_administrator',
		data:{
			id_community:id_community,
			id_user:id_user,
		},
		success:function(data){
			location.reload();
		}
	})
}
function remove_admin(id_user,id_community){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=remove_community_administrator',
		data:{
			id_community:id_community,
			id_user:id_user,
		},
		success:function(data){
			location.reload();
		}
	})
}

function add_black_community(id_user,id_community){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=block_community_user',
		data:{
			id_community:id_community,
			id_user:id_user,
		},
		success:function(data){
			location.reload();
		}
	})
}

function remove_black_community(id_user,id_community){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=unblock_community_user',
		data:{
			id_community:id_community,
			id_user:id_user,
		},
		success:function(data){
			location.reload();
		}
	})
}

function approve_community_user(id_user,id_community){
	$.ajax({
		type:'POST',
		url:'/?task=ajax_action&action=approve_community_user',
		data:{
			id_community:id_community,
			id_user:id_user,
		},
		success:function(data){
			location.reload();
		}
	})

}


function event_fr(id){
  $.ajax({
  	type:'POST',
  	url:'/?task=ajax_action&action=send_event_invitation',
  	data:'id_event='+id,
  	success:function(data){
  		if (data.result=='success')
  		{
  			$('body').append('<div id="ok_com_fr" class="save_window_ok hiden">Приглашения вашим друзьям отправлены!</div>');
  			$('#ok_com_fr').removeClass('hiden');
  			setTimeout(function(){
  				$('#ok_com_fr').removeClass('hiden');
  			},100);
  			setTimeout(function(){
  				$('#ok_com_fr').addClass('hiden');
  			},1100)
  			setTimeout(function(){
  				$('#ok_com_fr').remove();
  			},1500)
  		}
  	}
  })
}
function event_add(id)
{
	$.ajax({
	    type:'POST',
	    url:'?task=ajax_action&action=change_event_memberstatus',
	    data:{
	      id_event:id,
	      status:1,
	    },
	    success:function(data){
	      console.log(data);
	      if (data.result=='success')
	          {
	            $('.groups_button').addClass('leave_fr').html('Пригласить друзей');
	            $('.groups_button').attr('onclick','event_fr('+id+');');
				$('.groups_button_leave').attr('onclick','event_join('+id+',0,"member");');
	            $('.groups_button_leave').removeClass('hide');
	          }
			$('.groups_button_leave').removeClass('red');
	    }
	  })
}

function event_leave(id,type)
{
	var message = '';
	switch (type)
		{
			case 'owner':	
				message = 'Вы – владелец мероприятия. Покинув его, Вы лишитесь административных прав. Покинуть мероприятие?';
			break;

			case 'admin':	
				message = 'Вы – администратор мероприятия. Покинув его, Вы лишитесь административных прав. Покинуть мероприятие?';
			break;

			case 'member':
				message = 'Вы действительно хотите покинуть мероприятие?';
			break;

			case 'invited':
				message = 'Вы действительно хотите отказаться от приглашения?';
			break;
		}
	$.confirm({
					'title'		: 'Подтверждение',
					'message'	: message,
					'buttons'	: {
						'Да'	: {
							'class'	: 'blue',
							'action': function(){
								$.ajax({
								    type:'POST',
								    url:'?task=ajax_action&action=change_event_memberstatus',
								    data:{
								      id_event:id,
								      status:0,
								    },
								    success:function(data){
								      console.log(data);
								      if (data.result=='success')
								          {
								            $('.groups_button').removeClass('leave_fr').html('Присоединиться');
								            $('.groups_button').attr('onclick','event_join('+id+',1,"");');
								            $('.groups_button_leave').addClass('hide');
								          }
										$('.groups_button_leave').removeClass('red');
								    }
								  })
							}
						},
						'Нет'	: {
							'class'	: 'gray',
							'action': function(){}	
						}
					}
				});
}
function event_join(id,status,type){
  if (status==0)
		event_leave(id,type);
	else
		event_add(id);
}

function change_event_community_status(id_community,id_event,status){
	console.log(id_community+' '+id_event+' '+status);
  $.ajax({
    type:'POST',
    url:'/?task=ajax_action&action=change_event_community_status',
    data:{
      id_event:id_event,
      id_community:id_community,
      status:status,
    },
    success:function(data){
      console.log(data);
      if (data.result=='success')
      	location.reload();
    }
  })
}


/*ACEPT FRIEND*/
function accept_friendship(id){
  $.ajax({
    url: "./?task=ajax_action&action=accept_friendship&id_user=" + id,
    cache: false,
    dataType: "json",
    success: function(data){
      var Status = data.status;

      if(Status == 1){
       // $('#friends_button').html('<button class="btn btn-danger" id="accept_friendship" >${BUTTON_TOP_REMOVE_FRIEND}</button>');
        location.reload();
      } 
    }
  });
  return false;
}

/*REMOVE FRIEND*/
function remove_friend(id){
  $.ajax({
    url: "./?task=ajax_action&action=remove_friend&id_user=" + id,
    cache: false,
    dataType: "json",
    success: function(data){
      if(data.result != ''){
       // $('#friends_button').html('<button class="btn btn-success" id="remove_friend" >${STR_ADD_AS_FRIEND}</button>');
        location.reload();
      } 
    }
  });
  return false;
};

/*ADD FRIEND*/
function add_as_friend(id){
	//alert(id)
  $.ajax({
    url: "./?task=ajax_action&action=add_as_friend&id_user=" + id,
    cache: false,
    dataType: "json",
    success: function(data){
      var Status = data.status;

      if(Status == 0){
        //$('#friends_button').html('<button class="btn btn-primary" id="add_as_friend">${STR_INVITATION_SENT}</button>');
        location.reload();
      } 
    }
  });
  return false;
}

$(window).load(function(){

	var get = parseGetParams();



	if (get['photo'])
		{
			$('body').append('<div class="photo_big" data-num='+get['photo']+'></div>');
			$('.photo_big[data-num='+get['photo']+']').click();
		}
	if (get['video'])
		{
			$('body').append('<div class="video_prev" data-num='+get['video']+'></div>');
			$('.video_prev[data-num='+get['video']+']').click();
		}
		
})



$(document).ready(function(){




$('.lupa span').click(function(){
        $('form[role=search]').submit();
      })




/*
$('.save_window_ok').removeClass('hiden');
$('.save_window_ok').removeClass('hiden');
setTimeout(function(){
	$('.save_window_ok').addClass('hiden');
	$('.save_window_ok').addClass('hiden');
},1000);
*/
/*REMOVE ALBUM*/
$(document).on('click','.remove_album',function(){
	var href = $(this).attr('href');
	$.confirm({
				'title'		: 'Подтверждение',
				'message'	: 'Вы действительно хотите удалить альбом?',
				'buttons'	: {
					'Да'	: {
						'class'	: 'blue',
						'action': function(){
							$(location).attr('href',href);
						}
					},
					'Нет'	: {
						'class'	: 'gray',
						'action': function(){}	
					}
				}
			});
	return false;
})
/*TITLE BUTTON*/
var tooltip = true;
 $(document).on("mousemove","[data-tooltip]",function (eventObject) {
 		if (tooltip)
 		{
 			$data_tooltip = $(this).attr("data-tooltip");
        
        	$("#tooltip").html($data_tooltip)
                     .css({ 
                         "top" : getPosition(eventObject).y+10,
                        "left" : getPosition(eventObject).x+10
                     })
                     .fadeIn();
            tooltip=false;
 		}
        

    })
  $(document).on("mouseout","[data-tooltip]",function () {
  		if (!tooltip)
 		{
        $("#tooltip").hide()
                     .text("")
                     .css({
                         "top" : 0,
                        "left" : 0
                     });
         tooltip=true;
     }
    });
  
var liked = true;
 $(document).on("mousemove",".liked",function (eventObject) {
 		if (liked)
 		{
 			$data_tooltip = 'Мне нравится';
        
        	$("#tooltip").html($data_tooltip)
                     .css({ 
                         "top" : getPosition(eventObject).y+10,
                        "left" : getPosition(eventObject).x+10
                     })
                     .fadeIn();
            liked=false;
 		}
        

    })
  $(document).on("mouseout",".liked",function () {
  		if (!liked)
 		{
        $("#tooltip").hide()
                     .text("")
                     .css({
                         "top" : 0,
                        "left" : 0
                     });
         liked=true;
     }
    });
var tell = true;
 $(document).on("mousemove",".tell",function (eventObject) {
 		if (tell)
 		{
 			$data_tooltip = 'Поделиться';
        
        	$("#tooltip").html($data_tooltip)
                     .css({ 
                         "top" : getPosition(eventObject).y+10,
                        "left" : getPosition(eventObject).x+10
                     })
                     .fadeIn();
            tell=false;
 		}
        

    })
  $(document).on("mouseout",".tell",function () {
  		if (!tell)
 		{
        $("#tooltip").hide()
                     .text("")
                     .css({
                         "top" : 0,
                        "left" : 0
                     });
         tell=true;
     }
    });
/*LIKE CONTENT*/
$(document).on( "click", ".liked", function() {
		var IdComment = $(this).attr('data-item');
		var type = $(this).attr('data-type');
		if (type=='') type='comment';
		$.ajax({
			url: "./?task=ajax_action&action=liked&id=" + IdComment + "&likeable_type="+type,
			cache: false,
			dataType: "json",
			success: function(data){
				//console.log(data);
			var Result = data.result;
          
			if(Result != ''){
				//console.log(IdComment);
				$('.liked[data-type='+type+'][data-item=' + IdComment+']').text(Result);
			} 
		}
	});
});


/*SHARE CONTENT*/


$(document).on( "click", ".tell", function() {
	var $this = $(this);
	var IdComment = $(this).attr('data-item');
	var type = $(this).attr('data-type');
	if (type=='') type='comment';
	$.ajax({
		url: "./?task=ajax_action&action=shared&id=" + IdComment + "&shareable_type="+type,
		cache: false,
		dataType: "json",
		success: function(data){
			var Result = data.result;
			console.log(data);
			if(Result != ''){
				$('.tell[data-type='+type+'][data-item=' + IdComment+']').text(Result);
				$('body').append('<div id="ok_com_fr" class="save_window_ok hiden">Запись появится в новостях у Ваших друзей!</div>');
  				setTimeout(function(){
  				$('#ok_com_fr').removeClass('hiden');
	  			},100);
	  			setTimeout(function(){
	  				$('#ok_com_fr').addClass('hiden');
	  			},1100)
	  			setTimeout(function(){
	  				$('#ok_com_fr').remove();
	  			},1500)
			} 
		}
	});
});

/*REMOVE COMMENT*/
 $(document).on('click','.del_mess',function(){
	var id = $(this).attr('data-item');
	$.confirm({
				'title'		: 'Подтверждение',
				'message'	: 'Вы действительно хотите удалить?',
				'buttons'	: {
					'Да'	: {
						'class'	: 'blue',
						'action': function(){
							$.ajax({
								type:'POST',
								url:'/?task=ajax_action&action=removecomment',
								data:'id_comment='+id,
								success:function(msg){
									//console.log(msg);
									if (msg.result=='success')
									{
										$('#message-'+id).remove();
									}
								}
								});
						}
					},
					'Нет'	: {
						'class'	: 'gray',
						'action': function(){}	
					}
				}
			});
			
		
}) 

/*REMOVE MESSAGE*/
 $(document).on('click','.del-message',function(){
	var id = $(this).attr('data-item');
	$.confirm({
				'title'		: 'Подтверждение',
				'message'	: 'Вы действительно хотите удалить?',
				'buttons'	: {
					'Да'	: {
						'class'	: 'blue',
						'action': function(){
							$.ajax({
								type:'POST',
								url:'/?task=ajax_action&action=remove_message',
								data:'id='+id,
								success:function(msg){
									console.log(msg);
									if (msg.result=='success')
									{
										$('#message-'+id).remove();
									}
								}
								});
						}
					},
					'Нет'	: {
						'class'	: 'gray',
						'action': function(){}	
					}
				}
			});
			
		
}) 

/*SUBMIT COMMENT FORM*/
$(document).on('submit','#addCommentForm',function(){
		var then = $(this);
		var comment = then.find('#comment').val();
		var files = then.find('.attach');
		var type = then.find('input[name=commentable_type]').val();
		var attach = [];
		files.each(function(){
			attach.push($(this).attr('data-id'));
		})
		if (comment!=''||attach.length!=0)
		{
				$('span.error').remove();
				$('.files_block').append('<div class="loading-mess"><img border="0" src="./templates/images/select2-spinner.gif" width=20px></div>');	
				$('.files_block').html('');
				var formData = then.serializeArray();
				if (attach.length!=0)
				formData.push({'name':'attach','value':attach});
				console.log(formData);
				 
		            $.ajax({
			        url: './?task=ajax_action&action=addcomment',
			        data: formData,
			        type: 'POST',
			        success: function(data){
				      
						console.log(data);
						$('textarea').css('height','38px');
						then[0].reset();
						
						if(data.status){
							$(data.html).hide().insertAfter('#addCommentContainers[data-type='+type+']').slideDown();
							$('#comment').val('');
							$('.message-text').emotions();
						}
						else {
							$.each(data.errors,function(k,v){
								$('label[for='+k+']').append('<span class="error">'+v+'</span>');
							});
						}
			        }

		        })
		}

	
	return false;
});



/*SUBMIT REPLY FORM*/
$(document).on( "click", "#send-reply", function() {
		var IdComment = $(this).attr('data-item');
		var then = $(this).parent('form');
		var files = then.find('.attach');
		var comment = then.find('#comment').val();
		var attach = [];
		files.each(function(){
			attach.push($(this).attr('data-id'));
		})
		if (comment!=''||attach.length!=0)
		{
		$('#my-comment-'+IdComment).append('<div class="loading-mess"><img border="0" src="./templates/images/select2-spinner.gif" width=20px></div>');
			var formData = then.serializeArray();
				formData.push({'name':'attach','value':attach});
            $.ajax({
		        type: 'POST',
		        url: './?task=ajax_action&action=addcomment',
		        data: formData,
		        success: function(data){
					//console.log(data);
					then[0].reset();
					if(data.status){
						$('#my-comment-' + IdComment).remove();
						$(data.html).hide().insertAfter('#message-' + IdComment).slideDown();
						$('#comment').val('');
						$('.reply').show();
					}
					else {
						$.each(data.errors,function(k,v){
							$('label[for='+k+']').append('<span class="error">'+v+'</span>');
						});
					}
		        }
	      });
		
		}
	return false;
});






/*CHECKBOX*/
$(document).on('click','.checkbox',function(){
	var checkbox = $(this).children('input[type=checkbox]');
	var a = checkbox.prop('checked');
	if (a)
	{
		checkbox.prop("checked", false)
	}
	else
	{
		checkbox.prop("checked", true)
	}
	//console.log(a);
	return false;
})



/*$('input[type=text]').keyup(function (event) {
    if (event.ctrlKey && event.keyCode == 86) {
        var val = $(this).val();
        console.log(event);
        
    }
});*/


/*VALIDATE CREATE FORM*/
$(document).on('submit','.create_form',function(){
	var form = $(this).serializeArray();
	var error = false;
	for (var i=0; i<form.length; i++)
	{
		if ((form[i].name == 'name'||
			form[i].name == 'about'||
			form[i].name == 'description'||
			//form[i].name == 'id_place'||
			form[i].name == 'place'||
			//form[i].name == 'id_sport'||
			form[i].name == 'sport'||
			form[i].name == 'sport_type'||
			form[i].name == 'address' ||
			form[i].name == 'phone' ||
			form[i].name == 'email' ||
			form[i].name == 'website' ||
			form[i].name == 'event_date_from')&&form[i].value == '')
		{
			$('input[name='+form[i].name+']').addClass('error');
			$('textarea[name='+form[i].name+']').addClass('error');
			$('.error_label[name='+form[i].name+']').fadeIn();
			error = true;
		}
	}
	if (!error)
	{
		$('.create_form').submit();
		console.log('form submit');
	}
	else
	{
		setTimeout(function(){
			$('input').removeClass('error');
			$('textarea').removeClass('error');
			$('.error_label').fadeOut();
		},3000)
		console.log('error');
	}
	return false;
})


$('.search form').submit(function(){
	var val = $('#main_search').val();
	if (val!='')
	{
		$(this).submit();
	}


	return false;
})


$(document).on('keyup','.input_hastags', function (event) {
  var num = $(this).attr('data-num');
  var text = $(this).val();
  var array = []
  var highlighted = text.replace(/#\S*\s/g,function(el) {

     array.push(el.substring(0,el.length-1));
	});
  $('.hashtags[data-num='+num+']').html('');
  for (var i=0; i<array.length; i++)
  {
  	$('.hashtags[data-num='+num+']').append(' <a href="#">'+array[i]+'</a>');
  }
  
});
/*
var link = true;

$(document).on('keyup','.ahref_input',function(){
	var num = $(this).attr('data-num');
	var str = $(this).val();	
	var reg = str.match(/(https?:\/\/)?(www\.)?([-а-яa-z0-9_\.]{2,}\.)(рф|[a-z]{2,6})((\/[-а-яa-z0-9_]{1,})?\/?([a-z0-9_-]{2,}\.[a-z]{2,6})?(\?[a-z0-9_]{2,}=[-0-9]{1,})?((\&[a-z0-9_]{2,}=[-0-9]{1,}){1,})?)/i );
    if (reg&&reg[0]>'')
    {
    	if (link)
    	{
    		console.log('ссылка найдена - '+reg[0]);
    		$('.link_attach').html('');
    		$('.link_attach').addClass('load').removeClass('show');
    		link = false;
    		$.ajax({
		    	type:'POST',
		    	url:'./?task=ajax_action&action=get_parsing',
		    	data: 'str='+reg[0],
		    	success:function(data){
		    		if (data.status==1)
		    		{
		    			console.log(data.title);
		    			console.log(data.description);
		    			console.log(data.img);
		    			$('.link_attach').html('<p class="a">Ссылка: <a href="'+reg[0]+'">'+reg[0]+'</a></p><img src="'+data.img+'"/><h5>'+data.title+'</h5><p>'+data.description+'</p><div class="del_link" data-tooltip="Не прикреплять"></div>')
		    			$('.link_attach').addClass('show');
		    		}
		    	},
		    	error:function(data){
    				$('.link_attach').removeClass('load').removeClass('show');
		    		link=true;
		    	}
		    })
    	}
	    
	}

})

$(document).on('click','.del_link',function(){
	$(this).parent('.link_attach').removeClass('show').removeClass('load').html('');
	link=true;
})*/
$(document).on('click','.back_one',function(){
	$('#photo_big').hide();
	$('#video_big').hide();
	$('body,html').css('overflow','auto');
	delParams('photo');
	delParams('video');
	return false;
})


$('.age').keydown(function(event) {
              if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
             // Разрешаем: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) || 
                     // Разрешаем: home, end, влево, вправо
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                         // Ничего не делаем
                         return;
                }
                else {
                    // Обеждаемся, что это цифра, и останавливаем событие keypress
                    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                        event.preventDefault(); 
                    }   
                }
          });
})