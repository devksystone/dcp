<?php

require("mail/PHPMailer.php");

require("mail/SMTP.php");



$errorMessage = "";

$name = "";
$company ="";
$phone="";
$email = "";

$message = "";



//Validaciones de datos de entrada

if(empty($_POST['name'])){
  $errorMessage .= "\n Ingrese un nombre. ";
}
else{
  $name = htmlspecialchars($_POST['name']);
}
if(empty($_POST['phone'])){
  $errorMessage .= "\n Ingrese un número de teléfono. ";
}
else{
  $name = htmlspecialchars($_POST['name']);
}
if(empty($_POST['email'])){

    $errorMessage .= "\n Ingrese una dirección de correo electrónico. ";

  }

  else{

    $email = htmlspecialchars($_POST['email']);

  }

  if(empty($_POST['message'])){

    $errorMessage .= "\n Ingrese sus especificaciones o comentarios. ";

  }

  else{

    $message = htmlspecialchars($_POST['message']);

  }



  $email_vars = array(

    'Name' => $name,

    'Email' => $email,

    'Message' => $message,
    'Phone' => $phone,
    'Company' => $company

  );





if($errorMessage!= "")

{

    echo $errorMessage;

}

else{

    $body = file_get_contents('mailtemplate.html');



    if(isset($email_vars)){

        foreach($email_vars as $k=>$v){

            $body = str_replace('{'.strtoupper($k).'}', $v, $body);

        }

    }







 $mail = new PHPMailer\PHPMailer\PHPMailer();

 $mail->IsSMTP(); // enable SMTP

 $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only

 $mail->SMTPAuth = true; // authentication enabled

 $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED 

 $mail->SMTPAutoTLS = false;

 $mail->SMTPSecure = false;

 $mail->Host = ;//mail.example.com;

 $mail->Port = 25; // or 587

 $mail->IsHTML(true);

 $mail->Username = ;// The email username e. g.: "contacto@dcp.com";

 $mail->Password = ;//The email pasword between "";

 $mail->SetFrom(""); // The email address e. g.: "contacto@dcp.com";

 $mail->Subject = "Contacto desde sitio web"; //Here can set the Subject of the mail



 $mail->AddAddress("");// The email address e. g.: "contacto@dcp.com";



 $mail->Body = $body;

 if (isset($_FILES['uploaded_file']) &&
    $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK) {
    $mail->AddAttachment($_FILES['uploaded_file']['tmp_name'],
                         $_FILES['uploaded_file']['name']);
}


 if(!$mail->Send()) {

 echo "Mailer Error: " . $mail->ErrorInfo;

 } else {

 echo "success";

 }

}

  

?>