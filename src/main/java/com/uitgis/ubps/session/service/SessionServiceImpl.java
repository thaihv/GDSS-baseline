/**
 * 
 */
package com.uitgis.ubps.session.service;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

/**
 * @author hooni
 *
 */
@Service
public class SessionServiceImpl implements SessionService {

	public void createSesstion(HttpSession session, String key, Object value) {
		session.setAttribute(key, value);
	}

	public Object getSession(HttpSession session, String key) {
		return session.getAttribute(key);
	}

	public void removeSession(HttpSession session, String key) {
		session.removeAttribute(key);
	}

	public void updateSession(HttpSession session, String key, Object value) {
		session.removeAttribute(key);

		session.setAttribute(key, value);
	}
}
