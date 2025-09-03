# Setting up with Platform IO

I recently switched to using platformIO for coding the astropixels. It gives a lot more flexibility and ease of use compared to Arduino IDE. Here's how you can set it up:

1. Install VSCode (or vscodium)
2. Add the PlatformIO extension
3. Clone the [astropixels repo](https://github.com/dpoulson/Astropixels)
4. Open workspace from file, selecting the astropixels.code-workspace file from the repo.

It should be detected as a platformio project. The platformio.ini handles what libraries are needed and such like.

## Environments

I have it set up into multiple environments so that I can keep multiple firmwares ready to deploy. The astropixels ship with the standard environment installed.

