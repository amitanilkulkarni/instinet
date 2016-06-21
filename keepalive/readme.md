# Keepalive
-----------
A BASH script for the new Fortigate 3200D Firewall IIT Madras has installed in their campus network. This script uses cURL to send a keepalive request every 200 seconds, and keep the connection alive.

### Adventages over keeping a browser window open
  - No browser required
  - Can be used in command line / TTY environment (without a display server)
  - More reliable than keeping a browser window open
  - No dependencies. cURL should be already installed in your Linux.

### Installation

1. Download or copy the script to your home folder.
2. Add your username and pasword in the place provided.
3. Open terminal and give the script execution permission by running ```chmod +x keepalive```.
4. Move the script to ```/usr/bin``` with ```sudo mv keepalive /usr/bin```.

That's all.

### Running the script

After completing all the steps, run the script by typing ```keepalive``` in any terminal emulator. I recommend ```guake``` or ```yakuake``` since it's easier to keep it open in one tab.

### Troubleshooting

1. Verify that your username/password is correct.
2. Open the Firewall login page from your browser. Don't log in yet. Copy the address of the page. Then replace the login URL from the script (```https://nfw.iitm.ac.in:1003/login?048bd6c30799653f```) with the one you just copied.
