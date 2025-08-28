import os
import sys
import subprocess

# Get the PlatformIO environment from the command line argument
try:
    pio_env = sys.argv[1]
except IndexError:
    print("Error: Please provide the PlatformIO environment as a command-line argument.")
    sys.exit(1)

# Define the build directory and output paths based on the environment
build_dir = f'.pio/build/{pio_env}/'
output_file = os.path.join(build_dir, f'{pio_env}.bin')
bootloader_bin = os.path.join(build_dir, 'bootloader.bin')
partitions_bin = os.path.join(build_dir, 'partitions.bin')
firmware_bin = os.path.join(build_dir, 'firmware.bin')
chip = 'esp32'



command = [
    'pio', 'pkg', 'exec',
    '--package', 'tool-esptoolpy',
    '--',
    'esptool.py',
    '--chip', chip,
    'merge_bin',
    '-o', output_file,
    '0x1000', bootloader_bin,
    '0x8000', partitions_bin,
    '0x10000', firmware_bin
]

try:
    print(f"Running command: {' '.join(command)}")
    subprocess.run(command, check=True)
    print(f"Successfully combined binaries into {output_file} for environment {pio_env}")
except subprocess.CalledProcessError as e:
    print(f"Error combining binaries: {e}")
except FileNotFoundError:
    print("Failed to run the esptool.py command. The path might be incorrect.")