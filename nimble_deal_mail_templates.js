function init() {
  var taistApi;
  
/*

<input type="text" class="nmbl-AdvancedTextBox" maxlength="256" placeholder="Name">




*/

  var dmtcEl=null;
  var userId=null;
  var mailTemplates={A:[
    {topic:"Hello log name topic template aa s s s df sd fsd fs df sd f sd fs d fs df s df s dffdf end",body:"Dear $contacts-lastname$!"},
    {topic:"Bye",body:"Dear $contacts-lastname$!  as da sd a sd a sd as d as da sd a sd a s da sd a sd as d"},
    {topic:"Ping",body:"Dear $contacts-lastname$!"}
  ]};

  function saveToStorage(){
   localStorage.setItem(userId,JSON.stringify(mailTemplates));
  }

  function readFromStorage(){
   var item=localStorage.getItem(userId);
    //console.log('readFromStorage',item);
   if(item){
    mailTemplates=JSON.parse(item); 
   }
  }

  function rebuildTemplates(){
    var  sdvEl = document.querySelector(".SettingsDealsView");
    console.log('rebuildTemplates');
    if(sdvEl){
    if (!document.querySelector(".dealMailTemplatesContainer")){

      readFromStorage();

      dmtcEl = document.createElement("div");
      dmtcEl.setAttribute('class', 'dealMailTemplatesContainer');
      var html='<div class="subHeader">Mail templates</div>'
      +'<img class="amountHeaderInfo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACHElEQVR42pWVPUsDQRCGo4ZYKNhqZe1fELEQxMJ/4x8I1ulCQu4uMbl8cIFoUFt7vxo7wWChIFaijYJfl6zvG2fi5jyjLgy7t5l97p3ZmUsi8cNotVoTtOh+Op0ehyUTfx08YIOwTuXz+VnXdeey2exkBDw+EmaDHMdZBsTHfIH5XqwDqxeLxZW4M7EwqsChLQxTr9cNZ9u4Vy6XDcGZTGYqFqrSCYOi42azyQM92CvUYO28Yf1cKpW4/8rfgiAw8D2r1WpTNmNIHZURBscXrEMB3HmetwjwAtaXoi6kj0CDIaDCmDOGJMp6eH7H243nOQdWXsuNRoM+b1gT1q1UKqZQKKwJNGmr85kfOsMUbBy3f3ATtsGwofbrN3kp1q2oyhRvU8MRZyNg5uwWdqNA67eQUeH5SnPZH6wzbD4wZwxDnavVKucT9cN6l1FQmfh0Py/NfczlcvMDIPIQA3T+A3zC2S+g1F7HDlkV4vCpdSl7EWAoF3mNKKeHahBOjahzH+g5p8aYMVG4b/vopWBuD1ja6GwnUdjVspGQDy2F2wrk7fOlvu9zXh+Uja2S7WQXNmuMtw9bxfMS5iMBMC3PUtjtb52iD+xNtlPQDPRyWJM9XpbkSus0JAzzOWzmG9DuGNYT24nqmB+CWHs0rrknKncU9usXh4PtxA5g0bLOxK4ZouZsJOynDycVs2hZZ4PS+OsHNgJOxh347S/gAzHtmVNmDMRdAAAAAElFTkSuQmCC" hastooltip="true">';

      if(mailTemplates.A && mailTemplates.A.length>0){
//	html+='<div class="mailTemplatesList">';
        //console.log('mailTemplates.A.length',mailTemplates.A.length);
/*
       for(var i=0;i<mailTemplates.A.length;i++){
    	html+='<div class="mailTemplateWidget">'
         +'<div class="mailTemplateViewContainer">'
	  +'<div class="mailTemplateViewTopic">'+mailTemplates.A[i].topic+'</div>'
          +'<div class="mailTemplateViewBody">'+mailTemplates.A[i].body+'</div>' 
           +'<div class="hoverContainer"><a class="gwt-Anchor">Modify</a>'
           +'<div style="clear:both"></div>'
           +'</div>'
         +'</div>'	
         +'</div>'
	+'<div style="clear:both"></div>';
       }
*/

html+='<div class="mailTemplatesList">';

       for(var i=0;i<mailTemplates.A.length;i++){
       var topic;
       if(mailTemplates.A[i].topic.length>20){topic=mailTemplates.A[i].topic.substring(0,20)+"..";}
       else topic=mailTemplates.A[i].topic;

       var body;
       if(mailTemplates.A[i].body.length>30){body=mailTemplates.A[i].body.substring(0,30)+"..";}
       else body=mailTemplates.A[i].body;

html+='<div class="mailTemplateWidget">'
        +'<div class="mailTemplateViewContainer">'
           +'<div class="mailTemplateViewTopic">'+topic+' - '+body+'</div>'
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
       +'Dear $contacts-lastname$!\r\n\r\n'
       +'Thanks for subscribing super CRM.\r\n'
       +'We are so glad that you are now member of community.\r\n' 
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$username$ '
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

      userId=document.querySelector("a.userName");      

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

      var stEl=dmtcEl.querySelector("a.save-Mail-Template");
      if(stEl){
        stEl.onclick=function(){
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
