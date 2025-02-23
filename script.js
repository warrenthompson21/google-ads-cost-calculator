function calculateROI() {
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
    const clicks = Math.round(adSpend / cpc);
    const leads = Math.round(clicks * (conversionRate / 100));
    const qualifiedLeads = Math.round(leads * (qualificationRate / 100));
    const customers = Math.round(qualifiedLeads * (closeRate / 100));
    const revenue = customers * customerValue;
    const grossProfit = revenue * (margin / 100);
    const totalCost = adSpend + agencyCost;
    const profit = grossProfit - totalCost;
    const roi = totalCost > 0 ? ((profit / totalCost) * 100) : 0;
    const costPerLead = leads > 0 ? (totalCost / leads) : 0;

    // Update results
    document.getElementById('clicks').textContent = clicks.toLocaleString();
    document.getElementById('costPerLead').textContent = '$' + costPerLead.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('customers').textContent = customers.toLocaleString();
    document.getElementById('revenue').textContent = '$' + revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('profit').textContent = '$' + profit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    const roiElement = document.getElementById('roi');
    roiElement.textContent = roi.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%';
    
    // Update ROI color
    const messageElement = document.getElementById('roiMessage');
    if (roi > 0) {
        roiElement.className = 'positive';
        messageElement.className = 'roi-message positive';
        if (roi > 100) {
            messageElement.textContent = "Excellent! Your PPC campaign is generating outstanding returns. Keep optimizing to maintain these great results!";
        } else {
            messageElement.textContent = "Great job! Your PPC campaign is profitable. Consider testing new strategies to improve ROI further.";
        }
    } else {
        roiElement.className = 'negative';
        messageElement.className = 'roi-message negative';
        messageElement.textContent = "Your campaign needs some optimization. Try adjusting your targeting, improving landing pages, or testing different ad creatives to boost performance.";
    }
} 