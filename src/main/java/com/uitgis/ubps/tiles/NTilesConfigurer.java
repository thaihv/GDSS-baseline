package com.uitgis.ubps.tiles;

import java.io.File;

import javax.servlet.ServletContext;

import org.apache.tiles.TilesException;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;

/**
 * @author Thaihv
 *
 */
public class NTilesConfigurer extends TilesConfigurer {

	private TilesBean tilesBean = null;

	private ServletContext servletContext = null;

	/**
	 * @param tilesBean
	 *            The tilesBean to set.
	 */
	public void setTilesBean(TilesBean tilesBean) {
		this.tilesBean = tilesBean;
	}

	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		super.setServletContext(servletContext);
	}

	public void afterPropertiesSet() throws TilesException {
		String dir = tilesBean.getDefinitionDirectoryLocations().trim();
		File file = new File(this.servletContext.getRealPath(dir));

		File[] files = file.listFiles(new XmlFileNameFilter());
		String[] defs = new String[files.length];
		for (int i = 0; i < files.length; i++) {
			defs[i] = dir + files[i].getName();
		}

		setDefinitions(StringUtils.sortStringArray(defs));

		super.afterPropertiesSet();
	}

}
