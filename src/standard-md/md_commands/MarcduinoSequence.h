////////////////

MARCDUINO_ACTION(StopSequence, :SE00, ({
}))

////////////////

MARCDUINO_ACTION(ScreamSequence, :SE01, ({
    // Send command to rear logics
    CommandEvent::process("LE3010003");
    // Send command to front logics
    CommandEvent::process("LE1010003");
    Marcduino::send(F("$S"));
}))

////////////////

MARCDUINO_ACTION(WaveSequence, :SE02, ({
    Marcduino::send(F("$213"));
}))

////////////////

MARCDUINO_ACTION(SmirkWaveSequence, :SE03, ({
    Marcduino::send(F("$34"));
}))

////////////////

MARCDUINO_ACTION(OpenCloseWaveSequence, :SE04, ({
    Marcduino::send(F("$36"));
}))

////////////////

MARCDUINO_ANIMATION(BeepCantinaSequence, :SE05)
{
    DO_START()
    DO_MARCDUINO(F("$c"))
    // Wait 1 second
    DO_COMMAND(F(
        // Fire logics
        "LE3084115\n"
        "LE1084115\n"
        // Holo Short Circuit
        "HPA002|15\n"))
    // Wait 15 seconds
    DO_WAIT_SEC(15)
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ANIMATION(ShortSequence, :SE06)
{
    DO_START()
    // Logic engine alarm
    DO_COMMAND(F("LE105000"))
    // Play scream-3 and wait 500ms
    DO_MARCDUINO_AND_WAIT(F("$623"), 500);
    // Logic engine failure
    DO_COMMAND(F(
        // Logic engine failure (all)
        "LE20000\n"
        // Holo Short Circuit
        "HPA007|7\n"
        // Fire strip spark for 1000ms
        "FS11000\n"
        // Charge Bay Indicator flicker for 6s
        "CB20006\n"
        // Data Panel flicker for 6s
        "DP20006\n"
        // Smoke on
        "BMON\n"))
    // Wait 3 seconds
    DO_WAIT_SEC(3)
    DO_COMMAND(F(
        // Smoke off
        "BMOFF\n"
        // Fire strip off
        "FSOFF\n"))
    // Wait 3 seconds
    DO_WAIT_SEC(3)   
    DO_COMMAND(F(
        // Charge Bay Indicator disabled for 8s
        "CB10008\n"
        // Data Panel disabled for 8s
        "DP10008\n"
        // Holo off
        "HPA000|0\n"))
    // Fake being dead for 8 seconds
    DO_WAIT_SEC(8)
    // Ok We are back!
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ANIMATION(CantinaSequence, :SE07)
{
    DO_START()
    // Play Orchestral Cantina
    DO_MARCDUINO(F("$C"))
    // Wait 1 second
    DO_WAIT_SEC(1)
    DO_COMMAND(F(
        // Disco Logics
        "LE3104146\n"
        "LE1104146\n"
        // Holo Short Circuit
        "HPA006|46\n"))
    // Wait 46 seconds
    DO_WAIT_SEC(46)
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ANIMATION(LeiaMessage, :SE08)
{
    DO_START()
    DO_MARCDUINO(F("$73"))
    DO_COMMAND_AND_WAIT(F(
        "LE3030045\n"
        "LE1030045\n"
        "HPS1|45\n"
        "CB10000\n"
        "DP10000\n"), 45000)
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ANIMATION(DiscoSequence, :SE09)
{
    DO_START()
    DO_MARCDUINO(F("$D"))
    DO_ONCE({
        FLD.selectSequence(LogicEngineRenderer::RAINBOW);
        RLD.selectScrollTextLeft("STAR WARS R2-D2 ASTROMECH", LogicEngineRenderer::ColorVal(random(10)));
    })
    DO_COMMAND_AND_WAIT(F(
        "HPS1|45\n"
        "CB10000\n"
        "DP10000\n"), 45000)
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ACTION(ScreamNoPanelSequence, :SE50, ({
    CommandEvent::process("LE3010003");
    CommandEvent::process("LE1010003");
    Marcduino::send(F("$S"));
}))


MARCDUINO_ANIMATION(HarlemShakeSequence, $815)
{
    DO_START()
    // Wait 2 seconds
    DO_WAIT_SEC(2)
    DO_COMMAND(F(
        // Fire logics
        "LE3070000\n"
        "LE1070000\n"
        // Holo Short Circuit
        "HPA006|11\n"))
    // Wait 0.5 second
    DO_WAIT_MILLIS(500)
    // Start panel sequence
    // Wait 10 second
    DO_WAIT_SEC(11)
    DO_COMMAND(F(
        // Fire logics
        "LE100000\n"
        // Holo Short Circuit
        "HPA002|12\n"))

    // Beginning of Shake loop
    DO_LABEL(shake)
    // Play random
    // Wait 50 seconds
    DO_WAIT_MILLIS(50)
    // Loop until total play time reaches 26.5 seconds
    DO_DURATION(26500, { animation.gotoStep(shake); })
    // Start panel sequence
    // Wait 2 seconds
    DO_WAIT_SEC(2)

    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ANIMATION(GirlOnFireSequence, $821)
{
    DO_START()
    // Wait 3.5 seconds
    DO_WAIT_MILLIS(3500)
    DO_COMMAND(F(
        // Fire logics
        "LE220055\n"
        // Holo Short Circuit
        "HPA00318|53\n"))
    // Wait 34 seconds
    DO_WAIT_SEC(34)
    // Smoke on
   DO_COMMAND(F("BMON"))
    DO_COMMAND(F(
        // Fire strip for 10000ms
        "FS210000\n"
        // Data panel flicker for 5 seconds
        "DP20010\n"
        // Charge Bay Indicator flicker for 5s
        "CB20010\n"
        // Data panel flicker for 5 seconds
        "DP20010\n"))
    // Wait 8 seconds
    DO_WAIT_SEC(8)
    // Smoke off
    DO_COMMAND(F("BMOFF"))
    // Wait 10 seconds
    DO_WAIT_SEC(10)
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

MARCDUINO_ANIMATION(YodaClearMind, $720)
{
    DO_START()
    DO_COMMAND(F(
        // Yoda LED sequence
        "HPO006|15\n"))
    // Wait 15 seconds
    DO_WAIT_SEC(15)
    DO_RESET({
        resetSequence();
    })
    DO_END()
}

////////////////

