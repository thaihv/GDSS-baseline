package com.uitgis.ubps.core.exception.manager;

import com.uitgis.ubps.core.exception.handler.ExceptionHandler;

public class DefaultExceptionHandleManager extends AbsExceptionHandleManager implements ExceptionHandlerService {

	@Override
	public boolean run(Exception exception) throws Exception {

		log.debug(" DefaultExceptionHandleManager.run() ");

		// 매칭조건이 false 인 경우
		if (!enableMatcher())
			return false;

		for (String pattern : patterns) {
			log.debug("pattern = " + pattern + ", thisPackageName = " + thisPackageName);
			log.debug("pm.match(pattern, thisPackageName) =" + pm.match(pattern, thisPackageName));
			if (pm.match(pattern, thisPackageName)) {
				for (ExceptionHandler eh : handlers) {
					eh.occur(exception, getPackageName());
				}
				break;
			}
		}

		return true;
	}
}
