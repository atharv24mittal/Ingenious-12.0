let map, selectedParkingMarker;

function initMap() 
{
    const center = { lat: 12.8688906, lng: 77.6650548 }; 
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });
    fetchParkingLocations();
}

function fetchParkingLocations() 
{
    const parkingLocations = [
        { lat: 12.8688906, lng: 77.6650546 }, 
        { lat: 12.8688906, lng: 77.6650544 },    
        
    ];


    parkingLocations.forEach(location => 
        {
        const parkingMarker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Parking",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/parkinglot.png",
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        parkingMarker.addListener("click", function() 
        {
            handleParkingClick(this.getPosition());
        });
    });
}

function handleParkingClick(position) 
{
    if (selectedParkingMarker) 
    {
        selectedParkingMarker.setIcon("https://maps.google.com/mapfiles/ms/icons/parkinglot.png");
    }
    selectedParkingMarker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Selected Parking",
        icon: 
        {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(40, 40)
        }
    });
    document.getElementById("selected-parking").textContent = "Selected Parking: " + position.lat().toFixed(6) + ", " + position.lng().toFixed(6);
}

function markParkingAvailable() 
{
    if (selectedParkingMarker) 
    {
        selectedParkingMarker.setIcon("https://maps.google.com/mapfiles/ms/icons/green-dot.png");
    }
}

function markParkingUnavailable() 
{
    if (selectedParkingMarker) 
    {
        selectedParkingMarker.setIcon("https://maps.google.com/mapfiles/ms/icons/red-dot.png");
    }
}
