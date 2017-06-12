/**
 * 
 */
package com.uitgis.ubps.session.service;

import javax.servlet.http.HttpSession;

/**
 * @author hooni
 *
 */
public interface SessionService {

	/**
	 * 
	 * @param session
	 * @param key
	 * @param value
	 */
	void createSesstion(HttpSession session, String key, Object value);

	/**
	 * 
	 * @param session
	 * @param key
	 * @return
	 */
	Object getSession(HttpSession session, String key);

	/**
	 * 
	 * @param session
	 * @param key
	 */
	void removeSession(HttpSession session, String key);

	/**
	 * 
	 * @param session
	 * @param key
	 * @param value
	 * @return
	 */
	void updateSession(HttpSession session, String key, Object value);
}
