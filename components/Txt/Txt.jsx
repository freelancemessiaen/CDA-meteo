// Importation des composants Text et useWindowDimensions depuis react-native
import { Text, useWindowDimensions } from "react-native";
// Importation du style s depuis Txt.style
import { s } from './Txt.style'

// Définition du composant Txt avec des paramètres children (enfants) et style
export function Txt ({children, style}) {
    // Récupération de la hauteur de la fenêtre de l'appareil
    const {height} = useWindowDimensions();
    // Détermination de la taille de police par défaut 
    // (si style.fontSize n'est pas défini, utilise s.text.fontSize)
    const fontSize = style?.fontSize || s.text.fontSize
    // Calcul de l'échelle en fonction de la hauteur de la fenêtre 
    //(permet d'adapter la taille de police en fonction de la hauteur de l'écran)
    const echelle = 1 / height;

    // le calcul de la valeur se fait su rla valeur que l'on a défini
    // fontSize de 30 dans Txt.style.jsx pour les text
    // pour le calcul de echelle => fontSize * calcul * height doit renvoyer 30
    // Affichage de la taille de police résultante dans la console
    console.log(fontSize * echelle * height);

    // Retourne le composant Text avec le style modifié 
    // pour ajuster la taille de police en fonction de la hauteur de la fenêtre
    return <Text style= {[s.text, style, {fontSize: fontSize * echelle * height}]}>{children}</Text>
}