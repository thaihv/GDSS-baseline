<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<body>
<h1>This is Home Page</h1>

<h2>${msg}</h2>
<h2><spring:message code="language.test.message" text="This is a default language" /></h2>
<br />Locale : ${pageContext.response.locale}
</body>
</html>