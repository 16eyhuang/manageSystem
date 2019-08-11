/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : mytest

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-08-11 20:43:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `uid` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `files` text COMMENT '文件',
  `files_description` varchar(255) DEFAULT NULL COMMENT '文件描述',
  `upload_time` bigint(12) DEFAULT NULL COMMENT '上传时间',
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for hitokoto
-- ----------------------------
DROP TABLE IF EXISTS `hitokoto`;
CREATE TABLE `hitokoto` (
  `id` int(11) NOT NULL,
  `hitokoto` text COMMENT '一段话',
  `source` varchar(255) DEFAULT NULL COMMENT '来源',
  `insert_time` bigint(12) DEFAULT NULL COMMENT '插入数据库的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '日志id',
  `operator` varchar(255) DEFAULT NULL COMMENT '操作者',
  `operationTime` bigint(12) DEFAULT NULL COMMENT '操作时间',
  `operationDescription` text COMMENT '操作描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `todoid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'todoid',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `todostate` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'todo状态，默认0为未完成，1为完成',
  `addTime` bigint(12) NOT NULL COMMENT 'todo添加的时间',
  `content` text NOT NULL COMMENT 'todo内容',
  PRIMARY KEY (`todoid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `utype` tinyint(1) unsigned DEFAULT '1' COMMENT '用户类型：0为管理员，1为普通用户',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` char(100) DEFAULT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `register_time` bigint(12) DEFAULT NULL COMMENT '注册时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态：0为禁用，1为启用',
  `avatar` char(255) DEFAULT NULL COMMENT '头像',
  `is_deleted` tinyint(1) DEFAULT '1' COMMENT '是否删除：0为已删除，1为未删除',
  `last_login_time` bigint(12) DEFAULT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
