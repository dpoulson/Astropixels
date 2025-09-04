#include <Arduino.h>
#include "ReelTwo.h"
#include "dome/Logics.h"
#include "dome/LogicEngineController.h"
#include "dome/HoloLights.h"
#include "dome/NeoPSI.h"
#include "i2c/I2CReceiver.h"

// Define the serial for input from the Marcduino
#define SERIAL2_RX_PIN 16
#define SERIAL2_TX_PIN 17
#define COMMAND_SERIAL Serial2
#define MD_BAUD 9600

I2CReceiver i2cReceiver(0x0a);

AstroPixelRLD<> RLD(LogicEngineRLDDefault, 3);
AstroPixelFLD<> FLD(LogicEngineFLDDefault, 1);

AstroPixelFrontPSI<> frontPSI(LogicEngineFrontPSIDefault, 4);
AstroPixelRearPSI<> rearPSI(LogicEngineRearPSIDefault, 5);

HoloLights frontHolo(25, HoloLights::kRGB);
HoloLights rearHolo(26, HoloLights::kRGB);
HoloLights topHolo(27, HoloLights::kRGB);   

CommandEventSerial<> commandSerial(COMMAND_SERIAL);

void setup()
{
    REELTWO_READY();
    COMMAND_SERIAL.begin(MD_BAUD, SERIAL_8N1, SERIAL2_RX_PIN, SERIAL2_TX_PIN);
    SetupEvent::ready();
    RLD.selectScrollTextLeft("... AstroPixels ....", LogicEngineRenderer::kBlue, 0, 15);
    FLD.selectScrollTextLeft("... R2D2 ...", LogicEngineRenderer::kRed, 0, 15);
    CommandEvent::process("HPA0026|20");
}

void loop() {
  AnimatedEvent::process();
}
