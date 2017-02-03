/*dialogues*/
$(document).ready(function(){

	var working = false;
	
	$('#addMessageForm').submit(function(e){

 		e.preventDefault();
		if(working) return false;
		
		working = true;
		$('span.error').remove();		
		
		$.post('./?task=ajax_action&action=addmessage', $(this).serialize(), function(data){

			working = false;
			$('#submit').val('Submit');
			
			if(data.status){				
				
				var Message='<div id="message-' + data.id + '" class="message">';				
				Message += '<img src="' + data.avatar + '" alt="" class="img-account">';				
				Message += '<h5 class="name"><a href="./?task=profile&id_user=' + data.id_sender + '">' + data.firstname + ' '+ data.lastname + '</a></h5>';				
				Message +='<p class="data">' + data.created + '</p>';				
				Message +='<p class="message-text">' + data.content + '</p>';			
				Message +='</div>';					
			
				$(Message).hide().insertAfter('#addMessageContainer').slideDown();
				$('#message').val('');
			}
			else {
				$.each(data.errors,function(k,v){
					$('label[for='+k+']').append('<span class="error">'+v+'</span>');
				});
			}
		},'json');
	});	
	
});		

(function($) {

	$.fn.scrollPagination = function(options) {
		
		var settings = { 
			nop     : 10,
			offset  : 10,
			error   : '${STR_THERE_ARE_NO_MORE_ENTRIES}',
			delay   : 500,
			scroll  : true 
		}
		
		if(options) {
			$.extend(settings, options);
		}
		
		return this.each(function() {		
			
			$this = $(this);
			$settings = settings;
			var offset = $settings.offset;
			var busy = false;
			
			if($settings.scroll == true) $initmessage = '';
			else $initmessage = '${STR_CLICK}';
			
			$this.append('<div class="commnet-list"></div><div class="loading-bar">' + $initmessage + '</div>');
			
			function getData() {
			
				$.post('./?task=ajax_action&action=getmessages', {						
				    number		: $settings.nop,
				    offset		: offset,
					id_sender : ${ID_SENDER},
					id_receiver : ${SEL},
					    
				}, function(data) {

					if(data == null) { 

						$this.find('.loading-bar').html($settings.error);
					}
					else {
					    offset = offset+$settings.nop; 
						
						$this.find('.loading-bar').html($initmessage);
							
						if(data != null && data.item != null){
								
							for(var i=0; i < data.item.length; i++) {
								if(data.item[i].id_sender == '${ID_SENDER}'){
									var Message = '<div id="message-' + data.item[i].id + '" class="message">';
									Message += '<img src="' + data.item[i].avatar + '" alt="" class="img-account">';
									Message += '<h5 class="name"><a href="./?task=profile&id_user=' + data.item[i].id_sender + '">' + data.item[i].firstname + ' ' + data.item[i].lastname + '</a></h5>';
									Message += '<p class="data">' + data.item[i].created + '</p>';
									Message += '<p class="message-text">' + data.item[i].content + '</p>';
									Message += '</div>';	
								}
								else{
									var Message = '<div class="message-reply" id="message-' + data.item[i].id + '">';
									Message += '<div class="message ">';
									Message += '<div class="message-account">';
									Message += '<img src="' + data.item[i].avatar + '" alt="" class="img-account">';
									Message += '<h5 class="name"><a href="./?task=profile&id_user=' + data.item[i].id_sender + '">' + data.item[i].firstname + ' ' + data.item[i].lastname + '</a></h5>';
									Message += '<p class="data">' + data.item[i].created + '</p>';
									Message += '</div>';
									Message += '<p class="message-reply-text">' + data.item[i].content + '</p>';
									Message += '</div>';
									Message += '</div>';
								}			

								$('#message-list').append(Message);								
							}
							busy = false;
						}	
					}
					
				},'json');		
			}	
			
			getData();		
			
			if($settings.scroll == true) {
				$(window).scroll(function() {
					if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
						busy = true;
						
						$this.append('<div class="loading-bar"><img border="0" src="./templates/images/select2-spinner.gif"></div>');
						
						setTimeout(function() {
							getData();
						}, $settings.delay);							
					}	
				});
			}
			
			$this.find('.loading-bar').click(function() {
			
				if(busy == false) {
					busy = true;
					getData();
				}			
			});
			
		});
	}

})(jQuery);

$(document).ready(function() {

	$('#message-list').scrollPagination({
		nop     : 10, 
		offset  : 10, 
		error   : '${STR_THERE_ARE_NO_MORE_ENTRIES}', 
		delay   : 500, 
		scroll  : true 		
	});
	
});
/**/
try{Typekit.load();}catch(e){}