package com.uitgis.ubps.core.trace.manager;

import com.uitgis.ubps.core.trace.handler.TraceHandler;

public class DefaultTraceHandleManager extends AbsTraceHandleManager implements TraceHandlerService {

	@Override
	public boolean trace(Class clazz, String message) {
		log.debug(" DefaultExceptionHandleManager.run() ");

		// 매칭조건이 false 인 경우
		if (!enableMatcher())
			return false;

		for (String pattern : patterns) {
			log.debug("pattern = " + pattern + ", thisPackageName = " + getPackageName());
			log.debug("pm.match(pattern, getPackageName()) =" + pm.match(pattern, getPackageName()));
			if (pm.match(pattern, getPackageName())) {
				for (TraceHandler eh : handlers) {
					eh.todo(clazz, message);
					log.debug("trace end?");
				}
				break;
			}
		}

		return true;
	}
}
