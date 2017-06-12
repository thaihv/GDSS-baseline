package com.uitgis.ubps.system.login.controller;

import java.io.IOException;
import java.io.OutputStream;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.uitgis.ubps.session.service.SessionService;
import com.uitgis.ubps.system.user.service.UserService;
import com.uitgis.ubps.system.user.vo.UserVO;

/**
 * @author Thaihv
 *
 */
public class GdssAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Resource(name = "userService")
	protected UserService userService;
	@Autowired
	private SessionService sessionService;

	protected Log log = LogFactory.getLog(this.getClass());

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.security.web.authentication.
	 * AuthenticationSuccessHandler#onAuthenticationSuccess(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse,
	 * org.springframework.security.core.Authentication)
	 */
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		UserVO vo = new UserVO();
		vo.setUsername(auth.getName());
		vo = userService.getUserVO(vo);
		if (vo != null) {
			this.sessionService.createSesstion(request.getSession(), "loggedUserId", vo.getUsername());
			this.sessionService.createSesstion(request.getSession(), "loggedUserFullName", vo.getFullname());
			this.sessionService.createSesstion(request.getSession(), "loggedUserEmail", vo.getEmail());
			this.sessionService.createSesstion(request.getSession(), "loggedUserPhone", vo.getPhone());
			this.sessionService.createSesstion(request.getSession(), "loggedUserAddress", vo.getAddress());
			this.sessionService.createSesstion(request.getSession(), "loggedUserLocale", vo.getLOCALE());

			/* If want to return a Json data for Ajax */ 
			/*			
 			ObjectMapper mapper = new ObjectMapper();
			LoginStatus status = new LoginStatus(true, auth.isAuthenticated(), auth.getName(), null);
			OutputStream out = response.getOutputStream();
			mapper.writeValue(out, status);
			 */
			log.debug("Status LOGIN is OK!");
			response.setStatus(HttpServletResponse.SC_OK);
			/* If using select-menu style from same login page using index.do */
			//response.sendRedirect("/GDSS/index.do");
			response.sendRedirect("/GDSS/main.do");
		}
	}

}
