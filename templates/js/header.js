var socket = io.connect('http://playtoget.com:3000');
		var time = setTimeout(function(){$('.typing').removeClass('show')},1000);
		

		socket.on('typing', function(msg){
			if (msg.id_receiver==user){
				$('.typing').addClass('show');
				clearTimeout(time);
				time = setTimeout(function(){$('.typing').removeClass('show')},1000);
				$('.mess_list').animate({ scrollTop: 1000000 }, 1100); 
			}
		})


	   socket.on('message', function(msg){
	   	console.log(msg)
		if (msg.id_receiver==user){

			$.ajax({
				type:'POST',
				url:'./?task=ajax_action&action=get_last_message',
				data:{
					id_receiver:msg.id_sender,
				},
				success:function(data){
					console.log(data);
					var audio = new Audio();
					audio.preload = 'auto';
					audio.src = './templates/audio/message.mp3';
					audio.play();
					
					var Message = '<div class="message-reply" id="message-' + data.item[0].id_message + '">';
					Message += '<div class="message ">';
					Message += '<div class="message-account">';
					Message += '<img src="' + data.item[0].avatar + '" alt="" class="img-account">';
					Message += '<h5 class="name"><a href="./?task=profile&id_user=' + data.item[0].id_sender + '">' + data.item[0].firstname + ' ' + data.item[0].lastname + '</a></h5>';
					Message += '<p class="data">' + data.item[0].created + '</p>';
					Message += '</div>';
					Message += '<p class="message-reply-text">' + data.item[0].content + '<br>';
					Message += data.item[0].image+'</p>'; 
					Message += '</div>';
					Message += '</div>';
					
					var fact = $("div").is("#message-list[data-num='"+data.item[0].id_sender+"']");
					console.log(fact)
					if (fact){
						$('#message-list').append(Message);
						$('#message_count').fadeOut();
                      	$('.mess_list').find('.no_message').remove();   
						$('.mess_list').animate({ scrollTop: 1000000 }, 1100); 
						$('.message-text').each(function(){
							$(this).emotions();
						})
						
						$('.message-reply-text').each(function(){
							$(this).emotions();
						})
					}
					else{
						var dialog = $('div').is('#old_dialogue');
						var dialog_con = $('div').is('.dialogues[data-num='+data.item[0].id_sender+']')
						
						if (dialog){

							$('#old_dialogue').find('.no_dialogues').remove();
							if (!dialog_con){
								var dialogues = '<div class="row dialogues " data-num=' + data.item[0].id_sender + '>';
								dialogues += '<div class="col-md-4">';
								dialogues += '<a href="./?task=profile&id_user=' + data.item[0].id_sender + '">';
            					dialogues += '<img src="' + data.item[0].avatar + '" width="50" alt="" class="img-account" style="float: left;">'
              					dialogues += '<div class="fromwho">' + data.item[0].firstname + '<br>' + data.item[0].lastname + '<br>';
              					dialogues += '<span>' + data.item[0].created + '</span></div>';
              					dialogues += '</a></div>';
              					dialogues += '<div class="col-md-8 ">';
              					dialogues += '<a href="./?task=profile&id_user=' + data.item[0].id_sender + '&q=messages&sel=' + data.item[0].id_sender + '" >';
              					dialogues += '<img src="' + data.item[0].avatar + '" alt="" class="img-mess-dialog">';
              					dialogues += '<span class="ahref status_red ">' + data.item[0].content + '</span>';
              					dialogues += '</a></div></div>';
              					$('.container_dialog').prepend(dialogues);

								$('.href').each(function(){
									$(this).emotions();
								})
							}
							else{
								$('.dialogues[data-num='+data.item[0].id_sender+']').find('.ahref').html(data.item[0].content);
							}
						}
						else{
							var count = parseInt($('#message_count').html())+1;
							$('#message_count').html(count).fadeIn();
									
							var message = '<img src="' + data.item[0].avatar + '" width="50" alt="" class="img-account" style="float: left;">';
							message += '<div class="fromwho">' + data.item[0].firstname + '<br>' + data.item[0].lastname + '<br>';
              				message += '<span>' + data.item[0].created + '</span></div>';
              				message += '<p>' + data.item[0].content + '</p>';
							$('.window-message').html(message);
							$('.window-message').fadeIn();
							setTimeout(function(){$('.window-message').fadeOut();},2000)
						}
					}
           		}
            })
		}
		});


$(document).ready(function(){

	$('#message').keypress(function(){
		var id_sender = $('[name=id_sender]').val();
		var id_receiver = $('[name=id_receiver]').val();
		socket.emit('typing', {id_sender:id_sender,id_receiver:id_receiver});
	})


	function getresult(url) {
		$.ajax({
			url: url,
			type: "GET",
			data:  {rowcount:$("#rowcount").val()},
			beforeSend: function(){
			$('#loader-icon').show();
			},
			complete: function(){
			$('#loader-icon').hide();
			},
			success: function(data){
			$("#faq-result").append(data);
			},
			error: function(){} 	        
	   });
	}
	
	$(window).scroll(function(){
		if ($(window).scrollTop() == $(document).height() - $(window).height()){
			if($(".pagenum:last").val() <= $(".total-page").val()) {
				var pagenum = parseInt($(".pagenum:last").val()) + 1;
				getresult('./?task=ajax_action&action=getpopphotos&page='+pagenum);
			}
		}
	}); 

	$(document).on('keyup','#main_search',function(){
		var text = $(this).val();
		if (text!='')
		{
			$(this).addClass('white');
		}
		else
		{
			$(this).removeClass('white');
		}
	})
});