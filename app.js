'use strict';
// No fetch, XMLHttpRequest, WebSocket, tracking or remote AI. Microphone recognition is opt-in and may use Apple services.
const KEY='jojo_private_v1';
const blank=()=>({messages:[],notes:[],tasks:[],speak:false,micConsent:false,voiceLang:'en-CA'});
function read(){try{const d=JSON.parse(localStorage.getItem(KEY));if(!d||!Array.isArray(d.messages)||!Array.isArray(d.notes)||!Array.isArray(d.tasks))return blank();return {...blank(),...d};}catch{return blank();}}
let state=read();
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{alert('Your iPhone storage is full or unavailable. New notes may not be saved.');}}
function bubble(role,content){const div=document.createElement('div');div.className='bubble '+role;div.textContent=content;$('chat').appendChild(div);$('chat').scrollTop=$('chat').scrollHeight;}
for(const m of state.messages.slice(-70)){if(m&&['assistant','user'].includes(m.role)&&typeof m.text==='string')bubble(m.role,m.text);}
function speak(text,force=false){if((!state.speak&&!force)||!('speechSynthesis' in window))return false;try{speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang=/[\u0900-\u097f]/.test(text)?'hi-IN':/[\u0a00-\u0a7f]/.test(text)?'pa-IN':'en-CA';utter.rate=.95;utter.onerror=()=>status('Speech playback failed. Check your volume and voice settings.');speechSynthesis.speak(utter);return true;}catch{return false;}}
const tidy=t=>t.replace(/^\s+|\s+$/g,'');
function answer(text){const t=tidy(text),s=t.toLowerCase();let m;
if(/^(?:remember(?: that)?|note(?: that)?|save (?:a )?note[: ]|yaad rakh(?:na)?(?: ki)?|ਯਾਦ ਰੱਖ|याद रख)\s+(.+)/iu.test(t)){m=t.match(/^(?:remember(?: that)?|note(?: that)?|save (?:a )?note[: ]|yaad rakh(?:na)?(?: ki)?|ਯਾਦ ਰੱਖ|याद रख)\s+(.+)/iu);state.notes.push(m[1]);save();return 'Saved on this iPhone. 🔒 You can say “show my notes” or “delete all my data.”';}
if(/^(?:add|create)\s+(.+?)\s+to\s+(?:my\s+)?(?:tasks|to-?do(?: list)?)\.?$/i.test(t)){m=t.match(/^(?:add|create)\s+(.+?)\s+to\s+(?:my\s+)?(?:tasks|to-?do(?: list)?)\.?$/i);state.tasks.push({text:m[1],done:false});save();return 'Added to your private task list: '+m[1];}
if(/^(?:task[: ]|todo[: ])(.+)/i.test(t)){m=t.match(/^(?:task[: ]|todo[: ])(.+)/i);state.tasks.push({text:tidy(m[1]),done:false});save();return 'Task saved: '+tidy(m[1]);}
if(/^(?:done|complete|finish)\s+(\d+)$/i.test(t)){const n=Number(t.match(/\d+/)[0]);if(n<1||n>state.tasks.length)return 'No task with that number. Say “show my tasks”.';state.tasks[n-1].done=true;save();return 'Marked task '+n+' complete. ✓';}
if(/(?:show|list|read|display|what are)\s+(?:my\s+)?(?:notes|memories)|(?:meri|mere) notes/i.test(s))return state.notes.length?'Your private notes:\n'+state.notes.map((n,i)=>`${i+1}. ${n}`).join('\n'):'No notes yet. Say “Remember that …” to add one.';
if(/(?:show|list|read|display|what are)\s+(?:my\s+)?(?:tasks|to-?dos)|(?:mere|meri) tasks/i.test(s))return state.tasks.length?'Your tasks:\n'+state.tasks.map((n,i)=>`${i+1}. ${n.done?'✓':'○'} ${n.text}`).join('\n')+'\nSay “done 1” to complete task 1.':'No tasks yet. Try “Add buy milk to my tasks.”';
if(/(?:what can you do|help|commands|capabilities|ki kar sakda)/i.test(s))return 'I can save and show notes, keep a simple task list, tell time/date, and chat with basic greetings in English, Roman Punjabi or Hindi. Try:\n• Remember that I like tea\n• Show my notes\n• Add call home to my tasks\n• Show my tasks\n• Done 1\n• What time is it?\nI am a private offline starter, not a full generative AI yet.';
if(/(?:what(?:'s| is) the time|time (?:now|please)|kinne vajje|kitne baje)/i.test(s))return 'Your iPhone time is '+new Date().toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'})+'.';
if(/(?:what(?:'s| is) (?:the )?date|today(?:'s)? date|aj (?:ki )?date|aaj (?:ki )?date)/i.test(s))return 'Today is '+new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'})+'.';
if(/\b(?:kidda|kiddan|ki haal|kive|hanji|sat sri akaal|satsriakal|veere|paaji)\b/i.test(s))return 'Vadhiya ji! 😄 Tussi dasso, ki haal aa? Main jojo haan — tuhadda private assistant.';
if(/(?:कैसे हो|नमस्ते|क्या हाल|कैसा है)/u.test(s))return 'Namaste! Main jojo hoon. 😊 Aap kaise hain?';
if(/\b(?:hello|hi|hey|good morning|good evening)\b/i.test(s))return 'Hey there! 👋 How can I help? I can remember notes and manage tasks locally.';
if(/\b(?:thank you|thanks|shukriya|dhannvaad)\b/i.test(s))return 'You’re welcome! 😊';
if(/(?:delete all my data|erase everything|clear my history)/i.test(s))return 'To delete everything safely, open ☷ Privacy & controls and press “Delete all local chats, notes & tasks.”';
return 'I understand your message, but this offline starter does not have a full language model yet. I can help with private notes, tasks, simple greetings, and the date/time. Tap “Explore” for examples. I won’t send your message to a server to get an answer.';
}
function send(text){text=tidy(text);if(!text)return;bubble('user',text);state.messages.push({role:'user',text});let reply;try{reply=answer(text);}catch{reply='I hit a local error. Please try again.';}bubble('assistant',reply);state.messages.push({role:'assistant',text:reply});state.messages=state.messages.slice(-150);save();speak(reply);}
$('composer').addEventListener('submit',e=>{e.preventDefault();const x=$('message');const t=x.value;x.value='';send(t);});
document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.prompt)));
$('settings').addEventListener('click',()=>{$('speak').checked=!!state.speak;$('mic-consent').checked=!!state.micConsent;$('voice-lang').value=state.voiceLang||'en-CA';$('privacy').showModal();});$('close').addEventListener('click',()=>$('privacy').close());$('speak').addEventListener('change',e=>{state.speak=e.target.checked;save();});

let recognition=null, listening=false;
$('dictate').addEventListener('click',()=>{const m=$('message');m.focus();status('Use the microphone on your iPhone keyboard to dictate your message, then press Send.');});
$('mic-test').addEventListener('click',async()=>{if(!navigator.mediaDevices?.getUserMedia){status('Microphone API unavailable. Open jojo directly in Safari, not WhatsApp.');return;}const btn=$('mic-test');btn.disabled=true;try{const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});stream.getTracks().forEach(t=>t.stop());status('Microphone permission works! Voice transcription may still be unavailable in this browser.');}catch(e){status('Mic test: '+(e.name||'unavailable')+'. Open Safari and check microphone site permissions.');}finally{btn.disabled=false;}});
function status(msg){$('voice-status').textContent=msg;}
function stopListening(){if(recognition){try{recognition.stop();}catch{}}listening=false;$('mic').textContent='🎙 Talk to jojo';}
$('voice-test').addEventListener('click',()=>{if(!speak('Hello! I am jojo. Sat Sri Akal!',true))status('Voice playback is not supported in this browser.');});
$('mic-consent').addEventListener('change',e=>{state.micConsent=e.target.checked;save();if(!state.micConsent)stopListening();});
$('voice-lang').addEventListener('change',e=>{state.voiceLang=e.target.value;save();});
$('mic').addEventListener('click',()=>{
 if(listening){stopListening();status('Microphone stopped.');return;}
 if(!state.micConsent){$('settings').click();status('Enable speech recognition in Privacy & controls first.');return;}
 const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SpeechRecognition){status('Speech recognition is not supported here. Use iPhone keyboard dictation or type.');return;}
 try{
  recognition=new SpeechRecognition();recognition.lang=state.voiceLang||'en-CA';recognition.interimResults=false;recognition.continuous=false;recognition.maxAlternatives=1;
  recognition.onresult=e=>{const t=e.results?.[0]?.[0]?.transcript;if(t){$('message').value=t;send(t);$('message').value='';status('Heard your message. Tap to speak again.');}};
  recognition.onerror=e=>status('Speech recognition: '+(e.error||'unavailable')+'. Try Safari directly or iPhone dictation.');
  recognition.onend=()=>{listening=false;$('mic').textContent='🎙 Talk to jojo';};
  recognition.start();listening=true;$('mic').textContent='⏹ Stop listening';status('Listening…');
 }catch{status('Could not start microphone. Check Safari permissions.');}
});

$('clear').addEventListener('click',()=>{if(!confirm('Permanently delete all jojo chats, tasks, and notes from this iPhone?'))return;localStorage.removeItem(KEY);state=blank();$('chat').replaceChildren();bubble('assistant','All local jojo data deleted. You can start fresh.');$('privacy').close();});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
