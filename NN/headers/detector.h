#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

class Detector final
{
public:
    Detector();
    void const openModel(fs::path& filePath);
    void const detect();

private:
    static std::string _model;
    static fs::path _path;
};
