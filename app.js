// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  hideResults();
  showLoader();

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    showResults();
    hideLoader();
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error){
  showResults();
  hideLoader();

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
   // call on a parent and pass elem u want to put in (errorDiv) and what u want to inster (heading)
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}

// Show results
const showResults = () => {
  document.getElementById('results').style.display = 'block';
}

// Hide results
const hideResults = () => {
  document.getElementById('results').style.display = 'none';
}

// Show loader
const showLoader = () => {
  document.getElementById('loading').style.display = 'block';
}

// hide loader
const hideLoader = () => {
document.getElementById('loading').style.display = 'none';
}
