<?php 

extract($_POST);



require_once 'mailer/class.phpmailer.php';



$mail = new PHPMailer;



$mail->From = $email;

$mail->FromName = $name;

echo $mailto;
if(isset($mailto)) {
    $contactname = 'Contacto '.$mailto;
    $mail->AddAddress($mailto, $contactname);  // Add a recipient
}else {
    $mail->AddAddress('qvdz.grafica@gmail.com', 'Manuel Suarez');  // Add a recipient
}
echo 'wordwrap';
$mail->WordWrap = 50;                                 // Set word wrap to 50 characters

$mail->IsHTML(true);                                  // Set email format to HTML






// Aqui definimos el asunto y armamos el cuerpo del mensaje
echo 'asunto';
$asunto = utf8_decode($subject);
echo 'nombre';
$cuerpo = "Nombre: ".$name."<br>";
echo 'email';
$cuerpo .= "Email: ".$email."<br>";
echo 'business';
if(isset($business)) {
    $cuerpo .= utf8_decode("Empresa: ".$business."<br/>");
}
echo 'code';
if(isset($code)) {
   $cuerpo .= utf8_decode("Codigo Maquinaria: ".$code."<br/>");
}
echo 'rut';
if(isset($rut)) {
    $cuerpo .= utf8_decode("Rut Empresa: ".$rut."<br/>");
}
echo 'cuerpo';
$cuerpo .= utf8_decode("Mensaje: ".$message);

$mail->Subject = $asunto;

$mail->Body    = $cuerpo;

$mail->AltBody = $cuerpo;

 

// Esta es una pequena validación, que solo envie el correo si todas las variables tiene algo de contenido:
echo 'sent ' . $name. 'mail' . $email .'subject' . $subject . 'message' . $message;
if($name != '' && $email != '' && $subject != '' && $message != ''){
    echo 'before-sent';
    if(!$mail->Send()) {

	   echo 'Message could not be sent.';

	   echo 'Mailer Error: ' . $mail->ErrorInfo;

	   exit;

	}

	echo "mensaje enviado";

}



?>