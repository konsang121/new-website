# 新维智能 NEWDIM 官网

新维智能科技有限公司（NEWDIM INTELLIGENT TECHNOLOGY CO., LTD，柬埔寨金边）官方网站：服装智能制造设备的产品展示与询价。

- **纯静态网站**：HTML + CSS + JS，无需数据库或编译，上传到任何网站空间即可使用；也可以直接双击 `index.html` 在本地打开。
- **产品中心**：18 类机器、22 个合作品牌、286 款机型；同品牌同类型合并为一个商品，进入后选择型号与配置并询价。
- **S60 3D 展示**：首页和 `s60.html` 中可旋转、透视、拆解的上工 S60 无鸟巢电脑平缝机 3D 模型（three.js）。
- **中英文切换**：右上角切换中文 / English。

## 文件

| 文件 | 说明 |
|---|---|
| `index.html` | 网站首页（各页面用 `#` 路由切换） |
| `s60.html` | S60 3D 全屏展示页 |
| `app.js` / `data.js` / `styles.css` | 页面逻辑、产品数据、样式；联系方式在 `app.js` 开头的 `CONTACT` |
| `s60-3d.bundle.js` | 3D 展示脚本（已内含 three.js） |
| `assets/` | 图片、品牌标识、3D 模型（`s60/s60-meshy.glb` 及内嵌备份 `s60-meshy.glb.js`） |
| `web.config` / `.htaccess` | IIS / Apache 服务器配置 |

部署步骤见 [部署说明.txt](部署说明.txt)，第三方组件许可见 [THIRD_PARTY_LICENSES.txt](THIRD_PARTY_LICENSES.txt)。
