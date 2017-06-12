var loopDraw_originObj;
var loopDraw_zoom = -1;

function setCanvasSize() {
	var canvasForLoopLinesTemp = document.getElementById('canvasForLoopLines');

	if (document.getElementById('oZoom') != null) {//processparticipant
		var oZoom = document.getElementById('oZoom');
		canvasForLoopLinesTemp.style.width = oZoom.offsetWidth;
		canvasForLoopLinesTemp.style.height = oZoom.offsetHeight;
	} else if (document.getElementById('processLine') != null) {//processmanager
		var processLine = document.getElementById('processLine');
		canvasForLoopLinesTemp.style.width = processLine.offsetWidth + 200;
		canvasForLoopLinesTemp.style.height = processLine.offsetHeight + 400;
	} else if (document.getElementById('processLine1') != null) {//WIH
		var processLine1 = document.getElementById('processLine1');
		canvasForLoopLinesTemp.style.width = processLine1.offsetWidth + 200;
		canvasForLoopLinesTemp.style.height = processLine1.offsetHeight + 400;
	}
}

function getAbsPosition(oElement) {
	var iOffsetLeft = 0;
	var iOffsetTop = 0;
	while (oElement != null) {
		iOffsetLeft += oElement.offsetLeft;
		iOffsetTop += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	var absOffset = new Array(2);
	absOffset[0] = iOffsetLeft;
	absOffset[1] = iOffsetTop;
	return absOffset;
}

var isDrewOnce = false;
function drawLoopLine(stroke, namespace, tracingTag) {
	var jg_doc = new jsGraphics('canvasForLoopLines' + namespace);
	jg_doc.setColor("#888888");
	jg_doc.setStroke(2);
	
	//determines whether it should be draw vertically or not.
	var leftSpacer = document.getElementById("leftSpacer" + tracingTag);
	var rightLabel = document.getElementById("rightLabel" + tracingTag);

	var isVertical = (leftSpacer != null);

	if (isVertical) {
		var spacerwidth = leftSpacer.style.width = rightLabel.offsetWidth;
	}

	var point = getAbsPosition(document.getElementById('start' + tracingTag));
	var startX = point[0] + parseInt(document.getElementById('start' + tracingTag).offsetWidth / 2);
	var startY = point[1];
	var point = getAbsPosition(document.getElementById('switch' + tracingTag));
	var switchX = point[0] + parseInt(document.getElementById('switch' + tracingTag).offsetWidth / 2);
	var switchY = point[1];

	var point = getAbsPosition(document.getElementById('loop' + tracingTag));
	var loopX = point[0];
	var loopY = point[1];

	var loopTopRightX = 0;
	var loopTopRightY = 0;
	var lablePoint = 0;
	if (isVertical) {
		loopTopRightX = loopX + document.getElementById('loop' + tracingTag).offsetWidth;
		loopTopRightY = loopY;
		lablePoint = getAbsPosition(rightLabel);
		loopTopRightX = lablePoint[0] + spacerwidth / 2;
	}

	loopY += 7;

	var lineWidth = 10;
	if (isVertical) {

		startX += 3;
		startY += 8;
		loopTopRightX -= 10;
		
		jg_doc.drawLine(startX, startY, loopTopRightX + lineWidth, startY);
		jg_doc.drawLine(loopTopRightX + lineWidth, startY, loopTopRightX + lineWidth, switchY);
		jg_doc.drawLine(loopTopRightX + lineWidth, switchY, switchX, switchY);

		var arrowWidth = startX + 4;
		jg_doc.drawLine(arrowWidth + (lineWidth / 2), startY - lineWidth / 2, arrowWidth, startY);
		jg_doc.drawLine(arrowWidth + (lineWidth / 2), startY + lineWidth / 2, arrowWidth, startY);

	} else {
		startY -= 3;
		jg_doc.drawLine(startX, startY, startX, loopY - lineWidth);
		jg_doc.drawLine(startX, loopY - lineWidth, switchX, loopY - lineWidth);
		jg_doc.drawLine(switchX, loopY - lineWidth, switchX, startY);
		
		jg_doc.drawLine(startX + lineWidth / 2, startY - lineWidth / 2, startX, startY);
		jg_doc.drawLine(startX - lineWidth / 2, startY - lineWidth / 2, startX, startY);
	}

	jg_doc.paint();
}

//function drawLoopLine(stroke, namespace, tracingTag) {
//	var jg_doc = stroke;
//
//	//determines whether it should be draw vertically or not.
//	var leftSpacer = document.getElementById("leftSpacer" + tracingTag);
//	var rightLabel = document.getElementById("rightLabel" + tracingTag);
//
//	var isVertical = (leftSpacer != null);
//
//	if (isVertical) {
//		var spacerwidth = leftSpacer.width = rightLabel.offsetWidth;
//	}
//
//	var point = getAbsPosition(document.getElementById('start' + tracingTag));
//	var startX = point[0] + parseInt(document.getElementById('start' + tracingTag).offsetWidth / 2);
//	var startY = point[1];
//	var point = getAbsPosition(document.getElementById('switch' + tracingTag));
//	var switchX = point[0] + parseInt(document.getElementById('switch' + tracingTag).offsetWidth / 2);
//	var switchY = point[1];
//
//	var point = getAbsPosition(document.getElementById('loop' + tracingTag));
//	var loopX = point[0];
//	var loopY = point[1];
//
//	if (isVertical) {
//		var loopTopRightX = loopX + document.getElementById('loop' + tracingTag).offsetWidth;
//		var loopTopRightY = loopY;
//		var lablePoint = getAbsPosition(rightLabel);
//		loopTopRightX = lablePoint[0] + spacerwidth / 2;
//	}
//
//	loopY += 7;
//
//	// transform
//	if (loopDraw_originObj != null && loopDraw_zoom != -1) {
//		var originPoint = getAbsPosition(loopDraw_originObj);
//		var originX = originPoint[0];
//		var originY = originPoint[1];
//
//		startX = (startX - originX) * loopDraw_zoom / 100 + originX;
//		startY = (startY - originY) * loopDraw_zoom / 100 + originY;
//		switchX = (switchX - originX) * loopDraw_zoom / 100 + originX;
//		switchY = (switchY - originY) * loopDraw_zoom / 100 + originY;
//		loopY = (loopY - originY) * loopDraw_zoom / 100 + originY;
//		loopTopRightX = (loopTopRightX - originX) * loopDraw_zoom / 100 + originX;
//		loopTopRightY = (loopTopRightY - originY) * loopDraw_zoom / 100 + originY;
//	}
//
//	var lineWidth = 10;
//	if (isVertical) {
//
//		startX += 3;
//		startY += 8;
//		loopTopRightX -= 10;
//
//		jg_doc.moveTo(startX, startY);
//		jg_doc.lineTo(loopTopRightX, startY);
//
//		jg_doc.moveTo(loopTopRightX, startY);
//		jg_doc.curveTo(loopTopRightX, startY, loopTopRightX + lineWidth, startY, loopTopRightX + lineWidth, startY + lineWidth);
//		jg_doc.lineTo(loopTopRightX + lineWidth, switchY - lineWidth);
//		jg_doc.curveTo(loopTopRightX + lineWidth, switchY - lineWidth, loopTopRightX + lineWidth, switchY, loopTopRightX - lineWidth, switchY);
//		
//		jg_doc.moveTo(loopTopRightX - lineWidth, switchY);
//		jg_doc.lineTo(switchX, switchY);
//
//		startX += 4;
//		jg_doc.moveTo(startX + (lineWidth / 2), startY - lineWidth / 2);
//		jg_doc.lineTo(startX, startY);
//
//		jg_doc.moveTo(startX + (lineWidth / 2), startY + lineWidth / 2);
//		jg_doc.lineTo(startX, startY);
//
//	} else {
//		startY -= 3;
//		//loopY -= 10;
//
//		jg_doc.moveTo(startX, startY);
//		jg_doc.lineTo(startX, loopY);
//
//		jg_doc.moveTo(startX, loopY);
//		jg_doc.curveTo(startX, loopY, startX, loopY - lineWidth, startX + lineWidth, loopY - lineWidth);
//		jg_doc.lineTo(switchX - lineWidth, loopY - lineWidth);
//		jg_doc.curveTo(switchX - lineWidth, loopY - lineWidth, switchX, loopY - lineWidth, switchX, loopY);
//
//		jg_doc.moveTo(switchX, loopY);
//		jg_doc.lineTo(switchX, startY);
//
//		jg_doc.moveTo(startX + lineWidth / 2, startY - lineWidth / 2);
//		jg_doc.lineTo(startX, startY);
//
//		jg_doc.moveTo(startX - lineWidth / 2, startY - lineWidth / 2);
//		jg_doc.lineTo(startX, startY);
//	}
//
//}

var point;
var theTracingTag;
var widthOfSubProcessActivity = 50;
var droppingDistance = 30;


function creanArray(SubList) {
	var tempSubList = new Array();
	var k = 0;
	for (i = 0; i < SubList.length; i++) {
		if (SubList[i] != "") {
			tempSubList[k] = SubList[i];
			k++;
		}
	}
	SubList = tempSubList;
	return SubList;
}

function printSubList(SubList) {
	var temp2 = "";
	for (i = 0; i < SubList.length; i++) {
		temp2 += SubList[i] + " | ";
	}
	//alert(temp2);
}

function expandDiv(fromDivName, toDivName) {
	var floater = document.getElementById(toDivName);

	if (floater.style.display == '') {
		floater.style.display = 'NONE';
		return;
	}

	var fromDiv = document.getElementById(fromDivName);
	point = getAbsPosition(fromDiv);
	var startX = point[0];
	var startY = point[1];

	floater.style.display = '';
	var floaterLocationX = point[0]
			- (floater.offsetWidth - widthOfSubProcessActivity) / 2;
	if (floaterLocationX < 0)
		floaterLocationX = 0;// let it bounds
	floater.style.left = floaterLocationX;
	floater.style.top = (point[1] + droppingDistance);
	// floater.style.z-index = 100;

	// document.body.innerHTML = document.body.innerHTML + "<div
	// id=canvasForLoopLines_"+fromDivName+"
	// style='position:absolute;left:0px;top:0px;width:2000;height:"+(point[1]+1000)+";border:10px
	// red sollid; filter:alpha(opacity=30)'></div>";

	var canvasForLoopLinesHTML = "";

	var jg_doc = new jsGraphics(toDivName);
	jg_doc.setColor("#e1e1e1");
	jg_doc.setStroke(Stroke.DOTTED);

	var adjustingDistance = 19;

	var floaterPoint = getAbsPosition(floater);
	if (floaterLocationX == 0) {
		jg_doc.fillPolygon(new Array(startX, 0, floater.offsetWidth, startX
				+ widthOfSubProcessActivity), new Array(adjustingDistance,
				droppingDistance + adjustingDistance, droppingDistance
						+ adjustingDistance, adjustingDistance));
	} else {
		jg_doc.fillPolygon(new Array(
				(floater.offsetWidth - widthOfSubProcessActivity) / 2, 0,
				floater.offsetWidth,
				(floater.offsetWidth + widthOfSubProcessActivity) / 2),
				new Array(adjustingDistance, droppingDistance
						+ adjustingDistance, droppingDistance
						+ adjustingDistance, adjustingDistance));
	}
	//alert('x');		jg_doc.fillPolygon(new Array(floaterPoint[0], floaterPoint[0]+floater.offsetWidth, point[0]+widthOfSubProcessActivity, point[0]), new Array(point[1]+droppingDistance, point[1]+droppingDistance, point[1], point[1])); 
	jg_doc.paint(); // draws, in this case, directly into the document
	// alert('x'); alert('x');

}


function getRoleColor(roleNumber) {
	var arrRoleColor = [
			"#868585",
			"red",
			"blue",
			"purple"
	]
	
	return arrRoleColor[(roleNumber - 1) % arrRoleColor.length];
}

function getParentByTagName(element, tagName) {
	element = element.parentNode;
	
	while (element && element.tagName != tagName) {
		element = element.parentNode;
	}
	
	return element;
}

//swimlane
function drawSwimlaneLine(sourceDivName, targetDivName, actStatus, roleNumber) {

	setCanvasSize();
	
	var sourceDiv = document.getElementById(sourceDivName);
	var targetDiv = document.getElementById(targetDivName);

	var point_s = getAbsPosition(sourceDiv);
	var point_t = getAbsPosition(targetDiv);
	var sourceX, sourceY, targetX, targetY;

	if (point_s[1] < point_t[1]) {
		sourceX = point_s[0] + (sourceDiv.offsetWidth / 2);
		sourceY = point_s[1] + (sourceDiv.offsetHeight);
		targetX = point_t[0] + (targetDiv.offsetWidth / 2);
		targetY = point_t[1];
	} else {
		sourceX = point_s[0] + (sourceDiv.offsetWidth);
		sourceY = point_s[1] + (sourceDiv.offsetHeight / 2);
		targetX = point_t[0] + (targetDiv.offsetWidth);
		targetY = point_t[1] + (targetDiv.offsetHeight / 2);
	}

	//transform
	if (loopDraw_originObj != null && loopDraw_zoom != -1) {
		var originPoint = getAbsPosition(loopDraw_originObj);
		var originX = originPoint[0];
		var originY = originPoint[1];

		sourceX = (sourceX - originX) * loopDraw_zoom / 100 + originX;
		sourceY = (sourceY - originY) * loopDraw_zoom / 100 + originY;
		targetX = (targetX - originX) * loopDraw_zoom / 100 + originX;
		targetY = (targetY - originY) * loopDraw_zoom / 100 + originY;
	}
	
	//
	var jg_doc = new jsGraphics('canvasForLoopLines');
//	jg_doc.setColor(getRoleColor(roleNumber));
	if (actStatus == "Completed") {
		jg_doc.setColor("#666666");
		jg_doc.setStroke(2);
	} else {
		jg_doc.setColor("#868585");
		jg_doc.setStroke(1);
	}

//	if (Math.abs(sourceX - targetX) < 10)
//		sourceX = targetX; // ignore minor differences between X axis
	
//	if (targetDivName == "sw_act_end")
	var halfOfDistanceY = (targetY - sourceY) - 15;
//	else
//		var halfOfDistanceY = (targetY - sourceY) / 2;
	
	var halfOfDistanceX = null;
	if (sourceX < targetX) {
		halfOfDistanceX = targetX + 15;
	} else {
		halfOfDistanceX = sourceX + 15;
	}
//	if (sourceX < targetX) {
//		halfOfDistanceX
//	} else {
//	}

	if (sourceY < targetY) {
		var sourceRoleTable = getParentByTagName(sourceDiv, "TABLE");
		var targetRoleTable = getParentByTagName(targetDiv, "TABLE");
		var sourceCell = getParentByTagName(sourceDiv, "TD");
		var targetCell = getParentByTagName(targetDiv, "TD");
		
		var avoidBelow = false;
		
		if (sourceRoleTable == targetRoleTable && sourceCell.cellIndex == targetCell.cellIndex) {
			var sourceRowIndex = getParentByTagName(sourceDiv, "TR").rowIndex;
			var targetRowIndex = getParentByTagName(targetDiv, "TR").rowIndex;
			
			for (var rowIndex = sourceRowIndex + 1; rowIndex < targetRowIndex; rowIndex++) {
				var tableTemp = sourceRoleTable.rows[rowIndex].cells[sourceCell.cellIndex].getElementsByTagName("TABLE");
				
				if (tableTemp.length != 0) {
					avoidBelow = true;
				}
			}
		}
		
		if (avoidBelow) {
			var tempPointX = sourceX - sourceDiv.offsetWidth - 15;
			jg_doc.drawLine(sourceX, sourceY, sourceX, sourceY + 15);
			jg_doc.drawLine(sourceX, sourceY + 15, tempPointX, sourceY + 15);
			jg_doc.drawLine(tempPointX, sourceY + 15, tempPointX, sourceY + halfOfDistanceY);
			jg_doc.drawLine(tempPointX, sourceY + halfOfDistanceY, targetX, sourceY + halfOfDistanceY);
			jg_doc.drawLine(targetX, sourceY + halfOfDistanceY, targetX, targetY);
			jg_doc.fillPolygon(
					new Array(targetX - 3, targetX + 3, targetX),
					new Array(targetY - 8, targetY - 8, targetY)
			);
		} else {
			jg_doc.drawLine(sourceX, sourceY, sourceX, sourceY + halfOfDistanceY);
			jg_doc.drawLine(sourceX, sourceY + halfOfDistanceY, targetX, sourceY + halfOfDistanceY);
			jg_doc.drawLine(targetX, sourceY + halfOfDistanceY, targetX, targetY);
			jg_doc.fillPolygon(
					new Array(targetX - 3, targetX + 3, targetX),
					new Array(targetY - 8, targetY - 8, targetY)
			);
		}
	} else {
		var tempPointX = 0;
		if (sourceX < targetX) {
			tempPointX = targetX + 15;
		} else {
			tempPointX = sourceX + 15;
		}
		
		jg_doc.drawLine(sourceX, sourceY, tempPointX, sourceY);
		jg_doc.drawLine(tempPointX, sourceY, tempPointX, targetY);
		jg_doc.drawLine(tempPointX, targetY, targetX, targetY);
		jg_doc.fillPolygon(
				new Array(targetX + 8, targetX + 8, targetX),
				new Array(targetY - 3, targetY + 3, targetY)
		);
	}

	jg_doc.paint(); // draws, in this case, directly into the document
}

function drawBackLine(isVertical, namespace, startTracingTag, backTracingTag) {
	setCanvasSize();

	var elStart = document.getElementById('act_idx_' + startTracingTag);
	var elBack = document.getElementById('act_idx_' + backTracingTag);

	if (!elStart || !elBack) {
		return;
	}

	var sPoint = getAbsPosition(elStart);
	var bPoint = getAbsPosition(elBack);

	if (isVertical == "true") {
		var startX = sPoint[0] + (elStart.offsetWidth);
		var startY = sPoint[1] + (elStart.offsetHeight / 2);
		var backX = bPoint[0] + (elBack.offsetWidth / 2);
		var backY = bPoint[1] + (elBack.offsetHeight / 2);
	} else {
		var startX = sPoint[0] + (elStart.offsetWidth / 2);
		var startY = sPoint[1];
		var backX = bPoint[0] + (elBack.offsetWidth / 2);
		var backY = bPoint[1];
	}

	var jg_doc = new jsGraphics('canvasForLoopLines' + namespace);

//	if (loopDraw_originObj != null && loopDraw_zoom != -1) {
//		var originPoint = getAbsPosition(loopDraw_originObj);
//		var originX = originPoint[0];
//		var originY = originPoint[1];
//
//		startX = (startX - originX) * loopDraw_zoom / 100 + originX;
//		startY = (startY - originY) * loopDraw_zoom / 100 + originY;
//		backX = (backX - originX) * loopDraw_zoom / 100 + originX;
//		backY = (backY - originY) * loopDraw_zoom / 100 + originY;
//	}

	var lineX = startX + 25
	var lineY = startY - 20

	if (isVertical == "true") {

		jg_doc.fillPolygon(new Array(startX + 8, startX + 8, startX),
				new Array(startY - 3, startY + 3, startY));

		jg_doc.drawLine(startX, startY, lineX, startY);
		jg_doc.drawLine(lineX, startY, lineX, backY);
		jg_doc.drawLine(backX, backY, lineX, backY);

	} else {
		jg_doc.fillPolygon(new Array(startX - 3, startX + 3, startX),
				new Array(startY - 8, startY - 8, startY));

		jg_doc.drawLine(startX, startY, startX, lineY);
		jg_doc.drawLine(startX, lineY, backX, lineY);
		jg_doc.drawLine(backX, lineY, backX, backY);
	}

	jg_doc.paint();
}

function drawAllActivityLine(stroke, namespace, parentTracingTag, childTracingTag, isVertical) {
	if (namespace) {
		parentTracingTag = namespace + '_' + parentTracingTag;
		childTracingTag = namespace + '_' + childTracingTag;
	}
	
	var parentObj = document.getElementById('act_idx_' + parentTracingTag);
	var childObj = document.getElementById('act_idx_' + childTracingTag);

	if (!parentObj || !childObj) {
		return;
	}

	var canvasDivPoint = getAbsPosition(document.getElementById('canvasForLoopLines' + namespace));

	var pPoint = getAbsPosition(parentObj);
	var cPoint = getAbsPosition(childObj);

	var centerPointX = 0;
	var centerPointY = 0;
	var PointX = 0;
	var pointY = 0;
	var lineWidth = 10;
	var roundCornerDiff = 0;
	var isNotCurve = false;


//	var shape1=stroke;
	var jg_doc = new jsGraphics('canvasForLoopLines' + namespace);
	jg_doc.setColor("#888888");
	jg_doc.setStroke(2);

	if (isVertical == 'false') {
		pPoint[1] -= 1;
		cPoint[1] -= 1;
		var iconSize = 20;
		centerPointX = pPoint[0] + iconSize;
		centerPointY = pPoint[1] + (parentObj.offsetHeight / 2) - canvasDivPoint[1];
		var allActWidth = parentObj.offsetWidth;

		PointX = centerPointX + lineWidth;
		pointY = cPoint[1] + (childObj.offsetHeight / 2) - canvasDivPoint[1];
		var actWidth = childObj.offsetWidth + 2;

		// transform
//		if (loopDraw_originObj != null && loopDraw_zoom != -1) {
//			var originPoint = getAbsPosition(loopDraw_originObj);
//			var originX = originPoint[0];
//			var originY = originPoint[1];
//
//			centerPointX = (centerPointX - originX) * loopDraw_zoom / 100 + originX;
//			centerPointY = (centerPointY - originY) * loopDraw_zoom / 100 + originY;
//			PointX = (PointX - originX) * loopDraw_zoom / 100 + originX;
//			pointY = (pointY - originY) * loopDraw_zoom / 100 + originY;
//
//			allActWidth = (allActWidth - originX) * loopDraw_zoom / 100 + originX;
//			actWidth = (actWidth - originX) * loopDraw_zoom / 100 + originX;
//			lineWidth = (lineWidth - originX) * loopDraw_zoom / 100 + originX;
//		}
		//

		roundCornerDiff = (centerPointY - pointY);
		if (roundCornerDiff < -10)
			roundCornerDiff = -10;
		if (roundCornerDiff > 10)
			roundCornerDiff = 10;
		
		
		// front
		isNotCurve = ((centerPointY - pointY) < 15) && ((centerPointY - pointY) > -15);
		if (isNotCurve) {
			pointY = centerPointY;
//			shape1.moveTo(centerPointX, centerPointY);
//			shape1.lineTo(PointX + lineWidth, pointY);
			jg_doc.drawLine(centerPointX, centerPointY, PointX + lineWidth, pointY);
		} else {
//			shape1.moveTo(centerPointX, centerPointY);
//			shape1.curveTo(centerPointX, centerPointY, PointX, centerPointY, PointX, centerPointY - roundCornerDiff);
//			shape1.lineTo(PointX, pointY + roundCornerDiff);
//			shape1.curveTo(PointX, pointY + roundCornerDiff, PointX, pointY, PointX + lineWidth, pointY);
			jg_doc.drawLine(centerPointX, centerPointY, PointX, centerPointY);
			jg_doc.drawLine(PointX, centerPointY, PointX, pointY);
			jg_doc.drawLine(PointX, pointY, PointX + lineWidth, pointY);
		}

//		shape1.moveTo(PointX + lineWidth, pointY);
//		shape1.lineTo(PointX + lineWidth + lineWidth, pointY);
		jg_doc.drawLine(PointX + lineWidth, pointY, PointX + lineWidth + lineWidth, pointY);

		// arrow
//		shape1.moveTo(PointX + lineWidth + lineWidth / 2, pointY - lineWidth / 2);
//		shape1.lineTo(PointX + lineWidth + lineWidth, pointY);
		jg_doc.drawLine(PointX + lineWidth + lineWidth / 2, pointY - lineWidth / 2, PointX + lineWidth + lineWidth, pointY);
//		shape1.moveTo(PointX + lineWidth + lineWidth, pointY);
//		shape1.lineTo(PointX + lineWidth + lineWidth / 2, pointY + lineWidth / 2);
		jg_doc.drawLine(PointX + lineWidth + lineWidth, pointY, PointX + lineWidth + lineWidth / 2, pointY + lineWidth / 2);
		
		
		// back
		PointX = PointX + lineWidth + lineWidth + actWidth;
		var lineGap = (centerPointX + allActWidth) - (PointX + lineWidth + lineWidth + lineWidth) - (iconSize - 3);

//		shape1.moveTo(PointX, pointY);
//		shape1.lineTo(PointX + lineGap, pointY);
		jg_doc.drawLine(PointX, pointY, PointX + lineGap, pointY);

		if (isNotCurve) {
//			shape1.moveTo(PointX + lineGap, pointY);
//			shape1.lineTo(PointX + lineGap + lineWidth + lineWidth, centerPointY);
			jg_doc.drawLine(PointX + lineGap, pointY, PointX + lineGap + lineWidth + lineWidth, centerPointY);
		} else {
//			shape1.moveTo(PointX + lineGap, pointY);
//			shape1.curveTo(
//					PointX + lineGap, pointY, 
//					PointX + lineGap + lineWidth, pointY, 
//					PointX + lineGap + lineWidth, pointY + roundCornerDiff
//			);
//			shape1.lineTo(PointX + lineGap + lineWidth, centerPointY - roundCornerDiff);
//			shape1.curveTo(
//					PointX + lineGap + lineWidth,  centerPointY - roundCornerDiff,
//					PointX + lineGap + lineWidth, centerPointY,
//					PointX + lineGap + lineWidth + lineWidth, centerPointY
//			);
			jg_doc.drawLine(PointX + lineGap, pointY, PointX + lineGap + lineWidth, pointY);
			jg_doc.drawLine(PointX + lineGap + lineWidth, pointY, PointX + lineGap + lineWidth, centerPointY);
			jg_doc.drawLine(PointX + lineGap + lineWidth, centerPointY, PointX + lineGap + lineWidth + lineWidth, centerPointY);
		}
		
//		shape1.moveTo(PointX + lineGap + lineWidth + lineWidth, centerPointY);
//		shape1.lineTo(PointX + lineGap + lineWidth + lineWidth + lineWidth, centerPointY);
		jg_doc.drawLine(PointX + lineGap + lineWidth + lineWidth, centerPointY, PointX + lineGap + lineWidth + lineWidth + lineWidth, centerPointY);

		// arrow
		// shape1.moveTo(PointX + lineGap + lineWidth + lineWidth + lineWidth / 2, centerPointY - lineWidth / 2);
		// shape1.lineTo(PointX + lineGap + lineWidth + lineWidth + lineWidth, centerPointY);

		// shape1.moveTo(PointX + lineGap + lineWidth + lineWidth + lineWidth, centerPointY);
		// shape1.lineTo(PointX + lineGap + lineWidth + lineWidth + lineWidth / 2, centerPointY + lineWidth / 2);
	} else {
		pPoint[0] -= 1;
		cPoint[0] -= 1;
		var iconSize = 23;
		centerPointX = pPoint[0] + (document.getElementById('act_idx_' + parentTracingTag).offsetWidth / 2) - 1;
		centerPointY = pPoint[1] + iconSize;
		allActHeight = document.getElementById('act_idx_' + parentTracingTag).offsetHeight;

		PointX = cPoint[0] + (document.getElementById('act_idx_' + childTracingTag).offsetWidth / 2);
		pointY = centerPointY + lineWidth;
		actHeight = document.getElementById('act_idx_' + childTracingTag).offsetHeight;

		// transform
//		if (loopDraw_originObj != null && loopDraw_zoom != -1) {
//			var originPoint = getAbsPosition(loopDraw_originObj);
//			var originX = originPoint[0];
//			var originY = originPoint[1];
//
//			centerPointX = (centerPointX - originX) * loopDraw_zoom / 100 + originX;
//			centerPointY = (centerPointY - originY) * loopDraw_zoom / 100 + originY;
//			PointX = (PointX - originX) * loopDraw_zoom / 100 + originX;
//			pointY = (pointY - originY) * loopDraw_zoom / 100 + originY;
//
//			allActHeight = (allActHeight - originY) * loopDraw_zoom / 100 + originY;
//			actHeight = (actHeight - originY) * loopDraw_zoom / 100 + originY;
//			lineWidth = (lineWidth - originX) * loopDraw_zoom / 100 + originX;
//		}
		//

		roundCornerDiff = (centerPointX - PointX);

		if (roundCornerDiff < -10)
			roundCornerDiff = -10;
		if (roundCornerDiff > 10)
			roundCornerDiff = 10;

		// front
		isNotCurve = ((centerPointX - PointX) < 15) && ((centerPointX - PointX) > -15);
		if (isNotCurve) {
			PointX = centerPointX;
//			shape1.moveTo(centerPointX, centerPointY);
//			shape1.lineTo(PointX, pointY + lineWidth);
			jg_doc.drawLine(centerPointX, centerPointY, PointX, pointY + lineWidth);
		} else {
//			shape1.moveTo(centerPointX, centerPointY);
//			shape1.curveTo(
//					centerPointX, centerPointY,
//					centerPointX, pointY,
//					centerPointX - roundCornerDiff, pointY
//			);
//			shape1.lineTo(PointX + roundCornerDiff, pointY);
//			shape1.curveTo(
//					PointX + roundCornerDiff, pointY,
//					PointX, pointY,
//					PointX, pointY + lineWidth
//			);
			jg_doc.drawLine(centerPointX, centerPointY, centerPointX, pointY);
			jg_doc.drawLine(centerPointX, pointY, PointX, pointY);
			jg_doc.drawLine(PointX, pointY, PointX, pointY + lineWidth);
		}
		
//		shape1.moveTo(PointX, pointY + lineWidth);
//		shape1.lineTo(PointX, pointY + lineWidth + lineWidth);
		jg_doc.drawLine(PointX, pointY + lineWidth, PointX, pointY + lineWidth + lineWidth);

//		shape1.moveTo(PointX - lineWidth / 2, pointY + lineWidth);
//		shape1.lineTo(PointX, pointY + lineWidth + lineWidth);
		jg_doc.drawLine(PointX - lineWidth / 2, pointY + lineWidth, PointX, pointY + lineWidth + lineWidth);

//		shape1.moveTo(PointX + lineWidth / 2, pointY + lineWidth);
//		shape1.lineTo(PointX, pointY + lineWidth + lineWidth);
		jg_doc.drawLine(PointX + lineWidth / 2, pointY + lineWidth, PointX, pointY + lineWidth + lineWidth);

		// back
		pointY = pointY + lineWidth + lineWidth + actHeight;
		var lineGap = (centerPointY + allActHeight) - (pointY + lineWidth + lineWidth + lineWidth) - (iconSize - 3);

//		shape1.moveTo(PointX, pointY);
//		shape1.lineTo(PointX, pointY + lineGap);
		jg_doc.drawLine(PointX, pointY, PointX, pointY + lineGap);

		if (isNotCurve) {
//			shape1.moveTo(PointX, pointY + lineGap);
//			shape1.lineTo(centerPointX, pointY + lineGap + lineWidth + lineWidth);
			jg_doc.drawLine(PointX, pointY + lineGap, centerPointX, pointY + lineGap + lineWidth + lineWidth);
		} else {
//			shape1.moveTo(PointX, pointY + lineGap);
//			shape1.curveTo(
//					PointX, pointY + lineGap,
//					PointX, pointY + lineGap + lineWidth,
//					PointX + roundCornerDiff, pointY + lineGap + lineWidth
//			);
//			shape1.lineTo(centerPointX - roundCornerDiff, pointY + lineGap + lineWidth);
//			shape1.curveTo(
//					centerPointX - roundCornerDiff, pointY + lineGap + lineWidth,
//					centerPointX, pointY + lineGap + lineWidth,
//					centerPointX, pointY + lineGap + lineWidth + lineWidth
//			);
			jg_doc.drawLine(PointX, pointY + lineGap, PointX, pointY + lineGap + lineWidth);
			jg_doc.drawLine(PointX, pointY + lineGap + lineWidth, centerPointX, pointY + lineGap + lineWidth);
			jg_doc.drawLine(centerPointX, pointY + lineGap + lineWidth, centerPointX, pointY + lineGap + lineWidth + lineWidth);
		}
		
//		shape1.moveTo(centerPointX, pointY + lineGap + lineWidth + lineWidth);
//		shape1.lineTo(centerPointX, pointY + lineGap + lineWidth + lineWidth + lineWidth);
		jg_doc.drawLine(centerPointX, pointY + lineGap + lineWidth + lineWidth, centerPointX, pointY + lineGap + lineWidth + lineWidth + lineWidth);

		// arrow
		// shape1.moveTo(centerPointX+lineWidth/2,
		// pointY+lineGap+lineWidth+lineWidth+lineWidth-lineWidth/2);
		// shape1.lineTo(centerPointX,
		// pointY+lineGap+lineWidth+lineWidth+lineWidth);

		// shape1.moveTo(centerPointX-lineWidth/2,
		// pointY+lineGap+lineWidth+lineWidth+lineWidth-lineWidth/2);
		// shape1.lineTo(centerPointX,
		// pointY+lineGap+lineWidth+lineWidth+lineWidth);
	}
	//shape1.setTransform([dojox.gfx.matrix.translate(-1000,0),'']);	
	jg_doc.paint();
}

function setRowHeight(e) {
	var table = e;
	var rowIndex;
	var tableCount = 0;
	
	while (tableCount < 3) {
		table = table.parentNode;
		if (table.tagName == "TABLE") {
			tableCount++;
		}
		if (table.tagName == "TR") {
			rowIndex = table.rowIndex;
		}
	}
//	alert(rowIndex);
	
	var idCount = 0;
	table.rows[rowIndex].cells[0].style.height = "";
	var height = table.rows[rowIndex].cells[0].offsetHeight;
	
	if (height > 80) {
		height += 20;
	}
	
	while (document.getElementById("tableUserRole" + idCount)) {
		var t = document.getElementById("tableUserRole" + idCount);
		var r = t.rows[rowIndex];
		
		if (r) {
			r.cells[0].style.height = height;
		}
		idCount++;
	}
}

function drawLoopCountForSwimlane(divId01, divId02, namespace, title) {
	setCanvasSize();
	
	var div01 = document.getElementById(divId01);
	var div02 = document.getElementById(divId02);
	var point_s = getAbsPosition(div01);
	var point_t = getAbsPosition(div02);
	
	point_t[1] = point_t[1] + div02.offsetHeight;
	
	var X = 0;
	var Y = point_t[1] - ((point_t[1] - point_s[1]) / 2);
	
	if (point_s[0] > point_t[0]) {
		X = point_s[0] + div01.offsetWidth;
	} else {
		X = point_t[0] + div02.offsetWidth;
	}
	
	var jg_doc = new jsGraphics('canvasForLoopLines' + namespace);
	jg_doc.setFont("arial","12px",Font.ITALIC_BOLD);
	jg_doc.setColor("#666666");
	jg_doc.drawString(title, X + 20, Y);
	jg_doc.paint();

}
