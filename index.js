const makePixels = function() {
    let edgeSize = parseInt(document.getElementById('edgeSize').value);
    let imageNumberString = document.getElementById('imageCode').value;

    if(!imageNumberString.match(/^\d*$/g)) {
        console.log('Letter present');
        return Error('Letter in numerical input');
    }

    let imageNumber = BigInt(imageNumberString);

    //Display error message
    if (edgeSize > 100) {
        return Error('Image size to big. Try on less than 32.');
    } else if (imageNumber > BigInt(2)**(BigInt(edgeSize**2))) {
        return Error('Image number code larger than the biggest possible value.');
    };

    let pixelArea = document.getElementById('pixel-area');

    if(document.getElementById('pixel-grid')) {
        let oldPix = document.getElementById('pixel-grid');
        pixelArea.removeChild(oldPix);
    };

    let pixelGrid = document.createElement('div');
    pixelGrid.setAttribute('id', 'pixel-grid');
    pixelGrid.setAttribute('class', 'grid-container');
    pixelGrid.setAttribute('style', `display:inline-grid;grid-template-columns: repeat(${edgeSize}, 1fr);grid-template-rows: repeat(${edgeSize}, 1fr)`);

    pixelArea.appendChild(pixelGrid);

    let pixelGridElem = document.getElementById('pixel-grid');
    
    let binaryPad = '';
    let i = 0
    while (i < edgeSize**2) {
        binaryPad = binaryPad + '0';
        i += 1;
    };

    let binaryImageNum = imageNumber.toString(2);
    binaryImageNum = (binaryPad + binaryImageNum).substr(binaryImageNum.length);

    let j = 0;
    while (j < binaryImageNum.length) {
        let binaryDigit = binaryImageNum.charAt(j);

        let pixel = document.createElement('div');
        pixel.setAttribute('class', 'grid-item');

        if (binaryDigit == "0") {
            pixel.setAttribute('style', 'background-color: rgba(0, 0, 0, 1)');
        } else if (binaryDigit == "1") {
            pixel.setAttribute('style', 'background-color: rgba(255, 255, 255, 1)');
        };

        pixelGridElem.appendChild(pixel);

         j += 1;
    };
};

//Smiley face e.g. 10x312578409917852291349291202812