import os
import sys
import subprocess
import shutil

# Get the PlatformIO environment from the command line argument
try:
    pio_env = sys.argv[1]
except IndexError:
    print("Error: Please provide the PlatformIO environment as a command-line argument.")
    sys.exit(1)

# Find the full path to esptool.py
# This is a more reliable method than trying to use a build target.
try:
    # Use 'pio system' to get the list of installed packages in JSON format
    result = subprocess.run(['pio', 'platform', 'show', 'espressif32', '--json-output'], capture_output=True, text=True, check=True)
    platform_info = json.loads(result.stdout)
    
    esptool_path = ""
    for package in platform_info['packages']:
        if package['type'] == 'tool' and 'esptool' in package['name']:
            esptool_path = os.path.join(package['path'], 'esptool.py')
            if os.path.exists(esptool_path):
                break
    
    if not esptool_path:
        print("Error: Could not find esptool.py path.")
        sys.exit(1)

except subprocess.CalledProcessError as e:
    print(f"Error while running PlatformIO to find esptool.py path: {e}")
    sys.exit(1)

# Define the build directory and output paths based on the environment
build_dir = f'.pio/build/{pio_env}/'
output_file = os.path.join(build_dir, 'firmware.bin')
bootloader_bin = os.path.join(build_dir, 'bootloader.bin')
partitions_bin = os.path.join(build_dir, 'partitions.bin')
firmware_bin = os.path.join(build_dir, 'firmware.bin')
chip = 'esp32'


# Run esptool.py to merge the binaries
command = [
    sys.executable,  # Use the same python interpreter as PlatformIO
    esptool_path,
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