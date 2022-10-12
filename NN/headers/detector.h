#pragma once

#include <iostream>
#include <filesystem>

#include <torch/script.h>
#include <torch/torch.h>

#include <opencv4/opencv2/core.hpp>

namespace IMAGE_SETTINGS
{
    static const float INPUT_WIDTH = 640.0;
    static const float INPUT_HEIGHT = 640.0;
    static const float SCORE_THRESHOLD = 0.5;
    static const float NMS_THRESHOLD = 0.45;
    static const float CONFIDENCE_THRESHOLD = 0.45;
}

namespace COLORS
{
    static const cv::Scalar RED = cv::Scalar(0,0,255);
}

class Detector final
{
public:
    Detector();

    void run(const cv::Mat& frame);
    void init(std::string& model);

    void setFile(const std::string& video);
    void setSeconds(const int& seconds);
    void setModel(const std::string& model);

private:
    std::string _video = "";
    torch::jit::script::Module _model;
    torch::DeviceType _type;
};
