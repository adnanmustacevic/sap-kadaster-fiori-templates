define(["sap/watt/lib/jszip/jszip-shim","./shared"], function(JSZip,shared) {
	return function() {

		var NEW_TEMPLATE_VERSION = "1.40.12";
		var OLD_DEFAULT_THEME = "sap_bluecrystal";
		var NEW_DEFAULT_THEME = "sap_belize";
		var OLD_AVAILABLE_THEMES = ["sap_hcb", "sap_bluecrystal"];
		var NEW_AVAILABLE_THEMES = ["sap_hcb", "sap_belize"];

		return {

			configWizardSteps: function(oTemplateCustomizationStep) {},

			onBeforeTemplateGenerate: function(templateZip, model) {
				shared.registerHandlebarHelpers();				
				if (model.selectedTemplate.getVersion() === NEW_TEMPLATE_VERSION) {
					model.ui5Config = {
						Theme: NEW_DEFAULT_THEME,
						AvailableThemes: NEW_AVAILABLE_THEMES
					};
				} else {
					model.ui5Config = {
						Theme: OLD_DEFAULT_THEME,
						AvailableThemes: OLD_AVAILABLE_THEMES
					};
				}
				model.sapUI5Url = "../../resources/sap-ui-core.js";
				return [templateZip, model];
			},

			onAfterGenerate: function(projectZip, model) {
				if (!sap.watt.getEnv("internal")) {
					// remove files which are only relevant for SAP-internal usage
					projectZip.remove("pom.xml");
				}
				return [projectZip, model];
			}
		};
	};
});