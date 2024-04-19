let watchId;
const speedLimit = 60; // in km/h

function startSpeedometer() 
{
    if (navigator.geolocation) 
    {
        watchId = navigator.geolocation.watchPosition(displaySpeed, handleError, {
            enableHighAccuracy: true
        });
    } 
    else 
    {
        alert("Geolocation is not supported by this browser.");
    }
}

function stopSpeedometer() 
{
    if (watchId) 
    {
        navigator.geolocation.clearWatch(watchId);
        document.getElementById("current-speed").textContent = "0 km/h";
        document.getElementById("speed-warning").textContent = "";
    }
}

function displaySpeed(position) 
{
    const speedElement = document.getElementById("current-speed");
    const speed = position.coords.speed; // Speed in m/s

    if (speed !== null) 
    {
        const speedKmH = speed * 3.6; // Convert speed to km/h
        speedElement.textContent = speedKmH.toFixed(2) + " km/h";

        if (speedKmH > speedLimit) 
        {
            document.getElementById("speed-warning").textContent = "Warning: You are exceeding the speed limit!";
        } 
        else 
        {
            document.getElementById("speed-warning").textContent = "";
        }
    } 
    else 
    {
        speedElement.textContent = "N/A";
    }
}

function handleError(error) 
{
    console.error("Error getting current position:", error);
}
