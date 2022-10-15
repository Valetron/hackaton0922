#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <regex>
#include <filesystem>

#include <boost/program_options.hpp>

namespace po = boost::program_options;
namespace fs = std::filesystem;

//enum ObjectClasses
//{
//    Person,
//    Jacket,
//    Pants
//};

class Setting final
{
public:
    Setting(int argc, char** argv);

    void parseArgs();

    std::string& inputData();
    std::string& modelFile();
    int secondsNumber();

private:
    void handleExcep(std::exception_ptr except);

private:
    int     _seconds = 5;
    int     _argc;
    char**  _argv;

    std::string _inputData = "";
    std::string _modelFile = "";
};
