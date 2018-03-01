(function() {

  function Vz( canvasEl, audioEl ) {
    this.currentVizu = null;
    this.isPlaying = false;

    this.initCanvas( canvasEl );
    this.initAudioAnalyser(audioEl);
  }

  Vz.prototype.initCanvas = function( canvasEl ) {
    this.canvasEl = canvasEl;

    var $canvas = $( canvasEl ),
      width = $canvas.width();
    var height = $canvas.height();

    // Chooses either WebGL if supported or falls back to Canvas rendering
    this.renderer = new PIXI.autoDetectRenderer({
      width: width,
      height: height,
      view: this.canvasEl
    });

    // The stage is the root container that will hold everything in our scene
    this.stage = new PIXI.Container();
  };

  Vz.prototype.initAudioAnalyser = function( audioEl ) {
    this.audioEl = audioEl;
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

  Vz.prototype.setVizu = function( vizuName ) {
    this.currentVizu = Vz.vizus[ vizuName ]( this.renderer, this.stage, this.freqs, this.waves );
  }

  Vz.prototype.play = function() {
    var vz = this;
    this.isPlaying = true;

    function animate() {
      if( vz.isPlaying === false ) return;
      requestAnimationFrame( animate );
      vz.frame();
    }
    animate();
  }

  Vz.prototype.pause = function() {
    this.isPlaying = false;
  }

  Vz.prototype.frame = function() {
    this.fillFreqs();
    if( this.currentVizu !== null ) this.currentVizu.frame();
    this.renderer.render( this.stage );
  }

  Vz.vizus = {};

  Vz.registerVizu = function( vizuName, vizu ) {
    Vz.vizus[ vizuName ] = vizu;
  }

  window.Vz = Vz;

})();