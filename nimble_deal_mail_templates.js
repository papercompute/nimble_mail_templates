function init() {
  var taistApi;
  

  var dmtcEl=null;
  var dmtocEl=null;
  var ssntEl=null;
  var ifEl=null;

  var mailTemplates=[
    {name:"template1",topic:"Hello $contacts-lastname$ log name topic template aa s s s df sd fsd fs df sd f sd fs d fs df s df s dffdf end",body:"Dear $contacts-lastname$!"},
    {name:"template2",topic:"Bye $contacts-lastname$",body:"Dear $contacts-lastname$!  as da sd a sd a sd as d as da sd a sd a s da sd a sd as d"},
    {name:"template3",topic:"Ping $contacts-lastname$",body:"Dear $contacts-lastname$!"}
  ];


const templateBody = 
        'Dear $contacts-lastname$!\r\n\r\n'
       +'Thanks for subscribing super CRM.\r\n'
       +'We are so glad that you are now member of community.\r\n' 
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$username$ ';

function httpGet(url, cbOk, cbErr){
var xhr = new XMLHttpRequest();
xhr.open('GET', encodeURI(url));
xhr.onload = function() {
    if (xhr.status === 200) {
        if(cbOk)cbOk(xhr.responseText);
    }
    else {
        if(cbErr)cbErr(xhr.status);
    }
};
xhr.send();
}

  function saveToStorage(id){
   localStorage.setItem(id,JSON.stringify(mailTemplates));
  }

  function readFromStorage(id){
   var item=localStorage.getItem(id);
   if(item){
    mailTemplates=JSON.parse(item); 
   }
  }

  function prepareMailToData(url){
    httpGet(url,
      function(text){
        console.log(text);
        //text.find("<a href="mailto:care@nimble.com">care@</a>")
      },
      function(err){console.error(err);}
      );
  }

  function rebuildDealHack(piwEl){
    //var  piwEl = document.querySelector(".profileInfoWrapper");
    console.log('rebuildDealHack()',piwEl);
    if(piwEl){
     if (!document.querySelector(".dealMailToContainer")){

      console.log('!!!.dealMailToContainer 000');

      //piwEl.appendChild(dmtcEl);
      var giEl=piwEl.querySelector(".generalInfo");
      if(giEl){


      dmtocEl = document.createElement("div");
      dmtocEl.setAttribute('class', 'dealMailToContainer');
      var html=
         '<div class="dealMainToField">'
         // hideAll showSendMailTemplates
         +'<div class="sendToMailTemplatesContainer"></div>'         
         +'<a class="showAll showSendMailTemplates">Show mail templates</a>'        
         +'</div>';

      dmtocEl.innerHTML=html;
      giEl.appendChild(dmtocEl);

      ssntEl=dmtocEl.querySelector("a.showSendMailTemplates");
      if(ssntEl){
        ssntEl.onclick=function(){
          //var ssntEl=dmtocEl.querySelector("a.showSendMailTemplates");
          taistApi.log("ssntEl.onclick");
          if(ssntEl.classList.contains('showAll')){
            var rtEl=dmtocEl.parentNode.querySelector("a.relatedTo");
            if(rtEl){
              taistApi.log("a.relatedTo",rtEl.href);
              // "https://app.nimble.com/"
              //prepareMailToData(rtEl.href);
              //prepareMailToData("#app/contacts/list?filter=all&view_type=grid&col_preset=sales_management");
              hifEl = document.createElement("iframe");
              hifEl.style.display="none";
              hifEl.setAttribute("src", rtEl.href);
              hifEl.classList.add('hiddenIframe'); 
              dmtocEl.appendChild(hifEl);
              hifEl.addEventListener('load', function() {
                console.log("if load!");
                var ifObserver = new MutationObserver(function(mutations) {
                 console.log("ifObserver!");
                 //var hifEl=querySelector(".hiddenIframe");
                 if(hifEl){ console.log("hifEl!");
                  var emEl=hifEl.querySelector(".email");
                  if(emEl){ console.log("emEl!"); }  
                 }
                });
                ifObserver.observe(ifEl.contentDocument.body, { attributes: true, childList: true, characterData: true,subtree: true});
              });


            }
            // show all
            var coEl=ssntEl.parentNode.querySelector(".sendToMailTemplatesContainer");
            if(!coEl){console.error('!sendToMailTemplatesContainer');return;}
            var email='hero@hero.com';
            var html=''
            for(var i=0;i<mailTemplates.length;i++){
              html+='<a href="mailto:'+email+'">'+mailTemplates[i].name
                   +'</a>'
            }
            coEl.innerHTML=html;
            
            ssntEl.classList.remove('showAll');
            ssntEl.classList.add('hideAll');
          }
          else{
            var coEl=ssntEl.parentNode.querySelector(".sendToMailTemplatesContainer");
            var html=''
            coEl.innerHTML="";
            // hide
            ssntEl.classList.remove('hideAll');
            ssntEl.classList.add('showAll');
          }

        }
      }

      console.log('!!!.dealMailToContainer 111');



      }

     }
    }
  }

  function rebuildTemplates(sdvEl){
    //var  sdvEl = document.querySelector(".SettingsDealsView");
    console.log('rebuildTemplates()',sdvEl);
    if(sdvEl){
    if (!document.querySelector(".dealMailTemplatesContainer")){

      var userId=document.querySelector("a.userName");
      if(userId)readFromStorage(userId+"_deal_mail_templates");

      dmtcEl = document.createElement("div");
      dmtcEl.setAttribute('class', 'dealMailTemplatesContainer');
      var html='<div class="subHeader">Mail templates</div>'
      +'<img class="amountHeaderInfo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACHElEQVR42pWVPUsDQRCGo4ZYKNhqZe1fELEQxMJ/4x8I1ulCQu4uMbl8cIFoUFt7vxo7wWChIFaijYJfl6zvG2fi5jyjLgy7t5l97p3ZmUsi8cNotVoTtOh+Op0ehyUTfx08YIOwTuXz+VnXdeey2exkBDw+EmaDHMdZBsTHfIH5XqwDqxeLxZW4M7EwqsChLQxTr9cNZ9u4Vy6XDcGZTGYqFqrSCYOi42azyQM92CvUYO28Yf1cKpW4/8rfgiAw8D2r1WpTNmNIHZURBscXrEMB3HmetwjwAtaXoi6kj0CDIaDCmDOGJMp6eH7H243nOQdWXsuNRoM+b1gT1q1UKqZQKKwJNGmr85kfOsMUbBy3f3ATtsGwofbrN3kp1q2oyhRvU8MRZyNg5uwWdqNA67eQUeH5SnPZH6wzbD4wZwxDnavVKucT9cN6l1FQmfh0Py/NfczlcvMDIPIQA3T+A3zC2S+g1F7HDlkV4vCpdSl7EWAoF3mNKKeHahBOjahzH+g5p8aYMVG4b/vopWBuD1ja6GwnUdjVspGQDy2F2wrk7fOlvu9zXh+Uja2S7WQXNmuMtw9bxfMS5iMBMC3PUtjtb52iD+xNtlPQDPRyWJM9XpbkSus0JAzzOWzmG9DuGNYT24nqmB+CWHs0rrknKncU9usXh4PtxA5g0bLOxK4ZouZsJOynDycVs2hZZ4PS+OsHNgJOxh347S/gAzHtmVNmDMRdAAAAAElFTkSuQmCC" hastooltip="true">';

      if(mailTemplates && mailTemplates.length>0){

html+='<div class="mailTemplatesList">';

       for(var i=0;i<mailTemplates.length;i++){
/*        
       var topic;
       if(mailTemplates[i].topic.length>20){topic=mailTemplates[i].topic.substring(0,20)+"..";}
       else topic=mailTemplates[i].topic;

       var body;
       if(mailTemplates[i].body.length>30){body=mailTemplates[i].body.substring(0,30)+"..";}
       else body=mailTemplates[i].body;
*/
       var name;
       if(mailTemplates[i].name.length>30){name=mailTemplates[i].name.substring(0,30)+"..";}
       else name=mailTemplates[i].name;

html+='<div class="mailTemplateWidget">'
        +'<div class="mailTemplateViewContainer">'
//           +'<div class="mailTemplateViewTopic">'+topic+' - '+body+'</div>'
           +'<div class="mailTemplateViewTopic">'+name+'</div>'
            +'<div class="hoverContainer"><a class="gwt-Anchor">Modify</a>'
                +'<div style="clear:both"></div>'
            +'</div>'
            +'<div style="clear:both"></div>'
        +'</div>'
        +'<div class="gwt-Label-error" aria-hidden="true" style="display: none;"></div>'
    +'</div>';
	}

	html+='</div><div style="clear:both"></div>';
      }


      html+='<div class="controlsContainer">'

       +'<div style="clear:both;height:1px">&nbsp;</div>'

      +'<div class="ModifyMailTemplateView" style="display: none;">'
       +'<div class="mailTemlateTopicView">'
        +'<div class="mail-temlate-label">Mail topic:&nbsp;</div>'
        +'<input class="nmbl-AdvancedTextBox" type="text" maxlength="90"></br>'
       +'</div>'
      //+'<div class="mail-temlate-label">Body:</div>' 

      +'<textarea class="nmbl-AdvancedTextArea" >'
      +'</textarea>'

      +'<div class="buttonFooter">'
       +'<a class="gwt-Anchor save-Mail-Template">Save</a>&nbsp;&nbsp;'
       +'<a class="gwt-Anchor cancel-Mail-Template">Cancel</a>'
       +'<a class="gwt-Anchor delete-Mail-Template">Delete</a>'
      +'</div>'

       +'<div style="clear:both;"></div>'
      +'</div>' // ModifyMailTemplateView

      +'<a class="gwt-Anchor gwt-Anchor-range add-Mail-Template">Add Template</a>'
       +'<div style="clear:both;height:1px">&nbsp;</div>'

      +'</div>'; // controlsContainer

      dmtcEl.innerHTML=html;

      sdvEl.appendChild(dmtcEl);

      

// Add Template

      var atEl=dmtcEl.querySelector("a.add-Mail-Template");
      if(atEl){
        atEl.onclick=function(){
          taistApi.log("atEl.onclick");
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){
            ssvEl.style.display='block';
            atEl.style.display='none';
          }
        }
        taistApi.log("a.add-Mail-Template");
      }

// Save template
      var stEl=dmtcEl.querySelector("a.save-Mail-Template");
      if(stEl){
        stEl.onclick=function(){
          var userId=document.querySelector("a.userName");      
          taistApi.log("stEl.onclick");          
          if(userId){
            localStorage.setItem(userId, foo);

          }
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){ssvEl.style.display='none';}
          var atEl=dmtcEl.querySelector("a.add-Mail-Template");
          if(atEl){atEl.style.display='block';}
        }
        taistApi.log("a.save-Mail-Template");
      }


// Cancel template
      var ctEl=dmtcEl.querySelector("a.cancel-Mail-Template");
      if(ctEl){
        ctEl.onclick=function(){
          taistApi.log("ctEl.onclick");
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){ssvEl.style.display='none';}
          var atEl=dmtcEl.querySelector("a.add-Mail-Template");
          if(atEl){atEl.style.display='block';}
        }
        taistApi.log("a.cancel-Mail-Template");
      }

    }
  }
}


var mainPanelObserver=null;
var SettingsDealsViewCounter=0;
var profileInfoWrapperCounter=0;

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
          var SettingsDealsView = nimbleMainPanel.querySelector(".SettingsDealsView");
          if(SettingsDealsView){
           rebuildTemplates(SettingsDealsView);
           taistApi.log("mainPanelObserver.disconnect() SettingsDealsView");
           SettingsDealsViewCounter++;          
          }
          var profileInfoWrapper = nimbleMainPanel.querySelector(".profileInfoWrapper");
          if(profileInfoWrapper){           
           rebuildDealHack(profileInfoWrapper);
           taistApi.log("mainPanelObserver.disconnect() profileInfoWrapper();");
           profileInfoWrapperCounter++;          
          }
          if(SettingsDealsViewCounter>0 && profileInfoWrapperCounter>0){mainPanelObserver.disconnect();}
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
