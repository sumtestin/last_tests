document.write(`

	<div id="chat-bubble">
        <div id="typing">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        </div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sumtestin/last_tests@v5.0.0/goł7.css">
    <style>
		#chatbox{
			width: 300px;
			height: 300px;
		}
        #chatbar{
		    background-color: rgb(128, 211, 192);
		}
        .bot-msg{
			background-color: rgb(106, 120, 255);
			font-family: Merriweather, "Open Sans";
		}
        .user-msg{
			background-color: rgb(243, 240, 233);
			font-family: Roboto, sans-serif;
		}
        .multiple-btn{
			background-color: rgb(255, 241, 46);
		}
    </style>
	<div id="start-chatbot" onclick="start()">rozpocznij</div>
	<div id="chatbox" style="display: none;">
	<div id="chatbar"></div>
	<form id="chatbot-form" onsubmit="get_data()" action="#" style="display: none;">
		<input id="chatbot-input" type="text" value="">
		<input type="submit">
	</form>	
	<div id='1' class='text bot-msg' style='display: none;'>uciekam z githuba xd</div><div id='2' class='text bot-msg' style='display: none;'>dzis stawiam wlasne API :D</div><div id='3b' class='multiple multiple-btn' onclick='option_choosen(this.id)' style='display: none;'>1</div><div id='3c' class='multiple multiple-btn' onclick='option_choosen(this.id)' style='display: none;'>2</div><div id='3a' class='multiple multiple-btn' onclick='option_choosen(this.id)' style='display: none;'>3</div><div id='4b' class='text bot-msg' style='display: none;'>jeden</div><div id='4c' class='text bot-msg' style='display: none;'>dwa</div><div id='4a'class='6 input_CB bot-msg' style='display: none;'>trzy</div>
	</div>
`);
console.log(localStorage)

var flow_number = '';

function start(){
	document.getElementById("chatbox").style.display = "block";
	check_next(1)
}

const delay = ms => new Promise(res => setTimeout(res, ms));
async function check_next(next_block){
	flow_number = next_block;
	await show_typing();
	await delay(700);
	let block_type = document.querySelectorAll('[id^="'+next_block+'"]')[0];
	//let block_type = document.getElementById(next_block);
	if(block_type.classList.contains("text")){
		text_block(next_block);
	}
	else if(block_type.classList.contains("input_CB")){
		// await for input being done
		//await get_data();
		input_block(next_block);
	}
	else if(block_type.classList.contains("email")){
		email_block(next_block);
	}
	else if(block_type.classList.contains("phone")){
		phone_block(next_block);
	}
	else if(block_type.classList.contains("multiple")){
		multiple_block(next_block);
	}
}

function get_data(){
//	await handle_input()
	//print user's input as message
	let chatbot_input = document.getElementById("chatbot-input");
	var users_input = document.createElement("div");
	users_input.innerHTML = chatbot_input.value;
	users_input.className = "user-msg";
	document.getElementById("chatbox").appendChild(users_input);
	//scroll chatbox to bottom
	//get input outside
	localStorage.setItem('data', chatbot_input.value)
	//hide input
	document.getElementById("chatbot-form").style.display = "none";
	let subject;
	if(document.getElementById(flow_number).classList.contains("input_CB")){
		subject = "Ktoś zostawił wiadomość poprzez twojego chatbota";
	}
	else{
		subject = "Pozyskałeś nowego leada!";
	}
	fetch('http://192.168.1.48:80/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			lead: chatbot_input.value,
			subject: subject,
		})
	}).then(res => {
		return res.json()
	})
	.then(data => console.log(data))
	.catch(error => console.log('ERROR'))
}

function handle_flow_number(flow_number){
	return parseInt(flow_number.toString().replace(/\D/g,'')) + 1 + flow_number.toString().replace(/[0-9]/g, '');
}

var chat_bubble = document.getElementById('chat-bubble')
function show_typing() {
	chat_bubble.style.visibility  = 'visible';
	return new Promise(resolve => {
		setTimeout(() => {
			chat_bubble.style.visibility  = 'hidden';
			resolve('resolved');
		}, 1200);
	});
}

function text_block(flow_number){
	//show chat-bubble, maybe new function
/* 	chat_bubble.style.visibility  = 'visible';
	setTimeout(
		function(){
			chat_bubble.style.visibility  = 'hidden';
		}
	, 2000) */
	// do other stuff
	let msg = document.getElementById(flow_number);
	setTimeout(
		function() {
			msg.style.display = "block";
	}, 1200);
	//next block
	if(msg.style.display = "block"){
		let next_block = handle_flow_number(flow_number);
		check_next(next_block);
	}
}

function multiple_block(flow_number){
	//let msg = document.getElementById(flow_number);
	setTimeout(
		function() {
			let options = document.querySelectorAll('[id^="'+flow_number+'"]');
			for(var i = 0; i < options.length; i++){
				options[i].style.display = "block"
			}
	}, 1000);
}

function option_choosen(option){
	//type option
	var users_option = document.createElement("div");
	users_option.innerHTML = document.getElementById(option).innerHTML;
	users_option.className = "user-msg";
	document.getElementById("chatbox").appendChild(users_option);
	//hide options
	let options = document.querySelectorAll('[id^="'+option.replace(/\D/g,'')+'"]');
	for(var i = 0; i < options.length; i++){
		options[i].style.display = "none"
	}
	//show resp, thats going to be handled in next one
	let flow_number = parseInt(option.replace(/\D/g,'')) + 1 + option.replace(/[0-9]/g, '');
	check_next(flow_number);
}

document.addEventListener("submit", (e) => {
	// Store reference to form to make later code easier to read
	const form = e.target;
	
	let next_block = handle_flow_number(flow_number);
	check_next(next_block);

	e.preventDefault();
});

function input_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	//and mail functionality, osobna funkcja, do input and then div with class users_msg
	document.getElementById("chatbot-form").style.display = "block";
	//get_data(flow_number)
	setTimeout(
		function() {
			msg.style.display = "block";
	}, 1000);
	//next block
	// YEAH, HERE AWAIT FOR FUNCTION THAT HANDLES INPUT, OR MAYBE NOT
	return flow_number;
}

function email_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	//and mail functionality, osobna funkcja, do input and then div with class users_msg
	document.getElementById("chatbot-form").style.display = "block";
	//get_data(flow_number)
	setTimeout(
		function() {
			msg.style.display = "block";
	}, 1000);
	//next block
	// YEAH, HERE AWAIT FOR FUNCTION THAT HANDLES INPUT, OR MAYBE NOT
	return flow_number;
}

function phone_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	//and mail functionality, osobna funkcja, do input and then div with class users_msg
	document.getElementById("chatbot-form").style.display = "block";
	//get_data(flow_number)
	setTimeout(
		function() {
			msg.style.display = "block";
	}, 1000);
	//next block
	// YEAH, HERE AWAIT FOR FUNCTION THAT HANDLES INPUT, OR MAYBE NOT
	return flow_number;
}