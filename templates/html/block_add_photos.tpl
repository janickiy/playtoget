<center><h2>${TITLE_PAGE}</h2></center>
<!-- IF '${MSG}' != '' -->
<div class="mutations-both">
  <p>${MSG}</p>
  <a class="delete">x</a> </div>
<!-- END IF -->
<div id="filelist">Your browser doesn't have Flash, Silverlight or HTML5 support.</div>
<br />
<div class='job_form'>
<form class="form-horizontal">
    <div class="form-group">
    	<label class="col-lg-3 control-label" for="id_photoalbum">Выберите альбом:</label>
            <div class="col-lg-7">
                <div class="styled-select styled-select-4">
				<!-- IF '${SHOW_CATEGORY_LIST}' == 'show' -->
				<select name="id_photoalbum">
				  <!-- BEGIN row_option_album -->
				  <option value="${ID}">${NAME}</option>
				  <!-- END row_option_album -->
				</select>
				<!-- END IF -->
				</div>
			</div>
	</div>
	<div class="form-group">
		<div id="container center_text" class='marginTop20'> 
			<a id="pickfiles" href="javascript:;" class='save-button'>Добавить файлы</a> 
			<a id="uploadfiles" href="javascript:;" class='save-button'>Загрузить файлы</a> 
		</div>
	</div>
</form>
</div>
<script>selectAction();</script>
<br/>
<!--
Ошибки при загрузке:
		  
 <pre id="console"></pre>
 -->
<script type="text/javascript" src="./templates/js/puupload/plupload.full.min.js"></script>
<script type="text/javascript">     

var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'pickfiles', // you can pass an id...
	container: document.getElementById('container'), // ... or DOM Element itself
	url : '/?task=ajax_action&action=add_photo_ajax',
	flash_swf_url : '/templates/js/puupload/Moxie.swf',
	silverlight_xap_url : '/templates/js/puupload/Moxie.xap',
	
	filters : {
		max_file_size : '10mb',
		mime_types: [
			{title : "Image files", extensions : "jpg,gif,png,jpeg"},
			{title : "Zip files", extensions : "zip"}
		]
	},
	multipart_params : {
		categorie           : $('select[name=id_photoalbum]').val(),
		photoalbumable_type : '${PHOTOALBUMABLE_TYPE}',
		description			: ''

	},
	init: {
		PostInit: function() {
			document.getElementById('filelist').innerHTML = '';

			document.getElementById('uploadfiles').onclick = function() {
				uploader.start();
				return false;
			};
		},
		BeforeUpload: function(up, file)
		{
			var text = $('#'+file.id).find('textarea').val();
			uploader.settings.multipart_params.description = text;

		},
		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				/*document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';*/
				var FR= new FileReader();
				var r = getRandomInt(1,99999);
			    FR.onload = function(e) {
			      document.getElementById('filelist').innerHTML += '<div id="' + file.id + '" ><div class="attach big"><img src="'+e.target.result+'" alt="" ><b></b><span class="icons-hid"><i class="no_attach" data-tooltip="Не добавлять" data-num = '+file.id+'><img src="./templates/images/icon-krest.png" alt=""></i></span></div><textarea class="form-control comment_attach input_hastags" placeholder="Комментарий к фото" data-num='+r+'></textarea><div class="hashtags" data-num='+r+'></div></div><div style="clear:both"></div>';
			    };       
			    FR.readAsDataURL(file.getNative());
			});
		},
		removeFile: function(up,file){
			$('div[id='+file.id+']').remove();
		},
		UploadProgress: function(up, file) {
			if (document.getElementById(file.id))
			{
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				
			}
			
		},

		Error: function(up, err) {
			document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
		}
	}
});

uploader.init();
uploader.bind('UploadComplete', function(up, files) {
	window.location = '${REDIRECT_PHOTO_ALBUM}&id_album=' + $('select[name=id_photoalbum]').val();
	});

$(document).on('click','.no_attach',function(){
	var num = $(this).attr('data-num');
	$('div[id='+num+']').remove();
	uploader.removeFile(num);
})

</script>