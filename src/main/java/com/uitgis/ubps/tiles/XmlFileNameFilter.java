package com.uitgis.ubps.tiles;

import java.io.File;
import java.io.FilenameFilter;

/**
 * @author Thaihv
 *
 */
public class XmlFileNameFilter implements FilenameFilter {

	public boolean accept(File dir, String name) {
		return name.endsWith("xml");
	}

}
