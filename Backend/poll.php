<?php
function generatePollID($length = 6) {
    return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyz"), 0, $length);
}

if ($_GET['action'] === 'create_poll' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $question = $_POST['question'];
    $options = $_POST['options']; // array

    $poll_id = generatePollID();

    $stmt = $pdo->prepare("INSERT INTO polls (poll_id, question) VALUES (?, ?)");
    $stmt->execute([$poll_id, $question]);

    $stmt = $pdo->prepare("INSERT INTO poll_options (poll_id, option_text) VALUES (?, ?)");
    foreach ($options as $opt) {
        $stmt->execute([$poll_id, $opt]);
    }

    echo json_encode(["poll_id" => $poll_id]);
    exit;
}

if ($_GET['action'] === 'vote' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $poll_id = $_POST['poll_id'];
    $option_id = $_POST['option_id'];

    $stmt = $pdo->prepare("UPDATE poll_options SET votes = votes + 1 WHERE id = ? AND poll_id = ?");
    $stmt->execute([$option_id, $poll_id]);

    echo json_encode(["status" => "success"]);
    exit;
}

?>