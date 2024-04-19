let map, userMarker;

function initMap() {
    const center = { lat: 12.8688906, lng: 77.6650548 }; 
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });

    fetchCameraLocations();
}

function fetchCameraLocations() 
{
    const cameraLocations = [
        { lat: 12.870041, lng: 77.6507871 },
        { lat: 12.8688906, lng: 77.7507871 },   
    ];

    cameraLocations.forEach(location => {
        const cameraMarker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Traffic Camera",
        });
    });

    checkUserDistance(cameraLocations);
}

function checkUserDistance(cameraLocations) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        userMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
        });

        cameraLocations.forEach(cameraLocation => {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(userLocation.lat, userLocation.lng),
                new google.maps.LatLng(cameraLocation.lat, cameraLocation.lng)
            );

            const distanceKm = distance / 1000;

            if (distanceKm <= 1) 
            {
                document.getElementById("camera-warning").textContent = "Warning: Traffic camera ahead! Check your speed.";
                return; 
            } 
            else 
            {
                document.getElementById("camera-warning").textContent = "";
            }
        });
    });
}
