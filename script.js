document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount"); // Corrected ID
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();
  
    renderExpenses();
  
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = expenseNameInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value.trim());
  
      if (name !== "" && !isNaN(amount) && amount > 0) {
        const newExpense = {
          id: Date.now(),
          name: name,
          amount: amount,
        };
        expenses.push(newExpense);
        saveExpensesToLocal();
        renderExpenses();
        updateTotal();
  
        // Clear input fields
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
      }
    });
  
    function calculateTotal() {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
  
    function saveExpensesToLocal() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    function updateTotal() {
      totalAmount = calculateTotal();
      totalAmountDisplay.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }
  
    function renderExpenses() {
      expenseList.innerHTML = "";
      expenses.forEach(expense => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${expense.name} - $${expense.amount}
          <button data-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    }
  
    expenseList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const expenseId = parseInt(e.target.getAttribute('data-id'));
        expenses = expenses.filter(expense => expense.id !== expenseId);
  
        saveExpensesToLocal();
        renderExpenses();
        updateTotal();
      }
    });
  });
  