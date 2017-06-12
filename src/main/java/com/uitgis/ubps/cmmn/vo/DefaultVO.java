package com.uitgis.ubps.cmmn.vo;

import java.io.Serializable;

/**
 * @author Thaihv
 *
 */
public class DefaultVO implements Serializable {

	String page;
	String start;
	String limit;
	String sort;

	String LOCALE = "vn";

	private static final long serialVersionUID = -6469853270268264150L;

	/**
	 * @return the page
	 */
	public String getPage() {
		return page;
	}

	/**
	 * @param page
	 *            the page to set
	 */
	public void setPage(String page) {
		this.page = page;
	}

	/**
	 * @return the start
	 */
	public String getStart() {
		return start;
	}

	/**
	 * @param start
	 *            the start to set
	 */
	public void setStart(String start) {
		this.start = start;
	}

	/**
	 * @return the limit
	 */
	public String getLimit() {
		return limit;
	}

	/**
	 * @param limit
	 *            the limit to set
	 */
	public void setLimit(String limit) {
		this.limit = limit;
	}

	/**
	 * @return the sort
	 */
	public String getSort() {
		return sort;
	}

	/**
	 * @param sort
	 *            the sort to set
	 */
	public void setSort(String sort) {
		this.sort = sort;
	}

	/**
	 * @return the lOCALE
	 */
	public String getLOCALE() {
		return LOCALE;
	}

	/**
	 * @param lOCALE
	 *            the lOCALE to set
	 */
	public void setLOCALE(String lOCALE) {
		LOCALE = lOCALE;
	}

}
