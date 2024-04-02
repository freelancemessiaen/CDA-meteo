import { s } from './Home.style'
import  { MeteoAPI } from '../api/meteo'
import { Text, View } from 'react-native'
import { Txt } from '../components/Txt/Txt'
import { MeteoBasic } from '../components/MeteoBasic/Meteobasic'
import { MeteoAdvanced } from '../components/MeteoAdvanced/MeteoAdvanced'
// Import des fonctions pour gérer la localisation depuis Expo
import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'; 
// Import des fonctions useEffect et useState de React
import { useEffect, useState } from 'react'; 
import { getWeatherInterpretation } from '../components/services/meteo-services'  // Service pour interpréter la météo
import { useNavigation } from '@react-navigation/native'
import { Container } from '../components/Container/Container'

export function Home () {
    const [coords ,setCoords] = useState(); // Déclaration d'un état pour stocker les coordonnées de l'utilisateur 
    const [weather ,setWeather] = useState(); 
    const currentWeather = weather?.current_weather; // Données météorologiques actuelles
    const [city, setCity] = useState(city);
    const nav = useNavigation();
    useEffect(() => { // Utilisation de useEffect pour exécuter une action une seule fois après le rendu initial
        getUserCoords(); // Appel de la fonction getUserCoords
    },[])

    useEffect(() => { 
        if (coords) {
            fetchWeather(coords) 
            fetchCity(coords)
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

    async function  fetchCity (coordinates) {
        const cityResponse = await MeteoAPI.fetchCityFromCoords(coordinates);
        setCity(cityResponse);
    }

    function goToForecastPage() {
        nav.navigate("Forecast",{city, ...weather.daily})
    }
    return (
        currentWeather?
        <Container>
            <View style={s.meteo_basic}>
                <MeteoBasic 
                temperature={Math.round(currentWeather?.temperature)}
                city={city}
                interpretation={getWeatherInterpretation(currentWeather.weathercode)}
                onPress= {goToForecastPage}
               />
            </View>
            <View style={s.searchbar}></View>
            <View style={s.meteo_advanced}>
                <MeteoAdvanced 
                    wind={currentWeather.windspeed} 
                    dusk={weather.daily.sunrise[0].split("T")[1]} 
                    dawn={weather.daily.sunset[0].split("T")[1]}/>
            </View>
        </Container>
        : null
    )
}