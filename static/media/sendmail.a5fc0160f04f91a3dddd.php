<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  require '/src/phpmailer/src/PHPMailer.php';
  require '/src/phpmailer/src/SMTP.php';
  require '/src/phpmailer/src/Exception.php';
  require 'class.phpmailer.php';
  require 'class.smtp.php';
  require 'PHPMailerAutoload.php';
  require 'vendor/autoload.php';
  require './phpmailer/src/Exception.php';

  $mail = new PHPMailer(true);
  $mail -> CharSet = 'UTF-8';
  $mail -> setLanguage('ru', './phpmailer/language/phpmailer.lang-ru.php');
  $mail -> isHTML(true);

  // От кого письмо
  $mail -> setFrom('info@info.ru', 'Привет!');
  // Кому отправляем
  $mail -> addAddress('leprokuda@yandex.ru');
  // Тема письма
  $mail -> Subject = 'Заявка с формы';

  // Простейшая проверка
  if (trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }
  if (trim(!empty($_POST['date']))) {
    $body.='<p><strong>Дата рождения:</strong> '.$_POST['date'].'</p>';
  }
  if (trim(!empty($_POST['email']))) {
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }
  if (trim(!empty($_POST['phone']))) {
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
  }
  if (trim(!empty($_POST['message']))) {
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
  }

  // Отправка сообщения
  if (!$mail -> send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }
  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>