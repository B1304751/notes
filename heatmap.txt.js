yAxisLeftTag // lable trai tren truc Y: Time, Day, Week
yAxisRightTag // label phai tren truc Y: 6am - 12am, ...
xAxisTopTags // label tren cua truc X: 0 5 10 15 20 25 30
xAxisBottomTags // label duoi cua truc X: Day, Week
addTimeBlock(canvas, x, y, timeSlotObjectKey, timeSlotObjectValue, timeBlockRange) //them mot timeblock cho heatmap, nhan vao chart object, toa do (x,y) cua block
addXaxisLabels() //set label cho truc X
addYaxisLabels() //set label cho truc Y
createHeatmapCanvas(port, canvasHeight, canvasWidth) // tao mot heatmap object cho mot port cu the voi kich thuoc xac dinh
timeblock :
	+ thap : xanh la
	+ trung binh : vang 
	+ cao : do 




function createWeekHeatMap(port) { //Tao chart heatmap cho mot tuan
                var yAxisRightTags = ["6pm - 0am", "12pm - 6pm", "6am - 12pm", "0am - 6am"]; // dinh nghia cac khoang thoi gian hien thi tren truc Y bang mot array 
                var xAxisTopTags = []; // khoi tao tag array cho cac label tren truc X
                var timeKeysMap = { // object nay dung de dinh nghia cho set lable tren truc Y
                    "zero_to_six"  : {
                        yAxisIndex: 3,
                        startTime : "00:00",
                        endTime   : "05:59"
                    },
                    "six_to_twelve": {
                        yAxisIndex: 2,
                        startTime : "06:00",
                        endTime   : "11:59"
                    },
                    "twelve_to_six": {
                        yAxisIndex: 1,
                        startTime : "12:00",
                        endTime   : "17:59"
                    },
                    "six_to_zero"  : {
                        yAxisIndex: 0,
                        startTime : "18:00",
                        endTime   : "23:59"
                    }
                };
                angular.forEach(port.portDetail.events, function (event) { // voi tuan tu moi event cua port theo timestamp object xAxisTopTags se nhan vao 1 timestamp event
                    xAxisTopTags.push(getDateDayIndex(event.timeStamp)); // 1 5 10 15 20 25 30 (nhan tren truc X)
                });

                var canvas = createHeatmapCanvas(port, 200, 350); // tao chart object 
                addYaxisLabels(canvas, "Time", yAxisRightTags, 40, 100); // set lable cho truc Y
                addXaxisLabels(canvas, xAxisTopTags, yAxisRightTags.length, "Days"); // set label cho truc X

                var i = 0;
                angular.forEach(port.portDetail.events, function (event) {
                    var date = dateFilter(event.timeStamp, "yyyy/MM/dd");
                    angular.forEach(event.eventInfo, function (timeSlotObjectValue, timeSlotObjectKey) { 
                        var timeBlockRange = date + " " + timeKeysMap[timeSlotObjectKey].startTime + "-" + timeKeysMap[timeSlotObjectKey].endTime; // timeblockRange dinh nghia cac khoang bat dau va ket thuc cua mot timeblock
                        addTimeBlock(canvas, i * gridSize, timeKeysMap[timeSlotObjectKey].yAxisIndex * gridSize, // tao mot timeblock cho tung event timestamp nhan vao 
                            timeSlotObjectKey, timeSlotObjectValue, timeBlockRange);
                    });
                    i++;
                });
            }
