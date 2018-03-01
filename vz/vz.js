(function() {

  function Vz( canvasEl, audioEl ) {
    this.initCanvas( canvasEl );
  }

  Vz.prototype.initCanvas = function( canvasEl ) {
    this.canvasEl = canvasEl;

    var $canvas = $( canvasEl );

    // Get the screen width and height
    var width = $canvas.width();
    var height = $canvas.height();

    // Chooses either WebGL if supported or falls back to Canvas rendering
    this.renderer = new PIXI.autoDetectRenderer( width, height, this.canvasEl );

    // The stage is the root container that will hold everything in our scene
    this.stage = new PIXI.Container();

    /*
    function animate() {
        // start the timer for the next animation loop
        requestAnimationFrame( animate );
        // this is the main render call that makes pixi draw your container and its children.
        renderer.render( stage );
    }
    animate()
    */
  };

  window.Vz = Vz;

})();