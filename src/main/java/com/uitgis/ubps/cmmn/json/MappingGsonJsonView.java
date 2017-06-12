package com.uitgis.ubps.cmmn.json;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

import com.uitgis.ubps.cmmn.util.CmmUtil;

/**
 * 스프링 기본내장 MappingJacksonJsonView를 대체한 JsonView Class
 * <p>
 * dispatcherServlet 설정파일에 빈으로 등록후 사용<br>
 * 
 * new ModelAndView("jsonView", Map) <br>
 * 형식으로 사용
 * 
 * @author moon9
 * @version 2014.02.10
 *
 */
public class MappingGsonJsonView extends AbstractView {

	/**
	 * AbstractView를 상속받았으므로 기본 생성자 작성
	 */
	public MappingGsonJsonView() {
		super();
	}

	/**
	 * {@link com.lo.cmmn.util.CmmUtil}에 설정된 Gson객체를 사용하여 객체를 json형태로 변경한다.
	 * 
	 * @param model
	 *            데이터가 담긴 모델맵 객체
	 * @param req
	 *            요청받은 {@link javax.servlet.http.HttpServletRequest} 객체
	 * @param res
	 *            응답할 {@link javax.servlet.http.HttpServletResponse} 객체
	 */
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res)
			throws Exception {

		res.setContentType(getContentType());
		res.getWriter().write(CmmUtil.getGsonInstance().toJson(model));

	}

}
