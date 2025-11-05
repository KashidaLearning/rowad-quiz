<?php
header("Content-Type: application/json");

// Database credentials
$host = "localhost";      // or your DB host
$user = "quizuser";           // your MySQL username
$pass = "Kashida@2025";               // your MySQL password
$dbname = "quiz_rowad";      // your database name

// Connect to MySQL
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit();
}

// Read JSON body from fetch()
$data = json_decode(file_get_contents("php://input"), true);

// Check if valid data received
if (!$data || !isset($data['name'], $data['email'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

// Sanitize input
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$q1 = $conn->real_escape_string($data['q1']);
$q2 = $conn->real_escape_string($data['q2']);
$q3 = $conn->real_escape_string($data['q3']);
$q4 = $conn->real_escape_string($data['q4']);
$q5 = $conn->real_escape_string($data['q5']);
$feedback = $conn->real_escape_string($data['feedback']);

// Create table if not exists
$conn->query("
CREATE TABLE IF NOT EXISTS quiz_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  q1 CHAR(1),
  q2 CHAR(1),
  q3 CHAR(1),
  q4 CHAR(1),
  q5 CHAR(1),
  feedback TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
");

// Insert record
$sql = "INSERT INTO quiz_responses (name, email, q1, q2, q3, q4, q5, feedback)
        VALUES ('$name', '$email', '$q1', '$q2', '$q3', '$q4', '$q5', '$feedback')";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
