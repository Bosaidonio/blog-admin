/*
 * @Date: 2022-10-06 16:06:13
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-08 16:00:13
 * @Description: 错误信息
 */
// 服务端错误
export const ServiceMessage = {
  INTERNAL_SERVER_ERROR: '服务器内部错误',
};
// 文章响应信息
export const ArticleMessage = {
  ARTICLE_NOT_FOUND: '文章不存在',
  ARTICLE_DELETE_FAILED: '文章删除失败',
  ARTICLE_CREATE_FAILED: '文章创建失败',
  ARTICLE_UPDATE_FAILED: '文章更新失败',
  ARTICLE_DELETE_SUCCESS: '文章删除成功',
  ARTICLE_GET_LIST_SUCCESS: '文章获取列表成功',
  ARTICLE_UPDATE_SUCCESS: '文章更新成功',
  ARTICLE_CREATE_SUCCESS: '文章创建成功',
  ARTICLE_GET_LIST_FAILED: '获取文章列表失败',
  ARTICLE_GET_DETAIL_SUCCESS: '获取文章详情成功',
  ARTICLE_GET_DETAIL_FAILED: '获取文章详情失败',
  ARTICLE_GET_HOT_FAILED: '获取热门文章失败',
  ARTICLE_GET_HOT_SUCCESS: '获取热门文章成功',
  ARTICLE_GET_RANDOM_SUCCESS: '获取随机文章成功',
  ARTICLE_GET_RANDOM_FAILED: '获取随机文章失败',
};
// 标签响应信息
export const TagMessage = {
  TAG_NOT_FOUND: '标签不存在',
  TAG_ALREADY_EXISTS: '标签已存在',
  TAG_CREATE_SUCCESS: '标签创建成功',
  TAG_DELETE_SUCCESS: '标签删除成功',
  TAG_UPDATE_SUCCESS: '标签更新成功',
  TAG_GET_LIST_SUCCESS: '获取标签列表成功',
  TAG_CREATE_FAILED: '标签创建失败',
  TAG_UPDATE_FAILED: '标签更新失败',
  TAG_DELETE_FAILED: '标签删除失败',
  TAG_GET_LIST_FAILED: '获取标签列表失败',
  TAG_GET_DETAIL_SUCCESS: '获取标签详情成功',
  TAG_GET_DETAIL_FAILED: '获取标签详情失败',
  TAG_IS_REFERENCED: '标签已被引用',
};
// 评论响应信息
export const CommentMessage = {
  COMMENT_NOT_FOUND: '评论不存在',
  COMMENT_CREATE_SUCCESS: '新增评论成功',
  COMMENT_DELETE_SUCCESS: '删除评论成功',
  COMMENT_UPDATE_SUCCESS: '更新评论成功',
  COMMENT_GET_LIST_SUCCESS: '获取评论列表成功',
  COMMENT_CREATE_FAILED: '新增评论失败',
  COMMENT_UPDATE_FAILED: '更新评论失败',
  COMMENT_DELETE_FAILED: '删除评论失败',
  COMMENT_GET_LIST_FAILED: '获取评论列表失败',
  COMMENT_GET_DETAIL_SUCCESS: '获取评论详情成功',
  COMMENT_GET_DETAIL_FAILED: '获取评论详情失败',
  COMMENT_ARTICLE_NOT_MATCH: '评论和文章不匹配',
};
// 用户响应信息
export const UserMessage = {
  USER_NOT_FOUND: '用户不存在',
  USER_ALREADY_EXISTS: '用户已存在',
  USER_DELETE_SUCCESS: '用户删除成功',
  USER_UPDATE_SUCCESS: '用户信息更新成功',
  USER_GET_LIST_SUCCESS: '获取用户列表成功',
  USER_UPDATE_FAILED: '用户信息更新失败',
  USER_DELETE_FAILED: '用户删除失败',
  USER_GET_LIST_FAILED: '获取用户列表失败',
  USER_GET_DETAIL_SUCCESS: '获取用户详情成功',
  USER_GET_DETAIL_FAILED: '获取用户详情失败',
  USER_LOGIN_SUCCESS: '用户登录成功',
  USER_LOGIN_FAILED: '用户登录失败',
  USER_LOGOUT_SUCCESS: '用户登出成功',
  USER_LOGOUT_FAILED: '用户登出失败',
  USER_REGISTER_SUCCESS: '用户注册成功',
  USER_REGISTER_FAILED: '用户注册失败',
  USER_PASSWORD_NOT_MATCH: '密码不匹配',
};
// 统计信息
export const StatisticsMessage = {
  BLOGINFO_GET_SUCCESS: '获取博客信息成功',
  BLOGINFO_GET_FAILED: '获取博客信息失败',
};
// AI信息
export const GptMessage = {
  GPT_GENERATE_SUCCESS: 'AI生成成功',
  GPT_GENERATE_FAILED: 'AI生成失败',
};
