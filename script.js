    let lat=0;
    let lon=0;
document.getElementById("get-city").addEventListener("click",()=>{
    let city=document.getElementById("city-input").value;
    console.log(city);
    let apiKey="Write your own API";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        if (data.cod === "404") {
            console.log("City not found. Please try again");
        } else if (data.cod === "401") {
            console.log("Invalid API key. Check your API key.");
        }else {
            document.getElementById("city-name").innerHTML=`${data.name} , ${data.sys.country}`;
            const utcTime = new Date(data.dt * 1000); 
            const istTime = new Date(utcTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
            document.getElementById("date-time").innerHTML = istTime.toLocaleString("en-IN", { 
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata"
                });
            document.getElementById("main-temp").innerHTML=`${data.main.temp}°C`;
            document.getElementById("main-weather").innerHTML=`${data.weather[0].main}`;
            console.log(data.main.temp_max);
            console.log(data.main.temp_min);
            document.getElementById("main-temp2").innerHTML=`${data.main.temp_min}°C`;
            document.getElementById("main-temp1").innerHTML=`${data.main.temp_max}°C`;
            lat=data.coord.lat;
            lon=data.coord.lon;
            document.getElementById("wind-wqua").innerHTML=`${data.wind.speed}`;
            document.getElementById("h-hqua").innerHTML=`${data.main.humidity}`;
            document.getElementById("visi-vqua").innerHTML=`${data.visibility}`;
            document.getElementById("press-pqua").innerHTML=`${data.main.pressure}`
        
            const url1 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            return fetch(url1);
        } 
    })
    .then(respond=>respond.json())
    .then(data1=>{
        if (data1.cod === "404") {
            console.log("City not found. Please try again");
        } else if (data1.cod === "401") {
            console.log("Invalid API key. Check your API key.");
        }else{
            const aqi = data1.list[0].main.aqi; 
            const airQualityLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
            document.getElementById("air-aqua").innerHTML = `${airQualityLevels[aqi - 1]}`; 
        }
    })
});
