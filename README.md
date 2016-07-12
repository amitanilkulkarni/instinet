# instinet
A collection of scripts for IIT Madras campus network


## Keepalive

A BASH script for the new Fortigate 3200D Firewall IIT Madras has installed in their campus network. This script uses cURL to send a keepalive request every 200 seconds, and keep the connection alive.

### Adventages over keeping a browser window open
  - No browser required
  - Can be used in command line / TTY environment (without a display server)
  - More reliable than keeping a browser window open
  - No dependencies. cURL should be already installed in your Linux.


## Netaccess Plus (Obsolete)

A one-click Netaccess authenticator for IIT Madras students. It's available in the following forms:

- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/netaccess-addon/) for desktop and Android (Fully verified by Mozilla)
- [A Google Chrome Extension](https://is.gd/netaccess_chrome)
 
Source code and README is available in respective folders.


## iProxy (Obsolete)

```
NOTE: This script is now obsolete, since the papers can now also be accessed without using the proxy.
```
IIT Madras has subscribed to [a lot of e-journals](http://www.cenlib.iitm.ac.in/docs/library/ejnls-iitm.html) that students can avail for free. However, they can only be accessed for free using a proxy.

This proxy configuration script eliminates the need to switch the proxy for free access to these journals. With this script, the 150+ e-journal websites and other domains subscribed by IIT Madras will always be accessed through hproxy, while Facebook and other domains will be accessed through direct connection.

I have added checks for some frequently visited sites at the beginning of the script, so that it won't have to go through those 150 comparisons for every visited site.
