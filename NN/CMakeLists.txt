cmake_minimum_required(VERSION 3.10)
project(detector CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake;${CMAKE_MODULE_PATH}")

include(FindOpenCV)
include(Findtensorflowlite)

option(WITH_CUDA "Build with CUDA support" OFF)
if (WITH_CUDA)
    add_definitions(-DWITH_CUDA)
endif()

file(GLOB SRC src/*.cpp)
file(GLOB HEADERS headers/*.h)

add_executable(${PROJECT_NAME} ${HEADERS} ${SRC})

target_include_directories(${PROJECT_NAME}
                           PUBLIC
                           ${opencv_INCLUDE_DIRS}
                           ${tensorflowlite_INCLUDE_DIRS}
                           ${flatbuffers_INCLUDE_DIRS})

target_link_directories(${PROJECT_NAME}
                        PUBLIC
                        ${opencv_LIB_DIRS}
                        ${tensorflowlite_LIB_DIRS}
                        ${flatbuffers_LIB_DIRS})

target_link_libraries(${PROJECT_NAME}
                      ${opencv_LIBS}
                      ${tensorflowlite_LIBS}
                      ${flatbuffers_LIBS})

