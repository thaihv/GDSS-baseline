package com.uitgis.ubps.core.exception.manager;

import org.springframework.util.PathMatcher;

import com.uitgis.ubps.core.exception.handler.ExceptionHandler;

public interface ExceptionHandlerService {
	/**
	 * setPatterns 메소드
	 * 
	 * 패키지,클래스 이름으로 패턴등록(Ant형식의 매칭)
	 * 
	 * @param patterns
	 *            패턴리스트
	 */
	public void setPatterns(String[] patterns);

	/**
	 * setHandlers 메소드 ExceptionHandler 리스트 등록
	 * 
	 * @param handlers
	 *            handler리스트
	 */
	public void setHandlers(ExceptionHandler[] handlers);

	/**
	 * setPackageName 메소드 비교할 클래스 정보
	 * 
	 * @param canonicalName
	 *            비교할 클래스명
	 */
	public void setPackageName(String canonicalName);

	/**
	 * setException 메소드
	 * 
	 * @param be
	 *            Exception
	 */
	public void setException(Exception be);

	/**
	 * setReqExpMatcher 메소드
	 * 
	 * @param pm
	 *            별도의 PathMatcher
	 */
	public void setReqExpMatcher(PathMatcher pm);

	/**
	 * run 메소드
	 * 
	 * @param exception
	 *            발생한 Exception
	 * @return boolean 실행성공여부
	 */
	public boolean run(Exception exception) throws Exception;

	/**
	 * hasReqExpMatcher 메소드 PathMatcher 가 있는지 여부 반환
	 * 
	 * @return boolean true|false
	 */
	public boolean hasReqExpMatcher();
}
