package com.uitgis.ubps.system.login.controller;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class GdssLoginFailureHandler implements AuthenticationFailureHandler {
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException auth) throws IOException, ServletException {
		/* It want to return Json data for Ajax */
		/*		
		ObjectMapper mapper = new ObjectMapper();
		LoginStatus status = new LoginStatus(false, false, null, auth.getMessage());
		OutputStream out = response.getOutputStream();
		mapper.writeValue(out, status);
		 */
		response.setStatus(HttpServletResponse.SC_PROXY_AUTHENTICATION_REQUIRED);
		/* If using select-menu style from same login page using index.do */
		//response.sendRedirect("/GDSS/index.do");
		response.sendRedirect("/GDSS/indexa.do");
	}

}