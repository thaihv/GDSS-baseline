function getXMLHttp() {
	var xmlHttp = null;
	
	if (window.XMLHttpRequest)
	{
		xmlHttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		try
		{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.3.0");
		}
		catch(e)
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	
	if (xmlHttp == null)
	{
		alert("Your browser does not support AJAX!");
	}
	
	return xmlHttp;
}

//function getResultOfSubmit(xmlHttp, fnc)
//{
//	if(xmlHttp.readyState == 4)
//	{
//		try
//		{
//			if(xmlHttp.status == 200)
//			{
//				fnc(xmlHttp.responseText);
//			}
//			else
//			{
//				alert("Server Error (status : " + xmlHttp.status + ")");
//			}
//		}
//		catch(e)
//		{
//			alert(
//					' Error code : ' + e.code
//					+ '\n Error message : ' + e.message 
//			);
//		}
//		finally
//		{
//			xmlHttp = null;
//		}
//		
//	}
//}

/**
 * Debug용도로 사용
 * @param xmlHttp
 * @param fnc
 * @return
 */
function getResultOfSubmit(xmlHttp, fnc)
{
	if(xmlHttp.readyState == 4)
	{
		if(xmlHttp.status == 200)
		{
			fnc(xmlHttp.responseText);
		}
		else
		{
			alert("Server Error (status code : " + xmlHttp.status + ")");
		}
		xmlHttp = null;
	}
}

/**
 * This function has auto create the 'XMLHttpRequest'
 * And It has auto delete too.
 * You can use parameters if callback mathod has parameter
 * When try this example
 * {
 * 				submitAjaxServlet(
						url,	// jsp page or servlet url.
						method, // "GET" or "POST"
						
						// "resultString" is XMLHttpRequest.responseText. Variable name is free.
						function (resultString) {		
							appendChildNodeToTree(item, resultString);
						},
						parameterString
				);
 * }
 * 
 * @param url
 * @param method
 * @param fnc
 * @param param
 * @return
 */
function submitAjaxServlet(url, method, functionObject, parameters)
{
	var http = getXMLHttp();
	http.open(method, url, true);
	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	http.onreadystatechange = function() { getResultOfSubmit(http, functionObject); };
	http.send(parameters);
}

/**
 * This function needs 'XMLHttpRequest' and doesn't delete it.
 * @param httpReq
 * @param url
 * @param method
 * @param fnc
 * @param param
 * @return
 */
function submitAjaxWithNewHTTP(httpReq, url, method, fnc, param)
{
	httpReq.open(method, url, true);
	httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	httpReq.onreadystatechange = fnc;
	httpReq.send(param);
}

/**
 * This function accepts only 'GET' of method type.
 * Because you need shot parameters and url.
 * @param url
 * @param strParameters
 * @param callbackParameter
 * @param callbackFncName
 * @return
 */
function submitAjaxForCrossDomain(url, strParameters, callbackParameter, callbackFncName)
{
	var script = document.createElement("script");
	var scriptSrc = url + "?" + strParameters + "&" + callbackParameter + "=" + callbackFncName;
	script.type = "text/javascript";
	script.src = scriptSrc;
	document.appendChild(script);
}

function getDom(str) {
	var xmlDoc = null;
	
	if (window.ActiveXObject)
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(str);
	}
	else if (window.XMLHttpRequest)
	{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(str, "text/xml");
	}
	
	return xmlDoc;
}

/**
 * This is testing.
 * @param string ex) param1=value1&param2=value2
 * @return array [{key : param1, value : value1}, {key : param2, value : value2}]
 */
function parametersToObjectArray(string)
{
	var objString = "[";
	var keyAndValues = string.split("&");
	
	for (var i = 0; i < keyAndValues.length; i++)
	{
		var keyAndValue = keyAndValues[i].split("=");
		objString += "{key : '" + keyAndValue[0] + "', value : '" + keyAndValue[1] + "'}";
		
		if (i != (keyAndValues.length - 1))
		{
			objString += ", ";
		}
	}
	
	objString += "]";
	var objArray = eval(objString);
	
	return objArray;
}

/**
 * <select></select> select 초기화 하기 - 자식노드 모두 제거하기
 * @param select Element
 * @return void
 */
function formatSelect(oSelect)
{
	while (0 < oSelect.options.length)
	{
		oSelect.options[0] = null;
    }
}

function addOptionForSelect(oSelect)
{
	var oOption = document.createElement("option");
	try
	{
		oSelect.add(oOption);
	} catch (e) {
		oSelect.appendChild(oOption);
	}
	
	return oOption;
}

/**
 * <table></table> table 초기화 하기 - 자식노드 모두 제거하기
 * @param tr Element 를 가질 수 있는 element (예 - table, tBody.. 등등)
 * @return void
 */
function formatTable(oTable)
{
	var children = oTable.children;
	
	while (children.length > 0)
	{
		oTable.deleteRow(0);
	}
}

function formatCheckBox(chkName, bln)
{
	var arrChkBox = document.getElementsByName(chkName);
	
	for (var i = arrChkBox.length - 1; i >= 0; i--)
	{
		arrChkBox[i].checked = bln;
    }
}
