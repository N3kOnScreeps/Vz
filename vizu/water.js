(function() {

  // Paramètres globaux pour toutes les instances de la visualisation
  // Les constantes quoi
  let cellSize = 30,
    shapeRadius = cellSize * 1.5,
    dampling = .9,
    blendMode = PIXI.BLEND_MODES.ADD;

  Vz.registerVizu( 'water', function( renderer, stage, freqs, waves ) {
    // Phase d'initialisation
    let width = renderer.width,
      height = renderer.height,
      xCells = renderer.width / cellSize + 2.5 | 0,
      yCells = renderer.height / cellSize + 2.5 | 0,
      cellCount = xCells * yCells,
      buffer1 = [], buffer2 = [],
      shapes = [],
      scale = chroma
        .scale(['#333333','#00569e','#0099ee'])
        // .domain([0, .01, 1])
        .mode( 'lab' )
        .colors(100)
        .map(function(color) {
          return parseInt(color.substr(1), 16);
        });

    function initBuffers() {
      let y = yCells;
      while( y-- ) {
        let x = xCells;
        while( x-- ) {
          buffer1.push( 0 );
          buffer2.push( 0 );
        }
      }
    }

    function initShapes() {
      let graphics = new PIXI.Graphics();
      graphics.beginFill(0xffffff);
      // graphics.drawCircle(0, 0, shapeRadius);
      graphics.drawRect(0, 0, shapeRadius, shapeRadius);
      graphics.endFill();

      let shapeTexture = renderer.generateTexture(graphics);

      for( let y=0 ; y<yCells ; y++ ) {
        for( let x=0 ; x<xCells ; x++ ) {
          let shape = new PIXI.Sprite(shapeTexture);
          shape.x = (x-.5) * cellSize;
          shape.y = (y-.5) * cellSize;
          shape.anchor.set(.5);
          shape.rotation = Math.PI * .25;
          shape.alpha = .5;
          shape.blendMode = blendMode;
          stage.addChild( shape );
          shapes.push( shape );
        }
      }
    }

    initBuffers();
    initShapes();

    function swapBuffers() {
      let tmp = buffer1;
      buffer1 = buffer2;
      buffer2 = tmp;
    }

    function processWater() {
      for( let y=1 ; y<yCells-1 ; y++ ) {
        for( let x=1 ; x<xCells-1 ; x++ ) {
          let i = x + y*xCells;
          buffer1[ i ] =
            (buffer2[i-1] + buffer2[i+1] + buffer2[i-xCells] + buffer2[i+xCells]) / 2
            - buffer1[i];
          buffer1[i] *= dampling;
        }
      }
    }

    function updateShapes() {
      let i = cellCount;
      while( i-- ) {
        shapes[i].scale.set( buffer1[i]/2 + 1 );

        let iColor = (buffer1[i] / 1.1) * 100 + .5 | 0;
        if( iColor < 0 ) iColor = 0;
        else if( iColor > 99 ) iColor = 99;
        shapes[i].tint = scale[ iColor ];
      }
    }

    function applyFreqs() {
      for( let x=1 ; x<xCells-1 ; x++ ) {
        let i = (x-1) / (xCells-1) * 1024 + .5 | 0,
          y = freqs[i] / 256 * (yCells-2) + 1.5 | 0;

        if( y > 1 ) {
          y = yCells - y;
          buffer1[x + y*xCells] = 1.1;
        }
      }
    }

    // Fonction appelée à chaque frame
    function frame() {
      swapBuffers();
      processWater();

      applyFreqs();

      updateShapes();
    }

    return {
      frame: frame
    };
  });

})();
