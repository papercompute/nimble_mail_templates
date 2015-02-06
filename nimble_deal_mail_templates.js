/*

Nimble deal mailto with templates addon: 

1) возможность в настройках системы (Settings -> Deals) задать список шаблонов писем:
2) возможность со страницы сделки выбрать один из шаблонов - при выборе должен открыться почтовый клиент с 
предзаполненным получателем (контактное лицо) и темой и содержимым из шаблона 
(то есть при клике открывать ссылку типа mailto:, в которой прописаны все составляющие части письма)
3) в шаблонах должна быть возможность подставлять в заданные места данные из системы - для начала, 
название сделки, сумму сделки и имя контакта


*/

function init() {
  var taistApi;
  

  var dmtcEl=null;
  var dmtocEl=null;
  var ssntEl=null;
  var ifEl=null;
  var hifmainEl=null;
  var hackEmail="";


  var mailTemplates=[
    {
      name:"Hello template",
      subject:"Hello $contact",
      body:'Dear $contact!\r\n\r\n'
       +'Thanks for subscribing super CRM.\r\n'
       +'We are so glad that you are now member of community.\r\n' 
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$user '
    },
    {
      name:"Bye template",
      subject:"Bye $contact",
      body:'Dear $contact!\r\n\r\n'
       +'Thanks for subscribing super CRM.\r\n'
       +'We are so glad that you are now member of community.\r\n' 
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$user '
    },
    {
      name:"Ping template",
      subject:"Ping $contact",
      body:'Dear $contact!\r\n\r\n'
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$user '
    }
  ];


 // templatize("Welcome $user\r\n\r\n, your email is $email!\r\n",{"$user":"vova","$email":"vova@vova.com"})
function templatize(s,t)
{   
   for (var p in t) { s=s.split(p).join(t[p]); }
   return s;
}

const templateName = 
        'Hello mail';

const templateSubject = 
        'Hello $contact!';

const templateBody = 
        'Dear $contact!\r\n\r\n'
       +'Thanks for subscribing super CRM.\r\n'
       +'We are so glad that you are now member of community.\r\n' 
       +'Please feel free to revert to us if you need any assistance.\r\n\r\n'
       +'Regards,\r\n'
       +'$user ';

const addtemplateTemplate = 
    {
      name:templateName,
      subject:templateSubject,
      body:templateBody
    };



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

  const storagePrefix="deal_mail_templates_";

  function saveToStorage(id){
   var key = storagePrefix+escape(id);
   //console.log("saveToStorage",mailTemplates,key); 
   localStorage.setItem(key,JSON.stringify(mailTemplates));
  }

  function readFromStorage(id){
   var key = storagePrefix+escape(id);
   var item=localStorage.getItem(key);
   if(item){ mailTemplates=JSON.parse(item); }
   //console.log("readFromStorage",mailTemplates,key); 
  }


//  function prepareMailToData(url){
//    httpGet(url,
//      function(text){
//        console.log(text);
//        //text.find("<a href="mailto:care@nimble.com">care@</a>")
//      },
//      function(err){console.error(err);}
//      );
//  }

const observeConfig = { attributes: true, childList: true, characterData: true, subtree: true};

  function HackDealEmail(){
            var rtEl=dmtocEl.parentNode.querySelector("a.relatedTo");
            if(rtEl){
              taistApi.log("a.relatedTo",rtEl);
              var relatedtoObserver = new MutationObserver(function(mutations) {
              console.log("relatedtoObserver!");
              if(rtEl.href.length>0){
              relatedtoObserver.disconnect();
              console.log("rtEl.href",rtEl.href);
              // hack: create iframe, load & get mail            
              hifEl = document.createElement("iframe");
              hifEl.style.display="none";
              hifEl.setAttribute("src", rtEl.href);
              hifEl.classList.add('hiddenIframe'); 
              dmtocEl.appendChild(hifEl);
              hifEl.addEventListener('load', function() {
                console.log("if load!");
                var ifbodyObserver = new MutationObserver(function(mutations) {
                 //console.log("ifbodyObserver!");                 
                 if(hifEl){ 
                  //console.log("hifEl!");
                  hifmainEl=hifEl.contentDocument.body.querySelector("#main");
                  if(hifmainEl){ 
                   //console.log("mainEl!"); 
                   var ifmainObserver = new MutationObserver(function(mutations) {
                     //console.log("ifmainObserver!");
                     var emailEl=hifmainEl.querySelector(".email");
                     if(emailEl){
                      //console.log("!!!----------email-----------!!!");
                      var aEl=emailEl.querySelector("a");
                      if(aEl){
                       hackEmail=aEl.href.split(':')[1];
                       console.log("hackEmail",hackEmail);
                      }
                      ifmainObserver.disconnect();
                     }
                     
                   });
                   ifmainObserver.observe(hifmainEl, observeConfig);
                   ifbodyObserver.disconnect();
                  }  
                 }
                });
                ifbodyObserver.observe(hifEl.contentDocument.body, observeConfig);
              });
              } // if href  
              });// relatedtoObserver
              relatedtoObserver.observe(rtEl, observeConfig); 
            }
  }

  function rebuildDealHack(piwEl){
    //var  piwEl = document.querySelector(".profileInfoWrapper");
    //console.log('rebuildDealHack()',piwEl);
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

      HackDealEmail();

      ssntEl=dmtocEl.querySelector("a.showSendMailTemplates");
      if(ssntEl){
        ssntEl.onclick=function(){
          //var ssntEl=dmtocEl.querySelector("a.showSendMailTemplates");
          taistApi.log("ssntEl.onclick");
          if(ssntEl.classList.contains('showAll')){
//
            // show all
            var coEl=ssntEl.parentNode.querySelector(".sendToMailTemplatesContainer");
            if(!coEl){console.error('!sendToMailTemplatesContainer');return;}
            // email
            var email='hero@hero.com'; if(hackEmail.length>0){email=hackEmail;}
            // deal
	    var deal='deal'; 
            var dealEl=document.querySelector('.dealMainFieldTitle.name');
            if(dealEl){deal=dealEl.innerHTML;}
            // user
	    var user='user'; 
            var userEl=document.querySelector("a.userName");
            if(userEl){user=userEl.innerHTML;}
            // contact
            var contact='contact';
            var rtEl=dmtocEl.parentNode.querySelector("a.relatedTo");
            if(rtEl){contact=rtEl.innerHTML;}

            if(hackEmail.length>0){email=hackEmail;}

            //<a href=”mailto:obama@whitehouse.gov?subject=Congrats%20Obama&body=Enjoy%20your%20stay%0ARegards%20″>


            var html=''
            var templateParams={"$deal":deal,"$contact":contact,"$user":user};
            for(var i=0;i<mailTemplates.length;i++){
              var subject=templatize(mailTemplates[i].subject,templateParams);
              var body=templatize(mailTemplates[i].body,templateParams);
              html+='<a href="mailto:'+email+'?subject='+escape(subject)+'&body='+escape(body)+'">'+mailTemplates[i].name +'</a></br>'
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
    
    console.log('rebuildTemplates()',sdvEl);
    if(sdvEl){
     if (!document.querySelector(".dealMailTemplatesContainer")){

      var userId=document.querySelector("a.userName");
      if(userId)readFromStorage(userId.innerText);

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

       html+='<div class="mailTemplateWidget" templateindex='+i+'>'
        +'<div class="mailTemplateViewContainer">'
//           +'<div class="mailTemplateViewTopic">'+topic+' - '+body+'</div>'
           +'<div class="mailTemplateViewTopic">'+name+'</div>'
            +'<div class="hoverContainer"><a class="gwt-Anchor modify-Mail-Template">Modify</a>'
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

      +'<div class="ModifyMailTemplateView" style="display: none;" templateindex=0>'
       +'<div class="mailTemlateNameView">'
        +'<div class="mail-temlate-label">Name:&nbsp;&nbsp;&nbsp;&nbsp;</div>'
        +'<input class="nmbl-AdvancedTextBox" type="text" maxlength="90"></br>'
       +'</div>'
       +'<div class="mailTemlateTopicView">'
        +'<div class="mail-temlate-label">Subject:&nbsp;</div>'
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

// Modify Template
      var mtEls=dmtcEl.querySelectorAll("a.modify-Mail-Template");
      if(mtEls){
        for(var i=0;i<mtEls.length;i++){
          (function(i){ 
          mtEls[i].onclick=function(){
           //taistApi.log("mtEls[i].onclick",i);
        
           var mmtvEl=dmtcEl.querySelector(".ModifyMailTemplateView");           
           var atEl=dmtcEl.querySelector("a.add-Mail-Template");
           if(mmtvEl && atEl){
            mmtvEl.templateindex=i;
            var nameEl=mmtvEl.querySelector(".mailTemlateNameView .nmbl-AdvancedTextBox");
            var subjEl=mmtvEl.querySelector(".mailTemlateTopicView .nmbl-AdvancedTextBox");
            var bodyEl=mmtvEl.querySelector(".nmbl-AdvancedTextArea");
            if(nameEl)nameEl.value=mailTemplates[i].name;
            if(subjEl)subjEl.value=mailTemplates[i].subject;
            if(bodyEl)bodyEl.value=mailTemplates[i].body;
            mmtvEl.style.display='block';
            atEl.style.display='none';
            var svEl=dmtcEl.querySelector("a.save-Mail-Template");
            if(svEl){svEl.scrollIntoView();}
           }

          }
         })(i);
        } // for  
        //taistApi.log("a.modify-Mail-Template");
      } // if
      

// Add Template
      var atEl=dmtcEl.querySelector("a.add-Mail-Template");
      if(atEl){
        atEl.onclick=function(){
          //taistApi.log("atEl.onclick",dmtcEl);
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){

           var mmtvEl=dmtcEl.querySelector(".ModifyMailTemplateView");           
           var atEl=dmtcEl.querySelector("a.add-Mail-Template");
           if(mmtvEl && atEl){
            mmtvEl.templateindex=-1;
            var nameEl=mmtvEl.querySelector(".mailTemlateNameView .nmbl-AdvancedTextBox");
            var subjEl=mmtvEl.querySelector(".mailTemlateTopicView .nmbl-AdvancedTextBox");
            var bodyEl=mmtvEl.querySelector(".nmbl-AdvancedTextArea");
            if(nameEl)nameEl.value=templateName;
            if(subjEl)subjEl.value=templateSubject;
            if(bodyEl)bodyEl.value=templateBody;
            mmtvEl.style.display='block';
            atEl.style.display='none';
            var svEl=dmtcEl.querySelector("a.save-Mail-Template");
            if(svEl){svEl.scrollIntoView();}
            var dtEl=dmtcEl.querySelector("a.delete-Mail-Template"); 
           }


            ssvEl.style.display='block';
            atEl.style.display='none';
          }
        }
        //taistApi.log("a.add-Mail-Template");
      }

// Save template
      var stEl=dmtcEl.querySelector("a.save-Mail-Template");
      if(stEl){
        stEl.onclick=function(){
          var userId=document.querySelector("a.userName");      
          //taistApi.log("stEl.onclick",dmtcEl);          
          if(dmtcEl){
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){
           var mmtvEl=dmtcEl.querySelector(".ModifyMailTemplateView");           
           var atEl=dmtcEl.querySelector("a.add-Mail-Template");
           if(mmtvEl && atEl){
            var i =mmtvEl.templateindex;
            if(i==-1){
              mailTemplates.push({});
              i=mailTemplates.length-1;
              //console.log('mailTemplates',mailTemplates,'i',i);
            }
            var nameEl=mmtvEl.querySelector(".mailTemlateNameView .nmbl-AdvancedTextBox");
            var subjEl=mmtvEl.querySelector(".mailTemlateTopicView .nmbl-AdvancedTextBox");
            var bodyEl=mmtvEl.querySelector(".nmbl-AdvancedTextArea");
            if(nameEl)mailTemplates[i].name=nameEl.value;
            if(subjEl)mailTemplates[i].subject=subjEl.value;
            if(bodyEl)mailTemplates[i].body=bodyEl.value;
            //console.log(mailTemplates[i]);
            if(userId)saveToStorage(userId.innerText);
              // rebuild dom
             var SettingsDealsView = document.querySelector(".SettingsDealsView");
             if(SettingsDealsView){
              var el=document.querySelector(".dealMailTemplatesContainer");
              if(el){
               el.remove();
               rebuildTemplates(SettingsDealsView);
               var atEl=dmtcEl.querySelector("a.add-Mail-Template");
               if(atEl){
                atEl.scrollIntoView();
               }

              } 
              return; // why?
             }

            }
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){ssvEl.style.display='none';}
          var atEl=dmtcEl.querySelector("a.add-Mail-Template");
          if(atEl){atEl.style.display='block';}
          }
         }
        }
        //taistApi.log("a.save-Mail-Template");
      }


// Cancel template
      var ctEl=dmtcEl.querySelector("a.cancel-Mail-Template");
      if(ctEl){
        ctEl.onclick=function(){
          //taistApi.log("ctEl.onclick",dmtcEl);
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){ssvEl.style.display='none';}
          var atEl=dmtcEl.querySelector("a.add-Mail-Template");
          if(atEl){atEl.style.display='block';}
        }
        //taistApi.log("a.cancel-Mail-Template");
      }

// Delete template
      var dtEl=dmtcEl.querySelector("a.delete-Mail-Template");
      if(dtEl){
        dtEl.onclick=function(){
          //taistApi.log("dtEl.onclick",dmtcEl);
          var userId=document.querySelector("a.userName");
          //console.log("Delete template userId",userId.innerHTML);
          if(dmtcEl){
          var ssvEl=dmtcEl.querySelector(".ModifyMailTemplateView");
          if(ssvEl){
            //console.log("Delete template",ssvEl.templateindex);
            if(ssvEl.templateindex!='undefined' || ssvEl.templateindex!=null){
             var i=ssvEl.templateindex;
             if(i>=0 && i<mailTemplates.length){
             //console.log("Delete template i",i);
             mailTemplates.splice(i, 1);
             if(userId){saveToStorage(userId.innerText);};
             //console.log("delete template",i);
             // rebuild dom
             var SettingsDealsView = document.querySelector(".SettingsDealsView");
             if(SettingsDealsView){
              var el=document.querySelector(".dealMailTemplatesContainer");
              if(el){
               el.remove();
               rebuildTemplates(SettingsDealsView);
               var atEl=dmtcEl.querySelector("a.add-Mail-Template");
               if(atEl){
                atEl.scrollIntoView();
               }
              } 
              return; // why?
             }//
             }//i
            }//templateIndex    

            ssvEl.style.display='none';
          }//eevEl
          var atEl=dmtcEl.querySelector("a.add-Mail-Template");
          if(atEl){atEl.style.display='block';}
        }//
        }
        //taistApi.log("a.delete-Mail-Template");
      }



    }
  }
}


var mainPanelObserver=null;
var SettingsDealsViewCounter=0;
var profileInfoWrapperCounter=0;

function prepareIt() {

taistApi.log("prepareIt");


window.addEventListener("hashchange", function(){
 var hash=location.hash;
 console.log('hashchange',hash);
 if(hash.search("#app/deals/")==0)
 {
  console.log("#app/deals/");
  //HackDealEmail();
 }
}, false);



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
