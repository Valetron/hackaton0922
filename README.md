# hackaton0922

## Frontend
### Сборка фронта
#### Установка зависимостей
Установить *npm*, *node.js*.
#### Сборка проекта
1. Переходим в папку front
2. Ввести
```
npm install
npm start
```
3. Запустится проект в основном браузере на http://localhost:3000 (default).

## Neural network
### Зависимости
* opencv >= 4.5.2
* nlohmann_json >= 3.10.5
* conan (для сборки)
* cmake >= 3.10

### Тестирование
```
cd yolo
pip3 install -r requirements.txt
python3 detect.py --weights path/to/hackaton0922/NN/models/best0.pt --source parh/to/hackaton0922/test/vidos.mp4 --nosave --view-img
```

### Установка
1. Перейти в папку NN и создать папку *build*
```bash
mkdir -p NN/build && cd NN
```
2. Запустить установку зависимостей
```bash
pip3 install conan
source ~/.bashrc && source ~/.bash_profile
conan install conanfile.txt --build=missing -if cmake -s compiler.libcxx=libstdc++11
cd build
cmake ..
cmake --build .
```

