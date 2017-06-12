<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<div class="easyui-layout" fit="true">
	<div data-options="region:'west',split:true,title:'Layers'"
		style="width: 200px; padding: 10px;">
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
		<input class="legendText" type="text" id="txtBound" name="txtBound"
			style="width: 100px;" value="" /> <input class="legendText"
			type="text" id="txtlevel" name="txtlevel" style="width: 100px;"
			value="" /> <input class="legendText" type="text" id="txtcenter"
			name="txtcenter" style="width: 100px;" value="" />
	</div>
	<div region="center" border="false">
		<div class="easyui-layout" fit="true">
			<div data-options="region:'north',border:false"
				style="height: 33px; background: #B3DFDA; padding: 0px">

				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="30" valign="middle"><img id="navi"
							title="Navigation" alt="Navigation"
							src="/GDSS/resources/geoscripts/img/control/icon_hand.gif"
							style="cursor: hand" onclick="mapToolBar('navi');"></td>
						<td height="30" valign="middle"><img id="total"
							title="Extent" alt="Extent"
							src="/GDSS/resources/geoscripts/img/control/icon_total.gif"
							style="cursor: hand" onclick="mapToolBar('zoomMaxExtent');">
						</td>
						<td height="30" valign="middle"><img id="zoomBox"
							title="Zoom Box" alt="ZoomBox"
							src="/GDSS/resources/geoscripts/img/control/icon_zoomIn.gif"
							style="cursor: hand" onclick="mapToolBar('zoomBox');"></td>
						<td height="30" valign="middle"><img id="zoomOut"
							title="Zoom Out" alt="Zoom Out"
							src="/GDSS/resources/geoscripts/img/control/icon_zoomOut.gif"
							style="cursor: hand" onclick="mapToolBar('zoomOut');"></td>
						<td height="30" valign="middle"><img id="deselect"
							title="DeSelect" alt="DeSelect"
							src="/GDSS/resources/geoscripts/img/control/icon_refresh.gif"
							style="cursor: hand" onclick="mapToolBar('deselect');"></td>
						<td height="30" valign="middle"><img id="histPrev"
							title="Previous" alt="Previous"
							src="/GDSS/resources/geoscripts/img/control/icon_prev.gif"
							style="cursor: hand" onclick="mapToolBar('histPrev');"></td>
						<td height="32" valign="middle"><img id="histNext"
							title="Next" alt="Next"
							src="/GDSS/resources/geoscripts/img/control/icon_next.gif"
							style="cursor: hand" onclick="mapToolBar('histNext');"></td>
						<td><a title="decrease opacity"
							href="javascript: changeOpacity(-0.1);">&lt;&lt;</a> <input
							id="opacity" type="text" value="0.3" size="3" disabled="true" />
							<a title="increase opacity"
							href="javascript: changeOpacity(0.1);">&gt;&gt;</a></td>
						<td valign="top" style="width: 3px;"></td>
						<td height="30" valign="middle"><img
							src="/GDSS/resources/geoscripts/img/control/text1.gif"
							name="Image22" width="24" height="13" border="0" id="Image22"
							align="absmiddle" /> <input class="legendText" type="text"
							id="txtScale" name="txtScale" style="width: 60px;" value=""
							readonly /></td>
						<td height="30" valign="middle"><img id="select"
							title="Select" alt="Select"
							src="/GDSS/resources/geoscripts/img/control/icon_info.gif"
							style="cursor: hand" onclick="mapToolBar('select');"></td>

						<td height="30" valign="middle"><img id="distance"
							title="Distance" alt="Distance Measurement"
							src="/GDSS/resources/geoscripts/img/control/icon_distance.gif"
							style="cursor: hand" onclick="mapToolBar('distance');"></td>
						<td height="30" valign="middle"><img id="area" title="Area"
							alt="Area Measurement"
							src="/GDSS/resources/geoscripts/img/control/icon_area.gif"
							style="cursor: hand" onclick="mapToolBar('area');"></td>
						<td height="30" valign="middle"><img id="print" title="Print"
							alt="Print"
							src="/GDSS/resources/geoscripts/img/control/icon_print.gif"
							style="cursor: hand"
							onclick="printIt(document.getElementById('txtBound').value,document.getElementById('txtLayers').value);">
						</td>
						<td height="30" valign="middle"></td>
					</tr>
				</table>
			</div>

			<div region="center" border="false">
				<div id="map"
					style="width: expression(document.body.clientWidth); height: 100%; padding: 0px 0px 0px 0px; filter: alpha(opacity = 0);"></div>
			</div>
		</div>

	</div>

</div>
