module.exports = [
    // [/\/api\/(\w+)(?:\/(\d+))?/, 'api/:1?id=:2', 'rest'],
    // [/\/api\/login(?:\/(\d+))?/, 'api/login?id=:1', 'rest'],
    /**
     * admin后台模块
     */
    ['/admin/login/', 'rest'],
    ['/admin/user/:id?', '/admin/user', 'rest'], // 用户
    ['/admin/product/:id?', '/admin/product', 'rest'], // 商品
    ['/admin/product_category/:id?', '/admin/product_category', 'rest'], // 商品分类
    ['/admin/article/:id?', '/admin/article', 'rest'], // 文章
    ['/admin/article_category/:id?', '/admin/article_category', 'rest'], // 文章分类
    ['/admin/banner/:id?', '/admin/banner', 'rest'], // 文章
    ['/admin/token/:type?', '/admin/token', 'rest'], // 上传token
    /**
     * www前台模块
     */
    ['/www/product/:id?', '/www/product', 'rest'], // 商品列表
    /**
     * 公用接口
     */
    ['/upload/', '/upload', 'rest'], // 上传
];