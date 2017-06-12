<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

</head>
<body>

	<div id="loginContainer">
		<form name="loginForm" id="loginForm" action="<c:url value='/login' />" method='POST'>
			<div id="first_step">
				<h1>&nbsp;</h1>
				<div class="form">

					<input type="text" id="username" name="username" />
					<input type="text" id="password" name="password"/>

					<div class="clear"></div>
				</div>
				<div class="clear"></div>
				<span id="method__login">
					<input id="signin" class="submit" onClick="document.forms['loginForm'].submit();"/>
				</span> 
				<span id="method__subscribe">
					<input id="subscribe" class="submitTenant"/>
				</span>
				<div>
					<div class="options" id="divCookie"">

						<span> <input type="checkbox" id="remember-me" name="remember-me" /> Remember me</span>
						<div class="clear"></div>
					</div>
					<span class="guide"><b>Guide me!</b></a></span>
				</div>
			</div>
			<div class="clear"></div>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		</form>
	</div>

</body>
</html>