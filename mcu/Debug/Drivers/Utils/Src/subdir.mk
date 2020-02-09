################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Drivers/Utils/Src/weather_utils.c 

OBJS += \
./Drivers/Utils/Src/weather_utils.o 

C_DEPS += \
./Drivers/Utils/Src/weather_utils.d 


# Each subdirectory must supply rules for building sources it contributes
Drivers/Utils/Src/weather_utils.o: ../Drivers/Utils/Src/weather_utils.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F303xE -DDEBUG -c -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Extensions/Inc" -I../Inc -I../Drivers/CMSIS/Include -I../Drivers/STM32F3xx_HAL_Driver/Inc -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Utils/Inc" -I../Drivers/STM32F3xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F3xx/Include -I"/home/reaper99/Documents/coding/stm32/workspace/weather-station/Drivers/Devices/Inc" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Utils/Src/weather_utils.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

