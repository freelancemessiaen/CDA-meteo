import { s } from './Home.style'
import  { MeteoAPI } from '../api/meteo'
import { Text, View } from 'react-native'
import { Txt } from '../components/Txt/Txt'
import { MeteoBasic } from '../components/MeteoBasic/Meteobasic'
// Import des fonctions pour gérer la localisation depuis Expo
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'; 
// Import des fonctions useEffect et useState de React
import { useEffect, useState } from 'react'; 
import { getWeatherInterpretation } from '../components/services/meteo-services'  // Service pour interpréter la météo

export function Home () {
    const [coords ,setCoords] = useState(); // Déclaration d'un état pour stocker les coordonnées de l'utilisateur 
    const [weather ,setWeather] = useState(); 
    const currentWeather = weather?.current_weather; // Données météorologiques actuelles
    useEffect(() => { // Utilisation de useEffect pour exécuter une action une seule fois après le rendu initial
        getUserCoords(); // Appel de la fonction getUserCoords
    },[])

    useEffect(() => { 
        if (coords) {
            fetchWeather(coords) // Appel de fetchWeather lorsque les coordonnées sont disponibles
        }
    },[coords])

    
    async function getUserCoords() { // Définition de la fonction asynchrone getUserCoords pour obtenir les coordonnées de l'utilisateur
        let {status } = await requestForegroundPermissionsAsync(); // Demande de permissions d'accès à la localisation
        if (status === "granted") { // Si les permissions sont accordées
            const location = await getCurrentPositionAsync();  // Obtenir la position actuelle de l'utilisateur
            setCoords({lat: location.coords.latitude, lng: location.coords.longitude}); // Mettre à jour les coordonnées dans l'état
            
        }else {  // Si les permissions sont refusées
            setCoords({lat: "48.85", lng: "2.35"});  // Définir des coordonnées par défaut (Paris)
        }
    }

    async function  fetchWeather (coordinates) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates);
        setWeather(weatherResponse); // Mise à jour des données météorologiques dans l'état
    }

    return (
        currentWeather?
        <>
            <View style={s.meteo_basic}>
                <MeteoBasic 
                temperature={Math.round(currentWeather?.temperature)}
                city="Paris"
                interpretation={getWeatherInterpretation(currentWeather.weathercode)}
               />
            </View>
            <View style={s.searchbar}></View>
            <View style={s.meteo_advanced}></View>
        </>
        : null
    )
}