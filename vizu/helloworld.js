(function() {

  // Paramètres globaux pour toutes les instances de la visualisation
  // Les constantes quoi
  let nbCircles = 50,
    circleRadius = 20;

  Vz.registerVizu( 'helloworld', function( renderer, stage, freqs, waves ) {
    // Phase d'initialisation
    let width = renderer.width,
      height = renderer.height;

    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xff00ff);
    graphics.drawCircle(0, 0, circleRadius/2);
    graphics.drawCircle(circleRadius, 0, circleRadius/2);
    graphics.drawEllipse(circleRadius/2, -circleRadius*2, circleRadius/2, circleRadius*2);
    graphics.endFill();

    let texture = renderer.generateTexture(graphics);
    let squares = [],
      i = nbCircles;

    for( let i=0 ; i<nbCircles ; i++ ) {
      let square = new PIXI.Sprite(texture);
      square.x = width / nbCircles * i;
      square.y = height / 2;
      stage.addChild( square );
      squares.push( square );
    }

    // Fonction appelée à chaque frame
    function frame() {
      let i = nbCircles;
      for( let i=0 ; i<nbCircles ; i++ ) {
        let iFreq = 1024 / nbCircles * i | 0;
        squares[i].y = height / 2 - freqs[iFreq];
        squares[i].alpha = (128-waves[iFreq]) / 8;
      }
    }

    return {
      frame: frame
    };
  });

})();
