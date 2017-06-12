package com.uitgis.ubps.system.user.controller;

import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.uitgis.ubps.cmmn.json.JsonVO;
import com.uitgis.ubps.cmmn.util.MessageUtil;
import com.uitgis.ubps.core.properties.PropertyService;
import com.uitgis.ubps.system.user.service.UserService;
import com.uitgis.ubps.system.user.vo.UserVO;

/**
 * @author Thaihv
 *
 */
@Controller
@RequestMapping("/system/user/*")
public class UserController {
	protected Log log = LogFactory.getLog(this.getClass());

	@Resource(name = "propertiesService")
	protected PropertyService propertiesService;

	@Autowired
	protected UserService userService;

	@Value("#{applicationProps['resources.loc']}")
	private String resourceLocPath;

	@RequestMapping(value = "display.json")
	public ModelAndView getUserInfo(@RequestParam("username") String username) {
		UserVO vo = new UserVO();
		vo.setUsername(username);
		return new ModelAndView("jsonView", new JsonVO(userService.getUserVO(vo)));
	}

	@RequestMapping(value = "info.json")
	public ModelAndView getUserInfoUsingBatisAnnotation(@RequestParam("username") String username) {
		log.info("-----------Get user information by using annotation mapper in mybatis--------");
		return new ModelAndView("jsonView", new JsonVO(userService.getUserVOAnotation(username)));
	}

	@RequestMapping(value = "list.json")
	public ModelAndView getListUsers() {
		return new ModelAndView("jsonView", new JsonVO(userService.getList()));
	}

	@RequestMapping(value = "listpaging.json")
	public ModelAndView getListUsersByPaging(UserVO vo) {
		int limit = Integer.parseInt(vo.getLimit());
		int page = Integer.parseInt(vo.getPage());
		vo.setMin((page - 1) * limit);
		vo.setMax(((page - 1) * limit) + limit);

		List<UserVO> data = userService.getPagingList(vo);
		JsonVO jvo = new JsonVO(data);

		jvo.setTotalCount(data.size());
		return new ModelAndView("jsonView", jvo);
	}

	@RequestMapping(value = { "insert.json", "create.json" })
	@Secured("ROLE_ADMIN")
	public ModelAndView insert(@ModelAttribute("UserVO") UserVO vo) {

		JsonVO jvo = new JsonVO();
		try {
			userService.createUserVO(vo);
			jvo.setSuccess(true);
			jvo.setMessage(MessageUtil.getMessage("common.msg.create.done"));
			jvo.addObject("data", vo);

		} catch (Exception e) {
			String szMess = MessageUtil.getMessage("common.msg.error");
			try {
				throw e.getCause();
			} catch (SQLException sqlerr) {
				szMess = MessageFormat.format(MessageUtil.getMessage("fail.common.sql"), sqlerr.getErrorCode(),
						sqlerr.getMessage());
			} catch (Throwable e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			jvo.setSuccess(false);
			jvo.setMessage(szMess);
			return new ModelAndView("jsonView", jvo);
		}
		return new ModelAndView("jsonView", jvo);
	}

	@RequestMapping(value = { "delete.json", "remove.json" })
	@Secured("ROLE_ADMIN")
	public ModelAndView delete(@RequestParam("username") String username) {

		UserVO vo = new UserVO();
		vo.setUsername(username);
		JsonVO jvo = new JsonVO();
		if (userService.deleteUser(vo) == 1) {
			jvo.setSuccess(true);
			jvo.setMessage(MessageUtil.getMessage("common.msg.delete.done"));
			jvo.addObject("data", vo);
		} else {
			jvo.setSuccess(false);
			jvo.setMessage(MessageUtil.getMessage("common.msg.error"));
		}

		return new ModelAndView("jsonView", jvo);
	}

	@RequestMapping(value = "update.json")
	@Secured("ROLE_ADMIN")
	public ModelAndView update(UserVO vo) {

		JsonVO jvo = new JsonVO();

		if (userService.updateUserVO(vo) == 1) {
			jvo.setSuccess(true);
			jvo.setMessage(MessageUtil.getMessage("common.msg.update.done"));
			jvo.addObject("data", vo);
		} else {
			jvo.setSuccess(false);
			jvo.setMessage(MessageUtil.getMessage("common.msg.error"));
		}

		return new ModelAndView("jsonView", jvo);
	}
	@RequestMapping(value = {"updatepassword.json"})
	@Secured("ROLE_ADMIN")
	public ModelAndView updatePassword(@RequestParam("username") String username,@RequestParam("password") String password ) {

		JsonVO jvo = new JsonVO();

		if (userService.updatePassword(username, password) == 1) {
			jvo.setSuccess(true);
			jvo.setMessage(MessageUtil.getMessage("common.msg.update.done"));
		} else {
			jvo.setSuccess(false);
			jvo.setMessage(MessageUtil.getMessage("common.msg.error"));
		}

		return new ModelAndView("jsonView", jvo);
	}
}
