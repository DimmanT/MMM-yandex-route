# MMM-yandex-route
![](https://github.com/DimmanT/MMM-yandex-route/blob/master/Screenshot.png)


Модуль для [MagicMirror](https://github.com/MichMich/MagicMirror) позволяющий отображать маршруты на карте, используя API Яндекс Карт.
Модуль разработан на основе [MMM-google-route](https://github.com/mrdis/MMM-google-route) .


 Этот модуль позволяет сделать следующее:
 
 1. Построить три автомобильных маршрута от точки 'origin' до точки 'destination', используя информацию о пробках.
 2. Отобразить построенные маршруты на карте. При этом карта будет автоматически отмасштабирована, чтобы уместить маршруты целиком.
 3. Показать информацию о наилучшем маршруте, а именно время в пути и преодолеваемое расстояние.
 
## Использование модуля
Клонируйте репозиторий в директорию с модулями:

MagicMirror/modules/
 
В конфигурационном файле MagicMirror/config/config.js добавьте модуль в массив модулей:
 
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
 
| **Параметр** | **Описание** |
| ------------- | ------------- |
| key | [API-ключ Яндекс Карт](#api-яндекс-карт) |
| origin |  Географические координаты стартовой точки |
| destination | Географические координаты конечной точки |
| refreshPeriod  | Время (в минутах) между обновлениями маршрута |
| height | Высота карты |
| width | Ширина карты |
| title | Заголовок, отображаемый над картой |

## API Яндекс Карт
Ключ для использования API можно получить на сайте Яндекс.Карт https://tech.yandex.ru/maps/

Чтобы получить ключ нужно зарегистрировать аккаунт разработчика и почту на Яндексе.
