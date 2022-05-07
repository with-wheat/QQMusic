import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 如果这里飘红则安装下依赖。
// pnpm add @types/node -D
// npm install @types/node -D
// yarn add @types/node -D
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    // 配置别名
    alias: {
      "@": resolve(__dirname, "src")
    },
    extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名
  },
  server: {
    proxy: {
      // 选项写法
      "/api": {
        target: "http://localhost:9000", // 所要代理的目标地址
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true // true/false, 默认值:false - 将主机报头的来源更改为目标URL
      }
    }
  }
  // 此时会通过上面的代理规则，将源地址代理到目标地址，从而访问目标地址的接口
  // 需要注意的是 /api开头的 /不能丢，正则匹配也是
});
``;
