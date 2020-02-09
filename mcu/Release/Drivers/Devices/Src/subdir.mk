################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Drivers/Devices/Src/bme280.c \
../Drivers/Devices/Src/dht.c \
../Drivers/Devices/Src/ds18b20.c \
../Drivers/Devices/Src/esp8266.c \
../Drivers/Devices/Src/fc37.c \
../Drivers/Devices/Src/temt600.c 

OBJS += \
./Drivers/Devices/Src/bme280.o \
./Drivers/Devices/Src/dht.o \
./Drivers/Devices/Src/ds18b20.o \
./Drivers/Devices/Src/esp8266.o \
./Drivers/Devices/Src/fc37.o \
./Drivers/Devices/Src/temt600.o 

C_DEPS += \
./Drivers/Devices/Src/bme280.d \
./Drivers/Devices/Src/dht.d \
./Drivers/Devices/Src/ds18b20.d \
./Drivers/Devices/Src/esp8266.d \
./Drivers/Devices/Src/fc37.d \
./Drivers/Devices/Src/temt600.d 


# Each subdirectory must supply rules for building sources it contributes
Drivers/Devices/Src/bme280.o: ../Drivers/Devices/Src/bme280.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Devices/Src/bme280.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Devices/Src/dht.o: ../Drivers/Devices/Src/dht.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Devices/Src/dht.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Devices/Src/ds18b20.o: ../Drivers/Devices/Src/ds18b20.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Devices/Src/ds18b20.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Devices/Src/esp8266.o: ../Drivers/Devices/Src/esp8266.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Devices/Src/esp8266.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Devices/Src/fc37.o: ../Drivers/Devices/Src/fc37.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Devices/Src/fc37.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Devices/Src/temt600.o: ../Drivers/Devices/Src/temt600.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Devices/Src/temt600.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

