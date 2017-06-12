function numchk1(num) {
	var sign = "";
	if (isNaN(num)) {
		alert("number only");
		return 0;
	}
	if (num == 0) {
		return num;
	}

	if (num < 0) {
		num = num * (-1);
		sign = "-";
	} else {
		num = num * 1;
	}
	num = new String(num);
	var temp = "";
	var pos = 3;
	num_len = num.length;
	while (num_len > 0) {
		num_len = num_len - pos;
		if (num_len < 0) {
			pos = num_len + pos;
			num_len = 0;
		}
		temp = "," + num.substr(num_len, pos) + temp;
	}
	return sign + temp.substr(1);
}

function getSelectedValue(id) {
	var obj = document.getElementById(id);

	if (obj == null)
		return null;
	if (obj.options.length == 0)
		return null;
	if (obj.selectedIndex == -1)
		return null;

	return obj.options[obj.selectedIndex].value;
}

function map_popup(url) {
	var settings = "toolbar=no ,width=1280 ,height=1024 ,directories=no,status=no,scrollbars=no,menubar=no";
	winObject = window.open(url, "map", settings);
}

if (!window.common)
	common = {};

/**
 * input : input tpye의 태그를 정의함.(common.css와 연관있음) utils : 각종 유틸리티
 */
common = {
	input : {
		loginId : function() {
			var lImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_login_l'/>";
			var rImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_login_r'/>";

			$(".inp_login_id_c").before(lImg);
			$(".inp_login_id_c").after(rImg);

			$(".inp_login_id_c")
					.bind(
							"focus.myEvent",
							function() {
								$(".inp_login_id_c")
										.css("background-image",
												"url('/GDSS/resources/resources/images/index/input_login_c.png')");
							});
			$(".inp_login_id_c")
					.bind(
							"focusout.myEvent",
							function() {
								if ($(this).val() != "") {
									$(".inp_login_id_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/index/input_login_c.png')");
								} else {
									$(".inp_login_id_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/index/input_login_id_c.png')");
								}
							});
		},
		loginPw : function() {
			var lImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_login_l'/>"; // 왼쪽
																												// 이미지
																												// 경로
			var rImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_login_r'/>"; // 오른쪽
																												// 이미지
																												// 경로

			$(".inp_login_pw_c").before(lImg);
			$(".inp_login_pw_c").after(rImg);

			$(".inp_login_pw_c")
					.bind(
							"focus.myEvent",
							function() {
								$(".inp_login_pw_c")
										.css("background-image",
												"url('/GDSS/resources/resources/images/index/input_login_c.png')");
							});
			$(".inp_login_pw_c")
					.bind(
							"focusout.myEvent",
							function() {
								if ($(this).val() != "") {
									$(".inp_login_pw_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/index/input_login_c.png')");
								} else {
									$(".inp_login_pw_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/index/input_login_pw_c.png')");
								}
							});
		},
		search : function() {
			var lImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_search_l'/>"; // 왼쪽
																												// 이미지
																												// 경로
			var rImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_search_r'/>"; // 오른쪽
																												// 이미지
																												// 경로

			$(".inp_search_c").before(lImg);
			$(".inp_search_c").after(rImg);

			$(".inp_search_c")
					.bind(
							"focus.myEvent",
							function() {
								$(".inp_search_c")
										.css("background-image",
												"url('/GDSS/resources/resources/images/index/input_search_on_c.png')");
							});
			$(".inp_search_c")
					.bind(
							"focusout.myEvent",
							function() {
								if ($(this).val() != "") {
									$(".inp_search_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/index/input_search_on_c.png')");
								} else {
									$(".inp_search_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/index/input_search_c.png')");
								}
							});
		},
		search1 : function() {
			var lImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_search1_l'/>"; // 왼쪽
																												// 이미지
																												// 경로
			var rImg = "<img src='/GDSS/resources/resources/images/common/blank.gif' class='inp_search1_r'/>"; // 오른쪽
																												// 이미지
																												// 경로

			$(".inp_search1_c").before(lImg);
			$(".inp_search1_c").after(rImg);

			$(".inp_search1_c")
					.bind(
							"focus.myEvent",
							function() {
								$(".inp_search1_c")
										.css("background-image",
												"url('/GDSS/resources/resources/images/main/input_search_on_c.gif')");
							});
			$(".inp_search1_c")
					.bind(
							"focusout.myEvent",
							function() {
								if ($(this).val() != "") {
									$(".inp_search1_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/main/input_search_on_c.gif')");
								} else {
									$(".inp_search1_c")
											.css("background-image",
													"url('/GDSS/resources/resources/images/main/input_search_c.gif')");
								}
							});
		}
	},
	utils : {
		getRequestParam : function(paramName) {
			// 파라미터가 담길 배열
			var param = new Array();

			// 현재 페이지의 url
			var url = decodeURIComponent(location.href);
			// url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
			url = decodeURIComponent(url);

			var params;
			// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
			params = url.substring(url.indexOf('?') + 1, url.length);
			// 파라미터 구분자("&") 로 분리
			params = params.split("&");

			// params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
			var size = params.length;
			var key, value;
			for (var i = 0; i < size; i++) {
				key = params[i].split("=")[0];
				value = params[i].split("=")[1];

				param[key] = value;
			}

			return param[paramName];
		}
	}
}

$(document).ready(function() {
	common.input.loginId();
	common.input.loginPw();
	common.input.search();
	common.input.search1();
});
