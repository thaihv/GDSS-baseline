package com.uitgis.ubps.system.user.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.uitgis.ubps.system.user.mapper.UserMapper;
import com.uitgis.ubps.system.user.vo.UserVO;

/**
 * @author Thaihv
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class UserService {

    @Autowired
    private UserMapper userMapper;
	
	public UserVO getUserVOAnotation(String USERNAME) {
		// TODO Auto-generated method stub
		return userMapper.getUserVOAnotation(USERNAME);
	}

	public UserVO getUserVO(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.getUserVO(vo);
	}

	public int deleteUser(UserVO vo) {
		// TODO Auto-generated method stub
		return userMapper.deleteUser(vo);
	}
	public List<UserVO> getList(){
		return userMapper.getList();
		
	}

	public int updateUserVO(UserVO vo){
		return userMapper.updateUserVO(vo);
		
	}
	public int updatePassword(String USERNAME,String PASSWORD){
		return userMapper.updatePassword(USERNAME, PASSWORD);
	}	
	public int createUserVO(UserVO vo){
		return userMapper.createUserVO(vo);
	}

	public List<UserVO> getPagingList(UserVO vo){
		return userMapper.getPagingList(vo);

	}

	public int getListCount(){
		return userMapper.getListCount();
		
	}	
}
