import placeholder from "../assets/placeholder.jpg";
import planet from "../assets/planet.png";
import moon from "../assets/moon.png";
import asteroid from "../assets/asteroids.png";
import gasgiant from "../assets/gasgiant.png";
import spaceorbital from "../assets/spaceorbital.webp";
import jumpgate from "../assets/jumpgate.png";

export const getPlanetImgByType = (type) => {
  const imageMap = {
    PLANET: planet,
    MOON: moon,
    ASTEROID_FIELD: asteroid,
    GAS_GIANT: gasgiant,
    ORBITAL_STATION: spaceorbital,
    JUMP_GATE: jumpgate,
    default: placeholder,
  };

  if (type in imageMap) {
    return imageMap[type];
  } else {
    return imageMap["default"];
  }
};
