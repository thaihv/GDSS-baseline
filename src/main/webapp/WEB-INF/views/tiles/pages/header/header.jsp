<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<div class="lyr_top">
	<div class="img_logo">
		<img src="/GDSS/resources/resources/images/main/top_logo1.png"
			width="145px" height="66px" />
	</div>
	
	<c:url var="logoutUrl" value="/logout" />
    <form action="${logoutUrl}" id="logout" method="post">
        <input type="hidden" name="${_csrf.parameterName}"
            value="${_csrf.token}" />
    </form>
	<div class="btn_logout" onclick="document.getElementById('logout').submit();">
		<img src="/GDSS/resources/resources/images/main/btn_logout.gif"
			width="74px" height="18px" />
	</div>

	<div class="btn_home">
		<img src="/GDSS/resources/resources/images/main/btn_home.gif"
			width="50px" height="18px" />
	</div>
	<div class="inp_search1">
		<input id="search" name="search" type="text" class="inp_search1_c" />
	</div>
	<!-- menu -->
	<div class="grp_top_menu">
		<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu1" width="2px" height="40px" /> 
		<img src="/GDSS/resources/resources/images/main/btn_top_menu1.gif" class="btn_menu m1" width="178px" height="40px" /> 
		<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
		<img src="/GDSS/resources/resources/images/main/btn_top_menu2.gif" class="btn_menu m2" width="178px" height="40px" /> 
		<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
		<img src="/GDSS/resources/resources/images/main/btn_top_menu3.gif" class="btn_menu m3" width="178px" height="40px" /> 
		<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
		<sec:authorize access="hasRole('ADMIN')">
			<img src="/GDSS/resources/resources/images/main/btn_top_menu4.gif" class="btn_menu m4" width="178px" height="40px" /> 
			<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
			<img src="/GDSS/resources/resources/images/main/btn_top_menu5.gif" class="btn_menu m5" width="178px" height="40px" /> 
			<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" />
		</sec:authorize>
	</div>
</div>