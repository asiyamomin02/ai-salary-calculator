export const validateSalaryOutput = (salaryData) => {
  const { minSalary, medianSalary, maxSalary } = salaryData;

  // Rule 1: No negative salaries
  if (minSalary < 0 || medianSalary < 0 || maxSalary < 0) {
    console.error("Validation Failed: Salary cannot be negative.");
    return false;
  }

  // Rule 2: Min <= Median <= Max
  if (!(minSalary <= medianSalary && medianSalary <= maxSalary)) {
    console.error("Validation Failed: Min < Median < Max rule broken.");
    return false;
  }

  return true;
};