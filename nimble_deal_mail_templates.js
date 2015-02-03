function init() {
  var taistApi;
  
  var dmtcEl=null;
/*
 
<div class="rangesContainer">
<div class="subHeader">Amount Ranges</div> 
<img class="amountHeaderInfo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACHElEQVR42pWVPUsDQRCGo4ZYKNhqZe1fELEQxMJ/4x8I1ulCQu4uMbl8cIFoUFt7vxo7wWChIFaijYJfl6zvG2fi5jyjLgy7t5l97p3ZmUsi8cNotVoTtOh+Op0ehyUTfx08YIOwTuXz+VnXdeey2exkBDw+EmaDHMdZBsTHfIH5XqwDqxeLxZW4M7EwqsChLQxTr9cNZ9u4Vy6XDcGZTGYqFqrSCYOi42azyQM92CvUYO28Yf1cKpW4/8rfgiAw8D2r1WpTNmNIHZURBscXrEMB3HmetwjwAtaXoi6kj0CDIaDCmDOGJMp6eH7H243nOQdWXsuNRoM+b1gT1q1UKqZQKKwJNGmr85kfOsMUbBy3f3ATtsGwofbrN3kp1q2oyhRvU8MRZyNg5uwWdqNA67eQUeH5SnPZH6wzbD4wZwxDnavVKucT9cN6l1FQmfh0Py/NfczlcvMDIPIQA3T+A3zC2S+g1F7HDlkV4vCpdSl7EWAoF3mNKKeHahBOjahzH+g5p8aYMVG4b/vopWBuD1ja6GwnUdjVspGQDy2F2wrk7fOlvu9zXh+Uja2S7WQXNmuMtw9bxfMS5iMBMC3PUtjtb52iD+xNtlPQDPRyWJM9XpbkSus0JAzzOWzmG9DuGNYT24nqmB+CWHs0rrknKncU9usXh4PtxA5g0bLOxK4ZouZsJOynDycVs2hZZ4PS+OsHNgJOxh347S/gAzHtmVNmDMRdAAAAAElFTkSuQmCC" hastooltip="true"> 
<div class="rangeList"></div> 
<div class="controlsContainer"> 
<div class="loadContainer loadContainer-range" aria-hidden="true" style="display: none;">&nbsp;</div>  
<div class="RangeEditWidget RangeEditWidget-range" aria-hidden="true" style="display: none;">
<div class="dollar_sign">$</div> 
<div class="nmbl-FormTextBox nmbl-FormNumberBox nmbl-FormTextBox-min">
<div class="gwt-Label-fieldName" aria-hidden="true" style="display: none;">field name</div>
<div class="gwt-Label gwt-Label-tip gwt-Label-min_value" aria-hidden="true" style="display: none;"></div>
<input type="text" class="nmbl-AdvancedTextBox nmbl-AdvancedTextBox-min_value" maxlength="18" placeholder="0,000">
<div class="gwt-Label-error" aria-hidden="true" style="display: none;"></div></div> 
<div class="divider">–</div> 
<div class="dollar_sign">$</div> 
<div class="nmbl-FormTextBox nmbl-FormNumberBox nmbl-FormTextBox-max">
<div class="gwt-Label-fieldName" aria-hidden="true" style="display: none;">field name</div>
<div class="gwt-Label gwt-Label-tip gwt-Label-max_value" aria-hidden="true" style="display: none;"></div>
<input type="text" class="nmbl-AdvancedTextBox nmbl-AdvancedTextBox-max_value" maxlength="18" placeholder="0,000">
<div class="gwt-Label-error" aria-hidden="true" style="display: none;"></div></div> 
<div tabindex="0" class="nmbl-Button nmbl-Button-WebkitGecko nmbl-Button-update">
<input type="text" tabindex="-1" role="presentation" style="opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;">
<div class="nmbl-ButtonContent">Add</div></div> 
<div tabindex="0" class="nmbl-Button nmbl-Button-WebkitGecko nmbl-Button-cancel">
<input type="text" tabindex="-1" role="presentation" style="opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;">
<div class="nmbl-ButtonContent">Cancel</div></div>  
<div class="loadContainer" aria-hidden="true" style="display: none;">&nbsp;</div> <div style="clear:both;height:1px">&nbsp;</div>  
<div class="gwt-Label-error" aria-hidden="true" style="display: none;"></div> <div style="clear:both;height:1px">&nbsp;</div></div> <a class="gwt-Anchor gwt-Anchor-range">Add Range</a> <div style="clear:both;height:1px">&nbsp;</div> 
</div></div>


<div class="SettingsSignatureView">
<textarea class="nmbl-AdvancedTextArea"></textarea> 
<div class="buttonFooter"> 
<div tabindex="0" class="nmbl-Button nmbl-Button-WebkitGecko nmbl-Button-save">
<input type="text" tabindex="-1" role="presentation" style="opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;">
<div class="nmbl-ButtonContent">Save Signature</div>
</div> 
<div style="clear:both;"></div> 
</div>
</div>




 */


  function rebuildTemplates(){
    var  sdvEl = document.querySelector(".SettingsDealsView");
    console.log('rebuildTemplates');
    if(sdvEl){
    if (!document.querySelector(".dealMailTemplatesContainer")){

      dmtcEl = document.createElement("div");
      dmtcEl.setAttribute('class', 'dealMailTemplatesContainer');
      dmtcEl.innerHTML='<div class="subHeader">Mail templates</div>'
      +'<img class="amountHeaderInfo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACHElEQVR42pWVPUsDQRCGo4ZYKNhqZe1fELEQxMJ/4x8I1ulCQu4uMbl8cIFoUFt7vxo7wWChIFaijYJfl6zvG2fi5jyjLgy7t5l97p3ZmUsi8cNotVoTtOh+Op0ehyUTfx08YIOwTuXz+VnXdeey2exkBDw+EmaDHMdZBsTHfIH5XqwDqxeLxZW4M7EwqsChLQxTr9cNZ9u4Vy6XDcGZTGYqFqrSCYOi42azyQM92CvUYO28Yf1cKpW4/8rfgiAw8D2r1WpTNmNIHZURBscXrEMB3HmetwjwAtaXoi6kj0CDIaDCmDOGJMp6eH7H243nOQdWXsuNRoM+b1gT1q1UKqZQKKwJNGmr85kfOsMUbBy3f3ATtsGwofbrN3kp1q2oyhRvU8MRZyNg5uwWdqNA67eQUeH5SnPZH6wzbD4wZwxDnavVKucT9cN6l1FQmfh0Py/NfczlcvMDIPIQA3T+A3zC2S+g1F7HDlkV4vCpdSl7EWAoF3mNKKeHahBOjahzH+g5p8aYMVG4b/vopWBuD1ja6GwnUdjVspGQDy2F2wrk7fOlvu9zXh+Uja2S7WQXNmuMtw9bxfMS5iMBMC3PUtjtb52iD+xNtlPQDPRyWJM9XpbkSus0JAzzOWzmG9DuGNYT24nqmB+CWHs0rrknKncU9usXh4PtxA5g0bLOxK4ZouZsJOynDycVs2hZZ4PS+OsHNgJOxh347S/gAzHtmVNmDMRdAAAAAElFTkSuQmCC" hastooltip="true">'
      +'<div class="controlsContainer">'
      +'<div style="clear:both;height:1px">&nbsp;</div>'
      +'<div class="SettingsSignatureView" style="display: none;">'
       +'<div class="nmbl-FormTextBox nmbl-FormTextBox-name nmbl-FormTextBox-tipped">'
        +'<div class="dollar_sign">Topic:</div><input type="text" maxlength="90">'
       +'</div>'
      +'<textarea class="nmbl-AdvancedTextArea" >'
       +'Dear $contacts-lastname$!\r\n\r\n'
       +'Thanks for subscribing super CRM.\r\n'
       +'We are so glad that you are now member of community.\r\n' 
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$username$ '
      +'</textarea>'
      +'<div class="buttonFooter">'
       +'<div class="nmbl-ButtonContent">Save Template</div>'
      +'</div>'
      +'<div style="clear:both;"></div>'
      +'</div>'
      +'<a class="gwt-Anchor gwt-Anchor-range add-Mail-Template">Add Template</a>'
       +'<div style="clear:both;height:1px">&nbsp;</div>'
      +'</div>'
      sdvEl.appendChild(dmtcEl);
      var atEl=dmtcEl.querySelector("a.add-Mail-Template");
      if(atEl){
        atEl.onclick=function(){
          taistApi.log("atEl.onclick");
          var ssvEl=dmtcEl.querySelector(".SettingsSignatureView");
          if(ssvEl){
            ssvEl.style.display='block';
          }
        }
        taistApi.log("a.add-Mail-Template");
      }

      var stEl=dmtcEl.querySelector("a.save-Mail-Template");
      if(stEl){
        stEl.onclick=function(){
          taistApi.log("stEl.onclick");
          var ssvEl=dmtcEl.querySelector(".SettingsSignatureView");
          if(ssvEl){ssvEl.style.display='none';}
        }
        taistApi.log("a.save-Mail-Template);
      }

    }
  }
}


var mainPanelObserver=null;


function prepareIt() {

taistApi.log("prepareIt");


var bodyTarget = document.querySelector('body');

if(bodyTarget){

  var myButton = document.createElement("button");
  myButton.innerHTML="Test";
  myButton.onclick = function(){
    var settingsTarget = document.querySelector(".SettingsDealsView");
    taistApi.log("onclick",settingsTarget);

  };   
  bodyTarget.appendChild(myButton);


  taistApi.log("bodyTarget acquired !!! taistApi.log");

 
  var bodyObserver = new MutationObserver(function(mutations) {
       var nimbleMainPanel = document.querySelector("#main");
       if(nimbleMainPanel && !mainPanelObserver){ 
        mainPanelObserver=new MutationObserver(function(mutations) {
          var settingsTarget = nimbleMainPanel.querySelector(".SettingsDealsView");
          if(settingsTarget){
           rebuildTemplates();
           taistApi.log("mainPanelObserver.disconnect()");
           mainPanelObserver.disconnect();
          }
        });
        mainPanelObserver.observe(nimbleMainPanel, { childList: true, subtree : true});
        taistApi.log("bodyObserver.disconnect()");
        bodyObserver.disconnect(); 
       }
  });
 
 
 bodyObserver.observe(bodyTarget, { childList: true});
}
/*
var interVal=setInterval(function(){
    var  sdvEl = document.querySelector(".SettingsDealsView");
    console.log(sdvEl);
    if(sdvEl!="undefined"){
     taistApi.log("nimble load taistApi.log");
     console.log("nimble load console.log");
     clearInterval(interVal);
    }
}, 1000);
*/
/*
    var  sdvEl = document.querySelector(".SettingsDealsView");
    if(sdvEl!="undefined"){
    if (!document.querySelector(".dealMailTemplatesContainer")){

     var dmtcEl = document.createElement("div");
     dmtcEl.setAttribute('class', 'dealMailTemplatesContainer');

      var hdrEl = document.createElement("div");
      hdrEl.setAttribute('class', 'subHeader');
      hdrEl.innerHTML="Mail templates";

     dmtcEl.appendChild(hdrEl);
     
     sdvEl.appendChild(dmtcEl);
    }
    }
    else{
     console.log("nimble_deal_mail_template: SettingsDealsView selector not found");
    }
*/																																																																						
  }

  var addonEntry = {
    start: function(_taistApi, entryPoint) {
      taistApi = _taistApi;
      prepareIt();
    }
  };

  return addonEntry;
}
