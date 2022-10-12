#include <iostream>

#include "../headers/detector.h"

Detector::Detector()
{
}

void Detector::init(std::string& model)
{
#ifdef ENABLE_LIBTORCH_CUDA
    if (torch::cuda::is_available() && enableGpu)
        _type = torch::kCUDA;
    else
        _type = torch::kCPU;
#else
    _type = torch::kCPU;
#endif
    //FIXME:
    _model = torch::jit::load(model);
    _model.to(_type);
    _model.eval();

}
