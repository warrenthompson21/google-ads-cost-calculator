// Add event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the calculate button by ID
    const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateROI);
        console.log('Calculator button listener added'); // Debug log
    } else {
        console.log('Calculator button not found'); // Debug log
    }
});

// Also add click handler directly to window object as backup
window.calculateROI = calculateROI;

function calculateROI() {
    console.log('Calculate function running'); // Debug log
    
    // Get input values
    const adSpend = parseFloat(document.getElementById('adSpend').value) || 0;
    const cpc = parseFloat(document.getElementById('cpc').value) || 0;
    const conversionRate = parseFloat(document.getElementById('conversionRate').value) || 0;
    const qualificationRate = parseFloat(document.getElementById('qualificationRate').value) || 0;
    const closeRate = parseFloat(document.getElementById('closeRate').value) || 0;
    const customerValue = parseFloat(document.getElementById('customerValue').value) || 0;
    const margin = parseFloat(document.getElementById('margin').value) || 0;
    const agencyCost = parseFloat(document.getElementById('agencyCost').value) || 0;

    // Calculate metrics
    const clicks = adSpend / cpc;
    const leads = clicks * (conversionRate / 100);
    const costPerLead = adSpend / leads;
    const customers = leads * (qualificationRate / 100) * (closeRate / 100);
    const revenue = customers * customerValue;
    const profit = revenue * (margin / 100) - adSpend - agencyCost;
    const roi = ((profit / (adSpend + agencyCost)) * 100).toFixed(2);

    // Update results
    document.getElementById('clicks').textContent = clicks.toFixed(0);
    document.getElementById('costPerLead').textContent = costPerLead.toFixed(2);
    document.getElementById('customers').textContent = customers.toFixed(1);
    document.getElementById('revenue').textContent = revenue.toFixed(2);
    document.getElementById('profit').textContent = profit.toFixed(2);
    document.getElementById('roi').textContent = roi;

    // Update ROI message
    const roiMessage = document.getElementById('roiMessage');
    if (roi > 100) {
        roiMessage.textContent = `Your campaign is profitable! You're making ${(roi - 100).toFixed(2)}% more than you're spending.`;
        roiMessage.style.color = 'green';
    } else if (roi < 100) {
        roiMessage.textContent = `Your campaign is losing money. You're making ${(100 - roi).toFixed(2)}% less than you're spending.`;
        roiMessage.style.color = 'red';
    } else {
        roiMessage.textContent = "Your campaign is breaking even.";
        roiMessage.style.color = 'black';
    }
} 