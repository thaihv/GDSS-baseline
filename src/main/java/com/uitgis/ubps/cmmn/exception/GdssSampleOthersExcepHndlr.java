package com.uitgis.ubps.cmmn.exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.uitgis.ubps.core.exception.handler.ExceptionHandler;

public class GdssSampleOthersExcepHndlr implements ExceptionHandler {

	protected Log log = LogFactory.getLog(this.getClass());

	@Override
	public void occur(Exception exception, String packageName) {
		log.debug(" ServiceExceptionHandler run...............");
	}

}
