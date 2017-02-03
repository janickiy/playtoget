
var smile_string = ":-) :-( ;-) :-p :-* :-! :`( :-/ 8-) :ireful: :rofl: :banned: :nhl: :fan: :warning: :training: :aikido: :rotest:";
var smile_string_static = ":-) :-( ;-) :-p :-* 8-)";

function readFile(file,num,a) {
    var FR= new FileReader();
    FR.onload = function(e) {
      $('.files_block[data-num='+num+']').prepend('<div class="attach" data-num='+a+'><img src="'+e.target.result+'" alt="" ><div class="percent"><p>0%</p></div></div>');
    };       
    FR.readAsDataURL(file);
  }


$(document).ready(function () {

    var smiles = $(".smilesChoose");
    var inputEl = $("#comment");
    var smilesBtn = $("#smilesBtn");
    var messages = $("div.chat-messages");
    var static_smile = $('.static_smile');


    static_smile.html(smile_string_static);
    static_smile.emotions();
    static_smile.toggle();

    $('div.chat-message').emotions();
    
    $('.message-text').each(function(){
        $(this).emotions();
    })
    $('.message-reply-text').each(function(){
        $(this).emotions();
    })
    $('.href').each(function(){
        $(this).emotions();
    })
    $('.article').each(function(){
        $(this).emotions();
    })
	
	$(document).on( "click", ".smilesChoose span", function() {
        var num=$(this).parent('div').attr('data-num');
		var shortCode = $.emotions.shortcode($(this).attr("title"));
        $("#comment[data-num='"+num+"']").val($("#comment[data-num='"+num+"']").val() + " " + shortCode + " ");
        $("#message").val($("#message").val() + " " + shortCode + " ");

     //  $(".smilesChoose[data-num='"+num+"']").toggle();
        $("#comment[data-num='"+num+"']").focus();
        $("#message").focus();
	});	


var enter = 0;	
var setT;


	$(document).on( "mouseover", ".smilesBtn", function() {     
        if (enter==0)
        {
            var num=$(this).attr('data-num');
            $(".smilesChoose[data-num='"+num+"']").html(smile_string);
            $(".smilesChoose[data-num='"+num+"']").emotions();
            $(".smilesChoose[data-num='"+num+"']").fadeIn();
            enter = 1;
        }
        

	});	

    $(document).on( "mouseleave", ".smilesBtn", function() {    
        var num=$(this).attr('data-num');
        setT = setTimeout(function(){
            if (enter==1)
            {
                
                $(".smilesChoose[data-num='"+num+"']").html(smile_string);
                $(".smilesChoose[data-num='"+num+"']").emotions();
                $(".smilesChoose[data-num='"+num+"']").fadeOut();
                enter = 0;
            }
        },500);
    
    }); 

    $(document).on( "mouseover", ".smilesChoose", function() {     
        clearTimeout(setT);
    }); 
    $(document).on( "mouseleave", ".smilesChoose", function() { 
        var num=$(this).attr('data-num');
        setT = setTimeout(function(){
            if (enter==1)
            {
                
                $(".smilesChoose[data-num='"+num+"']").html(smile_string);
                $(".smilesChoose[data-num='"+num+"']").emotions();
                $(".smilesChoose[data-num='"+num+"']").fadeOut();
                enter = 0;
            }
        },500);
    })


    $("#sendBtn").click(function () {
        processMessage();
    });


    $(document).on( "click", ".files", function() {
            var num = $(this).attr('data-num');
            $('.file_name[data-num='+num+']').click();
            return false;
        })

        $(document).on('change','.file_name',function(){
            var num = $(this).attr('data-num');
            var input = $(this).closest('form').find('textarea');
            if (input.length==0)
            {
                input = $(this).closest('form').find('#comment')
            }
            mess = input.val();
            var then = $(this).closest('form');
            var form = then[0];
            var files = $(this)[0].files
            var base64 = '';
            var id_album;
            var error = true;
            if (files.length>5)
            {
                form.reset();
                input.val(mess);
                $('.save_window_fail').html('Максимальное количество файлов 5').removeClass('hiden');
                setTimeout(function(){$('.save_window_fail').addClass('hiden');},2000);
                return false;
            }
            else
            {
                if (files.length>0)
                {
                    

                    $('.files_block[data-num='+num+']').html('<div style="clear:both"></div>');
                    for(var a=0; a<files.length; a++)
                    {
                        //console.log(this.files);
                        //$('.files_block[data-num='+num+']').append('<p><img src="./templates/images/files.png" alt=""> '+this.files[a].name+' ('+this.files[a].size/1000+'kb)</p>');
                        
                        var rFilter = /^(image\/jpeg|image\/png)$/i;
                        if (rFilter.test(files[a].type)) {
                            error = false;
                            readFile(files[a],num,a);
                            var window_h = $(window).height();
                            var mess_h = window_h-410;
                            $('.mess_list').css('height',mess_h);
                            //readFile(files[a],num);
                                    var formData = new FormData();
                                    formData.append('photoalbumable_type', 'user_attach');
                                    formData.append('file',files[a]);
                                    formData.append('num',a);

                                    $.ajax({
                                      url: '/?task=ajax_action&action=add_photo_ajax_attach',
                                      type: 'POST',
                                      contentType: false,
                                      processData: false,
                                      data: formData,
                                      dataType: 'json',
                                      xhr: function(){
                                        var xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
                                        xhr.upload.addEventListener('progress', function(evt){ // добавляем обработчик события progress (onprogress)
                                          if(evt.lengthComputable) { // если известно количество байт
                                            // высчитываем процент загруженного
                                            var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
                                            $('.attach').find('p').html(percentComplete + '%');
                                            // устанавливаем значение в атрибут value тега <progress>
                                            // и это же значение альтернативным текстом для браузеров, не поддерживающих <progress>
                                            console.log('Загружено ' + percentComplete + '%');
                                          }
                                        }, false);
                                        return xhr;
                                      },
                                      success: function(json){
                                        if(json){
                                            console.log(json)
                                            $('.attach[data-num='+json.num+']').attr('data-id',json.message.id).find('.percent').remove();

                                        }
                                      }
                                    });
                               
                        }
                        else
                        {
                            form.reset();
                            input.val(mess);
                            $('.save_window_fail').html('Неверный формат файла').removeClass('hiden');
                            setTimeout(function(){$('.save_window_fail').addClass('hiden');},2000);
                        }
                        
                        
                    }
                    if (!error)
                    $('.files_block[data-num='+num+']').prepend('<p><a href="#" class="removeAttach">Удалить прикрепленные файлы</a></p>')
                }
            }
            //console.log(files.length);
        })



        $(document).on('click','.removeAttach',function(){
            var input = $(this).closest('form').find('textarea');
            if (input.length==0)
            {
                input = $(this).closest('form').find('#comment')
            }
            mess = input.val();
            var then = $(this).closest('form');
            var form = then[0];
            form.reset();
            input.val(mess);
            $(this).closest('.files_block').html('');
                            var window_h = $(window).height();
                            var mess_h = window_h-310;
                            $('.mess_list').css('height',mess_h);
            return false;
        })


        $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $('.smilesChoose'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) {                    
                        div.hide();
                    
        }
        });


        document.onkeyup = function (e) {
            if ($('#message').is( ":focus" ))
            {
                e = e || window.event;
                if (e.keyCode === 13) {
                    $('#addMessageForm').submit();
                }
            }
        }
    

});