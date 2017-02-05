百度和谷歌提供的搜索接口真的很好用，只要在form表单添加action属性，并在搜索框input添加name属性就可以实现搜索功能。
* 百度搜索
* 谷歌搜索
* 带自动提示的百度搜索
```
<!-- 百度搜索时action中的网址为http://www.baidu.com/baidu -->
<!-- 搜索框input的name属性值为wd或者word -->
<form action="http://www.baidu.com/baidu" target="_blank">
	<input type="text" name="wd" autofocus>
	<input type="submit" value="百度搜索">
</form>
```

```
<!-- 谷歌搜索时action中的网址为http://google.com/search -->
<!-- 搜索框input的name属性值为q -->
<form action="http://google.com/search" target="_blank">
	<input type="text" name="q" autofocus>
	<input type="submit" value="谷歌搜索">
</form>
```
