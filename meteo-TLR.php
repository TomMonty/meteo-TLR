<?php
/*
Plugin Name: meteo-TLR
Description: A plugin that displays the user's current location and weather information using the OpenWeather API and Leaflet.js.
Version: 3.2
Author: Tom Monty
*/

// Ajout des styles et scripts nécessaires
add_action('wp_enqueue_scripts', 'meteo_tlr_enqueue_assets');

function meteo_tlr_enqueue_assets()
{
    // Chargement des fichiers CSS et JS de Leaflet.js (bibliothèque pour les cartes interactives)
    wp_enqueue_style('leaflet', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
    wp_enqueue_script('leaflet', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js', array(), null, true);

    // Chargement des fichiers CSS et JS personnalisés pour le plugin
    wp_enqueue_style('meteo-tlr-style', plugin_dir_url(__FILE__) . 'css/meteo-TLR.css');
    wp_enqueue_script('meteo-tlr-script', plugin_dir_url(__FILE__) . 'js/meteo-TLR.js', array('leaflet'), '1.0', true);

    // Envoi des données dynamiques au script JS via la fonction wp_localize_script
    wp_localize_script('meteo-tlr-script', 'meteoTLRData', array(
        'apiKey' => 'bc60193a0ca43b08b77bcfc9d7d01e71', // Clé API OpenWeather (remplacez par votre propre clé)
        'ajaxUrl' => admin_url('admin-ajax.php'), // URL pour gérer les requêtes AJAX
    ));
}

// Création d'un shortcode pour afficher le plugin dans WordPress
add_shortcode('meteo_tlr', 'meteo_tlr_shortcode');

function meteo_tlr_shortcode()
{
    // Structure HTML du plugin, comprenant une carte (Leaflet.js) et une section d'informations météo
    return '
        <div id="meteo-tlr">
            <div id="meteo-tlr-inner">
                <div id="meteo-tlr-map"></div> <!-- Conteneur pour la carte interactive -->
                <div id="meteo-tlr-info"> <!-- Section d\'informations météo -->
                    <button id="locate-button" class="hidden">📍 Revenir à ma position</button>
                    <div class="meteo-content">
                        <div class="meteo-icon">
                            <img src="https://via.placeholder.com/100" alt="Weather Icon"> <!-- Icône météo -->
                        </div>
                        <div class="meteo-details">
                            <h2>Chargement...</h2> <!-- Texte par défaut lors du chargement -->
                            <p class="description">Nous récupérons vos informations météo.</p>
                            <p class="temp-current"><strong>-°C</strong></p> <!-- Température actuelle -->
                            <p class="temp-range"> 🌡️ Max : -°C | ❄️ Min : -°C</p> <!-- Températures max/min -->
                        </div>
                    </div>
                </div>
            </div>
        </div>';
}

// Ajout des hooks AJAX pour les utilisateurs connectés et non connectés
add_action('wp_ajax_nopriv_get_meteo_tlr', 'get_meteo_tlr'); // Pour les utilisateurs non connectés
add_action('wp_ajax_get_meteo_tlr', 'get_meteo_tlr'); // Pour les utilisateurs connectés

function get_meteo_tlr()
{
    // Récupération de la latitude et de la longitude depuis les données POST
    $lat = isset($_POST['lat']) ? sanitize_text_field($_POST['lat']) : null;
    $lon = isset($_POST['lon']) ? sanitize_text_field($_POST['lon']) : null;

    if (!$lat || !$lon) {
        wp_send_json_error('Latitude or longitude missing.'); // Envoi d'une erreur si les coordonnées sont manquantes
        return;
    }

    // Construction de l'URL pour l'API OpenWeather avec les coordonnées et l'unité en Celsius
    $apiKey = ''; //Mettre votre clé API ici
    $url = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&units=metric&appid=$apiKey";

    // Requête pour récupérer les données météo depuis OpenWeather
    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        wp_send_json_error('Error fetching weather data.'); // Gestion des erreurs réseau
        return;
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);

    if (!isset($data['main'])) {
        wp_send_json_error('Weather data not found.'); // Vérifie que les données météo sont disponibles
        return;
    }

    // Envoi des données météo en réponse JSON
    wp_send_json_success($data);
}
