### 1.copy these code to your console
```js
timeout=prompt("Set timeout ");
current=location.href;
if(timeout>0)
setTimeout('reload()',1000*timeout);
else
location.replace(current);
function reload(){
setTimeout('reload()',1000*timeout);
fr4me='<frameset cols=\'*\'>\n<frame src=\''+current+'\'/>';
fr4me+='</frameset>';
with(document){write(fr4me);void(close())};
}
```
### 2.input second
### 3.your window will fresh automatically
![example](https://github.com/mytac/Remodeling-plugins/blob/master/window-fresher/example.gif)
