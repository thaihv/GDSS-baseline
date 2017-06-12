package com.uitgis.ubps.system.geoprocess.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


/**
 * @author Thaihv
 *
 */
@Controller
public class MapController {
	private static final Logger logger = Logger.getLogger(MapController.class);

	@Value("#{applicationProps['resources.loc']}")
	private String resourceLoc;

	@Value("#{applicationProps['resources.maploc']}")
	private String resourceLocMap;

	@Value("#{mapProps['wmsUrlDefault']}")
	private String wmsUrlDefault;

	@Value("#{mapProps['wfsUrlDefault']}")
	private String wfsUrlDefault;

	@Value("#{mapProps['initleftbottomX']}")
	private String initleftbottomX;

	@Value("#{mapProps['initleftbottomY']}")
	private String initleftbottomY;

	@Value("#{mapProps['initrighttopX']}")
	private String initrighttopX;

	@Value("#{mapProps['initrighttopY']}")
	private String initrighttopY;

	@Value("#{mapProps['initmaxRes']}")
	private String initmaxRes;

	@Value("#{mapProps['initmaxZoom']}")
	private String initmaxZoom;

	@Value("#{mapProps['initCRS']}")
	private String initCRS;
	
	public Map<String, String> getLoconfig() {

		Map<String, String> loconfig = new HashMap<String, String>();

		loconfig.put("resourceLoc",    this.resourceLoc);
		loconfig.put("resourceLocMap", this.resourceLocMap);
		loconfig.put("wmsUrlDefault",  this.wmsUrlDefault);
		loconfig.put("wfsUrlDefault",  this.wfsUrlDefault);
		loconfig.put("initleftbottomX",this.initleftbottomX);
		loconfig.put("initleftbottomY",this.initleftbottomY);
		loconfig.put("initrighttopX",  this.initrighttopX);
		loconfig.put("initrighttopY",  this.initrighttopY);
		loconfig.put("initmaxRes",     this.initmaxRes);
		loconfig.put("initmaxZoom",    this.initmaxZoom);
		loconfig.put("initCRS",        this.initCRS);
		return loconfig;
	}

	@RequestMapping(value = "/mapview.do", method = RequestMethod.GET)
	public ModelAndView mapview(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("mapview");
		mav.addObject("loconfig", getLoconfig());

		return mav;
	}

	@RequestMapping(value = "/mapedit.do", method = RequestMethod.GET)
	public ModelAndView mapedit(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("mapedit");
		mav.addObject("loconfig", getLoconfig());

		return mav;
	}
	
	@RequestMapping(value = "/mapextjs.do", method = RequestMethod.GET)
	public ModelAndView mapUsingGeoExtjs(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("mapextjs");
		mav.addObject("loconfig", getLoconfig());
		logger.info("----------------START TO USE GEO EXTJS-----------------------");
		return mav;
	}	
}
