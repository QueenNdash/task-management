// Initialize Firebase
const firebaseConfig = {
    apiKey: "ALZaSyAobsvYKXAc7mZhwn2SX4mOnukEscs1W6k",
    authDomain: "finance-tracker-e4480.firebaseapp.com",
    projectId: "finance-tracker-e4480",
    storageBucket: "finance-tracker-e4480.appspot.com",
    messagingSenderId: "127557232205",
    appId: "1:127557232205:web:e4480",
    measurementId: "G-XXXXXXXXXX" // Replace with your Measurement ID
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Get references to HTML elements
  const addTransactionForm = document.getElementById('add-transaction');
  const transactionsList = document.getElementById('transactions-list');
  
  // Function to add a new transaction
  function addTransaction(event) {
    event.preventDefault();
  
    // Get transaction details from the form
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
  
    // Create a new transaction object
    const newTransaction = {
      description: description,
      amount: amount,
      type: type
    };
  
    // Add the transaction to Firestore
    db.collection('transactions').add(newTransaction)
      .then(docRef => {
        console.log("Transaction added with ID: ", docRef.id);
        // Clear the form
        addTransactionForm.reset();
        // Update the transactions list
        displayTransactions();
      })
      .catch(error => {
        console.error("Error adding transaction: ", error);
      });
  }
  
  // Function to display transactions in the list
  function displayTransactions() {
    transactionsList.innerHTML = ''; // Clear the list
  
    db.collection('transactions').get()
      .then(snapshot => {
        snapshot.
