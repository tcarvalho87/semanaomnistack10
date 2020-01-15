module.exports = function parseStringAsarray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());
}