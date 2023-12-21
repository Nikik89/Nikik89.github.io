<?php

// Получаем данные из POST-запроса
$jsonData = file_get_contents("php://input");
// Декодируем JSON-данные в массив PHP
$data = json_decode($jsonData, true);
// Путь к файлу, куда будем записывать JSON
$filePath = 'json/dataForm.json';
// Получаем текущее содержимое файла (если он существует)
$currentData = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];
// Добавляем новые данные к текущему содержимому файла
$currentData[] = $data;
// Записываем обновленные данные в файл
file_put_contents($filePath, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

?>