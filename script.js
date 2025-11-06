async function generatePlan() {
  const focus = document.getElementById('focus').value;
  const players = document.getElementById('players').value;
  const minutes = document.getElementById('minutes').value;

  const prompt = `Create a ${minutes}-minute soccer practice for ${players} high school girls focusing on ${focus}. 
  Include: warm-up, 2 main drills, cool-down. Keep it fun, safe, and progressive. Use simple equipment.`;

  // FREE AI CALL
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBWqJ3B3Cddb66FdI2WDAGHhECJHP1VGVM`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const plan = data.candidates[0].content.parts[0].text;

  document.getElementById('plan').innerHTML = plan.replace(/\n/g, '<br>');
  savePlan(plan);
}

// Save to phone (works offline after)
function savePlan(plan) {
  const plans = JSON.parse(localStorage.getItem('plans') || '[]');
  plans.push({ date: new Date().toLocaleString(), plan });
  localStorage.setItem('plans', JSON.stringify(plans));
}