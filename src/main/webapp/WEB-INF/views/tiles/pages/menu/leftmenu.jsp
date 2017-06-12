<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<script type="text/javascript">
var menuIdx = common.utils.getRequestParam("menu");
$(document).ready(function () {
	menuclick(menuIdx);
	$(".img_logo").click(function(){location.href="/GDSS/main.do"});
	$(".btn_menu.m1").click(function(){menu(1)});
	$(".btn_menu.m2").click(function(){map_popup('/GDSS/mapview.do')});
//    $(".btn_menu.m2").click(function(){location.href="/GDSS/mapview.do"});
	$(".btn_menu.m3").click(function(){menu(3)});
	$(".btn_menu.m4").click(function(){menu(4)});
	$(".btn_menu.m5").click(function(){menu(5)});
	
	$(".btn_sub_menu.m0").click(function(){submenu(0)});
	$(".btn_sub_menu.m1").click(function(){submenu(1)});
	$(".btn_sub_menu.m2").click(function(){submenu(2)});
	$(".btn_home").click(function(){location.href="/GDSS/main.do"});
});


function menuclick(idx){
	
	$(".btn_menu.m1").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu1.gif");
	$(".btn_menu.m2").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu2.gif");
	$(".btn_menu.m3").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu3.gif");
	$(".btn_menu.m4").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu4.gif");
	$(".btn_menu.m5").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu5.gif");
	
	$(".btn_sub_menu.m1").css("display","none");
	$(".btn_sub_menu.m2").css("display","none");
	$(".grp_sub_contents1").css("display","none");
	$(".grp_sub_contents2").css("display","none");
	if(idx=="1") {
		$(".btn_menu.m1").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu1_on.gif");
		$(".btn_sub_menu.m1").css("display","block");
		$(".grp_sub_contents1").css("display","block");
		$(".grp_main_banner #m1").text("Projects");
		
	} else if(idx=="2") {
		// It is to display a popup, do nothing	for leftmenu	
	} else if(idx=="3") {
		// to call a page with different Tiles layout which is without Leftmenu
		// not need to process leftmenu
	} else if(idx=="4") {
		$(".btn_menu.m4").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu4_on.gif");
		//$(".btn_sub_menu.m2").css("display","block");
		//$(".grp_sub_contents2").css("display","block");		
		$(".grp_main_banner #m1").text("Statistics");
		
	} else if(idx=="5") {
		$(".btn_menu.m5").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu5_on.gif");
		$(".grp_main_banner #m1").text("Administration");
		
	}
}

function menu(idx){
	
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
	
	f.submit();
}

function submenu(idx){
	$(".btn_sub_menu.m0").attr("src", "/GDSS/resources/resources/images/main/btn_sub_menu0.gif");
	if(menuIdx == 1)
	$(".btn_sub_menu.m1").attr("src", "/GDSS/resources/resources/images/main/btn_sub1_menu1.gif");
	if(menuIdx == 2)
	$(".btn_sub_menu.m2").attr("src", "/GDSS/resources/resources/images/main/btn_sub2_menu1.gif");
	
	if(idx=="0") {
		$(".btn_sub_menu.m0").attr("src", "/GDSS/resources/resources/images/main/btn_sub_menu0_on.gif");
		$(".tbl_sub_contents0" ).css({height: "85%"});
		$(".tbl_sub_contents1" ).css({height: "0.0001%"});
		
	} else if(idx=="1") {
		$(".btn_sub_menu.m1").attr("src", "/GDSS/resources/resources/images/main/btn_sub1_menu1_on.gif");
		$(".tbl_sub_contents0" ).css({height: "0.0001%"});
		$(".tbl_sub_contents1" ).css({height: "95%"});
		
	} else if(idx=="2") {
		$(".btn_sub_menu.m2").attr("src", "/GDSS/resources/resources/images/main/btn_sub2_menu1_on.gif");
		$(".tbl_sub_contents0" ).css({height: "0.00001%"});
		$(".tbl_sub_contents1" ).css({height: "95%"});
		
	} 
}

</script>
<div class="grp_left">
	<table cellspacing=0 cellpadding=0 border=0 class="tbl_left">
		<tr>
			<td class="tbl_left_title0"
				style="height: 45px; vertical-align: top;"><img
				src="/GDSS/resources/resources/images/main/btn_sub_menu0.gif"
				class="btn_sub_menu m0" /></td>
		</tr>
		<tr>
			<td style="height: 2px"><img
				src="/GDSS/resources/resources/images/main/bar_sub_menu.gif"
				class="bar_sub_menu" /></td>
		</tr>
		<tr>
			<td class="tbl_sub_contents0">
				<div class="grp_sub_contents0">
					<div class="txt_sub_title1">Identification</div>
					<div class="grp_sub_contents sub0_info">
						<table cellspacing=0 cellpadding=0 border=0 class="tbl_info">
							<tr>
								<td>UserName</td>
								<sec:authorize access="isRememberMe()">
									<td>: <c:out value="${pageContext.request.userPrincipal.name}" /></td>
								</sec:authorize>								
								<sec:authorize access="isFullyAuthenticated()">
									<td>: <c:out value="${sessionScope.loggedUserId}" /></td>
								</sec:authorize>								
								
							</tr>
							<tr>
								<td>Address</td>
								<td>: <c:out value="${sessionScope.loggedUserAddress}" /></td>
							</tr>
							<tr>
								<td>E-Mail</td>
								<td>: <a
									href="mailto:<c:out value="${sessionScope.loggedUserEmail}"/>"><c:out
											value="${sessionScope.loggedUserEmail}" /></a></td>
							</tr>
							<tr>
								<td colspan="2" class="none_border"><img
									src="/GDSS/resources/resources/images/main/btn_info_edit.gif"
									class="btn_info_edit" /></td>

							</tr>
							<tr>
								<td colspan="2" class="none_border info_img"><img
									src="/GDSS/resources/resources/images/main/img_none.gif" /></td>

							</tr>
						</table>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td style="height: 2px"><img
				src="/GDSS/resources/resources/images/main/bar_sub_menu.gif"
				class="bar_sub_menu" />
			<!-- bar --></td>
		</tr>
		<tr>
			<td class="tbl_left_title1"
				style="height: 45px; vertical-align: bottom;"><img
				src="/GDSS/resources/resources/images/main/btn_sub1_menu1_on.gif"
				class="btn_sub_menu m1" />
			</td>
		</tr>
		<tr>
			<td style="overflow: auto;" class="tbl_sub_contents1">
				<div class="grp_sub_contents1">

					<div class="txt_sub_title1">Project</div>
					<div class="grp_sub_contents">
						<ul class="tree_job">
							<li class="job_new"><a href="/GDSS/newproject.do?menu=1">New</a>
							</li>
							<li class="job_new">Edit</li>
							<li class="job_new">Delete</li>						
							<li class="job_process">Scenarios
								<ul>
									<li><a href="#">View</a></li>
									<li><a href="#">Edit</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td style="height: 2px"><img
				src="/GDSS/resources/resources/images/main/bar_sub_menu.gif"
				class="bar_sub_menu" />
			</td>
		</tr>
		<tr>
			<td></td>
		</tr>
	</table>
</div>

