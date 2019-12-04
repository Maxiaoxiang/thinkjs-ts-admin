module.exports = [
    // [/\/api\/(\w+)(?:\/(\d+))?/, 'api/:1?id=:2', 'rest'],
    // [/\/api\/login(?:\/(\d+))?/, 'api/login?id=:1', 'rest'],
    /**
     * admin后台模块
     */
    ['/admin/login/', 'rest'],
    ['/admin/user/:id?', '/admin/user', 'rest'], // 用户管理
    ['/admin/product/:id?', '/admin/product', 'rest'], // 商品管理
    ['/admin/product_category/:id?', '/admin/product_category', 'rest'], // 商品分类管理
    ['/admin/article/:id?', '/admin/article', 'rest'], // 文章管理
    ['/admin/article_category/:id?', '/admin/article_category', 'rest'], // 文章分类管理
    ['/admin/banner/:id?', '/admin/banner', 'rest'], // 文章管理
    ['/admin/token/:type?', '/admin/token', 'rest'], // 上传token
    ['/admin/role/:id?', '/admin/role', 'rest'], // 角色管理
    ['/admin/jurisdiction/:id?', '/admin/jurisdiction', 'rest'], // 权限管理
    ['/admin/menu/:id?', '/admin/menu', 'rest'], // 菜单管理
    /**
     * www前台模块
     */
    ['/www/product/:id?', '/www/product', 'rest'], // 商品列表
    /**
     * 公用接口
     */
    ['/upload/', '/upload', 'rest'], // 上传
];