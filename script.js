document.getElementById("predict").addEventListener("click", function () {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const waist = parseFloat(document.getElementById("waist").value);
    const activityDays = parseInt(document.getElementById("activity").value);
    const sugaryDrinks = parseInt(document.getElementById("sugary-drinks").value);
    const alcoholDrinks = parseInt(document.getElementById("alcohol-drinks").value);
    const smoking = document.getElementById("smoking").value === "true";
    const healthyFats = parseInt(document.getElementById("healthy-fats").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const diabetes = document.getElementById("diabetes").value === "true";

    if (isNaN(weight) || isNaN(height) || isNaN(waist) || isNaN(activityDays) || isNaN(sugaryDrinks) || isNaN(alcoholDrinks) || isNaN(healthyFats) || isNaN(age)) {
        document.getElementById("result").innerText = "Please fill in all fields correctly.";
        return;
    }

    const bmi = weight / ((height / 100) ** 2);

    let tgLevel = 100;
    tgLevel += bmi >= 30 ? 50 : 0;
    tgLevel += activityDays < 3 ? 30 : 0;
    tgLevel += sugaryDrinks > 3 ? 40 : 0;
    tgLevel += alcoholDrinks > 2 ? 20 : 0;

    let hdlLevel = gender === "male" ? 55 : 65;
    hdlLevel -= smoking ? 10 : 0;
    hdlLevel -= healthyFats < 3 ? 5 : 0;
    hdlLevel -= diabetes ? 15 : 0;
    hdlLevel -= age > 50 ? 5 : 0;

    const cmi = (tgLevel / hdlLevel) * (waist / height);
    const baselineTLevel = age >= 19 && age <= 39 ? Math.random() * (620 - 580) + 580 :
                           age >= 40 && age <= 59 ? Math.random() * (500 - 460) + 460 :
                           Math.random() * (400 - 360) + 360;

    const testosteroneChange = cmi * -14.89 + (diabetes ? -20 : 0);
    const predictedTLevel = Math.max(0, baselineTLevel + testosteroneChange);

    const testosteroneDeficiencyRisk = ((1.16 ** cmi) - 1) * 100;
    const riskCategory = testosteroneDeficiencyRisk < 10 ? "Optimal" :
                         testosteroneDeficiencyRisk < 20 ? "Suboptimal" :
                         testosteroneDeficiencyRisk < 40 ? "Moderate Risk" :
                         testosteroneDeficiencyRisk < 80 ? "High Risk" : "Severe Risk";

    document.getElementById("result").innerHTML = `
        <h2>Your Health Metrics</h2>
        <p><b>BMI:</b> ${bmi.toFixed(2)}</p>
        <p><b>Baseline Testosterone:</b> ${baselineTLevel.toFixed(2)} ng/dL</p>
        <p><b>Predicted Testosterone:</b> ${predictedTLevel.toFixed(2)} ng/dL</p>
        <p><b>Risk of Testosterone Deficiency:</b> ${riskCategory}</p>
    `;
});
