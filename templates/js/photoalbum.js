
var k = 0;
var mass_photo = [];
$(document).ready(function(){

    $(document).on('click','.remove_pic',function() {
		var IdPic = $(this).attr('data-item');
		
		$.confirm({
				'title'		: 'Подтверждение',
				'message'	: 'Вы действительно хотите удалить?',
				'buttons'	: {
					'Да'	: {
						'class'	: 'blue',
						'action': function(){
							$.ajax({
								url: "./?task=ajax_action&action=removepic&id=" + IdPic,
								cache: false,
								dataType: "json",
								success: function(data){
									console.log(data);
									
									var Result = data.result;
									if(Result == 'success'){
										$('#photo-block-' + IdPic).remove();
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
    });
var obj = {};
$('.photo_big').each(function(){
	//var src = $(this).attr('href');
	var id = $(this).attr('data-num');
	
	if (parseInt($.inArray(id, mass_photo)) == -1)
	{
		mass_photo.push(id);
		k++;
	}

//console.log(mass_photo);
});


function getPhotoInfo(id){
	$.ajax({
		type:'POST',
		url:'./?task=ajax_action&action=getphotoinfo',
		data:'id_photo='+id,
		success:function(data){
			//console.log(data);
			if (data.status===1){
				//console.log(data);
				$('#id_owner').val(data.id_owner);
				$('#name_foto').html('<a href="./?task=profile&id_user='+data.id_owner+'">'+data.firstname+' '+data.lastname+'</a>');
				$('#date_foto .data').html(data.created);
				$('.info_photo').html(data.description);
				$('#photo_big').find('.tell').html(data.tell).attr('data-item',id).attr('id','tell-photo-'+id).attr('data-type','photo');
				$('#photo_big').find('.liked').html(data.liked).attr('data-item',id).attr('id','like-photo-'+id).attr('data-type','photo');
				$('.photo_big_wrap').find('.photo_wrap').attr('src',data.photo);
				getCommentsPhoto(id);
				//window.location.hash="#photo"+id;
				var url;
				var str = delParams('photo');
				var str = delParams('video');

				var get = parseGetParams();
				if (get['none']=='none')
					url = '?photo='+id;
				else
					url = '&photo='+id;
		        if(url != window.location){
		            window.history.pushState(null, null, str+url);
		        }
			}
			else
			{
				$('.back_one').click();
			}
		}
	})
}

$('.photo_wrap').bind('load', function(){
	$('.loading-bar').hide();
	$('.photo_big_wrap').find('.photo_wrap').show();

});



$(document).on('click','.photo_big',function(){
	$('.loading-bar').show();
	$('.photo_big_wrap').find('.photo_wrap').hide();
	var id = $(this).attr('data-num');	
	$('.photo_big_wrap').find('#id_content').val(id);
	$('body,html').css('overflow','hidden');
	$('#photo_big').show();
	$('#photo_big').animate({ scrollTop: 0 }, 0);
	getPhotoInfo(id);  
	  
	return false;
})
	


$(document).on('click','.next',function(){
	$('.loading-bar').show();
	$('.photo_big_wrap').find('.photo_wrap').hide();
	var id = $('#id_content').val();
	var index_new = 0;
	var index = parseInt($.inArray(id, mass_photo));
	//console.log(id+'-'+index);
	if (index == k-1){
		index_new = 0;
	}
	else{
		index_new = index + 1;
	}
	
	$('#id_content').val(mass_photo[index_new]);
	getPhotoInfo(mass_photo[index_new]);
})


$(document).on('click','.prev',function(){
	$('.loading-bar').show();
	$('.photo_big_wrap').find('.photo_wrap').hide();
	var id = $('#id_content').val();
	var index_new = 0;
	var index = parseInt($.inArray(id, mass_photo));
		
	if (index == 0){
		index_new = k - 1;
	}
	else{
		index_new = index - 1;
	}
		
	$('#id_content').val(mass_photo[index_new]);
	getPhotoInfo(mass_photo[index_new]);
})

});

$(document).on( "click", ".hide-pop-photo-block", function() {
	$('#popular-photos').hide().fadeIn('2000');
	$('#button-hid').text('Скрыть');
	$("#button-hid").removeClass("hide-pop-photo-block");
	$('#button-hid').addClass('show-pop-photo-block');

});

$(document).on( "click", ".show-pop-photo-block", function() {
	$('#popular-photos').show().fadeOut('2000');
	$('#button-hid').text('Показать');
	$("#button-hid").removeClass("show-pop-photo-block");
	$('#button-hid').addClass('hide-pop-photo-block');

});


$(document).on( "click", ".photo_big_wrap .reply", function() {
	var IdComment = $(this).attr('data-item');
    var IdParent = $('#id_content').val();
	$('.reply').show(); 
	$(this).hide(); 
	$('.my-comment').remove();  
          
	var ReplyForm = '<div id="my-comment-' + IdComment + '" class="my-comment">';
	ReplyForm += '<div class="message-account">';
	ReplyForm += '<img src="'+avatar+'" alt="" class="img-account">';
	ReplyForm += '</div>';        
	ReplyForm += '<form autocomplete="off" id="reply-form-' + IdComment + '" data-num = '+ IdComment +' action="">';
	ReplyForm += '<input type="hidden" name="commentable_type" value="photo">';
	ReplyForm += '<input type="hidden" name="id_content" value="'+IdParent+'">';
	ReplyForm += '<input type="hidden" name="id_user" value="'+id_user+'">';
	ReplyForm += '<input type="hidden" name="id_parent" value="' + IdComment + '">';
	ReplyForm += '<input type="file" class="file_name" name="file_name[]" data-num="' + IdComment + '" multiple/>';
	ReplyForm += '<input id="comment" name="comment" type="text" data-num="' + IdComment + '" placeholder="'+placeholder+'">';          
	ReplyForm += '<div class="smile-files">';         
	ReplyForm += '<a id="smilesBtn" class="smile smilesBtn" data-num="' + IdComment + '"><img src="./templates/images/smile.png" alt=""></a>';    
	ReplyForm += '<a href="#" class="files" data-num="' + IdComment + '" data-tooltip="Прикрепить изображение"><img src="./templates/images/files.png" alt=""></a>';  
	ReplyForm += "<div class='smilesChoose add' data-num='" + IdComment + "'></div>";             
	ReplyForm += '</div>';  
	ReplyForm += "<div class='files_block two' data-num='" + IdComment + "'></div>";      
	ReplyForm += '<input type="submit" id="send-reply" value="Ответить" class="send" data-item="' + IdComment + '">';       
	ReplyForm += '</form>';           
  	ReplyForm += '<div style="clear:both"></div>';
	ReplyForm += '</div>';            
                      
	$(ReplyForm).hide().insertAfter('#message-' + IdComment).slideDown();
          
});


      
function getCommentsPhoto(id) {
	$.post('./?task=ajax_action&action=getcomments', {            
		number    : 100,
		offset    : 0,
		commentable_type : 'photo',
		id : id              
	}, function(data) {
		//console.log(data);
		$('#photo_big').find('#addCommentContainers').html('');
		if(data.html != null) { 
			if(data.status==1){
				$('#photo_big').find('#addCommentContainers').append(data.html);  
				$('.message-text').each(function(){
			        $(this).emotions();
				})
				$('.message-reply-text').each(function(){
				    $(this).emotions();
				})	
			} 
		}
	},'json');    
} 