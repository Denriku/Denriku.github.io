function valid(form)
{
	var fail = false;
	var name = form.name.value;
	var email = form.email.value;
	var password1 = form.password1.value;
	var password2 = form.password2.value;

	var adr_pattern=/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;

	if (name =="" || name ==" ")
		{
		fail = "вы не ввели свое имя";
}
		else if (adr_pattern.test(email) == false)
			fail = "Вы ввели неверный адрес электронной почты";
				else if (password1 =="" || password1 ==" ")
			fail = "вы не ввели пароль";
			else if (password2 =="" || password2 ==" ")
			fail = "вы не ввели подтверждение пароля";
			else if (password1 != password2)
			fail = "пароли не совпадают";
			
	if (fail)
		{
		alert(fail);
		return false;
		}
	else
		return true;
}