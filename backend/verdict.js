// verdict.js
// This script pulls user input from localStorage and shows it on the verdict page or uses it for AI evaluation

window.addEventListener('DOMContentLoaded', () => {
  const purchaseData = JSON.parse(localStorage.getItem('bdgtrPurchaseData')) || {};
  const financialData = JSON.parse(localStorage.getItem('bdgtrFinancialData')) || {};

  // Example: Displaying collected data for now
  const verdictContainer = document.getElementById('verdict-output');
  if (verdictContainer) {
    verdictContainer.innerHTML = `
      <h2>Your Inputs</h2>
      <h3>Purchase Info</h3>
      <p><strong>Item:</strong> ${purchaseData.whatBuying}</p>
      <p><strong>Necessity:</strong> ${purchaseData.necessity}</p>
      <p><strong>Recurring:</strong> ${purchaseData.recurring}</p>
      <p><strong>Cost:</strong> $${purchaseData.cost}</p>
      <p><strong>Recurring Frequency:</strong> ${purchaseData.recurringFrequency}</p>
      <p><strong>Recurring Cost:</strong> $${purchaseData.recurringCost}</p>
      <p><strong>Other Info:</strong> ${purchaseData.otherInfo}</p>

      <h3>Financial Info</h3>
      <p><strong>Net Worth:</strong> ${financialData.netWorth}</p>
      <p><strong>Cash in Bank:</strong> $${financialData.bankCash}</p>
      <p><strong>Has Income:</strong> ${financialData.hasIncome}</p>
      <p><strong>Income:</strong> $${financialData.income}</p>
      <p><strong>Has Debt:</strong> ${financialData.hasDebt}</p>
      <p><strong>Debt Amount:</strong> $${financialData.debtAmount}</p>
      <p><strong>Debt Plan:</strong> ${financialData.debtPlan}</p>
      <p><strong>Other Info:</strong> ${financialData.otherInfo}</p>
    `;
  }
});
