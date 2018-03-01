(function() {

  function Vz( canvasEl, audioEl ) {
    this.initCanvas( canvasEl );
    this.initAudioAnalyser(audioEl);
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

  Vz.prototype.initAudioAnalyser = function( audioEl ) {
    
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let source = this.audioContext.createMediaElementSource(audioEl)
    this.audioAnalyser = new AnalyserNode(this.audioContext)

    this.freqs = new Uint8Array(this.audioAnalyser.frequencyBinCount)
    this.waves = new Uint8Array(this.audioAnalyser.frequencyBinCount)
    source.connect(this.audioAnalyser);
    this.audioAnalyser.connect(this.audioContext.destination)
  }

  Vz.prototype.fillFreqs = function(){ 
    this.audioAnalyser.getByteTimeDomainData(this.waves);
    this.audioAnalyser.getByteFrequencyData(this.freqs);
  }

  window.Vz = Vz;

})();