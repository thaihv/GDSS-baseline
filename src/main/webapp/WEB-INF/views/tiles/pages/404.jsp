<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>



<div class="lyr_top" style="height: 77px;">
	<div class="img_logo">
		<img src="/GDSS/resources/resources/images/index/top_logo1.png"
			width="145px" height="66px" />
	</div>
</div>

<div class="lyr_contents" style="height: 705px; top: 79px">

	<h1>Error 404!</h1>
	Page <b> <%=request.getScheme()+ "://" + request.getServerName() + ":"  + request.getServerPort() + request.getAttribute("javax.servlet.forward.request_uri")%>
	</b> is not available
</div>
