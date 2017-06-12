<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<div class="easyui-layout" fit="true">
	<div id="w" class="easyui-window" title="Layers"
		data-options="iconCls:'icon-save',minimizable:false,maximizable:false,closable:false"
		style="width: 250px; height: 450px; padding: 0px; left: 1250px; top: 120px;">
		<input class="legendText" type="hidden" id="txtBound" name="txtBound"
			style="width: 100px;" value="" /> <input class="legendText"
			type="hidden" id="txtlevel" name="txtlevel" style="width: 100px;"
			value="" /> <input class="legendText" type="hidden" id="txtcenter"
			name="txtcenter" style="width: 100px;" value="" />
		<div id="map_toc">
			<table border="0" cellspacing="0" cellpadding="0" width="200px"
				height="400px">
				<tr>
					<td>
						<div id="TOCROOT"></div>
						<div style="overflow: auto; width: 100%; height: 100%;">
							<table>
								<tr>
									<td>
										<div id="TOC"></div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				<tr>
					<td height="30" align="center"><a
						href="javascript:toc.expandAll();"><img
							src="/GDSS/resources/geoscripts/img/expand_all_layers.png"
							border="0"></img></a> <a href="javascript:toc.collapseAll();"><img
							src="/GDSS/resources/geoscripts/img/collapse_all_layers.png"
							border="0"></img></a> <a href="javascript:toc.turnOnAll();"><img
							src="/GDSS/resources/geoscripts/img/turn_all_layers_on.png"
							border="0"></img></a> <a href="javascript:toc.turnOffAll();"><img
							src="/GDSS/resources/geoscripts/img/turn_all_layers_off.png"
							border="0"></img></a></td>
				</tr>
			</table>
		</div>
		<div id="output"></div>

	</div>
	<div data-options="region:'center',border:false"
		style="border: 0px solid #ccc;">
		<div class="easyui-layout" fit="true">
			<div data-options="region:'north',border:false"
				style="height: 40px; padding: 0px; background: url('/GDSS/resources/resources/images/topMenu_bg.gif');">
				<input type="hidden" class="inp_s" id="txtScale" name="txtScale"
					style="width: 60px;" value="" readonly />
				<div class="icon_area">
					<div class="me_left"></div>
					<div class="search">
						<ul class="icon_btn">
							<li><a href="#" class="icon_z_t"
								onclick="mapToolBar('zoomMaxExtent');">fullExtent</a></li>
							<li><a href="#" class="icon_z_p"
								onclick="mapToolBar('zoomBox');">zoomBox</a></li>
							<li><a href="#" class="icon_z_m"
								onclick="mapToolBar('zoomOut');">zoomOut</a></li>
							<li><a href="#" class="icon_z_d"
								onclick="mapToolBar('navi');">Navigation</a></li>
							<li><a href="#" class="icon_z_s"
								onclick="mapToolBar('area');">AreaMeasure</a></li>
							<li><a href="#" class="icon_z_g"
								onclick="mapToolBar('distance');">DisMeasure</a></li>
							<li><a href="#" class="icon_z_u"
								onclick="mapToolBar('deselect');">DeSelection</a></li>
							<li><a href="#" class="icon_z_b"
								onclick="mapToolBar('histPrev');">Previous</a></li>
							<li><a href="#" class="icon_z_n"
								onclick="mapToolBar('histNext');">Next</a></li>
						</ul>
						<p class="s_ser_area">
							<select class="inp_s" id="layer_table" naem="layer_table"
								style="width: 100px">
								<option selected value="parcleNo">Select a parcel by number</option>
							</select> <a href="#" class="s_btn_ser" id="btn_search_attr"
								onclick="alert('Under construction!')">Search</a>
						</p>
					</div>
				</div>
			</div>

			<div data-options="region:'center',border:false"
				style="border: 0px solid #ccc;">
				<div id="map"></div>

			</div>
		</div>
	</div>
</div>


<div id="sw" class="easyui-window" title="Search"
	data-options="iconCls:'icon-search',minimizable:false,maximizable:false"
	style="width: 273px; height: 600px; padding: 0px; left: 50px; top: 120px;">
	<div id="aa" class="easyui-accordion"
		style="width: 257px; height: 560px;">
		<div title="Select an address"
			data-options="iconCls:'icon-search',selected:true"
			style="overflow: auto; padding: 0px;">
			<div class="sb_cont">
				<!-- Search -->
				<div class="n_add">
					<ul class="na_serch">
						<li><span>Province</span> <select id="province_1"
							name="province" class="inp_s" style="width: 179px;"
							onchange="javascript:addressdiscussion.address.sggnm(this.value, 'span_sgg_1', 1);">
								<option value="" selected="selected">All</option>
						</select></li>
						<li><span>District</span> <span id="span_sgg_1"> <select
								id="sgg_1" name="sgg_1" class="inp_s" style="width: 179px;">
									<option value="" selected="selected">All</option>
							</select>
						</span></li>
						<li><span>Road</span> <input class="inp"
							style="width: 129px;" type="text" id="desa" name="desa"
							onKeypress="if(event.keyCode == 13) addressdiscussion.address.search('desa','grid_table', 1);" />
							<a href="#" class="na_dks" id="btn_search_meta"
							onclick="alert('Under construction!')">Search</a></li>
					</ul>

					<ul class="na_ckl" id="grid_table"
						style="overflow-y: auto; height: 165px; white-space: nowrap;">

						<li>Please enter a road name.</li>

					</ul>


					<div class="na_no">
						<p class="na_no_title">
							<span>Building</span> <input class="inp" id="start" name="start"
								style="width: 47px;" type="text" /> - <input class="inp"
								id="end" name="end" style="width: 47px;" type="text" /> <a
								href="#" class="btn_ser01" id="btn_search_meta"
								onclick="alert('Under construction!')">Search</a>
						</p>
						<ul class="nat_ckl" id="grid_table1"
							style="overflow-y: auto; height: 130px; white-space: nowrap;">
							<li>Please enter a building number.</li>
						</ul>
					</div>
				</div>
			</div>

		</div>
		<div title="Select a parcel" data-options="iconCls:'icon-search'"
			style="padding: 0px;">
			<div class="sb_cont">
				<!--구주소 검색-->
				<div class="n_add">
					<ul class="na_serch">
						<li><span>Province</span> <select id="province_2"
							name="province" class="inp_s" style="width: 179px;"
							onchange="javascript:addressdiscussion.address.sggnm_1(this.value, 'span_sgg_2', 1);">
								<option value="">All</option>
						</select></li>
						<li><span>District</span> <span id="span_sgg_2"> <select
								id="kabupaten_2" name="kabupaten" class="inp_s"
								style="width: 179px;">
									<option value="" selected="selected">All</option>
							</select>
						</span></li>
						<li><span>Commune</span> <span id="span_kabupaten_1">
								<select id="dong_2" name="dong_2" class="inp_s"
								style="width: 179px;">
									<option value="" selected="selected">All</option>
							</select>
						</span></li>
					</ul>

					<div class="na_no">
						<p class="na_no_title">
							<span>Parcel</span> <input class="inp" id="start1" name="start1"
								style="width: 47px;" type="text" /> - <input class="inp"
								id="end1" name="end1" style="width: 47px;" type="text" /> <a
								href="#" class="btn_ser01" id="btn_search_meta"
								onclick="alert('Under construction!')">Search</a>
						</p>
						<ul class="nat_ckl" id="grid_table2"
							style="overflow-y: auto; height: 165px; white-space: nowrap;">

							<li>Please enter a parcel number</li>

						</ul>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>