<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title><tiles:getAsString name="title" /></title>
</head>

<body>

	<tiles:insertAttribute name="content" />

</body>
</html>