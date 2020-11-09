<?php
function br2nl($buff = '') {
        $buff = preg_replace('#<br[/\s]*>#si', "\n\r", $buff);
        $buff = trim($buff);

        return $buff;
    }
$api_dev_key 			= 'e3d782c53f9ecab3c993abd849b5805e'; // your api_developer_key
$api_paste_code 		= br2nl($_POST["text"]);
$api_paste_private 		= '1'; // 0=public 1=unlisted 2=private
$api_paste_name			= 'Perine Baze - pejst iz '.date("d.m.Y G:i"); // name or title of your paste
$api_paste_expire_date  = 'N';
$api_paste_format 		= 'sql';
$api_user_key 			= ''; // if an invalid api_user_key or no key is used, the paste will be create as a guest
$api_paste_name			= urlencode($api_paste_name);
$api_paste_code			= urlencode($api_paste_code);


$url 				= 'http://pastebin.com/api/api_post.php';
$ch 				= curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'api_option=paste&api_user_key='.$api_user_key.'&api_paste_private='.$api_paste_private.'&api_paste_name='.$api_paste_name.'&api_paste_expire_date='.$api_paste_expire_date.'&api_paste_format='.$api_paste_format.'&api_dev_key='.$api_dev_key.'&api_paste_code='.$api_paste_code.'');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_NOBODY, 0);

$response  			= curl_exec($ch);
if ($response[0]=='h')
echo "<script>window.location.assign('".$response."');</script>";
else  echo $response;

?>