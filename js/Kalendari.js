var dDate = new Date();
var dCurMonth = dDate.getMonth();
var dCurDayOfMonth = dDate.getDate();
var dCurYear = dDate.getFullYear();
var objPrevElement = new Object();
var bgcolor
var webgcolor
var wecolor
var nwecolor
var tbgcolor
var ntbgcolor
var sbgcolor

function fToggleColor(myElement) 
{
	var toggleColor = "#ff0000";
	if (myElement.id == "calDateText") 
		{
			if (myElement.color == toggleColor) 
				{
					myElement.color = "";
				} 
			else 
				{
					myElement.color = toggleColor;
				}
		} 
	else 
		if ((myElement.id == "calCell") || (myElement.id == "calTodayCell"))
			{
				for (var i in myElement.children) 
					{
						if (myElement.children[i].id == "calDateText") 
							{
								if (myElement.children[i].color == toggleColor) 
									{
										myElement.children[i].color = "";
									} 
								else 
									{
										myElement.children[i].color = toggleColor;
									}
							}
					}
			}
}

function fSetSelectedDay(myElement)
{
	if (myElement.id == "calCell") 
		{
			if (!isNaN(parseInt(myElement.children["calDateText"].innerText))) 
				{
					myElement.bgColor = sbgcolor;
					objPrevElement.bgColor = ntbgcolor;
					document.all.calSelectedDate.value = parseInt(myElement.children["calDateText"].innerText);
					objPrevElement = myElement;
				}
		}
}

function fGetDaysInMonth(iMonth, iYear) 
{
	var dPrevDate = new Date(iYear, iMonth, 0);
	return dPrevDate.getDate();
}

function fBuildCal(iYear, iMonth, iDayStyle) 
{
	var aMonth = new Array();
	aMonth[0] = new Array(7);
	aMonth[1] = new Array(7);
	aMonth[2] = new Array(7);
	aMonth[3] = new Array(7);
	aMonth[4] = new Array(7);
	aMonth[5] = new Array(7);
	aMonth[6] = new Array(7);
	var dCalDate = new Date(iYear, iMonth-1, 1);
	var iDayOfFirst = dCalDate.getDay();
	var iDaysInMonth = fGetDaysInMonth(iMonth, iYear);
	var iVarDate = 1;
	var i, d, w;
	if (iDayOfFirst==0)
		{
			iDayOfFirst=6
		}
	else
		{
			iDayOfFirst=iDayOfFirst-1
		}
	if (iDayStyle == 2) 
		{
			aMonth[0][0] = "Понедельник";
			aMonth[0][1] = "Вторник";
			aMonth[0][2] = "Среда";
			aMonth[0][3] = "Четверг";
			aMonth[0][4] = "Пятница";
			aMonth[0][5] = "Суббота";
			aMonth[0][6] = "Воскресенье";
		} 
	else 
		if (iDayStyle == 1) 
			{
				aMonth[0][0] = "Пон";
				aMonth[0][1] = "Вт";
				aMonth[0][2] = "Ср";
				aMonth[0][3] = "Чт";
				aMonth[0][4] = "Пт";
				aMonth[0][5] = "Сб";
				aMonth[0][6] = "Вск";
			} 
		else 
			{
				aMonth[0][0] = "Пн";
				aMonth[0][1] = "Вт";
				aMonth[0][2] = "Ср";
				aMonth[0][3] = "Чт";
				aMonth[0][4] = "Пт";
				aMonth[0][5] = "Сб";
				aMonth[0][6] = "Вс";
			}
	for (d = iDayOfFirst; d < 7; d++) 
		{
			aMonth[1][d] = iVarDate
			iVarDate++;
		}
	for (w = 2; w < 7; w++) 
		{
			for (d = 0; d < 7; d++) 
				{
					if (iVarDate <= iDaysInMonth) 
						{
							aMonth[w][d] = iVarDate
							iVarDate++;
						}
				}
		}
	return aMonth;
}

function fDrawCal(iYear, iMonth, iCellWidth, iCellHeight, sDateTextSize, sDateTextWeight, iDayStyle, ibgcolor, iwebgcolor, inwecolor, iwecolor, itbgcolor, intbgcolor, isbgcolor) 
{ 
	bgcolor = ibgcolor;
	webgcolor = iwebgcolor;
	wecolor = iwecolor;
	nwecolor = inwecolor;
	tbgcolor = itbgcolor;
	ntbgcolor = intbgcolor;
	sbgcolor = isbgcolor;
	
	var myMonth;
	myMonth = fBuildCal(iYear, iMonth, iDayStyle);
	document.write("<table border='0'>")
	document.write("<tr>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ bgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ nwecolor +"'>" + myMonth[0][0] + "</td>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ bgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ nwecolor +"'>" + myMonth[0][1] + "</td>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ bgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ nwecolor +"'>" + myMonth[0][2] + "</td>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ bgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ nwecolor +"'>" + myMonth[0][3] + "</td>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ bgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ nwecolor +"'>" + myMonth[0][4] + "</td>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ webgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ wecolor +"'>" + myMonth[0][5] + "</td>");
	document.write("<td align='center' style='BACKGROUND-COLOR:"+ webgcolor +";FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT:bold;COLOR:"+ wecolor +"'>" + myMonth[0][6] + "</td>");
	document.write("</tr>");
	for (w = 1; w < 7; w++) 
		{
			document.write("<tr>")
			for (d = 0; d < 7; d++) 
				{
					if (myMonth[w][d]==dCurDayOfMonth)
						{
							document.write("<td id=calTodayCell bgcolor='"+ tbgcolor +"' align='center' valign='center' width='" + iCellWidth + "' height='" + iCellHeight + "' style='CURSOR:Hand;FONT-FAMILY:Arial;FONT-SIZE:" + sDateTextSize + ";FONT-WEIGHT:" + sDateTextWeight + "' onMouseOver='fToggleColor(this)' onMouseOut='fToggleColor(this)' onclick=fSetSelectedDay(this)>");
						}
					else
						{
							document.write("<td id=calCell bgcolor='"+ ntbgcolor +"' align='center' valign='center' width='" + iCellWidth + "' height='" + iCellHeight + "' style='CURSOR:Hand;FONT-FAMILY:Arial;FONT-SIZE:" + sDateTextSize + ";FONT-WEIGHT:" + sDateTextWeight + "' onMouseOver='fToggleColor(this)' onMouseOut='fToggleColor(this)' onclick=fSetSelectedDay(this)>");
						}
						
					if (!isNaN(myMonth[w][d])) 
						{
							document.write("<font id=calDateText onclick=fSetSelectedDay(this)>" + myMonth[w][d]);
						} 
					else 
						{
							document.write("<font id=calDateText onclick=fSetSelectedDay(this)>");
						}
					document.write("</td>")
				}
			document.write("</tr>");
		}
	document.write("</table>")
	}
	
function fUpdateCal(iYear, iMonth) 
{
	myMonth = fBuildCal(iYear, iMonth);
	objPrevElement.bgColor = ntbgcolor;
	if (((iMonth-1)==dCurMonth) && (iYear==dCurYear))
		{
			calTodayCell.bgColor = tbgcolor
		}
	else
		{
			calTodayCell.bgColor = ntbgcolor
		}
	document.all.calSelectedDate.value = "";
	for (w = 1; w < 7; w++) 
		{
			for (d = 0; d < 7; d++) 
				{
					if (!isNaN(myMonth[w][d])) 
						{
							calDateText[((7*w)+d)-7].innerText = myMonth[w][d];
						} 
					else 
						{
							calDateText[((7*w)+d)-7].innerText = " ";
						}
				}
		}
}
	