# MMM-yandex-route
![](//screenshot.png)
 A module for [MagicMirror](https://github.com/MichMich/MagicMirror) designed for displaying routes on map, using Yandex API.
 Design is based on [MMM-google-route](https://github.com/mrdis/MMM-google-route)
 ## Using the module
 Clone this repository to modules directory:
 MagicMirror/modules/
 
 In configuration file config/config.js add module to modules array:
 
```javascript
//other modules
{
	module: "MMM-yandex-route",
	position: "bottom_center",
	config:
	{
		key: 'yandex-map-api-key',	//something like '0392e180-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
		origin:		[55.0,37.0],	
		destination:	[55.5,37.5],	
		refreshPeriod:	5,		//5 minutes
		height : "480px",		//height of map
		width  : "720px",		//width of map
		title  : "Название маршрута (Route title)"
	}
},
//other modules
```
 