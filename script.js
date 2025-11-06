async function generatePlan() {
  const focus = document.getElementById('focus').value;
  const players = document.getElementById('players').value;
  const minutes = document.getElementById('minutes').value;

  const prompt = `Create a ${minutes}-minute soccer practice for ${players} high school girls focusing on ${focus}. 
  Include: warm-up, 2 main drills, cool-down. Keep it fun, safe, and progressive.`;

  // Calls your PRIVATE proxy
  const response = await fetch('https://soccer-planner-proxy.onrender.com/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  document.getElementById('plan').innerHTML = data.plan.replace(/\n/g, '<br>');
  savePlan(data.plan);
}

// Save to phone (works offline after)
function savePlan(plan) {
  const plans = JSON.parse(localStorage.getItem('plans') || '[]');
  plans.push({ date: new Date().toLocaleString(), plan });
  localStorage.setItem('plans', JSON.stringify(plans));
}
