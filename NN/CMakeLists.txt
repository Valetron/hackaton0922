cmake_minimum_required(VERSION 3.10)
project(NeuralNet CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake;${CMAKE_MODULE_PATH}")

option(WITH_CUDA "Build with CUDA support" OFF)
if (WITH_CUDA)
    add_definitions(-DWITH_CUDA)
endif()

if (NOT DEFINED ENV{LIBTORCH_DIR})
    message(FATAL_ERROR "Libtorch is not specified")
else()
    message("Using libtorch from $ENV{LIBTORCH_DIR}")
    set(Torch_DIR "$ENV{LIBTORCH_DIR}/share/cmake/Torch")
endif()

include(FindOpenCV)
include(FindBoost)

find_package(Torch REQUIRED)

file(GLOB SRC src/*.cpp)
file(GLOB HEADERS headers/*.h)

add_executable(${PROJECT_NAME} main.cpp ${HEADERS} ${SRC})

target_include_directories(${PROJECT_NAME}
                           PUBLIC
                           ${TORCH_INCLUDE_DIRS}
                           ${opencv_INCLUDE_DIRS}
                           ${Boost_INCLUDE_DIRS}
                       )

#target_link_directories(${PROJECT_NAME}
#                        ${opencv_LIB_DIRS})

target_link_libraries(${PROJECT_NAME}
                      PUBLIC
                      ${TORCH_LIBRARIES}
                      opencv::opencv
                      ${Boost_LIBRARIES})
