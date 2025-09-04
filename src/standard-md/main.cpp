#include <Arduino.h>
#include "ReelTwo.h"
#include "dome/Logics.h"
#include "dome/LogicEngineController.h"
#include "dome/HoloLights.h"
#include "dome/NeoPSI.h"
#include "core/Marcduino.h"
#include "ServoDispatchDirect.h"


#define USE_DEBUG

#define SERIAL2_RX_PIN 16
#define SERIAL2_TX_PIN 17
#define COMMAND_SERIAL Serial2

#define RECEIVE_MARCDUINO_COMMANDS

#ifdef RECEIVE_MARCDUINO_COMMANDS
#define PIE_PANEL          0x0008
#define TOP_PIE_PANEL      0x0010

const ServoSettings servoSettings[] PROGMEM = {
    { 2,  1250, 1900, PIE_PANEL },  /* 0: pie panel 1 */
    { 3,  1075, 1700, PIE_PANEL },  /* 1: pie panel 2 */
    { 4,  1200, 2000, PIE_PANEL },  /* 2: pie panel 3 */
    { 5,   750, 1450, PIE_PANEL },  /* 3: pie panel 4 */
    { 6,  1250, 1850, TOP_PIE_PANEL },  /* 4: dome top panel */
};

ServoDispatchDirect<SizeOfArray(servoSettings)> servoDispatch(servoSettings);
ServoSequencer servoSequencer(servoDispatch);
AnimationPlayer player(servoSequencer);
MarcduinoSerial<> marcduinoSerial(COMMAND_SERIAL, player);

// Marcduino command starting with '*RT' followed by Reeltwo command
MARCDUINO_ACTION(DirectCommand, *RT, ({
    // Direct ReelTwo command
    CommandEvent::process(Marcduino::getCommand());
}))

#else
CommandEventSerial<> commandSerial(COMMAND_SERIAL);
#endif

AstroPixelRLD<> RLD(LogicEngineRLDDefault, 3);
AstroPixelFLD<> FLD(LogicEngineFLDDefault, 1);

AstroPixelFrontPSI<> frontPSI(LogicEngineFrontPSIDefault, 4);
AstroPixelRearPSI<> rearPSI(LogicEngineRearPSIDefault, 5);

HoloLights frontHolo(25, HoloLights::kRGB);
HoloLights rearHolo(26, HoloLights::kRGB);
HoloLights topHolo(27, HoloLights::kRGB);  

void resetSequence()
{
    Marcduino::send(F("$s"));
    CommandEvent::process(F(
        "LE000000|0\n" // LogicEngine devices to normal
        "FSOFF\n"      // Fire Stripe Off
        "BMOFF\n"      // Bad Motiviator Off
        "HPA000|0\n"   // Holo Projectors to Normal
        "CB00000\n"    // Charge Bay to Normal
        "DP00000\n")); // Data Panel to Normal
}

#include "md_commands/MarcduinoHolo.h"
#include "md_commands/MarcduinoLogics.h"
#include "md_commands/MarcduinoSequence.h"
#include "md_commands/MarcduinoPSI.h"

void setup()
{
    REELTWO_READY();
    COMMAND_SERIAL.begin(2400, SERIAL_8N1, SERIAL2_RX_PIN, SERIAL2_TX_PIN);
    SetupEvent::ready();
    RLD.selectScrollTextLeft("... PLUSISH ....", LogicEngineRenderer::kBlue, 0, 15);
    FLD.selectScrollTextLeft("... R2D2 ...", LogicEngineRenderer::kRed, 0, 15);
    CommandEvent::process("HPA0026|20");
}

void loop() {
    AnimatedEvent::process();

}

MARCDUINO_ACTION(MDDirectCommand, @AP, ({
                     // Direct ReelTwo command
                     CommandEvent::process(Marcduino::getCommand());
                 }))
