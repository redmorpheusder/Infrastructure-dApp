let web3;
let contractInstance;
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanAmountLeft",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalReceivedAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "principleLoanPayed",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "LoanRepaid",
                "type": "bool"
            }
        ],
        "name": "InstallmentRepaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "interestLeft",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "InterestRepaid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalReceivedAmount",
                "type": "uint256"
            }
        ],
        "name": "InterestRepaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            }
        ],
        "name": "Lended",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "interestRate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanPeriod",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanInstallmentPeriod",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "installmentAmount",
                "type": "uint256"
            }
        ],
        "name": "LoanCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            }
        ],
        "name": "LoanDefaulted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            }
        ],
        "name": "LoanLate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address payable",
                "name": "lendee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "interestPayed",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "principleLoanPayed",
                "type": "uint256"
            }
        ],
        "name": "LoanRepaidInFull",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountLeft",
                "type": "uint256"
            }
        ],
        "name": "amountLeft",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "basicString",
                "type": "string"
            }
        ],
        "name": "basicString",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "blank",
                "type": "uint256"
            }
        ],
        "name": "emitUint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "_loanIds",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "loanIds",
                "type": "uint256[]"
            }
        ],
        "name": "myActiveLoans",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "scAddress",
                "type": "address"
            }
        ],
        "name": "thisSCAddress",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "checkPaidBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_lendee",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "_lender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_loanAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_interestRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_loanPeriod",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_loanInstallmentPeriod",
                "type": "uint256"
            }
        ],
        "name": "createLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "defaultLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "walletAddress",
                "type": "address"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyActiveLoans",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getThisSmartContractAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "lendLoan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "remainingInterestBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "remainingLoanBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "remainingTimeForLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "repayCustAmountLoan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "repayInstallment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "repayInterest",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];
const contractAddress = '0xd2d12d1bd15e1deedc6f8572b7562b70ca6413e8';

async function init() {
    const getAddressButton = document.getElementById('getAddressButton');
    const scAddress = document.getElementById('scAddress');

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error("No web3 provider detected");
        return;
    }

    contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    getAddressButton.addEventListener('click', getSmartContractAddress);

    async function getSmartContractAddress() {
        const accounts = await web3.eth.getAccounts();

        // Reference the "getThisSmartContractAddress" function from your smart contract
        const getThisSmartContractAddressFunction = contractInstance.methods.getThisSmartContractAddress();

        // Set up an event listener for the "thisSCAddress" event
        contractInstance.events.thisSCAddress()
            .on('data', (event) => {
                // Display the smart contract address in the "scAddress" element
                scAddress.innerHTML = `Smart Contract Address: ${event.returnValues[1]}`;
            })
            .on('error', console.error);

        // Call the "getThisSmartContractAddress" function
        try {
            await getThisSmartContractAddressFunction.send({ from: accounts[0] });
        } catch (error) {
            console.error(error);
            scAddress.innerHTML = 'Error: Failed to get smart contract address.';
        }
    }
}

init();