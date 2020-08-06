var contractAddress ="0x3bca18d905428ca555f9b67f2e4634025b3135e1";
console.log("Contract Address ->", contractAddress);

var accounts;
var studentContract;

var abi=[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_fullName",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_courseName",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_score",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_studentAddress",
				"type": "address"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "blockholic",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllStudentAddress",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllStudents",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfStudents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

window.addEventListener('load',async()=>{
	if(window.ethereum)	{
		window.web3 = new Web3(ethereum);
		
		try{
			await ethereum.enable();
			if(typeof web3!=="undefined"){
				web3 = new Web3(web3.currentProvider);
			}
			else{
				web3 = new Web3(new Web3.eth.providers.HttpProvider("https://rinkeby.infura.io/v3/48595f53d1b54956b75dd2b788cc562b"))
			}
			accounts = await web3.eth.getAccounts();
		console.log(accounts);
		web3.eth.defaultAccount=accounts[0];
		console.log("DefaultAccount is->",web3.eth.defaultAccount);
		studentContract = await new web3.eth.Contract(abi,contractAddress);
		console.log("studentContract->",studentContract);
	
		}
		catch(error){
			console.log("Please allow to access the app");
			console.log(error);
		}
	}
	else if(window.web3)
	{
		window.web3 = new Web3(web3.currentProvider);
	}
	else{
		console.log("Non ethereum browser detected. You may consider Metamask");
	}
});


async function addToBlockchain(){
	//console.log("I am in issue function");

	var fullName = $('#fullName').val();
	var score = $('#score').val();
	var studentAddress=$('#studentAddress').val();
	var courseName=$('#courseName').val();

	console.log(fullName,score,courseName,studentAddress);


	studentContract.methods
	.addStudent(web3.utils.fromAscii(fullName),web3.utils.fromAscii(courseName),score,studentAddress)
	.send({from: web3.eth.defaultAccount})
	.on('receipt',function(receipt){
		console.log(receipt);
	});
}
async function getStudentAddressFromBlockchain(){
	studentContract.methods.getAllStudentAddress().call().then(function(data){
		console.log(data);
	})
}