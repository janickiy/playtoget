<!-- IF '${OPEN_PAGE}' == '' -->
<!-- INCLUDE header.tpl -->
<!--START CONTENT-->
<script>
	var avatar = '${TOP_AVATAR}',
	id_user = '${ID_USER}',
	placeholder = '${STR_YOUR_COMMENT}',
	error = '${STR_THERE_ARE_NO_MORE_ENTRIES}',
	init = '${STR_CLICK}';
</script>
<!-- ELSE -->
<!-- INCLUDE unauthorizedheader.tpl -->
<!-- END IF -->
<script type="text/javascript" src="./templates/js/script_all.js"></script>
<!-- INCLUDE block_videowindow.tpl -->
<!-- INCLUDE block_photowindow.tpl -->
<section class="wrapper">
	<div class="container">
		<div class="row">
			<div class="col-xs-12  bg">
				<!-- INCLUDE left_sitebar.tpl -->

				<div class="content">
					<!-- INCLUDE top_user_profile.tpl -->
					
					<div class="photo-caption">
						<h3>${TITLE_PAGE}<!-- IF '${NUMBERNEWS}' != '0' --><sup> +${NUMBERNEWS}</sup><!-- END IF --></h3>
					</div>
					
					<!-- IF '${MSG}' != '' -->
					<div class="mutations-both">
						<p>${MSG}</p>
						<a class="delete">x</a>
					</div>
					<!-- END IF -->	

					<!-- IF '${MSG_ERROR}' != '' -->
					<div class="alert alert-error">
					<button class="close" data-dismiss="alert">×</button>
					<strong>${STR_ERROR}:</strong>
					${MSG_ERROR}
					</div>
					<!-- END IF -->					
					
					<!-- IF '${MSG_ALERT}' != '' -->
					<div class="alert alert-success">
					<button class="close" data-dismiss="alert">×</button>
					${MSG_ALERT}</div>
					<!-- END IF -->
					<div id='comment-list'>
					<!-- BEGIN row_news -->
					<div class="news-block-item" data-toggle="modal" data-target="#second-post">
						<div class="news-block-head">
						<!-- IF '${PUBLICATION_TYPE}'=='user' --> 
							<a href="./?task=profile&id_user=${PUBLICATION_AUTHOR_ID}">
								<div class="head-img"><img src="${PUBLICATION_AVATAR}" alt=""></div>
							</a>
							<a href="./?task=profile&id_user=${PUBLICATION_AUTHOR_ID}">
								<p class="head-topic">${PUBLICATION_NAME}
									<span class='status_user<!-- IF '${STATUS_USER}' == 'online' --> online<!-- END IF -->' data-num='${PUBLICATION_AUTHOR_ID}'></span>
								</p>
							</a>
						<!-- ELSE -->
							<!-- IF '${PUBLICATION_TYPE}'=='event' -->
							<a href="./?task=${PUBLICATION_TYPE}s&id_event=${PUBLICATION_AUTHOR_ID}">
								<div class="head-img"><img src="${PUBLICATION_AVATAR}" alt=""></div>
							</a>
							<a href="./?task=${PUBLICATION_TYPE}s&id_event=${PUBLICATION_AUTHOR_ID}">
								<p class="head-topic">${PUBLICATION_NAME}</p>
							</a>
							<!-- ELSE -->
							<a href="./?task=${PUBLICATION_TYPE}s&id_community=${PUBLICATION_AUTHOR_ID}">
								<div class="head-img"><img src="${PUBLICATION_AVATAR}" alt=""></div>
							</a>
							<a href="./?task=${PUBLICATION_TYPE}s&id_community=${PUBLICATION_AUTHOR_ID}">
								<p class="head-topic">${PUBLICATION_NAME}</p>
							</a>
							<!-- END IF -->
						<!-- END IF -->

							<p class="data">${PUBLICATION_DATE}</p>
							<div class="clearfix"></div>
						</div>
						<div class="news-block-content">
							<div class="article nov">
								${PUBLICATION_MSG}
								<!-- IF '${HASHTAG}' != '' --><a href="" class="HASHTAG"></a><!-- END IF -->
							</div>
							<!--<a id="reply-${ID}" class="reply" data-item="${ID}"> ${STR_REPLY}</a>-->
        					<!-- IF '${LIKEABLE_TYPE}' != '' -->
        					<a class="tell" data-item="${ID}" data-type='${LIKEABLE_TYPE}'>${NUMBERTELL}</a>
						    <a class="liked" data-item="${ID}" data-type='${LIKEABLE_TYPE}'>${NUMBERLIKED}</a><!-- END IF -->
						</div>
					</div>
					
					<!-- END row_news -->
					</div>
					<!--End content-->
				</div>

				<!-- INCLUDE right_sitebar.tpl -->

			</div>
		</div>
	</div>
</section>
<script>
$(document).ready(function(){
	var evJob = true;
	var settNews = { 
		number  : 5,
		offset  : 5,
	}

	$(document).scroll(function() {
  
		if($(window).scrollTop()+$(window).height()>=$(document).height()){
			if (evJob){
				evJob = false;
				$('#comment-list').append('<div class="loading-bar"><img border="0" src="./templates/images/select2-spinner.gif" width=20px></div>')
				$.ajax({
					type:'POST',
					url:'/?task=ajax_action&action=get_usernews_list',
					data:{
						number : settNews.number,
						offset : settNews.offset,
						commentable_type : 'user',
						id : '${ID_USER}'
					},
					success:function(data){
						console.log(data);
							$('#comment-list').find('.loading-bar').remove();
							$('#comment-list').append(data.html);
					          $('.mess_news').each(function(){
					              $(this).emotions();
					          })
							settNews.offset+=settNews.number;
							evJob = true;
					}
				})
			}
		}
	});
})
</script>
<!--END CONTENT-->
<!-- INCLUDE footer.tpl -->
