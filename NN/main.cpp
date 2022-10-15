#include <iostream>
#include <filesystem>
#include <cstdlib>

#include <string.h>

#include <opencv4/opencv2/highgui.hpp>
#include <opencv4/opencv2/imgproc.hpp>

#include "headers/setting.h"
#include "headers/detector.h"

int main(int argc, char** argv)
{
    Setting setting = Setting(argc, argv);
    Detector detector;
    cv::Mat frame;

    try
    {
        setting.parseArgs();
    }
    catch (const std::exception& e)
    {
        std::cerr << e.what();
        std::exit(EXIT_FAILURE);
    }

    detector.init(setting.modelFile());

    cv::VideoCapture cap(setting.inputData());
    if (!cap.isOpened())
    {
        std::cerr << "Error while opening video" << std::endl;
        std::exit(EXIT_FAILURE);
    }

    while (true)
    {
        cap >> frame;

        if (frame.empty())
            break;
    }

    return 0;
}
