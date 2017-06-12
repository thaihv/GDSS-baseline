package com.uitgis.ubps.test;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.uitgis.ubps.cmmn.json.JsonVO;

/**
 * @author Thaihv
 *
 */
@Controller
public class TestController {
	private static final Logger logger = Logger.getLogger(TestController.class);

	/**
	 * 
	 * @return a View and display test message with name is defined in
	 *         tiles-test-config.xml
	 */
	@RequestMapping(value = "/log4jClassic.do", method = RequestMethod.GET)
	public ModelAndView getWelcome() {

		// logs debug message
		if (logger.isDebugEnabled()) {
			logger.debug("test Debug for WelcomeTestController is excuted!");
		}

		// logs exception
		// logger.error("test Error for WelcomeTestController is excuted", new
		// Exception("Testing"));

		ModelAndView model = new ModelAndView("log4jClassic");
		model.addObject("msg", "Hello Spring MVC + Log4j");
		return model;

	}

	/**
	 * 
	 * @return a View for test the home page with name is defined in
	 *         tiles-test-config.xml
	 */
	@RequestMapping(value = { "/homeClassic.do" }, method = RequestMethod.GET)
	public ModelAndView homePage() {
		ModelAndView model = new ModelAndView("homePageClassic");
		model.addObject("msg", "Welcome to my website");
		return model;
	}

	/**
	 * 
	 * @param model
	 * @return a String that is name a View defined in tiles-test-config.xml
	 */
	@RequestMapping(value = { "/contactusClassic.do" }, method = RequestMethod.GET)
	public String contactusPage(Model model) {
		model.addAttribute("address", "Ha Noi, Viet Nam");
		model.addAttribute("phone", "0437878883");
		model.addAttribute("email", "Jungdouit@uitgis.com");
		return "contactusPageClassic";
	}

	@RequestMapping(value = "/json.json")
	public ModelAndView json() {
		logger.debug("-------Return to a Json-----------");
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("name", "Thaihv");
		data.put("age", 36);
		data.put("city", "HN");

		JsonVO jvo = new JsonVO(data);
		return new ModelAndView("jsonView", jvo);

	}
}
