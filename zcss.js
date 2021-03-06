document.write(`

	<link rel='stylesheet' href='users-code.css'>
	<style>
		#chatbar: rgb(176, 251, 162);
		.bot-msg: rgb(151, 203, 213);
		.user-msg: rgb(243, 240, 233);
		.multiple-btn: rgb(255, 241, 46);
	</style>
	<div id='start-chatbot' onclick='start()'>rozpocznij</div>
	<div id='chatbox' style='display: none;'>
	<div id='chatbar'></div>

	<div id='chat-bubble'>
	<div id='typing'>
	  <div class='dot'></div>
	  <div class='dot'></div>
	  <div class='dot'></div>
	</div>
	</div>
	<form id='chatbot-form' onsubmit='get_data()' action='#' style='display: none;'>
		<input id='chatbot-input' type='text'>
		<input type='submit'>
	</form>	
    <div id='1' class='text bot-msg' style='display: none;'>no czesc</div><div id='2' class='text bot-msg' style='display: none;'>co tam u ciebie</div><div id='3a' class='multiple multiple-btn' onclick='option_choosen(this.id)' style='display: none;'>jest super, lece sobie</div><div id='3b' class='multiple multiple-btn' onclick='option_choosen(this.id)' style='display: none;'>jest genialnie!</div><div id='4b' class='text bot-msg' style='display: none;'>i tak byc powinno!</div><div id='4a' class='text bot-msg' style='display: none;'>mega mnie to cieszy!</div><div id='5a'class='6 input_CB bot-msg' style='display: none;'>daj info</div><div id='6a' class='text bot-msg' style='display: none;'>infor przyjete</div><div id='5b' class='8 bot-msg' style='display: none;'>daj maila</div><div id='6b' class='text bot-msg' style='display: none;'>mailik przyjety!</div>
	</div>
`);
console.log(localStorage)

function start(){
	document.getElementById('chatbox').style.display = 'block';
	check_next(1)
}

function check_next(next_block){
	console.log(next_block)
	let block_type = document.getElementById(next_block);
	if(block_type.classList.contains('text')){
		text_block(next_block);
	}
	else if(block_type.classList.contains('input')){
		input_block(next_block);
	}
	else if(block_type.classList.contains('email')){
		email_block(next_block);
	}
	else if(block_type.classList.contains('phone')){
		phone_block(next_block);
	}
	else if(block_type.classList.contains('multiple')){
		multiple_block(next_block);
	}
}

function get_data(){
	//print user's input as message
	let chatbot_input = document.getElementById('chatbot-input');
	var users_input = document.createElement('div');
	users_input.innerHTML = chatbot_input.value;
	users_input.className = 'user-msg';
	document.getElementById('chatbox').appendChild(users_input);
	//scroll chatbox to bottom
	//get input outside
	localStorage.setItem('data', chatbot_input.value)
	//hide input
	document.getElementById('chatbot-form').style.display = 'none';
}

function handle_flow_number(flow_number){
	return parseInt(flow_number.toString().replace(/\D/g,'')) + 1 + flow_number.toString().replace(/[0-9]/g, '');
}

function text_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	setTimeout(
		function() {
			msg.style.display = 'block';
	}, 1000);
	//next block
	let next_block = handle_flow_number(flow_number);
	check_next(next_block);
}

function multiple_block(flow_number){
	//let msg = document.getElementById(flow_number);
	setTimeout(
		function() {
			let options = document.querySelectorAll('[id^=','+flow_number+',']');
			for(var i = 0; i < options.length; i++){
				options[i].style.display = 'block'
			}
	}, 1000);
}

function option_choosen(option){
	//type option
	var users_option = document.createElement('div');
	users_option.innerHTML = document.getElementById(option).innerHTML;
	users_option.className = 'user-msg';
	document.getElementById('chatbox').appendChild(users_option);
	//hide options
	let options = document.querySelectorAll('[id^=','+option.replace(/\D/g,',')+',']');
	for(var i = 0; i < options.length; i++){
		options[i].style.display = 'none'
	}
	//show resp, thats going to be handled in next one
	let flow_number = parseInt(option.replace(/\D/g,'')) + 1 + option.replace(/[0-9]/g, '');
	check_next(flow_number);
}

function input_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	//and mail functionality, osobna funkcja, do input and then div with class users_msg
	document.getElementById('chatbot-form').style.display = 'block';
	//get_data(flow_number)
	setTimeout(
		function() {
			msg.style.display = 'block';
	}, 1000);
	//next block
	let next_block = handle_flow_number(flow_number);
	check_next(next_block);
}

function email_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	//and mail functionality, osobna funkcja, do input and then div with class users_msg
	document.getElementById('chatbot-form').style.display = 'block';
	//get_data(flow_number)
	setTimeout(
		function() {
			msg.style.display = 'block';
	}, 1000);
	//next block
	let next_block = handle_flow_number(flow_number);
	check_next(next_block);
}

function phone_block(flow_number){
	//show chat-bubble
	let msg = document.getElementById(flow_number);
	//and mail functionality, osobna funkcja, do input and then div with class users_msg
	document.getElementById('chatbot-form').style.display = 'block';
	//get_data(flow_number)
	setTimeout(
		function() {
			msg.style.display = 'block';
	}, 1000);
	//next block
	let next_block = handle_flow_number(flow_number);
	check_next(next_block);
}