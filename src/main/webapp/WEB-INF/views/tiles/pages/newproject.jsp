<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="easyui-panel" title=" " align="center" border="0"
	collapsible="true">
	<div id="w" class="easyui-window" title="Create a new Project"
		style="position: relative; border: 1px solid #ccc; overflow: auto;">
		<form id="fm" action="/GDSS/createProject.do" method="post">
			<div class="fitemtitle">Information</div>
			<div class="fitem">
				<input type="hidden" id="Project_ID" name="projectid">
				<table style="width: 700px" border="0" cellpadding="0"
					cellspacing="0">
					<tr>
						<td>Name</td>
						<td colspan="5"><input class="easyui-validatebox" type="text"
							name="name"></input></td>

					</tr>
					<tr>
						<td>Description</td>
						<td colspan="5"><input class="easyui-validatebox"
							type="text" name="address"></input></td>
					</tr>
					<tr colspan="2">
						<td>Created date</td>
						<td><input class="easyui-datebox" name="date"></input></td>
						<td>Address</td>
						<td colspan="2"><select class="easyui-combobox"
							name="address">

								<option>KCN Yen Binh, Thai Nguyen</option>
								<option>Rach Gia City, Kien Giang</option>

						</select></td>

					</tr>
				</table>
			</div>
			<div class="fitemtitle">Projects</div>
			<table id="dg" class="easyui-datagrid"
				style="width: 700px; height: 250px" toolbar="#toolbar"
				singleSelect="true">
				<thead>
					<tr>
						<th field="name" width="100">Name</th>
						<th field="address" width="100">Address</th>
						<th field="description" width="300">Description</th>
						<th field="date" width="100">Date</th>
					</tr>
				</thead>
			</table>
			<div id="toolbar">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-add" onclick="newProject()"> Add</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-remove" onclick="removeProject()"> Remove</a>
			</div>
			<div class="fitem"
				style="text-align: right; height: 30px; line-height: 30px;">
				<a class="easyui-linkbutton" icon="icon-ok"
					href="javascript:void(0)" onclick="saveProject()">Save</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					icon="icon-cancel" onclick="$('#w').window('close')">Cancel</a>
			</div>

		</form>

	</div>
</div>

