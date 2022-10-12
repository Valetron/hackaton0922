#include <iostream>

#include "../headers/setting.h"

Setting::Setting(int argc, char** argv) : _argc(argc)
                                        , _argv(argv)
{
}

void Setting::parseArgs()
{
    po::options_description desc("Allowed options");

    desc.add_options()
            ("help,h", "print help menu")
            ("input,i", po::value<std::string>(), "set path or a file")
            ("model,m", po::value<std::string>(), "set torch model file")
            ("seconds,s", po::value<int>()->default_value(5), "set number of seconds for detection, default - 5");

    std::ostringstream output;
    po::variables_map vm;
    po::store(po::parse_command_line(_argc, _argv, desc), vm);
    po::notify(vm);

    try
    {
        if (vm.count("help") || vm.count("h"))
        {
            output << desc;
            throw std::invalid_argument(output.str());
        }

        if (vm.count("input") || vm.count("i"))
        {
            const std::string param = (vm.count("input")) ? ("input") : ("i");
            _inputData = vm[param.data()].as<std::string>();
            const auto inputPath = fs::path(_inputData);

            if (!fs::exists(_inputData))
            {
                output << "Argument -i: "
                        << std::filesystem::absolute(inputPath)
                        << " file does not exist"
                        << std::endl;
                throw std::invalid_argument(output.str());
            }

            if (fs::is_regular_file(inputPath))
            {
                static const std::regex regexVideo("\\.(?:avi|mp4)");
                auto m_videoMode = std::regex_match(inputPath.extension().c_str(), regexVideo);

                if (!m_videoMode)
                {
                    output << "Argument -i: "
                            << std::filesystem::absolute(inputPath)
                            << " unsupported format. Use: .avi, .mp4"
                            << std::endl;
                    throw std::invalid_argument(output.str());
                }
            }
            else if (fs::is_directory(inputPath))
            {
                int fileCount = 0;

                for (const fs::path& file : fs::directory_iterator(inputPath))
                {
                    if (file.extension() == ".avi" ||
                        file.extension() == ".mp4")
                        ++fileCount;
                }

                if (0 == fileCount)
                {
                    output << "Argument -i: Directory "
                            << std::filesystem::absolute(inputPath)
                            << " doesn't contain .avi or .mp4 files"
                            << std::endl;
                    throw std::invalid_argument(output.str());
                }
            }

        }
        else
        {
            output << "Argument -i: empty file parameter" << std::endl;
            throw std::invalid_argument(output.str());
        }

        if (vm.count("model") || vm.count("m"))
        {
            const std::string param = (vm.count("model")) ? ("model") : ("m");
            _modelFile = vm[param.data()].as<std::string>();

            if (!fs::exists(_modelFile))
            {
                output << "Argument -m: "
                       << _modelFile
                       << " file doesn't exist"
                       << std::endl;
                throw std::invalid_argument(output.str());
            }

            if (fs::path(_modelFile).extension() != ".pt")
            {
                output << "Argument -m: model "
                       << _modelFile
                       << " in wrong format. Use .pt extension"
                       << std::endl;
                throw std::invalid_argument(output.str());
            }

//            m_modelClassesFile = fs::path(_modelFile).parent_path() /
//                                 fs::path(_modelFile).stem().concat(".classes");

//            if (!fs::exists(m_modelClassesFile))
//            {
//                output << "Argument -m: Model class names list " << m_modelClassesFile
//                        << " doesn't exist\n\n" << desc;
//                throw std::invalid_argument(output.str());
//            }

//            std::ifstream classesFile(m_modelClassesFile);

//            if (!classesFile.is_open())
//            {
//                output << "Can't open model class names list "
//                        << m_modelClassesFile << "\n\n" << desc;
//                throw std::invalid_argument(output.str());
//            }

//            std::string modelClass;
//            while (std::getline(classesFile, modelClass))
//                m_modelClasses.emplace_back(modelClass);

//            if (m_modelClasses.empty())
//            {
//                output << "Model class names list "
//                        << m_modelClassesFile << "is empty\n\n" << desc;
//                throw std::invalid_argument(output.str());
//            }
        }
        else
        {
            output << "Argument -m: empty model parameter" << std::endl;
            throw std::invalid_argument(output.str());
        }

        if (vm.count("seconds") || vm.count("s"))
        {
            const std::string param = (vm.count("seconds")) ? ("seconds") : ("s");
            _seconds = vm[param.data()].as<int>();

            if (0 > _seconds)
            {
                output << "Argument -s: wrong number"
                       << std::endl;
                throw std::invalid_argument(output.str());
            }

        }
        else
        {
            output << "Argument -s: empty number of seconds" << std::endl;
            throw std::invalid_argument(output.str());
        }
    }
    catch (po::error& e)
    {
        handleExcep(std::make_exception_ptr(e));
    }
}

std::string& Setting::inputData()
{
    return _inputData;
}

std::string& Setting::modelFile()
{
    return _modelFile;
}

int Setting::secondsNumber()
{
    return _seconds;
}

void Setting::handleExcep(std::exception_ptr except)
{
    try
    {
        if (except) std::rethrow_exception(except);
    }
    catch (const std::exception& e)
    {
        std::cerr << "Exception handled: " << e.what();
    }
}
