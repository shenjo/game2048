const elementCaches = {};
const colorScheme = {
  2:'#C3C5CC',
  4:'#5D6795',
  8:'#999999',
  16:'black',
  32:'#4990E2',
  64:'#00B718',
  128:'#F6A623',
  256:'#D7000F',
  512:'#2C79B4',
  1024:'#00508E',
};
const generateOneBlock = (id,value, options) => {
    const element = getElementByIdCache(id);
    const newElement = element.cloneNode();
    newElement.style.display = 'inline-block';
    newElement.innerHTML = value;
    newElement.style.color = 'white';
    newElement.style.background = colorScheme[value];
    return newElement;
};

const getElementByIdCache = id => {
    if (!elementCaches[id]) {
        elementCaches[id] = document.getElementById(id);
    }
    return elementCaches[id];
};



