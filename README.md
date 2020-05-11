# MMM-yandex-route
![](https://github.com/DimmanT/MMM-yandex-route/blob/master/Screenshot.png)


 A module for [MagicMirror](https://github.com/MichMich/MagicMirror) designed for displaying routes on map, using Yandex API.
 Design is based on [MMM-google-route](https://github.com/mrdis/MMM-google-route) .


 This module provides the following functions:
 
 1. Build three car routes from point 'origin' to point 'destination', using traffic information.
 2. Display builded routes on the map. The map will be autoscaled to show entire route.
 3. Show best route information, such as travel time and distance.
 
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
		title  : "Route title"
	}
},
//other modules
```
 
| **Option** | **Description** |
| ------------- | ------------- |
| key | [The Yandex-Maps API key](#yandex-map-api) |
| origin |  Geocoordinates of start point |
| destination | Geocoordinates of stop point |
| refreshPeriod  | The time (in minutes) between two route refreshes |
| height | Height of the map |
| width | Width of the map |
| title | Title, that will be displayed above the map |

## Yandex Map API
You can obtain an api-key for Yandex-Maps at https://tech.yandex.ru/maps/

To do this you should create developer account and email at yandex.
