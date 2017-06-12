package com.uitgis.ubps.cmmn.excel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.springframework.web.servlet.view.document.AbstractExcelView;

public class MappingExcelView extends AbstractExcelView {

	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook workbook, HttpServletRequest req,
			HttpServletResponse res) {

		res.setHeader("Content-Disposition", "attachment; filename=" + model.get("fileName") + ".xls");

		List<HashMap<String, String>> list = (List<HashMap<String, String>>) model.get("data");
		String[] column_arr = (String[]) (model.get("column_arr"));

		// create a new Excel sheet
		HSSFSheet sheet = workbook.createSheet((String) (model.get("fileName")));
		sheet.setDefaultColumnWidth(30);

		// create style for header cells
		CellStyle style = workbook.createCellStyle();
		Font font = workbook.createFont();
		font.setFontName("Arial");
		style.setFillForegroundColor(HSSFColor.BLUE.index);
		style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		font.setColor(HSSFColor.WHITE.index);
		style.setFont(font);

		// create header row
		HSSFRow header = sheet.createRow(0);

		int i = 0;
		for (String column : column_arr) {
			if (column.indexOf("TO_CHAR") != -1) {
				String temp = column_arr[i].substring(8, column_arr[i].length() - 1);
				header.createCell(i).setCellValue(temp);
			} else {
				header.createCell(i).setCellValue(column_arr[i]);
			}
			header.getCell(i).setCellStyle(style);
			i++;
		}

		// create data rows
		int rowCount = 1;

		for (HashMap<String, String> listItem : list) {
			HSSFRow aRow = sheet.createRow(rowCount++);

			for (int k = 0; k < column_arr.length; k++) {
				aRow.createCell(k).setCellValue(listItem.get(column_arr[k]));
			}

		}

		String comment = (String) (model.get("comment"));
		HSSFRow bottom = sheet.createRow(rowCount + 1);
		bottom.createCell(0).setCellValue("Note: " + comment);
	}

}
