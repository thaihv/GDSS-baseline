<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<script type="text/javascript">

$(document).ready(function () {
  	$('#slider4').bxSlider({
	    slideWidth: 228,
	    minSlides: 2,
	    maxSlides: 4,
	    moveSlides: 1,
	    slideMargin: 10
	});
	
  	
//  $(".btn_login").click(function(){login()});
	$(".btn_menu1").click(function(){menu(1)});
	$(".btn_menu2").click(function(){menu(2)});
	$(".btn_menu3").click(function(){menu(3)});
	$(".btn_menu4").click(function(){menu(4)});
	$(".btn_menu5").click(function(){menu(5)});
});


function menu(idx){
	
	if($(".grp_login_ok").css("display") != "block") {
		alert("Your login information is not valid.\nPlease select one after login.");
		$("#loginId").focus();
		return;
	}
	var faction="";

	if(idx == "1"){
		faction = "/GDSS/projects.do";
	}else if(idx == "3"){
		faction = "/GDSS/mapedit.do";
	}else if(idx == "4"){
		faction = "/GDSS/statistic.do";
	}else if(idx == "5"){
		faction = "/GDSS/admin.do";
	}
	
	
	var f = document.createElement("form"); 
	f.setAttribute("method","get");
	f.setAttribute("action",faction);
	document.body.appendChild(f); 
	
	var i = document.createElement("input"); 
	i.setAttribute("type","hidden"); 
	i.setAttribute("name","menu"); 
	i.setAttribute("value",idx); 
	f.appendChild(i); 
	
    if(idx == "2"){
    	map_popup('/GDSS/mapview.do');
	}else{
		f.submit();	
	}
	
}


	function popup(menuIdx, url){
		
		window.open(url)
		
	}

</script>

<body class="easyui-layout">
	<!-- TOP -->
	<div data-options="region:'north',border:false"
		style="height: 120px; padding: 0px;">
		<div class="lyr_top" style="height: 77px;">
			<div class="img_logo">
				<img src="/GDSS/resources/resources/images/index/top_logo1.png"
					width="145px" height="66px" />
			</div>
		</div>
	</div>
	<!-- CONTENTS -->
	<div data-options="region:'center',border:false">
		<div class="lyr_contents" style="height: 705px; top: 79px">

			<c:choose>
				<c:when test="${empty sessionScope.loggedUserId}">

					<form name="loginForm" id="loginForm" method="post"
						action="<c:url value="/login" />">

						<div class="grp_login">
							<div class="inp_login_id">
								<input id="username" name="username" type="text"
									class="inp_login_id_c" />
							</div>
							<div class="inp_login_pw">
								<input id="password" name="password" type="password"
									class="inp_login_pw_c" />
							</div>
							<div class="btn_login" onClick="document.forms['loginForm'].submit();">
								<img src="/GDSS/resources/resources/images/index/btn_login.png" />
							</div>
							<div class="clear"></div>
							<div class="options" id="divRemember">
								<span><input type="checkbox" name="remember-me" /> Remember Me</span>
							</div>
								
						</div>
						<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
					</form>

				</c:when>

				<c:otherwise>
					<div class="grp_login_ok">
						<div class="txt_hello">
							Welcome! <span class="fnt_user_name"><c:out
									value="${sessionScope.loggedUserId}" /></span>. Please select an item.
						</div>
							<c:url var="logoutUrl" value="/logout" />
						    <form action="${logoutUrl}" id="logout" method="post">
						        <input type="hidden" name="${_csrf.parameterName}"
						            value="${_csrf.token}" />
						    </form>
							<div class="btn_logout_intro" onclick="document.getElementById('logout').submit();">
								<img src="/GDSS/resources/resources/images/index/btn_logout.png" />
							</div>
					</div>
				</c:otherwise>

			</c:choose>

			<div class="grp_menu">
				<div class="box_menu">
					<div class="slider4" id="slider4">
						<div class="slide">
							<img src="/GDSS/resources/resources/images/common/blank.gif"
								class="btn_menu1">
						</div>
						<div class="slide">
							<img src="/GDSS/resources/resources/images/common/blank.gif"
								class="btn_menu2">
						</div>
						<div class="slide">
							<img src="/GDSS/resources/resources/images/common/blank.gif"
								class="btn_menu3">
						</div>
						<sec:authorize access="hasRole('ADMIN')">
							<div class="slide">
								<img src="/GDSS/resources/resources/images/common/blank.gif"
									class="btn_menu4">
							</div>
							<div class="slide">
								<img src="/GDSS/resources/resources/images/common/blank.gif"
									class="btn_menu5">
							</div>
						</sec:authorize>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- BOTTOM -->
	<div data-options="region:'south',border:false"
		style="height: 25px; padding: 0px;">
		<div class="lyr_bottom"
			style="position: relative; width: 100%; height: 25px; top: 705px;">
			<div
				style="background: #E0E0E0; text-align: center; padding: 5px; margin-top: 10px;">
				@ Copyright
				<%= new java.text.SimpleDateFormat("yyyy").format(new java.util.Date()) %>
				Green City Decision Support System - Jungdo UIT Company
			</div>
		</div>
	</div>
</body>

