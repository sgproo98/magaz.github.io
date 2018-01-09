<?php 
	// Принимаем постовые данные
	$phone=$_POST['phone'];
	$username=$_POST['name'];
	$email=$_POST['mail'];
	$user_message=$_POST['message'];

	// Тут указываем на какой ящик посылать письмо
	$to = "";
	// Далее идем тема и само сообщение
	// Тема письма
	$subject = "Заявка с меого первого сайта";
	// Сообщение письма
	$message = "
	Номер клиента: ".htmlspecialchars($phone)."<br>
	Имя пользователя ".htmlspecialchars($username)."<br>
	Почта: ".htmlspecialchars($email)."<br>
	Сообщение: ".htmlspecialchars($user_message);
	// Отправляем письмо при помощи функции mail();
	$headers = "From: freepsd.sl <putin@freepsd.sl\r\nContent-type: text/html; charset=UTF-8 \r\n";
	mail($to, $subject, $message, $headers);
	// Перенаправляем человека на страницу благодарности и завершаем скрипт

 ?>