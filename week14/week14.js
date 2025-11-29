function setupChangeEvent() {
  if (!changeBtn) return;

  changeBtn.addEventListener("click", async () => {
    try {
      const selectedValue = majorDropdown.value;
      if (!selectedValue || selectedValue === "") {
        alert("Please select a plan first.");
        return;
      }

      const apiUrl = `api/v1/students/${stdId}/declared-plan`;
      const result = await updateDeclaredPlan(apiUrl, selectedValue);

      console.log("Changed Success:", result);

      showDialog("Declaration updated.")
      const data = await loadStudentData()
      setupDropdownUI(majorDropdown, declareBtn, changeBtn, cancelBtn, data);
    } catch (error) {
      console.error(error);
      
      if(error.status === 409){
        showDialog("Cannot update the declared plan because it has been cancelled.");
        const data = await loadStudentData()
        setupDropdownUI(majorDropdown, declareBtn, changeBtn, cancelBtn, data);
      } else if(error.status === 404) {
        await loadStudentData()
        setupDropdownUI(majorDropdown, declareBtn, changeBtn, cancelBtn);
        showDialog(`No declared plan found for student with id=${stdId}.`); 
      } else {
        showDialog("There is a problem. Please try again later.");
        const data = await loadStudentData()
        setupDropdownUI(majorDropdown, declareBtn, changeBtn, cancelBtn, data);
      }
    }
  });
}