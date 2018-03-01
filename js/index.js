(function(){

	let init = function(){
		let parentElement = $("#visualizer");
		let audioElement = $("#audioSource");
		visualisateur = Vz(parentElement, audioElement);
	}


	$(document).ready(init);

})();