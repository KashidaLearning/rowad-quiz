<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "quiz_rowad";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

$sql = "SELECT id, name, email, q1, q2, q3, q4, q5, feedback, submitted_at FROM quiz_responses ORDER BY submitted_at DESC";
$result = $conn->query($sql);

$data = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
