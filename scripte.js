

async function calculateFeedback() {
  const form = document.getElementById('quizForm');
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const feedbackBox = document.getElementById("feedback");

  const totalQuestions = 5;
  const count = { A: 0, B: 0, C: 0 };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Reset feedback display
  feedbackBox.style.display = "none";
  feedbackBox.innerText = "";

  if (name === "" || email === "") {
    alert("⚠️ الرجاء إدخال اسمك والبريد الإلكتروني قبل الإرسال.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("⚠️ يرجى إدخال عنوان بريد إلكتروني صالح.");
    return;
  }

  // Count answers
  for (let i = 1; i <= totalQuestions; i++) {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    if (selected) count[selected.value]++;
  }

  // Make sure all questions are answered
  if (Object.values(count).reduce((a, b) => a + b, 0) < totalQuestions) {
    alert("⚠️ يرجى الإجابة على جميع الأسئلة قبل الإرسال.");
    return;
  }

  // Determine feedback text
  let feedback = "";
  if (count.A > count.B && count.A > count.C) {
    feedback = `    رائد أعمال ناشئ
     أنت تبني أسسًا قوية! يمكن لدورة رواد نموّ أن تساعدك على الانتقال إلى مرحلة النمو المنظم.
    `
      
   ;
      
  } 
  else if (count.B > count.A && count.B > count.C) {
  feedback = `   جاهز للتوسع
     أنت على الطريق الصحيح! اكتشف دورة رواد نموّ لتعزيز استراتيجيتك المالية وجذب الاستثمار.
    `;
  } 
  else if (count.C > count.A && count.C > count.B) {
  feedback = `   بطل مرحلة النمو
     أنت جاهز للنمو! طوّر خبرتك من خلال وحدات رواد نموّ المتقدمة حول التوسع والتمويل.
    ` ; } 
  else if (count.A === count.B && count.A > count.C) {
  feedback = `   جاهز للتوسع
     أنت على الطريق الصحيح! اكتشف دورة رواد نموّ لتعزيز استراتيجيتك المالية وجذب الاستثمار.
    ` ; }
    
    
  else if (count.A === count.C && count.A > count.B) {
  feedback = `   جاهز للتوسع
    أنت على الطريق الصحيح! اكتشف دورة رواد نموّ لتعزيز استراتيجيتك المالية وجذب الاستثمار.
    ` ; }
  else if (count.B === count.C && count.B > count.A) {
  feedback = `   بطل مرحلة النمو
أنت جاهز للنمو! طوّر خبرتك من خلال وحدات رواد نموّ المتقدمة حول التوسع والتمويل.
` ; }
  else {
    feedback = "";
  }

  feedbackBox.style.display = "block";
  feedbackBox.innerText = feedback;

  // Save to database
  const answers = {
    name,
    email,
    q1: form.q1.value,
    q2: form.q2.value,
    q3: form.q3.value,
    q4: form.q4.value,
    q5: form.q5.value,
    feedback
  };

  try {
    const response = await fetch("save_answers.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers)
    });
    const result = await response.json();
    if (result.status === "success") {
      console.log("✅ Saved to database successfully");
    } else {
      console.error("❌ Error saving:", result.message);
    }
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}
