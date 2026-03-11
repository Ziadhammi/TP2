function addCourse() {
  var coursesDiv = document.getElementById("courses");

  var row = document.createElement("div");
  row.className = "course-row";

  row.innerHTML =
    '<input type="text" placeholder="Course Name" class="course-name" />' +
    '<input type="number" placeholder="Credits" class="course-credits" min="1" max="6" />' +
    '<select class="course-grade">' +
      '<option value="">-- Grade --</option>' +
      '<option value="4.0">A</option>' +
      '<option value="3.7">A-</option>' +
      '<option value="3.3">B+</option>' +
      '<option value="3.0">B</option>' +
      '<option value="2.7">B-</option>' +
      '<option value="2.3">C+</option>' +
      '<option value="2.0">C</option>' +
      '<option value="1.7">C-</option>' +
      '<option value="1.0">D</option>' +
      '<option value="0.0">F</option>' +
    '</select>' +
    '<button class="remove-btn" onclick="removeCourse(this)">Remove</button>';

  coursesDiv.appendChild(row);
}

function removeCourse(btn) {
  var row = btn.parentElement;
  var coursesDiv = document.getElementById("courses");
  if (coursesDiv.children.length > 1) {
    coursesDiv.removeChild(row);
  } else {
    alert("You need at least one course.");
  }
}

function calculateGPA() {
  var names    = document.querySelectorAll(".course-name");
  var credits  = document.querySelectorAll(".course-credits");
  var grades   = document.querySelectorAll(".course-grade");
  var result   = document.getElementById("result");

  var totalPoints  = 0;
  var totalCredits = 0;
  var valid = true;

  // Remove old errors
  var oldErrors = document.querySelectorAll(".error-msg");
  oldErrors.forEach(function(e) { e.remove(); });

  for (var i = 0; i < names.length; i++) {
    var credit = parseFloat(credits[i].value);
    var grade  = parseFloat(grades[i].value);

    if (!credits[i].value || isNaN(credit) || credit <= 0) {
      var err = document.createElement("p");
      err.className = "error-msg";
      err.textContent = "Row " + (i + 1) + ": Please enter a valid credit value.";
      grades[i].parentElement.appendChild(err);
      valid = false;
      continue;
    }

    if (grades[i].value === "") {
      var err2 = document.createElement("p");
      err2.className = "error-msg";
      err2.textContent = "Row " + (i + 1) + ": Please select a grade.";
      grades[i].parentElement.appendChild(err2);
      valid = false;
      continue;
    }

    totalPoints  += grade * credit;
    totalCredits += credit;
  }

  if (!valid || totalCredits === 0) return;

  var gpa = totalPoints / totalCredits;
  var rounded = gpa.toFixed(2);

  var label = "";
  var cssClass = "";

  if (gpa >= 3.7) {
    label = "Distinction - Outstanding!";
    cssClass = "distinction";
  } else if (gpa >= 3.0) {
    label = "Merit - Great job!";
    cssClass = "merit";
  } else if (gpa >= 2.0) {
    label = "Pass - Keep it up!";
    cssClass = "pass";
  } else {
    label = "Fail - More effort needed.";
    cssClass = "fail";
  }

  result.className = "show " + cssClass;
  result.innerHTML =
    "<h2>Your GPA: " + rounded + " / 4.0</h2>" +
    "<p>" + label + "</p>" +
    "<p>Total Credits: " + totalCredits + "</p>";
}
