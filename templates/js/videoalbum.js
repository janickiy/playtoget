var count = 0;
var mass_video = [];
$(document).ready(function(){
    $('.remove_video').click(function() {
		var IdVideo = $(this).attr('data-item');
	   $.confirm({
        'title'   : 'Подтверждение',
        'message' : 'Вы действительно хотите удалить?',
        'buttons' : {
          'Да'  : {
            'class' : 'blue',
            'action': function(){
                      $.ajax({
                        url: "./?task=ajax_action&action=removevideo&id=" + IdVideo,
                        cache: false,
                        dataType: "json",
                        success: function(data){
                          var Result = data.result;
                            
                          if(Result == 'success'){
                            $('#video-block-' + IdVideo).remove();
                          }     
                        }
                      });
            }
          },
          'Нет' : {
            'class' : 'gray',
            'action': function(){}  
          }
        }
      });
    });	



$('.video_prev').each(function(){
  
  var id = $(this).attr('data-num');
  
  if (parseInt($.inArray(id, mass_video)) == -1)
  {
    mass_video.push(id);
    count++;
  }
})

//console.log(mass_video);
});



function getVideoInfo(id){
  $.ajax({
    type:'POST',
    url:'/?task=ajax_action&action=getvideoinfo',
    data:'id_video='+id,
    success:function(data){
      //console.log(data);
      if (data.status===1){
        $('#id_owner').val(data.id_owner);
        $('#name_video').html('<a href="./?task=profile&id_user='+data.id_owner+'">'+data.firstname+' '+data.lastname+'</a>');
        $('#date_video .data').html(data.created);
        $('#video_big').find('.tell').html(data.tell).attr('id','tell-video-' +id).attr('data-item',id).attr('data-type','video');
        $('#video_big').find('.liked').html(data.liked).attr('id','like-video-' +id).attr('data-item',id).attr('data-type','video');
        $('.info').html(data.description);
        $('.video_wrap').html(data.video);
        $('.loading-bar').hide();
        $('.photo_big_wrap').find('.video_wrap').show();
        getComments(id);
        var url;
        var str = delParams('photo');
        var str = delParams('video');

        var get = parseGetParams();
        if (get['none']=='none')
          url = '?video='+id;
        else
          url = '&video='+id;
            if(url != window.location){
                window.history.pushState(null, null, str+url);
            }

      }
    }
  })
}


$(document).on('click','.video_prev',function(){
  $('.loading-bar').show();
  $('#video_big').find('.video_wrap').hide();
  var num = $(this).attr('data-num');
  $('#video_big').find('#id_content').val(num);
  $('body,html').css('overflow','hidden');
  $('#video_big').show();
  $('#video_big').animate({ scrollTop: 0 }, 0);
  getVideoInfo(num);
})



$(document).on('click','#next_video',function(){
  $('.loading-bar').show();
  $('#video_big').find('.video_wrap').hide();
  var id = $('#id_content').val();
  var index_new = 0;
  var index = parseInt($.inArray(id, mass_video));
  if (index === count-1){
    index_new = 0;
  }
  else{
    index_new = index + 1;
  }
  $('#id_content').val(mass_video[index_new]);
  getVideoInfo(mass_video[index_new]);
})




$(document).on('click','#prev_video',function(){
  $('.loading-bar').show();
  $('#video_big').find('.video_wrap').hide();
  var id = $('#id_content').val();
  var index_new = 0;
  var index = parseInt($.inArray(id, mass_video));
  if (index === 0){
    index_new = count - 1;
  }
  else{
    index_new = index - 1;
  }
  $('#id_content').val(mass_video[index_new]);
  getVideoInfo(mass_video[index_new]);
})



$(document).on( "click", ".hide-pop-video-block", function() {
  $('#popular-videos').hide().fadeIn('2000');
  $('#button-hid').text('Скрыть');
  $("#button-hid").removeClass("hide-pop-video-block");
  $('#button-hid').addClass('show-pop-video-block');

});

$(document).on( "click", ".show-pop-video-block", function() {
  $('#popular-videos').show().fadeOut('2000');
  $('#button-hid').text('Показать');
  $("#button-hid").removeClass("show-pop-video-block");
  $('#button-hid').addClass('hide-pop-video-block');

});


$(document).on( "click", ".reply", function() {
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
  ReplyForm += '<input type="hidden" name="commentable_type" value="video">';
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
  ReplyForm += '<input type="submit" id="send-reply" class="send" value="Ответить" data-item="' + IdComment + '">';
  ReplyForm += '</form>';           
  ReplyForm += '</div>';            
                      
  $(ReplyForm).hide().insertAfter('#message-' + IdComment).slideDown();
          
});

function getComments(id) {
  $.post('./?task=ajax_action&action=getcomments', {            
    number    : 100,
    offset    : 0,
    commentable_type : 'video',
    id : id              
  }, function(data) {
    //console.log(data);
    $('#video_big').find('#addCommentContainers').html('');
    if(data.html != null) { 
              
      if(data.status==1){
        $('#video_big').find('#addCommentContainers').append(data.html);  
          
      } 
    }
  },'json');    
} 