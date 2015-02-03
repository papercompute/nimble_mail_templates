function init() {
  var taistApi;
  
  var dmtcEl=null;


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
        taistApi.log("a.save-Mail-Template");
      }

    }
  }
}


var mainPanelObserver=null;


function prepareIt() {

taistApi.log("prepareIt");


var bodyTarget = document.querySelector('body');

if(bodyTarget){

//  var myButton = document.createElement("button");
//  myButton.innerHTML="Test";
//  myButton.onclick = function(){
//    var settingsTarget = document.querySelector(".SettingsDealsView");
//    taistApi.log("onclick",settingsTarget);
//
//  };   
//  bodyTarget.appendChild(myButton);

//  taistApi.log("bodyTarget acquired !!! taistApi.log");

 
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
  }

  var addonEntry = {
    start: function(_taistApi, entryPoint) {
      taistApi = _taistApi;
      prepareIt();
    }
  };

  return addonEntry;
}
