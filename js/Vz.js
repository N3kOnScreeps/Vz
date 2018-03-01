Vz = function(parentElement, audioElement){
	
	const public = {};	
	
	const initPixi = function(parentElement){
		const application = new PIXI.Application({transparent:true});
		
		const ticker = new PIXI.ticker.Ticker();
		
		parentElement.append(application.view)

		return application;
	}

	public.pixiApplication = initPixi(parentElement);


	return public
}