<?php

defined('PLAYTOGET') || exit('Playtoget: access denied!');

class Model_settings extends Model
{
	public function changeUserSettings($fields, $id_user)
	{
		$arr_user = array();
		$arr_user['contact_email'] = $fields['contact_email'];		
		$arr_user['skype'] = $fields['skype'];		
		$arr_user['website'] = $fields['website'];		
		$arr_user['phone'] = $fields['phone'];
		
		$result = TRUE;
		
		core::database()->querySQL('SET AUTOCOMMIT=0');
		core::database()->querySQL('START TRANSACTION');
		
		if(!core::database()->update($arr_user, core::database()->getTableName('users'), "id=" . $id_user)) {
			$result = FALSE;
			core::database()->querySQL('ROLLBACK');
		}		
		
		$query = "SELECT * FROM " . core::database()->getTableName('usersettings') . " WHERE id_user=" . $id_user;
		$result = core::database()->querySQL($query);		
		
		if(core::database()->getRecordCount($result) == 0){
			$arr_usersettings = array();
			$arr_usersettings['id'] = 0;
			$arr_usersettings['permission_send_message'] = $fields['permission_send_message'];			
			$arr_usersettings['permission_view_profile'] = $fields['permission_view_profile'];			
			$arr_usersettings['permission_view_friends'] = $fields['permission_view_friends'];			
			$arr_usersettings['permission_view_photo'] = $fields['permission_view_photo']; 					
			$arr_usersettings['permission_view_video'] = $fields['permission_view_video'];			
			$arr_usersettings['permission_view_wall'] = $fields['permission_view_wall'];			
			$arr_usersettings['permission_comment_photo'] = $fields['permission_comment_photo'];			
			$arr_usersettings['permission_comment_video'] = $fields['permission_comment_video'];			
			$arr_usersettings['permission_comment_wall'] = $fields['permission_comment_wall'];
			$arr_usersettings['notification_friends_request'] = $fields['notification_friends_request'];
			$arr_usersettings['notification_private_messages'] = $fields['notification_private_messages'];
			$arr_usersettings['notification_wall_comments'] = $fields['notification_wall_comments'];
			$arr_usersettings['notification_picture_comments'] = $fields['notification_picture_comments'];
			$arr_usersettings['notification_video_comments'] = $fields['notification_video_comments'];
			$arr_usersettings['notification_events'] = $fields['notification_events'];
			$arr_usersettings['notification_birthdays'] = $fields['notification_birthdays'];
			$arr_usersettings['notification_answers_in_comments'] = $fields['notification_answers_in_comments'];			
			$arr_usersettings['id_user'] = $id_user;
			
			if(!core::database()->insert($arr_usersettings, core::database()->getTableName('usersettings'))) {
				$result = FALSE;
				core::database()->querySQL('ROLLBACK');
			}			
		}
		else{
			$arr_usersettings = array();
			$arr_usersettings['permission_send_message'] = $fields['permission_send_message'];			
			$arr_usersettings['permission_view_profile'] = $fields['permission_view_profile'];			
			$arr_usersettings['permission_view_friends'] = $fields['permission_view_friends'];			
			$arr_usersettings['permission_view_photo'] = $fields['permission_view_photo']; 					
			$arr_usersettings['permission_view_video'] = $fields['permission_view_video'];			
			$arr_usersettings['permission_view_wall'] = $fields['permission_view_wall'];			
			$arr_usersettings['permission_comment_photo'] = $fields['permission_comment_photo'];			
			$arr_usersettings['permission_comment_video'] = $fields['permission_comment_video'];			
			$arr_usersettings['permission_comment_wall'] = $fields['permission_comment_wall'];
			$arr_usersettings['notification_friends_request'] = $fields['notification_friends_request'];
			$arr_usersettings['notification_private_messages'] = $fields['notification_private_messages'];
			$arr_usersettings['notification_wall_comments'] = $fields['notification_wall_comments'];
			$arr_usersettings['notification_picture_comments'] = $fields['notification_picture_comments'];
			$arr_usersettings['notification_video_comments'] = $fields['notification_video_comments'];
			$arr_usersettings['notification_events'] = $fields['notification_events'];
			$arr_usersettings['notification_birthdays'] = $fields['notification_birthdays'];
			$arr_usersettings['notification_answers_in_comments'] = $fields['notification_answers_in_comments'];

			if(!core::database()->update($arr_usersettings, core::database()->getTableName('usersettings'), "id_user=" . $id_user)) {
				$result = FALSE;
				
			
				core::database()->querySQL('ROLLBACK');
			}
		}
	
		core::database()->querySQL('COMMIT');
		core::database()->querySQL('SET AUTOCOMMIT=1');
		
		return $result; 		
	}    
}