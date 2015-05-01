if (ApplicationDomain.currentDomain.hasDefinition("foo")){
	var tmpObj = new (getDefinitionByName("foo") as Class)();
	addChild(tmpObj);

	tmpObj.x=100;
	tmpObj.y=100;
}



