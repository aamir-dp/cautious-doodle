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

    // Example logic for predictions (replace with actual logic if needed)
    const bmi = weight / ((height / 100) ** 2);
    const tgLevel = 100 + (bmi >= 30 ? 50 : 0) + (activityDays < 3 ? 30 : 0) + (sugaryDrinks > 3 ? 40 : 0) + (alcoholDrinks > 2 ? 20 : 0);
    const hdlLevel = (gender === "male" ? 55 : 65) - (smoking ? 10 : 0) - (healthyFats < 3 ? 5 : 0) - (diabetes ? 15 : 0) - (age > 50 ? 5 : 0);

    const result = {
        "BMI": bmi.toFixed(2),
        "Triglyceride Level (mg/dL)": tgLevel,
        "HDL Level (mg/dL)": hdlLevel,
    };

    document.getElementById("result").innerText = `BMI: ${result.BMI}\nTriglyceride Level: ${result["Triglyceride Level (mg/dL)"]} mg/dL\nHDL Level: ${result["HDL Level (mg/dL)"]} mg/dL`;
});
