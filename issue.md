## config/default.js里面session配置的作用

## 功能设计里面发表文章的路由设计为什么是
i.	 发表文章页: 	GET	/posts/create
ii.	 发表文章: 	POST	/posts
而不是:
i.	 发表文章页: 	GET	/post/create
ii.	 发表文章: 	POST /post/create
我的理解: 在发表文章页面GET	/post/new 点击"提交"按钮之后因为想直接跳转到/posts页面,所以就交给这个路由/posts对应的处理器

## 53页


