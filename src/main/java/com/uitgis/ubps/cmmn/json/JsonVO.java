package com.uitgis.ubps.cmmn.json;

import java.util.LinkedHashMap;

/**
 * @author moon9
 * @version 2014.02.10
 */
public class JsonVO extends LinkedHashMap<String, Object> {

	/**
	 * use serialVersionUID
	 */
	private static final long serialVersionUID = 3120522313355327761L;

	/**
	 * default constructor
	 */
	public JsonVO() {
	}

	/**
	 * 생성자로 {@link Object} 형의 데이터 값과 boolean 값의 결과 값을 받아서 저장한다.
	 * 
	 * @param success
	 *            성공 결과값(boolean)
	 * @param data
	 *            json으로 생성할 데이터(Object)
	 */
	public JsonVO(boolean success, Object data) {
		addObject("success", success);
		addObject("data", data);
	}

	/**
	 * 생성자로 데이터값을 저장한다. 기본적으로 결과값은 success로 저장함
	 * 
	 * @param data
	 *            json으로 생성할 데이터(Object)
	 */
	public JsonVO(Object data) {
		addObject("success", true);
		addObject("data", data);
	}

	/**
	 * JsonVO에 key값과 value를 추가한다.
	 * 
	 * @param str
	 *            key
	 * @param obj
	 *            value
	 */
	public void addObject(String str, Object obj) {
		this.put(str, obj);
	}

	/**
	 * 
	 * @return JsonVO에 담겨진 success 값
	 */
	public boolean isSuccess() {
		return (Boolean) this.get("success");
	}

	/**
	 * success값을 세팅한다
	 * 
	 * @param success
	 *            boolean 값
	 */
	public void setSuccess(boolean success) {
		addObject("success", success);
	}

	/**
	 * JsonVO에 추가된 데이타 값, {@link #setData(Object)} 혹은 {@link #JsonVO(Object)}
	 * 등으로 세팅된 키가 "data" 인 Object
	 * 
	 * @return Object
	 */
	public Object getData() {
		return this.get("data");
	}

	/**
	 * 데이터를 세팅한다. {@link #addObject(String, Object)} 에서 key값으로 "data"가 내부적으로
	 * 세팅된다.
	 * 
	 * @param data
	 *            Object
	 */
	public void setData(Object data) {
		addObject("data", data);
	}

	/**
	 * 키값이 "totalCount"
	 * 
	 * @return Integer값으로 키값이 "totalCount"인 값
	 */
	public int getTotalCount() {
		return (Integer) this.get("totalCount");
	}

	/**
	 * 본 패키지 UI 컴포넌트에 따라(grid, tree 등) totalCount가 필요할 때 세팅한다.
	 * 
	 * @param totalCount
	 *            int타입으로 {@link #addObject(String, Object)} 에서 키값 "totalCount"에
	 *            저장되는 값
	 */
	public void setTotalCount(int totalCount) {
		addObject("totalCount", totalCount);
	}

	/**
	 * 키값이 "message"인 값
	 * 
	 * @return
	 */
	public String getMessage() {
		return (String) this.get("message");
	}

	/**
	 * ajax callback function에서 필요한 message 등의 세팅을 위한 값
	 * 
	 * @param message
	 *            String value
	 */
	public void setMessage(String message) {
		addObject("message", message);
	}

	public String getReturnUrl() {
		return (String) this.get("returnurl");
	}

	public void setReturnUrl(String returnurl) {
		addObject("returnurl", returnurl);
	}

	public boolean isWarning() {
		return (Boolean) this.get("warning");
	}

	public void setWarning(boolean warning) {
		addObject("warning", warning);
	}
}
