################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include Startup/subdir.mk
-include Src/subdir.mk
-include Drivers/Utils/Src/subdir.mk
-include Drivers/STM32F3xx_HAL_Driver/Src/subdir.mk
-include Drivers/Extensions/Src/subdir.mk
-include Drivers/Devices/Src/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

# Add inputs and outputs from these tool invocations to the build variables 
EXECUTABLES += \
weather-station.elf \

SIZE_OUTPUT += \
default.size.stdout \

OBJDUMP_LIST += \
weather-station.list \

OBJCOPY_BIN += \
weather-station.bin \


# All Target
all: weather-station.elf secondary-outputs

# Tool invocations
weather-station.elf: $(OBJS) $(USER_OBJS) /home/reaper99/Documents/coding/stm32/workspace/weather-station/STM32F303RETX_FLASH.ld
	arm-none-eabi-gcc -o "weather-station.elf" @"objects.list" $(USER_OBJS) $(LIBS) -mcpu=cortex-m4 -T"/home/reaper99/Documents/coding/stm32/workspace/weather-station/STM32F303RETX_FLASH.ld" --specs=nosys.specs -Wl,-Map="weather-station.map" -Wl,--gc-sections -static --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -u _printf_float -Wl,--start-group -lc -lm -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

default.size.stdout: $(EXECUTABLES)
	arm-none-eabi-size  $(EXECUTABLES)
	@echo 'Finished building: $@'
	@echo ' '

weather-station.list: $(EXECUTABLES)
	arm-none-eabi-objdump -h -S $(EXECUTABLES) > "weather-station.list"
	@echo 'Finished building: $@'
	@echo ' '

weather-station.bin: $(EXECUTABLES)
	arm-none-eabi-objcopy  -O binary $(EXECUTABLES) "weather-station.bin"
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) *
	-@echo ' '

secondary-outputs: $(SIZE_OUTPUT) $(OBJDUMP_LIST) $(OBJCOPY_BIN)

.PHONY: all clean dependents
.SECONDARY:

-include ../makefile.targets
