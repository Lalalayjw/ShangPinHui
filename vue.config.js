const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
	  // open:true,
      port: 8080,
      host: '127.0.0.1',
	  proxy:{
		'/api':{
			target:'http://gmall-h5-api.atguigu.cn/',
			pathRewrite:{},
			changeOrigin:true,
		}  
	  },
    },
})
