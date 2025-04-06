document.addEventListener("DOMContentLoaded", function () {
    const presets = {
        banjol3_00: "RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=RB00&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezhMpl&metalRing=&hardwareSelect=1PF&platingSelect=nickel&tailpieceSelect=presto&neckWoodSelect=strMpl&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=dots1&fbBindSelect=noFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=style00HS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsLogoOnly&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonOval&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoStraigtMpl&resoBindingLocSelect=resoBindBottom&resoBindSelect=resoBindWhite&ConcenRingsSelect=noConcenRings&neckFinishSelect=neckBurstDark&resoFinishSelect=resoBurstDark&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
        
		banjol3_1:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=14F&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezhMpl&metalRing=&hardwareSelect=1PF&platingSelect=nickel&tailpieceSelect=presto&neckWoodSelect=strMpl&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=seagulls&fbBindSelect=whiteFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=fiddleCutHS2&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsSeagulls&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonOval&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoStraigtMpl&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWhite&ConcenRingsSelect=noConcenRings&neckFinishSelect=neckTobaccoBrown&resoFinishSelect=resoTobaccoBrown&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol3_3:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=EZ&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezOsag&metalRing=&hardwareSelect=1PF&platingSelect=nickel&tailpieceSelect=presto&neckWoodSelect=mahog&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=leavB1&fbBindSelect=whiteFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=doubleCutHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsLeaves&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonOval&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoMahog&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWhite&ConcenRingsSelect=concenWBW&neckFinishSelect=neckVintageMahog&resoFinishSelect=resoVintageMahog&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol3_4:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=EZ&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezOsag&metalRing=&hardwareSelect=1PF&platingSelect=chrome&tailpieceSelect=presto&neckWoodSelect=walnut&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=flyEag&fbBindSelect=wbwFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=doubleCutHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsFlying&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonOval&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoBurlWalnut&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWBWDbl&ConcenRingsSelect=concenSty4&neckFinishSelect=neckNatural&resoFinishSelect=resoNatural&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol3_G:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=EZ&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezOsag&metalRing=&hardwareSelect=1PF&platingSelect=gold&tailpieceSelect=presto&neckWoodSelect=curMpl&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=flyEag&fbBindSelect=wbwFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=ebonyHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=doubleCutHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsFlying&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonOval&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoCurMpl&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWBWDbl&ConcenRingsSelect=noConcenRings&neckFinishSelect=neckTobaccoBrown&resoFinishSelect=resoBurstTobacco&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol5_100:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=14A&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezhMpl&metalRing=&hardwareSelect=1PF&platingSelect=nickel&tailpieceSelect=presto&neckWoodSelect=mahog&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=dots3&fbBindSelect=noFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=flyHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsLogoOnly&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonKey&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoStraigtMpl&resoBindingLocSelect=resoBindBottom&resoBindSelect=resoBindWhite&ConcenRingsSelect=noConcenRings&neckFinishSelect=neckTobaccoBrown&resoFinishSelect=resoBurstTobacco&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol5_150:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=14A&ezSwapSelect=ezFlat&ezSwapWoodSelect=ezhMpl&metalRing=&hardwareSelect=1PF&platingSelect=nickel&tailpieceSelect=presto&neckWoodSelect=mahog&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=bowties1&fbBindSelect=whiteFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=flyHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsBowtie&hsBindSelect=hsBindNone&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonKey&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoMahog&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWBW&ConcenRingsSelect=concenWBW&neckFinishSelect=neckBurstDark&resoFinishSelect=resoBurstDark&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol5_250:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=EZ&ezSwapSelect=ezAF&ezSwapWoodSelect=ezOsag&metalRing=&hardwareSelect=1PF&platingSelect=nickel&tailpieceSelect=presto&neckWoodSelect=mahog&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbRose&fbInlayMatSelect=fbWMop&fbInlayPatSelect=bowties1&fbBindSelect=whiteFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=flyHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsBowtie&hsBindSelect=hsBindWhite&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonKey&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoMahog&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWBW&ConcenRingsSelect=concenWBW&neckFinishSelect=neckBurstDark&resoFinishSelect=resoBurstDark&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight",
		
		banjol5_500:"RightLeftSelect=rightHandBanjo&banjoTypeSelect=resoBanjo&rimWoodSelect=tHMplRim&toneRingSelect=EZ&ezSwapSelect=ezAF&ezSwapWoodSelect=ezOsag&metalRing=&hardwareSelect=1PF&platingSelect=gold&tailpieceSelect=presto&neckWoodSelect=curMpl&scaleSelect=26-38&nutSelect=1-3%2F16nut&radiusSelect=noRadius&numFretsSelect=22frets&fbWoodSelect=fbEbony&fbInlayMatSelect=fbWMop&fbInlayPatSelect=bowties2&fbBindSelect=whiteFbBind&customBlockValue=&fretMatSelect=nickelFret&heelCapMatSelect=noHeelCap&heelCapBindSelect=noHeelBind&hsShapeSelect=flyHS&hsOverlaySelect=ebonyHS&hsInlayMatSelect=hsWMop&hsInlayPatSelect=hsBowtie&hsBindSelect=hsBindWhite&tunersSelect=tunersGotoh&tunerButtonShapeSelect=tunerButtonKey&tunerButtonColorSelect=tunerButtonCreamy&resoTypeSelect=standardReso&resoWoodSelect=resoCurMpl&resoBindingLocSelect=resoBindTopBot&resoBindSelect=resoBindWBW&ConcenRingsSelect=concenWBW&neckFinishSelect=neckBurstTobacco&resoFinishSelect=resoBurstTobacco&bindingAgeSelect=bindAgeLight&hsAgeSelect=hsAgeLight"
    };

    function applyPresetValues(presetKey) {
        if (!presets[presetKey]) {
            console.error(`Preset "${presetKey}" not found.`);
            return;
        }

        // Clear all previous selections before applying new preset
        const allElements = document.querySelectorAll("select, input, textarea");
        allElements.forEach(el => {
            if (el.type === "radio" || el.type === "checkbox") {
                el.checked = false;
            } else {
                el.value = '';
            }
        });

        const presetParams = new URLSearchParams(presets[presetKey]);

        presetParams.forEach((value, key) => {
            let elements = document.querySelectorAll(`[id="${key}"], [name="${key}"]`);
            elements.forEach(el => {
                if (el.type === "radio" || el.type === "checkbox") {
                    el.checked = el.value === value;
                } else {
                    el.value = value;
                }
            });
        });

        // Trigger a change event in case any dependent logic needs to update
        document.querySelectorAll("select, input, textarea").forEach(el => {
            el.dispatchEvent(new Event("change"));
        });
    }

    // Automatically bind buttons with matching IDs to their respective presets
    Object.keys(presets).forEach(presetKey => {
        const button = document.getElementById(presetKey);
        if (button) {
            button.addEventListener("click", function () {
                applyPresetValues(presetKey);
            });
        }
    });
});