package com.uitgis.ubps.system.geoprocess;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CrossDomain extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@RequestMapping("/proxy.do")
	public static void proxy(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String urlParam = getParam(request, "URL");

		System.out.println("proxy.web");

		if (urlParam == null || urlParam.trim().length() == 0) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		boolean doPost = request.getMethod().equalsIgnoreCase("POST");

		URL url = new URL(urlParam);

		HttpURLConnection http = (HttpURLConnection) url.openConnection();
		Enumeration headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			if (!key.equalsIgnoreCase("Host")) {
				http.setRequestProperty(key, request.getHeader(key));
			}
		}

		http.setDoInput(true);
		http.setDoOutput(doPost);

		byte[] buffer = new byte[8192];
		int read = -1;

		if (doPost) {
			OutputStream os = http.getOutputStream();
			ServletInputStream sis = request.getInputStream();
			while ((read = sis.read(buffer)) != -1) {
				os.write(buffer, 0, read);
			}
			os.close();
		}

		InputStream is = http.getInputStream();
		response.setStatus(http.getResponseCode());

		Map headerKeys = http.getHeaderFields();
		Set keySet = headerKeys.keySet();
		Iterator iter = keySet.iterator();

		while (iter.hasNext()) {
			String key = (String) iter.next();
			String value = http.getHeaderField(key);
			if (key != null && value != null) {
				response.setHeader(key, value);
			}
		}

		ServletOutputStream sos = response.getOutputStream();
		response.resetBuffer();
		while ((read = is.read(buffer)) != -1) {
			sos.write(buffer, 0, read);
		}
		response.flushBuffer();
		sos.close();
	}

	public static String getParam(HttpServletRequest request, String name) {

		Map map = (Map) request.getAttribute("Map");
		if (map == null) {
			map = new HashMap();

			Enumeration e = request.getParameterNames();
			while (e.hasMoreElements()) {
				String key = (String) e.nextElement();
				String value = request.getParameter(key);

				// System.out.println("aa"+value);

				try {
					value = new String(value.getBytes("8859_1"), "UTF-8");
					System.out.println(" URL: " + value);
				} catch (Exception ex) {
				}
				map.put(key.toUpperCase(), value);
			}
			request.setAttribute("Map", map);
		}
		return (String) map.get(name.toUpperCase());
	}

}
