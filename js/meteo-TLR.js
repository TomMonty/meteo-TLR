document.addEventListener('DOMContentLoaded', function () {
    // Récupération des éléments HTML nécessaires
    const mapContainer = document.getElementById('meteo-tlr-map'); // Conteneur de la carte
    const locateButton = document.getElementById('locate-button'); // Bouton pour revenir à la position initiale
    const infoContainer = document.getElementById('meteo-tlr-info'); // Conteneur des informations météo

    let userLat = null; // Latitude de l'utilisateur
    let userLon = null; // Longitude de l'utilisateur
    let marker = null; // Marqueur sur la carte
    let map = null; // Référence à la carte Leaflet

    /**
     * Met à jour les informations météo affichées dans l'interface utilisateur.
     * @param {number} lat - Latitude de l'emplacement.
     * @param {number} lon - Longitude de l'emplacement.
     */
    function updateWeatherInfo(lat, lon) {
        // Requête AJAX vers le serveur WordPress pour obtenir les données météo
        fetch(meteoTLRData.ajaxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'get_meteo_tlr', // Action AJAX définie dans WordPress
                lat: lat, // Latitude envoyée
                lon: lon, // Longitude envoyée
            }),
        })
            .then((response) => response.json()) // Conversion de la réponse en JSON
            .then((data) => {
                if (data.success) {
                    // Extraction des données météo
                    const weather = data.data;
                    const { temp, temp_min, temp_max } = weather.main; // Températures
                    const icon = weather.weather[0].icon; // Icône météo
                    const description = weather.weather[0].description; // Description météo

                    // Mise à jour du conteneur d'informations météo
                    infoContainer.innerHTML = `
                        <div class="meteo-content">
                            <div class="meteo-icon">
                                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}" />
                            </div>
                            <div class="meteo-details">
                                <h2>${weather.name || `Coordonnées : ${lat}, ${lon}`}</h2>
                                <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                                <p class="temp-current"><strong>${temp}°C</strong></p>
                                <p class="temp-range">🌡️ Max : ${temp_max}°C | ❄️ Min : ${temp_min}°C</p>
                            </div>
                        </div>
                    `;
                    // Ajoute le bouton de localisation à la fin du conteneur
                    infoContainer.appendChild(locateButton);
                } else {
                    console.error('Error: Unable to fetch weather data');
                }
            })
            .catch((error) => {
                console.error('Error fetching weather information:', error);
            });
    }

    // Vérifie si la géolocalisation est prise en charge par le navigateur
    if (navigator.geolocation) {
        // Obtient la position actuelle de l'utilisateur
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLat = position.coords.latitude; // Latitude de l'utilisateur
                userLon = position.coords.longitude; // Longitude de l'utilisateur

                // Initialise la carte avec Leaflet.js centrée sur la position de l'utilisateur
                map = L.map(mapContainer).setView([userLat, userLon], 15);

                // Ajoute des tuiles OpenStreetMap à la carte
                L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                    maxZoom: 19,
                }).addTo(map);

                // Ajoute un marqueur sur la position actuelle de l'utilisateur
                marker = L.marker([userLat, userLon]).addTo(map);
                updateWeatherInfo(userLat, userLon); // Met à jour les informations météo

                // Ajoute un événement de clic sur la carte
                map.on('click', (e) => {
                    const newLat = e.latlng.lat; // Nouvelle latitude
                    const newLon = e.latlng.lng; // Nouvelle longitude

                    // Affiche ou masque le bouton de localisation en fonction de la distance par rapport à la position initiale
                    if (Math.abs(newLat - userLat) > 0.001 || Math.abs(newLon - userLon) > 0.001) {
                        locateButton.classList.add('button-visible');
                        infoContainer.classList.add('button-visible');
                    } else {
                        locateButton.classList.remove('button-visible');
                        infoContainer.classList.remove('button-visible');
                    }

                    // Déplace le marqueur et met à jour les informations météo
                    marker.setLatLng([newLat, newLon]);
                    updateWeatherInfo(newLat, newLon);
                });

                // Ajoute un événement au bouton pour revenir à la position initiale
                locateButton.addEventListener('click', () => {
                    map.setView([userLat, userLon], 15); // Recentre la carte sur la position initiale
                    marker.setLatLng([userLat, userLon]); // Déplace le marqueur à la position initiale
                    updateWeatherInfo(userLat, userLon); // Met à jour les informations météo
                    locateButton.classList.remove('button-visible'); // Masque le bouton
                    infoContainer.classList.remove('button-visible'); // Rétracte le conteneur d'infos si nécessaire
                });

                infoContainer.appendChild(locateButton); // Place le bouton dans le conteneur
            },
            (error) => {
                console.error('Geolocation error:', error); // Gestion des erreurs de géolocalisation
                infoContainer.innerHTML = `<p>Impossible de récupérer votre position géographique.</p>`;
            }
        );
    } else {
        // Affiche un message si la géolocalisation n'est pas supportée
        infoContainer.innerHTML = `<p>La géolocalisation n’est pas prise en charge par votre navigateur.</p>`;
    }
});
