package com.uitgis.ubps.system.login.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import com.uitgis.ubps.session.service.SessionService;

/**
 * @author Thaihv
 *
 */
public class GdssLogoutSuccessHandler implements LogoutSuccessHandler {

	protected Log log = LogFactory.getLog(this.getClass());
	@Autowired
	private SessionService sessionService;

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.security.web.authentication.logout.
	 * LogoutSuccessHandler#onLogoutSuccess(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse,
	 * org.springframework.security.core.Authentication)
	 */
	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		if (auth != null && auth.getDetails() != null) {
			try {
				request.getSession().invalidate();

				this.sessionService.removeSession(request.getSession(), "loggedUserId");
				this.sessionService.removeSession(request.getSession(), "loggedUserFullName");
				this.sessionService.removeSession(request.getSession(), "loggedUserEmail");
				this.sessionService.removeSession(request.getSession(), "loggedUserPhone");
				this.sessionService.removeSession(request.getSession(), "loggedUserAddress");
				this.sessionService.removeSession(request.getSession(), "loggedUserLocale");

				log.debug("Status LOGOUT is OK!");
			} catch (Exception e) {
				e.printStackTrace();
				e = null;
			}
		}
		response.setStatus(HttpServletResponse.SC_OK);
		/* If using select-menu style from same login page using index.do */
		//response.sendRedirect("/GDSS/index.do");
		response.sendRedirect("/GDSS/main.do");

	}

}
