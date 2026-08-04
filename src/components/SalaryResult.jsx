import React from 'react';
import { formatCurrency } from '../utils/currencyFormatter';
import { validateSalaryOutput } from '../utils/salaryValidation';

const SalaryResult = ({ result }) => {
  if (!result) return null;

  if (result.confidence === "Low") {
    return (
      <div style={{ padding: '20px', color: 'red', border: '1px solid red' }}>
        <h3>Data Unavailable</h3>
        <p>{result.error}</p>
      </div>
    );
  }

  const isValid = validateSalaryOutput(result);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h2>Salary Estimation for {result.role}</h2>
      
      {!isValid && <p style={{ color: 'red' }}>Warning: Salary data failed validation check.</p>}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <div>
          <h4>Minimum</h4>
          <p>{formatCurrency(result.minSalary, result.currencyCode)}</p>
        </div>
        <div>
          <h4>Median</h4>
          <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
            {formatCurrency(result.medianSalary, result.currencyCode)}
          </p>
        </div>
        <div>
          <h4>Maximum</h4>
          <p>{formatCurrency(result.maxSalary, result.currencyCode)}</p>
        </div>
      </div>

      <div>
        <h4>Key Factors:</h4>
        <ul>
          {result.factors.map((factor, index) => (
            <li key={index}>{factor}</li>
          ))}
        </ul>
      </div>
      
      <div style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
        <p>Source: {result.source.name} ({result.source.date}) | Confidence: {result.confidence}</p>
      </div>
    </div>
  );
};

export default SalaryResult;