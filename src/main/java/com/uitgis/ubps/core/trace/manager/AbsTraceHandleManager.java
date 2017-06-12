package com.uitgis.ubps.core.trace.manager;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.MessageSource;
import org.springframework.util.PathMatcher;

import com.uitgis.ubps.core.trace.handler.TraceHandler;

public abstract class AbsTraceHandleManager {

	protected Log log = LogFactory.getLog(this.getClass());

	@Resource(name = "messageSource")
	protected MessageSource messageSource;

	protected String packageName;
	protected String[] patterns;
	protected TraceHandler[] handlers;
	protected PathMatcher pm;

	public void setPatterns(String[] patterns) {
		this.patterns = patterns;
	}

	public void setHandlers(TraceHandler[] handlers) {
		this.handlers = handlers;
	}

	public void setPackageName(String canonicalName) {
		this.packageName = canonicalName;
	}

	public String getPackageName() {
		return this.packageName;
	}

	public void setReqExpMatcher(PathMatcher pm) {
		this.pm = pm;
	}

	public boolean hasReqExpMatcher() {
		return this.enableMatcher();
	}

	public boolean enableMatcher() {
		return (this.pm == null) ? false : true;
	}

	public boolean trace(Class clazz, String message) {

		log.debug(" DefaultExceptionHandleManager.run() ");

		// 매칭조건이 false 인 경우
		if (!enableMatcher())
			return false;

		for (String pattern : patterns) {
			log.debug("pattern = " + pattern + ", thisPackageName = " + packageName);
			log.debug("pm.match(pattern, thisPackageName) =" + pm.match(pattern, packageName));
			if (pm.match(pattern, packageName)) {
				for (TraceHandler eh : handlers) {
					eh.todo(clazz, message);
				}
				break;
			}
		}

		return true;
	}
}
