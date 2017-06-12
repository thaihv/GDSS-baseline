package com.uitgis.ubps.core.exception.handler;

public interface ExceptionHandler {
	/**
	 * occur 메소드
	 * 
	 * @param exception
	 *            실제로 발생한 Exception
	 * @param packageName
	 *            Exception 발생한 클래스 패키지정보
	 */
	public void occur(Exception exception, String packageName);
}
