
Module.register("MMM-yandex-route", 
{
    // Module config defaults
    defaults: 
	{
        key: 'apy_key',
		origin:			[55.000000, 37.000000],
		destination:	[55.000000, 37.000000],
        height: '300px',
        width : '300px',
        title : 'default title',
        fontSize:undefined,
		refreshPeriod: 1,
        showAge: true,
		connectionWait: 30
    },
	state: {
		waitCnt     		: undefined,
		ready       		: undefined,
        refreshTimer		: undefined,
        lastRefresh 		: undefined,
        ageTimer    		: undefined,
        overrideDestination : undefined
    },
    getDom: function () 
	{
        var main = document.createElement("div");
			main.style.width = this.config.width;
			
        var title = document.createElement("div");
			title.setAttribute   ("id", "title");
			title.style.width    = "100%";
			title.style.fontSize = this.config.fontSize;
			title.innerHTML      = this.config.title;

        var wrapper = document.createElement("div");
			wrapper.setAttribute ("id", "map");
			wrapper.style.height = this.config.height;
			wrapper.style.width  = "100%";
			wrapper.style.webkitFilter = "grayscale(1) invert(100%) contrast(100%) brightness(200%)";
		
		var info = document.createElement("div");
			info.style.width = "100%";
			var infoTable = document.createElement("table");
				infoTable.setAttribute ("id", "info");
				infoTable.style.height = "100%";
				infoTable.style.width  = "100%";

        main.appendChild(title);
        main.appendChild(wrapper);
		main.appendChild(info);
			info.appendChild(infoTable);
		
        var self = this;
		
		function clearInfo()
		{
            var table = infoTable;
            while(table.firstChild)
				  table.removeChild(table.firstChild);
        }
		function addInfo(dist_km,time)
		{
            var table = infoTable;
            var tr = document.createElement("tr");
            var distance = document.createElement("span");
            var duration = document.createElement("span");

                tr.classList.add("bright");
            
            distance.style.fontSize = self.config.fontSize;
            duration.style.fontSize = self.config.fontSize;
            duration.innerHTML = time;
            distance.innerHTML = dist_km;

            function addCell(tr,classname,content){
                var cell = document.createElement("td");                
                if(classname)
					cell.classList.add(classname);
                cell.appendChild(content);
                tr  .appendChild(cell);
            }
            addCell(tr,"dur" ,duration);
            addCell(tr,"dist",distance);
            table.appendChild(tr);
        } 
		
		
		function initYandexMap()
		{
			var myMap = new ymaps.Map("map", 
			{
				center	 : self.config.origin,
				zoom     : 10,
				controls : []
			});	
			var origin      = self.config.origin;		
			var destination = self.config.destination;	
			self.state.ready = 1;	//выставим флаг готовности к использованию карт яндекса
			
			function getRoutes()
			{
				myMap.geoObjects.removeAll();
				var myRoute = new ymaps.multiRouter.MultiRoute
				(
					{    
						referencePoints: [
							origin,
							destination  ],
						params: 
						{
							avoidTrafficJams: true
						}
					},			
					{
						// Внешний вид путевых точек.
						wayPointStartIconColor: 	"#FFFFFF",
						wayPointStartIconFillColor: "#777777",
						wayPointFinishIconColor: 	"#FFFFFF",
						wayPointFinishIconFillColor:"#777777",
						// Внешний вид линии активного маршрута.
						routeActiveStrokeWidth: 8,
						routeActiveStrokeStyle: 'solid',
						routeActiveStrokeColor: "#777777",
						// Внешний вид линий альтернативных маршрутов.
						routeStrokeColor: "#222222",
						routeStrokeStyle: 'solid',
						routeStrokeWidth: 5,
						activeRouteAutoSelection: true,
						boundsAutoApply: true		//автомасшт карты под маршрут
					}		 
				);
				// Подписка на событие обновления данных маршрута.
				myRoute.model.events.add('requestsuccess', function() 
				{
					var activeRoute = myRoute.getActiveRoute(); // Получение ссылки на активный маршрут.
					// Вывод информации о маршруте.
					clearInfo();
					addInfo(activeRoute.properties.get("distance").text,			
							activeRoute.properties.get("durationInTraffic").text);	// "durationInTraffic" uses traffic jams information, in contrast to "duration"
				}); 
				myMap.geoObjects.add(myRoute);  // Добавление маршрута на карту.
			}			
			getRoutes();					// Запрос на построение маршрутов.
			if(self.config.refreshPeriod)	// Запуск таймера на обновление маршрутов.
			{
                if(self.state.refreshTimer) 
					clearInterval(self.state.refreshTimer);
                self.state.refreshTimer = setInterval( getRoutes, 1000 * 60 * self.config.refreshPeriod );	//Период обновления задан в минутах.
            }   
		}//end of initYandexMap()
			
		self.state.ready   = 0;
		
		//функция ожидания и перезапроса загрузки карты.
		function waitMapsScript(){
            setTimeout(function()
			{
                try{
					console.log("------wait for map------- ");
                    if(ymaps && self.state.ready==0)	//ymaps - модуль яндекс-карт
					{
                        initYandexMap();
						console.log("initial succesfully complete");
                        return;
                    }
                }catch(e){}
                if(self.state.ready == 0)
					waitMapsScript();			//рекурсивный запуск следующей попытки
            },5000);
        }

		var mapsSrc = "https://api-maps.yandex.ru/2.1/?apikey=" + this.config.key + "&load=package.full&lang=ru_RU" ;
            var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = mapsSrc;
            document.body.appendChild(script);		
					
		waitMapsScript();
        return main;
    }
});
