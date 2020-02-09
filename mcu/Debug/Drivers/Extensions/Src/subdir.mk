################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Drivers/Extensions/Src/gpio_ext.c \
../Drivers/Extensions/Src/onewire.c \
../Drivers/Extensions/Src/time_ext.c 

OBJS += \
./Drivers/Extensions/Src/gpio_ext.o \
./Drivers/Extensions/Src/onewire.o \
./Drivers/Extensions/Src/time_ext.o 

C_DEPS += \
./Drivers/Extensions/Src/gpio_ext.d \
./Drivers/Extensions/Src/onewire.d \
./Drivers/Extensions/Src/time_ext.d 


# Each subdirectory must supply rules for building sources it contributes
Drivers/Extensions/Src/gpio_ext.o: ../Drivers/Extensions/Src/gpio_ext.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Extensions/Src/gpio_ext.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Extensions/Src/onewire.o: ../Drivers/Extensions/Src/onewire.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Extensions/Src/onewire.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/Extensions/Src/time_ext.o: ../Drivers/Extensions/Src/time_ext.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Extensions/Src/time_ext.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

