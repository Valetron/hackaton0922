#include <iostream>

#include <opencv2/opencv.hpp>
#include <tensorflow/lite/model.h>

#include "../headers/detector.h"

Detector::Detector()
{
}

void const Detector::openModel(fs::path& filePath)
{
    auto _path = filePath;
}
