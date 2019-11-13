/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : platform

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 13/11/2019 16:34:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `thumb` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '缩略图url',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `author` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '作者',
  `hits` int(11) NULL DEFAULT NULL COMMENT '访问量',
  `category_id` int(11) NULL DEFAULT 1 COMMENT '分类id',
  `publish_status` int(11) NOT NULL DEFAULT 1 COMMENT '状态，0：禁用，1：启用',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (5, '测试文章A', '测试文章A的描述。。。', NULL, '<p>这是一篇测试文章</p><p><img src=\"data:image/png;base64,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\" style=\"max-width:100%;\"><br></p><p>今天天气很好，继续加油~</p>', NULL, NULL, 5, 1, '2019-11-06 09:41:40', '2019-11-06 09:41:40');
INSERT INTO `article` VALUES (6, '测试文章B', '测试文章B的描述字段是否可用', NULL, '<p><img src=\"//pic.maxiaoxiang.com/5902157d-8ddf-4826-9ec0-03022271c7e2.png\" style=\"max-width:100%;\"><br></p><p>今天天气是真的好</p><p>啊哈哈哈哈</p><p><img src=\"//pic.maxiaoxiang.com/bb6b6f01-6201-4e91-8fbb-30c94af855ed.png\" style=\"max-width:100%;\"><br></p>', NULL, NULL, 6, 1, '2019-11-06 13:56:58', '2019-11-06 14:00:04');

-- ----------------------------
-- Table structure for article_category
-- ----------------------------
DROP TABLE IF EXISTS `article_category`;
CREATE TABLE `article_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章分类id',
  `parent_id` int(11) NULL DEFAULT NULL COMMENT '父级id',
  `category_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `status` int(10) NOT NULL COMMENT '状态，0：禁用，1：启用',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_category
-- ----------------------------
INSERT INTO `article_category` VALUES (3, 0, '总分类', 1, '2019-11-05 15:30:49', '2019-11-05 15:30:49');
INSERT INTO `article_category` VALUES (4, 3, '日常', 1, '2019-11-05 15:30:55', '2019-11-05 15:30:55');
INSERT INTO `article_category` VALUES (5, 4, '生活', 1, '2019-11-05 15:31:01', '2019-11-05 15:31:01');
INSERT INTO `article_category` VALUES (6, 3, '学习', 1, '2019-11-05 15:31:07', '2019-11-05 15:31:07');
INSERT INTO `article_category` VALUES (7, 3, '新闻', 1, '2019-11-05 15:31:14', '2019-11-05 15:31:14');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转链接',
  `pic_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片key',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `publish_status` int(11) NOT NULL DEFAULT 1 COMMENT '状态，0：禁用，1：启用',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (2, '/', 'FvVw3-3d06p6R56pVEedfBFJJ6xW', '测试A', 1, '2019-11-06 14:56:45', '2019-11-06 14:56:45');
INSERT INTO `banner` VALUES (3, '/demo', 'Fuf1w8IAvrybJwCsK2Nl9AxYHhrm', '测试B', 1, '2019-11-06 14:57:08', '2019-11-06 14:57:08');
INSERT INTO `banner` VALUES (4, '/demo2', 'Fss9QfCYA8IIsbXFtxoAZRUnY_5s', '测试C', 1, '2019-11-06 14:57:30', '2019-11-06 14:57:30');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `publish_status` tinyint(10) UNSIGNED NOT NULL COMMENT '上下架状态，0：下架，1：上架',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `original_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '原价',
  `category_id` int(11) NULL DEFAULT 1 COMMENT '分类id',
  `pic_id` int(11) NOT NULL COMMENT '图片id',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pic_id`(`pic_id`) USING BTREE,
  CONSTRAINT `product_ibfk_3` FOREIGN KEY (`pic_id`) REFERENCES `product_pic_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (9, '阳光味道桑果汁', '来自新西兰最优桑果酿造而成', 1, NULL, NULL, 1, 4, '2019-08-28 16:23:04', '2019-11-04 16:33:57');
INSERT INTO `product` VALUES (10, '测试商品A', '这是一个好商品大减价', 1, NULL, NULL, 10, 5, '2019-11-01 16:37:38', '2019-11-04 16:35:04');
INSERT INTO `product` VALUES (11, '苹果', '红富士大苹果', 1, NULL, NULL, 11, 6, '2019-11-04 13:45:10', '2019-11-04 16:35:03');
INSERT INTO `product` VALUES (13, '菠萝蜜', '泰国菠萝蜜又大又甜', 1, NULL, NULL, 14, 8, '2019-11-04 14:02:13', '2019-11-04 16:35:00');
INSERT INTO `product` VALUES (14, '面包', '全麦面包吃不胖', 1, NULL, NULL, 16, 9, '2019-11-04 15:13:15', '2019-11-05 13:45:25');

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'category_id',
  `parent_id` int(11) UNSIGNED NULL DEFAULT 0 COMMENT '父级id',
  `category_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `status` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态，0：禁用，1：启用',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_category
-- ----------------------------
INSERT INTO `product_category` VALUES (1, 0, '总类目', 1, '2019-08-22 20:13:41', '2019-08-22 20:13:50');
INSERT INTO `product_category` VALUES (9, 1, '类目A', 1, '2019-08-22 20:14:22', '2019-10-31 20:05:52');
INSERT INTO `product_category` VALUES (10, 1, '类目B', 1, '2019-08-22 20:14:29', '2019-11-01 10:25:02');
INSERT INTO `product_category` VALUES (11, 9, '类目A-1', 0, '2019-08-22 20:14:37', '2019-11-01 10:47:55');
INSERT INTO `product_category` VALUES (14, 0, '类目C', 0, '2019-10-31 20:49:09', '2019-11-01 10:48:13');
INSERT INTO `product_category` VALUES (16, 9, '类目A-4', 1, '2019-11-01 10:56:20', '2019-11-01 11:11:25');

-- ----------------------------
-- Table structure for product_pic_info
-- ----------------------------
DROP TABLE IF EXISTS `product_pic_info`;
CREATE TABLE `product_pic_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片id',
  `pic_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'url',
  `pic_desc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `pic_order` tinyint(1) NOT NULL DEFAULT 0 COMMENT '排序',
  `is_master` tinyint(1) NULL DEFAULT 0 COMMENT '是否主图：0非主图，1主图',
  `pic_status` tinyint(1) NULL DEFAULT 1 COMMENT '图片是否有效：0无效，1有效',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_pic_info
-- ----------------------------
INSERT INTO `product_pic_info` VALUES (1, 'FpiyvKx8yET2D-dnNGIxm-Rn5dpH', NULL, 0, 0, 1, '2019-08-28 15:41:21', '2019-08-28 15:41:21');
INSERT INTO `product_pic_info` VALUES (2, '', NULL, 0, 0, 1, '2019-08-28 16:08:20', '2019-08-28 16:08:20');
INSERT INTO `product_pic_info` VALUES (3, '', NULL, 0, 0, 1, '2019-08-28 16:09:00', '2019-08-28 16:09:00');
INSERT INTO `product_pic_info` VALUES (4, 'Fiosnlp5xQ14Jcm5R2emqo4DtnA9', NULL, 0, 0, 1, '2019-08-28 16:23:04', '2019-08-28 16:23:04');
INSERT INTO `product_pic_info` VALUES (5, 'Fn5rNwA7lda8m4uD57hszp4v5vUu', NULL, 0, 0, 1, '2019-11-01 16:37:38', '2019-11-01 16:37:38');
INSERT INTO `product_pic_info` VALUES (6, 'FpbBgCnovBq1LeyFmx98mu0DnLrm', NULL, 0, 0, 1, '2019-11-04 13:45:10', '2019-11-04 13:45:10');
INSERT INTO `product_pic_info` VALUES (7, 'FsOsh9_oEfU2SnizBlUriXID2kuc', NULL, 0, 0, 1, '2019-11-04 14:01:45', '2019-11-04 14:01:45');
INSERT INTO `product_pic_info` VALUES (8, 'Fuc6crxLzp2SYPWRzX-VXjzsqncA', NULL, 0, 0, 1, '2019-11-04 14:02:13', '2019-11-04 14:02:13');
INSERT INTO `product_pic_info` VALUES (9, 'Fvd76NRdW9NZgp9_03RWABi9qOp3', NULL, 0, 0, 1, '2019-11-04 15:13:15', '2019-11-04 15:13:15');
INSERT INTO `product_pic_info` VALUES (10, '', NULL, 0, 0, 1, '2019-11-05 13:35:17', '2019-11-05 13:35:17');

-- ----------------------------
-- Table structure for upload
-- ----------------------------
DROP TABLE IF EXISTS `upload`;
CREATE TABLE `upload`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片id',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'host+hash',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of upload
-- ----------------------------
INSERT INTO `upload` VALUES (9, '5902157d-8ddf-4826-9ec0-03022271c7e2.png', '2019-11-06 13:59:54', '2019-11-06 13:59:54');
INSERT INTO `upload` VALUES (10, 'bb6b6f01-6201-4e91-8fbb-30c94af855ed.png', '2019-11-06 14:00:01', '2019-11-06 14:00:01');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `status` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态，0：禁用，1：启用',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '8e0a3adfcbb3b46c0210a9f268c35352', 1, '2019-07-10 15:31:17', '2019-07-12 13:28:18');
INSERT INTO `user` VALUES (2, 'test', '8e0a3adfcbb3b46c0210a9f268c35352', 1, '2019-07-10 15:37:58', '2019-10-29 13:49:45');
INSERT INTO `user` VALUES (3, 'admin1', 'e10adc3949ba59abbe56e057f20f883e', 1, '2019-07-11 15:03:00', '2019-10-29 13:49:37');
INSERT INTO `user` VALUES (4, 'admin2', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-07-11 15:04:04', '2019-08-01 15:11:23');
INSERT INTO `user` VALUES (9, 'test1', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-10-31 13:25:22', '2019-10-31 13:43:58');
INSERT INTO `user` VALUES (10, 'test2', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-10-31 13:27:41', '2019-10-31 13:43:58');
INSERT INTO `user` VALUES (11, 'test3', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-10-31 13:27:51', '2019-10-31 13:43:57');
INSERT INTO `user` VALUES (12, 'test4', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-10-31 13:27:54', '2019-10-31 13:43:57');
INSERT INTO `user` VALUES (13, 'test5', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-10-31 13:27:59', '2019-10-31 13:43:56');
INSERT INTO `user` VALUES (15, 'test7', 'e10adc3949ba59abbe56e057f20f883e', 1, '2019-10-31 13:28:08', '2019-10-31 13:28:08');
INSERT INTO `user` VALUES (16, 'test8', 'e10adc3949ba59abbe56e057f20f883e', 1, '2019-10-31 19:13:43', '2019-10-31 19:13:43');

SET FOREIGN_KEY_CHECKS = 1;
